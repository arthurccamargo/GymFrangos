import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() { // Hook para acessar o contexto de autenticação
    return useContext(AuthContext); // Retorna o contexto de autenticação para acessar os value fornecidos pelo AuthProvider
}