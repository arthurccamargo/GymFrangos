import { FcGoogle } from 'react-icons/fc';
import { useAuth } from "../../hooks/userAuth";
import { useNavigate } from 'react-router-dom';

const GoogleButton = () => {
  const navigate = useNavigate();
  const { loginWithGoogle} = useAuth();

  const handleLogin = async() => {
    console.log("\nInicio de handleLogin") // DEBUG
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
        console.error("Erro:", error);
        throw new Error(error || "Erro no login");
      } 
    };

  return (
    <button
      onClick={handleLogin}
      type="button"
      className="flex items-center justify-center gap-2 w-full bg-white text-gray-700 font-medium rounded-md px-4 py-2 border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
    >
      <FcGoogle className="text-xl" />
      <span>Entre com o Google</span>
    </button>
  );
};

export default GoogleButton;
