/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ContactQuery
// ====================================================

export interface ContactQuery_contact {
  __typename: "Contact";
  id: string | null;
  name: string | null;
  email: string | null;
  date_created: string | null;
  date_edited: string | null;
}

export interface ContactQuery {
  contact: ContactQuery_contact | null;
}

export interface ContactQueryVariables {
  id?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Contacts
// ====================================================

export interface Contacts_contacts {
  __typename: "Contact";
  id: string | null;
  name: string | null;
  email: string | null;
  date_created: string | null;
  date_edited: string | null;
}

export interface Contacts {
  contacts: (Contacts_contacts | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateContactMutation
// ====================================================

export interface CreateContactMutation_addContact {
  __typename: "Contact";
  id: string | null;
  name: string | null;
  email: string | null;
  date_created: string | null;
  date_edited: string | null;
}

export interface CreateContactMutation {
  addContact: CreateContactMutation_addContact | null;
}

export interface CreateContactMutationVariables {
  contact?: InputContact | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteContactMutation
// ====================================================

export interface DeleteContactMutation {
  deleteContact: boolean | null;
}

export interface DeleteContactMutationVariables {
  id?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateContactMutation
// ====================================================

export interface UpdateContactMutation_updateContact {
  __typename: "Contact";
  id: string | null;
  name: string | null;
  email: string | null;
  date_created: string | null;
  date_edited: string | null;
}

export interface UpdateContactMutation {
  updateContact: UpdateContactMutation_updateContact | null;
}

export interface UpdateContactMutationVariables {
  contact?: InputContact | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface InputContact {
  id?: string | null;
  name?: string | null;
  email?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
