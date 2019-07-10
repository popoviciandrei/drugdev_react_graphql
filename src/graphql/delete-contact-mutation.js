import gql from 'graphql-tag';

export default gql`
mutation DeleteContactMutation($id:ID) {
  deleteContact(id: $id) 
}`;