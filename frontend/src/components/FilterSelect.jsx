import PropTypes from "prop-types";

const FilterSelect = ({
  value,
  options = [],
  placeholder,
  onChange,
  className = '',
  disabled = false,
  activeColor = 'gray' // padrão se não passar
}) => {
  // Mapear a cor dinâmica
  const colorClasses = value
    ? `bg-${activeColor}-100` 
    : 'bg-white text-black';

  return (
    <div className={`relative w-full ${colorClasses} rounded-lg ${className}`}>
      <select
        disabled={disabled}
        className={`p-2 text-center border w-full rounded-lg focus:ring-${activeColor}-500 focus:border-${activeColor}-500 appearance-none`}
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
  
      {/* Ícone seta */}
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
};

FilterSelect.propTypes = {
    value: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    activeColor: PropTypes.string
    };

export default FilterSelect;