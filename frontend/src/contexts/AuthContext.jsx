import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { auth } from '../firebase/firebaseConfig'; // Importando a configuração do Firebase
import { onAuthStateChanged } from 'firebase/auth'; // Importando a função para verificar o estado de autenticação do usuário

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null); // estado de informações do usuário
    const [userLoggedIn, setUserLoggedIn] = useState(true); // estado do usuário conectado
    const [loading, setLoading] = useState(true); // estado de carregamento

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe; // unsubscribe é chamado quando o componente é desmontado
    }, [])

    // initializeUser é chamada ao ser efetuado login com sucesso, recebe as info do usuario
    async function initializeUser(user) {
        if (user) { // se o usuário estiver logado
            setCurrentUser({ ...user }); // Cria uma cópia rasa (shallow copy) do objeto user do Firebase.
            setUserLoggedIn(true); // atualiza o estado do usuário conectado
        } else { // se o usuário não estiver logado
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false); 
    }

    // quais dados serão disponibilizados para todos os componentes consumidores do contexto
    const value = {
        currentUser, 
        userLoggedIn,
        loading
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