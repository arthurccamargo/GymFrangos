import { doSignInWithGoogle } from '@/firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from "../../hooks/userAuth";
import { auth } from '@/firebase/firebaseConfig'; // Importando a configuração do Firebase
import { useNavigate } from 'react-router-dom';

const GoogleButton = () => {
  const navigate = useNavigate();
  const { setAuthLoading, initializeUser } = useAuth();

  const handleLogin = async() => {
    console.log("\nInicio de handleLogin") // DEBUG
    try {
      setAuthLoading(true); // Inicia o estado de carregamento de autenticação
      const userCredential = await doSignInWithGoogle()
      const token = await userCredential.user.getIdToken();

      const response = await fetch('http://127.0.0.1:8000/auth/logingoogle/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
          
      if (response.ok) {
        const user = auth.currentUser
        if (user) {
          // Força a inicialização do usuário com os dados do backend
          await initializeUser(user);
          navigate('/dashboard');
        }
      } else {
        setAuthLoading(false); // Se der erro, precisa liberar o loading
        throw new Error(data.error || "Erro no login");
      }
    } catch (error) {
      console.error("Erro:", error);
      setAuthLoading(false); // Se der erro, precisa liberar o loading
      // Mostra feedback de erro (Pode usar toast notification)
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
