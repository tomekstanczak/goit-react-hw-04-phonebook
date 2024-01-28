import css from '../ContactElement/ContactElement.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
  return (
    <div>
      <label className={css.nameLabel}>
        Find contacts by name
        <input type="text" name="filter" onChange={onChange} value={value} />
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;
