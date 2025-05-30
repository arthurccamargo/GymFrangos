import { useState } from 'react'
import AuthButton from '../components/auth/AuthButton';
import AuthHeader from '../components/auth/AuthHeader';
import AuthFooter from '../components/auth/AuthFooter';
import GoogleButton from '@/components/auth/GoogleButton';
import { useAuth } from "../hooks/userAuth";
import { useNavigate } from 'react-router-dom'; // Importando o hook useNavigate para redirecionar após login

const LoginPage = () => {
  const navigate = useNavigate(); // Hook para redirecionar após login
  const [formData, setFormData] = useState({ // Hook para gerenciar estado do formulario
    email:'',
    password: ''
  });
  const [error, setError] = useState(''); // Hook para estado de mensagens de erro
  const [isSigningIn, setIsSigningIn] = useState(false); // Estado para desativar o botão enquanto autentica
  const { loginWithEmail } = useAuth(); // Hook para autenticação com email e senha

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpa mensagens de erro
    setIsSigningIn(true); // Para desativar o botão de login porque usuário está autenticando

    const result = await loginWithEmail(formData.email, formData.password);

    if (result.status === 'email-not-verified') {
      setError("E-mail não verificado. Um novo e-mail foi enviado.");
    } else if (result.status === 'error') {
      setError(result.error.code === 'auth/invalid-credential' 
        ? 'Credenciais inválidas' 
        : 'Erro ao fazer login');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-login'>
      <AuthHeader/>
      <div>
        <main className='flex flex-grow flex-col items-center justify-center'>
          <h1 className="mb-8 text-white text-4xl font-bold font-display-baloo md:text-5xl text-center">Nenhum frango<br/>fica para trás</h1>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-gray-400 w-60 md:w-75 max-w-md">
            {/* Campo de Email */}
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                autoComplete='username'
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="py-3 pl-10 rounded border-1 border-gray-500 w-full"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="size-6"
                  >
                  <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
            </div>

            {/* Campo de Senha */}
            <div className="relative">
              <input
                type="password"
                placeholder="Senha"
                value={formData.password}
                autoComplete='current-password'
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="py-3 pl-10 rounded border-1 border-gray-500 w-full"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
            </div>
            
            {/* Botões */}
            <AuthButton 
              type="submit"
              text={isSigningIn ? 'Entrando...' : 'Entrar'}
              extraClasses="mt-5"
              disabled={isSigningIn}
            />
            <AuthButton
              type="button"
              route='/register'
              text='Criar Conta'
            />
            <GoogleButton disabled={isSigningIn} />
          </form>
        </main>
      </div>
      <AuthFooter/>
    </div> 
  )
}

export default LoginPage
