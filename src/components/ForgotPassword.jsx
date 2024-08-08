/* eslint-disable react/prop-types */

import { useState } from 'react';
import { Button, TextInput } from "flowbite-react";
import { useAuth } from '../hooks/useAuth';

const ForgotPassword = ({ volverInicio }) => {
    const [emailRecuperacion, setEmailRecuperacion] = useState('');
    const { resetPassword, error, setError, loading } = useAuth();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(emailRecuperacion);
            alert("Se ha enviado un correo electrónico para restablecer tu contraseña.");
            setEmailRecuperacion('');
            volverInicio(); // Volver a la pantalla de inicio de sesión
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='flex flex-col gap-3' >

            <h2 className='self-center font-semibold text-2xl'>Recuperar Contraseña</h2>
            <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
                <div className='flex flex-col gap-3'>
                    <TextInput
                        id="emailRecuperacion"
                        type="email"
                        placeholder="Correo para recuperar"
                        value={emailRecuperacion}
                        onChange={(e) => setEmailRecuperacion(e.target.value)}
                        required
                    />
                    <Button className='w-fit self-center' type="submit" disabled={loading}>Enviar</Button>
                </div>
                {error && <p className="text-red-600">Hubo un error al enviar el correo.</p>}
                <Button onClick={volverInicio} disabled={loading}>Volver al inicio</Button>
            </form>

        </div>
    );
}

export default ForgotPassword;
