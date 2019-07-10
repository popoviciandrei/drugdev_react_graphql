import * as React from 'react';

import { graphql, ChildProps } from 'react-apollo';
import CONTACT_QUERY from '../graphql/contact-query';
import { ContactQuery_contact, ContactQuery, ContactQueryVariables } from "../resources/gql-types";
import { RouteComponentProps } from 'react-router-dom';

// Import styles assets
import styles from '../components/styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Define the expected router param for contactId
interface UrlParams {
    contactId: string;
}

// Define interfaces & types
interface Props extends RouteComponentProps<UrlParams>, WithStyles<typeof styles> {
    data: ContactQuery;
}

type AllProps = ChildProps<Props, ContactQuery_contact>;


export class View extends React.Component<AllProps, {}> {
    render() {
        const { loading, error } = this.props.data;
        const { classes } = this.props;

        if (error) {
            return <p>Something happened here!</p>
        }
        const contact = this.props.data ? this.props.data.contact : null;
        return loading ? <CircularProgress className={classes.progress} /> :
            <Paper className={classes.root}>
                <h1>View contact</h1>
                {contact &&
                    <List className={classes.list}>
                        <ListItem>
                            <ListItemText primary={contact.name} secondary={
                                <React.Fragment>
                                    <Typography component="span" color="textPrimary">{contact.email}</Typography>
                                    {`Created at: ${contact.date_created}`} <br />  {`Updated at: ${contact.date_edited}`}
                                </React.Fragment>
                            } />
                        </ListItem>
                    </List>
                }
                {contact &&
                    <Button variant="contained" className={classes.button} onClick={() => { this.props.history.push(`/edit/${contact.id}`) }}>Edit</Button>
                }
                <Button variant="contained" className={classes.button} onClick={() => { this.props.history.push("/") }}>Cancel</Button>

            </Paper>
    }
}

const WrapQuery = graphql<Props, ContactQuery_contact, ContactQueryVariables>(CONTACT_QUERY, {
    options: ({ match }) => ({
        variables: { id: match.params.contactId }
    })
});
export default withStyles(styles)(WrapQuery(View));