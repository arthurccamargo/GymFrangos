import { useState } from 'react'
<<<<<<< HEAD
//import { useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { auth } from '../firebase/firebaseConfig';
=======
import { useNavigate } from "react-router-dom";
import axios from 'axios';
>>>>>>> d33d9527923ee8f97dd47fc9d823d2c721df2299
import AuthButton from '../components/auth/AuthButton';
import AuthHeader from '../components/auth/AuthHeader';
import AuthFooter from '../components/auth/AuthFooter';
import GoogleButton from '../components/auth/GoogleButton';

const RegisterPage = () => {
<<<<<<< HEAD
    //const navigate = useNavigate();

=======
    const navigate = useNavigate();
>>>>>>> d33d9527923ee8f97dd47fc9d823d2c721df2299
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })
<<<<<<< HEAD
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false); // Estado para desativar o botão enquanto autentica

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('');
        setSuccess('');

=======

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
>>>>>>> d33d9527923ee8f97dd47fc9d823d2c721df2299
        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não correspondem! Tente novamente.');
            return;
        }
<<<<<<< HEAD

        setIsSigningIn(true); // Desativar o botão e evitar múltiplos cliques durante o registro.

        try {
            // Primeiro verifica se o username já existe no banco de dados
            const usernameCheck = await fetch('http://127.0.0.1:8000/auth/check-username/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: formData.username }),
            });

            const usernameData = await usernameCheck.json();
            if (!usernameCheck.ok) {
                throw new Error(usernameData.error || 'Username já existe ou ocorreu um erro.');
            }

            // Se o username estiver disponivel, cria usuario no Firebase Authentication
            await doCreateUserWithEmailAndPassword(formData.email, formData.password);
            await auth.currentUser?.reload(); // Atualiza o usuário
            const user = auth.currentUser;
            
            if (!user) {
                throw new Error('Erro ao obter dados do usuário. Tente novamente.');
            }

            const idToken = await user.getIdToken(); // Obtém o token de autenticação do usuário logado

            // Enviar os dados do usuário para o backend Django
            const response = await fetch('http://127.0.0.1:8000/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({
                    username: formData.username,
                }),
            });      
            
            const data = await response.json();
            if (!response.ok) {
                // Se der erro aqui, o usuário já foi criado no Firebase!
                // pode deletá-lo para evitar inconsistência
                await user.delete();
                throw new Error(data.error || 'Erro ao registrar no banco de dados.');
            }

            setSuccess('Conta criada com sucesso! Um e-mail de verificação foi enviado. Por favor, verifique seu e-mail antes de fazer login.');
            
        } catch (error) {
            handleFirebaseError(error);
        } finally { // independentemente de sucesso ou falha
            setIsSigningIn(false); // Reativa o botão de login para poder fazer requisição de autenticação
        }
    }

    const handleFirebaseError = (error) => {
        let errorMessage = 'Ocorreu um erro ao tentar registrar.';
        
        if (error.code) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Este email já está em uso. Tente outro.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'O email informado não é válido.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
                    break;
                default:
                    errorMessage = 'Falha ao criar conta. Verifique seus dados.';
            }
        } else if (error.message) {
            errorMessage = error.message;
        }

        setError(errorMessage);
    };

=======
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
>>>>>>> d33d9527923ee8f97dd47fc9d823d2c721df2299
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
<<<<<<< HEAD
                            disabled={isSigningIn}
=======
>>>>>>> d33d9527923ee8f97dd47fc9d823d2c721df2299
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

<<<<<<< HEAD
export default RegisterPage
=======
export default RegisterPage
>>>>>>> d33d9527923ee8f97dd47fc9d823d2c721df2299
