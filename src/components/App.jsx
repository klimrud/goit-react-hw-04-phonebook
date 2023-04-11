import { useState, useEffect } from 'react';

import { ContactForm } from './ContactForm/ContactForm.jsx';
import { Filter } from './Filter/Filter.jsx';
import { ContactList } from './ContactList/ContactList.jsx';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createContact = contact => {
    if (
      contacts.some(
        el => el.name === contact.name && el.number === contact.number
      )
    ) {
      alert(`${contact.name} is already in contacts`);
    } else {
      setContacts(prev => [...prev, contact]);
    }
  };

  const removeContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = filter => {
    setFilter(filter);
  };

  const filteredContacts = () => {
    if (filter) {
      const visibleFriends = contacts.filter(el =>
        el.name.toLowerCase().includes(filter.toLowerCase().trim())
      );

      return visibleFriends;
    } else {
      return contacts;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={createContact} />

      <h2>Contacts</h2>
      {contacts.length > 1 && (
        <Filter filter={filter} onChange={changeFilter} />
      )}
      {contacts.length > 0 ? (
        <ContactList contacts={filteredContacts()} onDelete={removeContact} />
      ) : (
        <p className="title">No contacts</p>
      )}
    </div>
  );
};

