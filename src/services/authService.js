import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import appFirebase from '../Credenciales';

const auth = getAuth(appFirebase);

export const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};
