import PropTypes from "prop-types";

const FilterSelect = ({
  value,
  options = [],
  placeholder,
  onChange,
  className = '',
  disabled = false
}) => {
  return (
    <select
      disabled={disabled}
      className={`p-2 text-center border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      value={value}
      onChange={onChange}
    >
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

FilterSelect.propTypes = {
    value: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    };

export default FilterSelect;