import css from '../ContactElement/ContactElement.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ filteredList, onClick }) => {
  return (
    <ul>
      {filteredList.map(contact => (
        <li className={css.listStyle} key={contact.id}>
          {contact.name}: {contact.number}
          <button
            type="button"
            onClick={() => onClick(contact.id)}
            name="delete"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  filteredList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  onClick: PropTypes.func,
};

export default ContactList;
