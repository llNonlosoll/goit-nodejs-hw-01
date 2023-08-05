const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);

    const contactsList = JSON.parse(data);

    return contactsList;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();

    const findContactById = contactsList.find(
      (contact) => contact.id === contactId
    );

    if (!findContactById) {
      return null;
    }

    return findContactById;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await listContacts();

    const idx = contactsList.findIndex((contact) => contact.id === contactId);

    if (idx === -1) {
      return null;
    }

    const [removedContact] = contactsList.splice(idx, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

    return removedContact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contactsList = await listContacts();

    const newContact = { id: uuidv4(), name, email, phone };

    contactsList.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
