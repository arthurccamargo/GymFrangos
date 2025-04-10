import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
//import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig'; // Importando a configuração do Firebase
import { onAuthStateChanged } from 'firebase/auth'; // Importando a função para verificar o estado de autenticação do usuário

const AuthContext = React.createContext();
export { AuthContext}

export function AuthProvider({ children }) {
    //const navigate = useNavigate();

    const [userLoggedIn, setUserLoggedIn] = useState(false); // estado do usuário conectado
    const [userProfile, setUserProfile] = useState(null); // estado de dados do perfil do usuário no meu banco de dados
    // controle para outras chamadas do app (ex: buscar dados do usuário, carregar dashboard, etc.)
    const [loading, setLoading] = useState(true); // estado de carregamento
    // controle apenas para login, logout, recuperação de sessão (Firebase, JWT, etc.)
    const [authLoading, setAuthLoading] = useState(false); // controle de fluxo natural para ações async

    useEffect(() => {
    // Observa mudanças no estado de autenticação do Firebase, chama initializeUser quando o estado muda
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (authLoading) {
        // ainda está processando o login social
        return;
        }
    
        if (user) {
        initializeUser(user); // agora sim pode buscar perfil com segurança
        }
    
        // caso o user saia, reseta
        if (!user) {
        setAuthLoading(false);
        }
    });
    
    return unsubscribe;
    }, [authLoading]);


    async function fetchUserProfile(uid) {
        try {
            const token = await auth.currentUser.getIdToken(); // Pega o token do Firebase
            const response = await fetch(`http://127.0.0.1:8000/auth/get-user-data/${uid}/`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Adiciona o token no header
                }
            });
            if (!response.ok) {
                console.error("Erro ao buscar perfil:", response.statusText);   
                return null; // Retorna null se a resposta não for ok
            }
            return await response.json();
        } catch (error) {
            console.error("Erro ao buscar perfil:", error);
            return null;
        }
    }

    // initializeUser é chamada sempre que o estado de autenticação muda
    async function initializeUser(user) {
        console.log("\nInicio de initializeUser") // DEBUG
        if (user) { // se o usuário estiver logado
            setUserLoggedIn(true); // atualiza o estado do usuário conectado
            const userData = await fetchUserProfile(user.uid); // Chama a função para buscar o perfil do usuário
           
            console.log("\nuserData", userData) // DEBUG

            if (userData) {
                setUserProfile(userData); // Atualiza o estado com os dados do perfil do usuário
                setAuthLoading(false); // pode desligar o loading pois já carregou dados do usuário
                //navigate('/dashboard'); // redireciona quando TUDO estiver pronto
            } else {
                console.log("\nNao existe userData")
                setAuthLoading(false);
            }
 

        } else { // se o usuário não estiver logado - limpa todos os estados
            setUserLoggedIn(false);
            setUserProfile(null); 
        }
        setLoading(false); 
    }

    // quais dados serão disponibilizados para todos os componentes consumidores do contexto
    const value = {
        userLoggedIn,
        userProfile,
        loading,
        authLoading,
        refreshUserData: () => initializeUser(auth.currentUser), // permite refreshar os dados do usuário
        initializeUser
    }

    AuthProvider.propTypes = {
        children: PropTypes.node.isRequired // Valida que "children" é obrigatório
      };
    
    return(
        <AuthContext.Provider value={value}>
            {!loading && children} {/* Renderiza os filhos apenas quando o carregamento estiver completo */}
        </AuthContext.Provider>
    )
}

