import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const StartButton = ({ text, route, padding = "px-4 py-2", textSize = "text-base", extraClasses = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(route)}
      className={`${padding} ${textSize} text-red-800 bg-white rounded-3xl shadow-md transition-transform transform hover:scale-105 hover:bg-gray-100 ${extraClasses}`}
    >
      {text}
    </button>
  );
};

// Validação de tipos de propriedades no React. Ele garante que as props passadas para o componente sejam do tipo correto
StartButton.propTypes = {
    text: PropTypes.string.isRequired, //indica que a prop é obrigatória e deve ser do tipo string
    route: PropTypes.string.isRequired,
    padding: PropTypes.string, //indica que a prop é opcional, mas deve ser uma string
    textSize: PropTypes.string,
    extraClasses: PropTypes.string,
  };

export default StartButton;
