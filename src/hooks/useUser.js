import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import appFirebase from '../Credenciales';
import { getAuth } from 'firebase/auth';

const firestore = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

const useUser = () => {
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserName = async () => {
            setLoading(true);
            setError(null);
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDoc = doc(firestore, "users", user.uid);
                    const userSnap = await getDoc(userDoc);
                    if (userSnap.exists()) {
                        setNombre(userSnap.data().nombre);
                    } else {
                        setError("No se encontró el usuario");
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserName();
    }, []);

    return { nombre, loading, error };
};

export default useUser;
