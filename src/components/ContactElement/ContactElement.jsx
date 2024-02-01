import { Component } from 'react';
import { nanoid } from 'nanoid';
import Filter from '../Filter/Filter';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import PropTypes from 'prop-types';

export default class ContactElement extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      name: '',
      number: '',
      filter: '',
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  addContact = evt => {
    evt.preventDefault();
    const name = this.state.name;
    const number = this.state.number;
    const prevState = this.state.contacts;
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
      this.setState({
        contacts: [...prevState, newContact],
      });
    }

    this.setState({
      name: '',
      number: '',
    });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  contactDelete = idContact => {
    this.save(idContact);
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idContact),
    }));
  };
  save = (key, value) => {
    try {
      const savingContact = JSON.stringify(value);
      localStorage.setItem(key, savingContact);
    } catch (error) {
      console.log('error');
    }
  };

  load = key => {
    try {
      const savedContact = localStorage.getItem(key);
      return savedContact === null ? undefined : JSON.parse(savedContact);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  };

  componentDidMount() {
    const prevContacts = this.state.contacts;
    const savedContacts = this.load('data');
    if (savedContacts && Array.isArray(savedContacts)) {
      const uniqueContacts = savedContacts.filter(
        savedContact =>
          !prevContacts.some(
            prevContact =>
              prevContact.name.toLowerCase() === savedContact.name.toLowerCase()
          )
      );
      this.setState({ contacts: [...prevContacts, ...uniqueContacts] });
    }
  }

  componentDidUpdate() {
    this.save('data', this.state.contacts);
  }

  render() {
    const filteredContacts = this.filterContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          onChange={this.handleChange}
          onSubmit={this.addContact}
          valueName={this.state.name}
          valueNumber={this.state.number}
        />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handleChange} />
        <ContactList
          filteredList={filteredContacts}
          onClick={this.contactDelete}
        />
      </div>
    );
  }
}

ContactElement.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  filter: PropTypes.string,
  contact: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
  }),
};
