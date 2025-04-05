import { auth } from './firebaseConfig'; // Importando a configuração do Firebase
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup,
    GoogleAuthProvider,
    signOut, 
    sendEmailVerification
} from "firebase/auth";


export const doCreateUserWithEmailAndPassword = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential;
}

export const doSignInWithEmailAndPassword = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user.emailVerified) {
        await signOut(); // Desconecta o usuário se o email não estiver verificado
        throw new Error('Por favor, verifique seu email antes de fazer login.');
    }
    return userCredential;
}

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential;
}

export const doSignOut = () => {
    return signOut(auth);
}