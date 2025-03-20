import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AuthButton from '../components/auth/AuthButton';
import AuthHeader from '../components/auth/AuthHeader';
import AuthFooter from '../components/auth/AuthFooter';

const VerifyEmailPage = () => {
    const navigate = useNavigate(); // Hook do React Router para navegação entre páginas
    const [formData, setFormData] = useState({ // Hook para gerenciar estado do form
      key:'',
    })

    const [error, setError] = useState('') // estado para mensagens de erro

    const handleSubmit = async (e) => {
        e.preventDefault() // impede que recarregue a página
        try {
          const response = await axios.post('http://localhost:8000/auth/registration/verify-email/', {
            key: formData.key,
          });

          navigate("/login");

        } catch (error) {
            setError(error.response?.data?.message || 'Verificação de falhou. Tente novamente!');
          }
    };

    return (
        <div className='min-h-screen flex flex-col bg-login'>
            <AuthHeader/>
      <div>
        <main className='flex flex-grow flex-col items-center justify-center'>
          <h1 className="mb-8 text-white text-4xl font-bold font-display-baloo md:text-5xl text-center">Verificar código</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-gray-400 w-60 md:w-75 max-w-md">
            {/* Campo de Key de verificação de email */}
            <div className="relative">
              <input
                type="password"
                placeholder="Código"
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
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
              text='Verificar'
              extraClasses="mt-5"
            />
          </form>
        </main>
      </div>
      <AuthFooter/>
    </div> 
    )   
}

export default VerifyEmailPage