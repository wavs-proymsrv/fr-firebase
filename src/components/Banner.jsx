/* eslint-disable react/prop-types */
import { getAuth, signOut } from 'firebase/auth';
import { IconLogout } from '@tabler/icons-react';
import appFirebase from '../Credenciales';
import logo from '../assets/Logo.png';

const auth = getAuth(appFirebase);

const Banner = ({ userName }) => {
    const handleSignOut = () => {
        signOut(auth);
        localStorage.removeItem('token');

    };

    return (
        <div className="w-full grid grid-cols-3 bg-cyan-950 p-4 text-white">
            <div></div>
            <div className="flex justify-self-center items-center">
                <img src={logo} alt="Logo" className="h-12 w-12 mr-2" />
                <h1 className="text-4xl caveat-font font-bold hidden lg:block">Urban Clothing</h1>
            </div>
            <div className="flex justify-self-end items-center gap-5">
                <p className="text-sm sm:text-base lg:text-xl">Bienvenido, <b>{userName}</b></p>
                <button
                    onClick={handleSignOut}
                    className="bg-cyan-700 flex justify-center gap-2 items-center hover:bg-cyan-800 text-white rounded-lg px-3 py-2"
                >
                    <p className='hidden sm:block'>Salir</p>
                    <IconLogout stroke={2} />
                </button>
            </div>
        </div>
    );
};

export default Banner;
