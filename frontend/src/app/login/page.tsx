"use client";

import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from 'js-cookie';

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginError, setLoginError] = useState<string>('');

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    // Validador de email
    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    // Validador de senha
    const validatePassword = (password: string) => {
        return password.length >= 4;
    };

    const handleLogin = async () => {
        try {
            setLoginError('');

            const response = await api.post('/auth/login', {
                email,
                password
            });

            const { accessToken } = response.data.data;

            Cookies.set('auth', accessToken);

            router.push('/admin/dashboard');
        } catch (error: any) {
            if (error.response?.status === 401) {
                setLoginError('E-mail ou senha inválidos');
                return;
            }

            setLoginError('Erro interno do servidor');
            console.log(error);
        }
    };

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            email: '',
            password: '',
        };

        // Validação email
        if (!email) {
            newErrors.email = 'E-mail obrigatório';
        } else if (!validateEmail(email)) {
            newErrors.email = 'E-mail inválido';
        } else {
            newErrors.email = '';
        }

        // Validação senha
        if (!password) {
            newErrors.password = 'Senha obrigatória';
        } else if (!validatePassword(password)) {
            newErrors.password = 'Senha deve ter no mínimo 4 caracteres';
        } else {
            newErrors.password = '';
        }

        setErrors(newErrors);

        if (newErrors.email || newErrors.password) return;

        await handleLogin();
    };

    return (
        <section
            className="
                w-full flex flex-row justify-center
                items-center h-screen
            "
        >
            <div
                className="
                    m-4 p-4 bg-white w-11/12 max-w-175
                    flex flex-col items-center justify-center rounded-2xl
                "
            >
                <form
                    id="login-form"
                    onSubmit={(e) => onSubmit(e)}
                    className="
                        w-11/12 max-w-125 flex-col
                        flex items-center justify-center
                    "
                >
                    <h2
                        className="
                            inter-normal text-[28px]
                            text-black font-black mb-4
                        "
                    >
                        Login
                    </h2>

                    <div className="w-full flex flex-col gap-2">
                        <label
                            className="text-gray-800 text-xl"
                            htmlFor="email-login-input"
                        >
                            E-mail
                        </label>
                        <input
                            id="email-login-input"
                            name="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors({email: '', password: errors.password});
                            }}
                            className="border p-2 rounded h-11 text-gray-600"
                        />

                        {errors.email && 
                            <span className="text-red-400 text-xs mb-3">
                                {errors.email}
                            </span>
                        }

                        <label
                            className="text-gray-800 text-xl"
                            htmlFor="password-login-input"
                        >
                                Senha
                        </label>
                        <input
                            id="password-login-input"
                            name="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors({email: errors.email, password: ''});
                            }}
                            type="password"
                            className="border p-2 rounded h-11 text-gray-600"
                        />

                        {errors.password && 
                            <span className="text-red-400 text-xs mb-3">
                                {errors.password}
                            </span>
                        }
                    </div>

                    <button
                        className="
                            bg-black w-full m-3 text-white
                            p-3 cursor-pointer hover:bg-gray-900
                        "
                    >
                        Entrar
                    </button>
                    
                    {loginError &&
                        <span className="text-red-400 text-xl mb-3">
                            {loginError}
                        </span>
                    }
                </form>
            </div>
        </section>
    );
}