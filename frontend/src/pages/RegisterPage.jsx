import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AuthButton from '../components/auth/AuthButton';
import AuthHeader from '../components/auth/AuthHeader';
import AuthFooter from '../components/auth/AuthFooter';
import GoogleButton from '../components/auth/GoogleButton';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não correspondem! Tente novamente.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/auth/registration/', {
                email: formData.email,
                username: formData.username,
                password1: formData.password,
                password2: formData.confirmPassword
            });

            setSuccess('Conta criada com sucesso!');
            setError('');
            
            // Redirect to login after a brief delay
            setTimeout(() => {
                navigate("/verifyemail");
            }, 500);
        } catch (error) {
            if (error.response && error.response.data) {
                const data = error.response.data;
                let errorMessage = '';
    
                if (data.username) {
                    errorMessage += `Usuário: ${data.username[0]} \n`;
                }
                if (data.email) {
                    errorMessage += `Email: ${data.email[0]} \n`;
                }
                if (data.password1) {
                    errorMessage += `Senha: ${data.password1[0]} \n`;
                }
    
                setError(errorMessage || 'Erro desconhecido ao tentar registrar.');
            } else {
                setError('Falha na comunicação com o servidor.');
            }
        }
    };
    return (
        <div className='min-h-screen flex flex-col bg-login'>
            <AuthHeader/>
            <div>
                <main className='flex flex-grow flex-col items-center justify-center'>
                    <h1 className="mb-8 text-white text-4xl font-bold font-display-baloo md:text-5xl text-center">Comece sua<br/>jornada agora</h1>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center font-semibold">{success}</p>}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-gray-400 w-60 md:w-75 max-w-md">
                        {/* Campo de Email */}
                        <div className="relative w-full">
                            <input
                                type="email"
                                placeholder="Email de usuário"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="py-3 pl-10 rounded border-1 border-gray-500 w-full"
                                required
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Campo de Username */}
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Nome de usuário"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="py-3 pl-10 rounded border-1 border-gray-500 w-full"
                                required
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Campo de Senha */}
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Senha"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="py-3 pl-10 rounded border-1 border-gray-500 w-full"
                                required
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

                        {/* Campo de Confirmação de Senha */}
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Confirme sua senha"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="py-3 pl-10 rounded border-1 border-gray-500 w-full"
                                required
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
                            text='Criar Conta'
                            extraClasses="mt-5"
                        />
                        <AuthButton
                            type="button"
                            route='/login'
                            text='Já tem uma conta? Entre'
                        />
                        <GoogleButton/>
                    </form>
                </main>
            </div>
            <AuthFooter/>
        </div>
    )
}

export default RegisterPage