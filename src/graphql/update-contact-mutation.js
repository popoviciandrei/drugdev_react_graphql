import gql from 'graphql-tag';

export default gql`
mutation UpdateContactMutation($contact:InputContact) {
  updateContact(contact:$contact) {
    id
    name
    email
    date_created
    date_edited
  }
}`