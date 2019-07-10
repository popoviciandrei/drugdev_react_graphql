import * as React from "react";


// Import GraphQL related
import { graphql, MutationFunc } from 'react-apollo';
import CREATE_CONTACT_MUTATION from '../graphql/create-contact-mutation';
import { InputContact, CreateContactMutation, CreateContactMutationVariables } from "../resources/gql-types";
import { RouteComponentProps } from 'react-router-dom';

// Import styles assets
import styles from '../components/styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from "@material-ui/core";

// Define interfaces & types
interface Props extends RouteComponentProps, WithStyles<typeof styles> { }

export interface CreateContactMutationProps {
    addContact?: MutationFunc<CreateContactMutation, CreateContactMutationVariables>
}
export interface AllProps extends Props, CreateContactMutationProps { };

interface State {
    input: InputContact;
    error: string | null;
}

class Add extends React.PureComponent<AllProps, State> {
    constructor(props: AllProps) {
        super(props);
        this.state = {
            input: {
                email: null,
                name: null,
                id: null
            },
            error: null
        }
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        this.setState({
            input: {
                ...this.state.input,
                [name]: value
            },
            error: null
        })
    }

    onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { addContact } = this.props;
        const { input } = this.state;

        if (!input.name || !input.email) {
            this.setState({
                error: `All fields must be filled in!`
            })
            return;
        }


        if (addContact) {
            const result = await addContact({
                variables: { contact: input }
            });

            if (result && result.data && result.data.addContact) {
                this.props.history.push("/");
            }
        }
    }

    render() {
        const { input, error } = this.state;
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <h1>Add new contact</h1>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit}>
                    <TextField
                        id="name"
                        label="Name"
                        name="name"
                        className={classes.textField}
                        value={input.name || ''}
                        onChange={this.onChange}
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        id="email"
                        label="Email"
                        name="email"
                        className={classes.textField}
                        value={input.email || ''}
                        onChange={this.onChange}
                        margin="normal"
                        variant="outlined"
                    /><br />

                    {error &&
                        <p>{error}</p>
                    }
                    <Button variant="contained" className={classes.button} type="submit">Save</Button>
                    <Button variant="contained" className={classes.button} onClick={() => { this.props.history.push("/") }}>Cancel</Button>

                </form>
            </Paper>);
    }
}

export const WrappedCreateContactForm = graphql<
    Props,
    CreateContactMutation,
    CreateContactMutationVariables,
    CreateContactMutationProps
>(CREATE_CONTACT_MUTATION, {
    props: ({ mutate }) => ({ addContact: mutate })
})

export default withStyles(styles)(WrappedCreateContactForm(Add));