const { ApolloServer, gql } = require("apollo-server");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const uid = require("nanoid");
const adapter = new FileSync("contacts.json");
const db = low(adapter);

db.defaults({
  contacts: []
}).write();

const getDate = () => {
  const m = new Date();
  return m.getUTCFullYear() + "-" +
    ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
    ("0" + m.getUTCDate()).slice(-2) + " " +
    ("0" + m.getUTCHours()).slice(-2) + ":" +
    ("0" + m.getUTCMinutes()).slice(-2) + ":" +
    ("0" + m.getUTCSeconds()).slice(-2);
}


const server = new ApolloServer({
  resolvers: {
    Query: {
      contacts() {
        return db.get("contacts").value();
      },
      contact(_, { id }) {
        return db
          .get("contacts")
          .find({ id })
          .value();
      }
    },
    Mutation: {
      async addContact(_, { contact }) {
        let newContact = { ...contact, id: uid(), date_created: getDate() };
        await db
          .get("contacts")
          .push(newContact)
          .write();
        return newContact;
      },
      async deleteContact(_, { id }) {
        await db
          .get("contacts")
          .remove({ id })
          .write();
        return true;
      },
      async updateContact(_, { contact }) {
        let updatedContact = { ...contact, date_edited: getDate() }

        await db
          .get("contacts")
          .find({ id: contact.id })
          .assign({ ...updatedContact })
          .write();

        return db
          .get("contacts")
          .find({ id: contact.id })
          .value();
      }
    }
  },
  typeDefs: `
    type Contact {
      id: ID
      name: String
      email: String
      date_created: String
      date_edited: String
    }

    input InputContact {
      id: ID
      name: String
      email: String
    }

    type Query {
      contacts: [Contact]
      contact(id: ID): Contact
    }

    type Mutation {
      addContact(contact: InputContact): Contact
      deleteContact(id: ID): Boolean
      updateContact(contact: InputContact): Contact
    }
  `
});

server.listen(3001).then(() => {
  console.log("running @ http://localhost:3001");
});
