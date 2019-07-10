import * as React from 'react';

import { InputContact, UpdateContactMutation, UpdateContactMutationVariables } from "../resources/gql-types";
import { graphql, MutationFunc } from 'react-apollo';
import UPDATE_CONTACT_MUTATION from '../graphql/update-contact-mutation';

// materialize-ui imports
import styles from './styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { FormTextField } from './forms/text-field';

import Button from '@material-ui/core/Button';
import { Path, LocationState } from 'history';

export interface Props extends WithStyles<typeof styles> {
    initialInput: InputContact;
    push(path: Path, state?: LocationState): void;
}

export interface UpdateContactMutationProps {
    updateContact?: MutationFunc<UpdateContactMutation, UpdateContactMutationVariables>;
}

export interface AllProps extends Props, UpdateContactMutationProps { }

interface State { input: InputContact; error: string | null; }

export class UpdateContactForm extends React.PureComponent<AllProps, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            input: props.initialInput,
            error: null
        };
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

        const { updateContact } = this.props;
        const { input } = this.state;

        if (!input.name || !input.email) {
            this.setState({
                error: `All fields must be filled in!`
            })
            return;
        }
        if (updateContact) {
            const result = await updateContact({
                variables: { contact: input }
            });

            if (result && result.data && result.data.updateContact) {
                this.props.push("/");
            }
        }
    }

    render() {
        const { input, error } = this.state;
        const { classes } = this.props;

        return <div>
            <h1>Edit Contact</h1>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit}>
                <FormTextField name="name" className={classes.textField} value={input.name || ''} onChange={this.onChange} />
                <FormTextField name="email" className={classes.textField} value={input.email || ''} onChange={this.onChange} />

                <br />
                {error &&
                    <p>{error}</p>
                }

                <Button variant="contained" className={classes.button} type="submit">Save</Button>
                <Button variant="contained" className={classes.button} onClick={() => { this.props.push("/") }}>Cancel</Button>

            </form>
        </div >
    }
}

export const WrappedUpdateContactForm = graphql<
    Props,
    UpdateContactMutation,
    UpdateContactMutationVariables,
    UpdateContactMutationProps
>(UPDATE_CONTACT_MUTATION, {
    props: ({ mutate }) => ({ updateContact: mutate })
});

export default withStyles(styles)(WrappedUpdateContactForm(UpdateContactForm));