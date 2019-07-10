import * as React from "react";

// Import GraphQL related
import { graphql, ChildProps, MutationFunc } from 'react-apollo';
import CONTACTS_QUERY from '../graphql/contacts';
import DELETE_CONTACT_MUTATION from '../graphql/delete-contact-mutation';

import { Contacts_contacts, Contacts as IContacts, DeleteContactMutation, DeleteContactMutationVariables } from "../resources/gql-types";

// Import materialise-ui related
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../components/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { Link } from "@material-ui/core";
import { RouteComponentProps } from "react-router";


// Define interfaces & types
interface Props extends RouteComponentProps, WithStyles<typeof styles> {
    data: IContacts;
}

export interface DeleteContactMutationProps {
    deleteContact?: MutationFunc<DeleteContactMutation, DeleteContactMutationVariables>
}

type AllProps = ChildProps<{}, Contacts_contacts> & Props & DeleteContactMutationProps;

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


class Index extends React.PureComponent<AllProps, {}> {

    delete = async (id: string | null) => {

        if (!confirm('Are you sure?')) {
            return;
        }

        const { deleteContact } = this.props;
        if (deleteContact) {
            const result = await deleteContact({
                variables: { id: id }
            });

            if (result && result.data && result.data.deleteContact) {
                this.props.data.refetch();
            }
        }
    }

    render() {

        const { loading, error, contacts } = this.props.data;
        const { classes } = this.props;

        if (error) {
            return <p>Something happened while loading!</p>
        }

        return loading ? <CircularProgress className={classes.progress} /> :
            <Paper className={classes.root}>
                <h1>Contacts</h1>
                <Link href={'/add/'} className={classes.link}>Add contact +</Link><br /><br />
                {contacts &&
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Name</CustomTableCell>
                                <CustomTableCell>Actions</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contacts.map((contact, i) => {
                                if (!contact) return;
                                const { id, name } = contact;

                                return (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">{name}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" className={classes.button} onClick={() => { this.props.history.push(`/view/${id}`) }}>View</Button>
                                            <Button variant="contained" className={classes.button} onClick={() => { this.props.history.push(`/edit/${id}`) }}>Edit</Button>
                                            <Button variant="contained" className={classes.button} onClick={() => { this.delete(id) }}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                }

            </Paper>;
    }
}

const WrapDeleteMutation = graphql<
    Props,
    DeleteContactMutation,
    DeleteContactMutationVariables,
    DeleteContactMutationProps>(DELETE_CONTACT_MUTATION, {
        props: ({ mutate }) => ({ deleteContact: mutate })
    });
const WrapQuery = graphql<Props, Contacts_contacts>(CONTACTS_QUERY);

export default withStyles(styles)(
    WrapDeleteMutation(WrapQuery(Index))
);