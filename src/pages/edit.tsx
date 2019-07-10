import * as React from "react";

// Import the update contact form component
import UpdateContactForm from '../components/update-contact-form';

// Import GraphQL related
import { graphql, ChildProps } from 'react-apollo';
import CONTACT_QUERY from '../graphql/contact-query';
import { ContactQuery_contact, ContactQuery, ContactQueryVariables } from "../resources/gql-types";
import { RouteComponentProps } from 'react-router-dom';

// Import styles assets
import styles from '../components/styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

// Define the expected router param for contactId
interface UrlParams {
    contactId: string;
}

// Define interfaces & types
interface Props extends RouteComponentProps<UrlParams>, WithStyles<typeof styles> {
    data: ContactQuery;
}


type AllProps = ChildProps<Props, ContactQuery_contact>;

class Edit extends React.PureComponent<AllProps, {}> {


    render() {
        const { loading, error } = this.props.data;
        const { classes } = this.props;

        if (error) {
            return <p>Something happened here!</p>
        }
        const contact = this.props.data ? this.props.data.contact : null;
        return loading ? <CircularProgress className={classes.progress} /> :
            <Paper className={classes.root}>
                <UpdateContactForm initialInput={contact ? { id: contact.id, name: contact.name, email: contact.email } : {}} push={this.props.history.push} />
            </Paper>
    }
}
const WrapQuery = graphql<Props, ContactQuery_contact, ContactQueryVariables>(CONTACT_QUERY, {
    options: ({ match }) => ({
        variables: { id: match.params.contactId }
    })
});
export default withStyles(styles)(WrapQuery(Edit));