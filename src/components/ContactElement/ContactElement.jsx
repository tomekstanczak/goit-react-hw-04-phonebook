import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Filter from '../Filter/Filter';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import PropTypes from 'prop-types';

export default function ContactElement() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    } else if (name === 'filter') {
      setFilter(value);
    }
  };

  const addContact = evt => {
    evt.preventDefault();
    const prevState = contacts;
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const existingContact = prevState.some(prev =>
      prev.name.toLowerCase().includes(name.toLowerCase())
    );

    if (existingContact) {
      return alert(`${name}is existing in contacts`);
    } else {
      setContacts([...prevState, newContact]);
    }

    setName('');
    setNumber('');
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const contactDelete = idContact => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== idContact)
    );
  };

  useEffect(() => {
    const savedContacts = localStorage.getItem('data');
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = filterContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm
        onChange={handleChange}
        onSubmit={addContact}
        valueName={name}
        valueNumber={number}
      />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleChange} />
      <ContactList filteredList={filteredContacts} onClick={contactDelete} />
    </div>
  );
}

ContactElement.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  filter: PropTypes.string,
  contacts: PropTypes.array,
};
