import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import appFirebase from '../Credenciales';

const auth = getAuth(appFirebase);
const firestore = getFirestore(appFirebase);

export const useAuth = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseToken = await userCredential.user.getIdToken();
            localStorage.setItem('token', firebaseToken);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (email, password, nombre, role) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password, role);
            const user = userCredential.user;
            await setDoc(doc(firestore, "users", user.uid), { email, nombre, role });
            const firebaseToken = await userCredential.user.getIdToken();
            localStorage.setItem('token', firebaseToken);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (email) => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        signIn,
        signUp,
        resetPassword,
        error,
        loading,
    };
};
