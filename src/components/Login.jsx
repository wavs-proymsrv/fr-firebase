import React, { useState } from 'react';
import { Button, Card, Label, TextInput } from "flowbite-react";
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import { useAuth } from '../hooks/useAuth';
import Logo from '../assets/Logo.png';
import ForgotPassword from './ForgotPassword';

const Login = () => {
    const [registrando, setRegistrando] = useState(false);
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mostrarRecuperar, setMostrarRecuperar] = useState(false);
    const [nombre, setNombre] = React.useState('');
    const { signIn, signUp, error, loading } = useAuth();

    const handleNombreChange = (e) => {
        // Validar que el nombre solo contenga letras, tilde y ñ
        const regex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]*$/;
        const inputValue = e.target.value;
        if (regex.test(inputValue)) {
            setNombre(inputValue);
        }
    };

    const handleRecuperarClick = () => {
        setMostrarRecuperar(true);
    };

    const volverInicio = () => {
        setMostrarRecuperar(false);
    };

    const funcAuth = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const role = 'user';

        if (registrando) {
            await signUp(email, password, nombre, role);
        } else {
            await signIn(email, password);
        }
    };

    return (
        <div className='h-screen flex justify-center items-center bg-cyan-950'>
            <Card className="w-full mx-10 sm:mx-0 sm:w-1/2 lg:1/3 xl:w-1/4 flex flex-col">
                <img src={Logo} alt="Logo" className='w-40 mx-auto' />
                {!mostrarRecuperar ? (
                    <>
                        <h2 className='self-center font-semibold text-2xl'>{registrando ? "Regístrate" : "Inicio de Sesión"}</h2>
                        <form className="flex flex-col gap-4" onSubmit={funcAuth}>
                            {registrando && (
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="nombre" value="Nombre" />
                                    </div>
                                    <TextInput
                                        id="nombre"
                                        type="text"
                                        placeholder="Tu nombre"
                                        value={nombre}
                                        onInput={handleNombreChange}
                                        required
                                    />
                                </div>
                            )}
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Correo" />
                                </div>
                                <TextInput id="email" type="email" placeholder="correo@mail.com" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Contraseña" />
                                </div>
                                <div className="relative">
                                    <TextInput
                                        id="password"
                                        type={mostrarPassword ? "text" : "password"}
                                        placeholder='Contraseña'
                                        required
                                        className="w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setMostrarPassword(!mostrarPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                    >
                                        {mostrarPassword ? <IconEye className='text-slate-700' stroke={2} /> : <IconEyeClosed className='text-slate-400' stroke={2} />}
                                    </button>
                                </div>
                            </div>
                            {error && <p className="text-red-600">Correo o contraseña incorrectos.</p>}
                            {!registrando && (
                                <a href='#' className='text-cyan-700 self-end font-normal hover:font-medium hover:underline' onClick={handleRecuperarClick}>Olvidó la contraseña?</a>
                            )}

                            {registrando && (
                                <Button type="submit" disabled={loading}>Registrarse</Button>
                            )}
                            {!registrando && (
                                <Button type="submit" disabled={loading}>Ingresar</Button>
                            )}
                        </form>
                        <h4>{registrando ? "Si ya tienes una cuenta, " : "No tienes una cuenta? "}<button onClick={() => setRegistrando(!registrando)} className='text-cyan-700'>{registrando ? "Inicia sesión" : "Regístrate"}</button></h4>
                    </>
                ) : (
                    <ForgotPassword volverInicio={volverInicio} />
                )}
            </Card>
        </div>
    );
}

export default Login;
