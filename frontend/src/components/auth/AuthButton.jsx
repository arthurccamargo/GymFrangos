import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AuthButton = ({ text, onClick, route,type= "button", extraClasses = "" }) => {
  const navigate = useNavigate();

  // Função para lidar com o clique no botão
  const handleClick = (e) => {
    if (route) {
      navigate(route); // Navega para a rota especificada
    }
    if (onClick) {
      onClick(e); // Executa a função onClick, se fornecida
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={` bg-red-600 text-black p-2 rounded-3xl font-bold cursor-pointer hover:bg-red-400 ${extraClasses}`}
    >
      {text}
    </button>
  );
};

// Validação de tipos de propriedades no React. Ele garante que as props passadas para o componente sejam do tipo correto
AuthButton.propTypes = {
    text: PropTypes.string.isRequired, //indica que a prop é obrigatória e deve ser do tipo string
    route: PropTypes.string,
    onClick: PropTypes.string,
    type: PropTypes.string,
    extraClasses: PropTypes.string, //indica que a prop é opcional, mas deve ser uma string
  };

export default AuthButton;
