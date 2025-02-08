import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const HomeButton = ({ text, route, padding="px-4 py-2", extraClasses = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(route)}
      className={`${padding} bg-white text-red-800 font-bold rounded-3xl shadow-md transition-transform transform hover:scale-105 hover:bg-gray-100 ${extraClasses}`}
    >
      {text}
    </button>
  );
};

// Validação de tipos de propriedades no React. Ele garante que as props passadas para o componente sejam do tipo correto
HomeButton.propTypes = {
    text: PropTypes.string.isRequired, //indica que a prop é obrigatória e deve ser do tipo string
    route: PropTypes.string.isRequired,
    padding: PropTypes.string, //indica que a prop é opcional, mas deve ser uma string
    extraClasses: PropTypes.string, //indica que a prop é opcional, mas deve ser uma string
  };

export default HomeButton;
