import { auth } from './firebaseConfig'; // Importando a configuração do Firebase
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup,
    GoogleAuthProvider,
    signOut, 
    sendEmailVerification,
} from "firebase/auth";


export const doCreateUserWithEmailAndPassword = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user); // envia email de verificação após criar conta
    return userCredential;
}

export const doSendEmailVerification = async (user) => {
    await sendEmailVerification(user);
    return user;
}

export const doSignInWithEmailAndPassword = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
