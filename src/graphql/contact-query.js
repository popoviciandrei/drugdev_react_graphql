import gql from 'graphql-tag';

export default gql`
query ContactQuery ($id:ID){
  contact(id:$id) {
    id
    name
    email
    date_created
    date_edited
  }
}`;