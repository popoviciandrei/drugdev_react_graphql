import gql from 'graphql-tag';

export default gql`query Contacts {
  contacts{
    id
    name
    email
    date_created
    date_edited
  }
}`