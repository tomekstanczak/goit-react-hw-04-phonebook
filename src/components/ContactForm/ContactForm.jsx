import css from '../ContactElement/ContactElement.module.css';
import PropTypes from 'prop-types';

const ContactForm = ({ valueNumber, valueName, onChange, onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label className={css.nameLabel}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={valueName}
            onChange={onChange}
          />
        </label>
        <label className={css.nameLabel}>
          Nubmer
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={valueNumber}
            onChange={onChange}
          />
        </label>

        <label>
          <button type="submit">Add contact</button>
        </label>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  valueNumber: PropTypes.number,
  valueName: PropTypes.number,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default ContactForm;
