import gql from 'graphql-tag';

export default gql`
mutation CreateContactMutation($contact: InputContact) {
  addContact(contact:$contact) {
    id
    name
    email
    date_created
    date_edited
  }
}`;