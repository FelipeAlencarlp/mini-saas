"use client";

import React, { use, useState } from "react";
import { SignInResponse, signIn, useSession } from "next-auth/react";

export default function Login(props: any) {
    // Recupera os dados da sessão fornecido pelo Next-Auth
    const { data: session } = useSession();

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

    // Função responsável pela autenticação
    const login = async (email: string, password: string) => {
        // a função recebe como parametros o nome da autenticação "credentials"
        const retorno: SignInResponse | undefined = await signIn('credentials', {
            username: email,
            password,
            redirect: false,
        });

        return retorno;
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

        try {
            const resp = await login(email, password);
            
            if (resp?.error) {
                setLoginError('E-mail ou senha incorretos');
                console.log('Credenciais inválidas.');
                return;
            }

            setLoginError('');
            console.log('Success');
        } catch (error) {
            console.log(error);
        }
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
                    m-4 p-4 bg-white w-11/12 max-w-[700px]
                    flex flex-col items-center justify-center rounded-2xl
                "
            >
                <form
                    id="login-form"
                    onSubmit={(e) => onSubmit(e)}
                    className="
                        w-11/12 max-w-[500px] flex-col
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

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [erroEmail, setErroEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [erroPassword, setErroPassword] = useState('');

//     function handleLogin() {
//         let valid = true;

//         if (!email.trim() && !password.trim()) {
//             setErroEmail('E-mail é obrigatório');
//             setErroPassword('A senha é obrigatória');
//             valid = false;
//         } else if (!email.includes('@')) {
//             setErroEmail('E-mail invalido');
//             valid = false;
//         } else if (!password.trim()) {
//             setErroPassword('A senha é obrigatória');
//             valid = false;
//         } else {
//             setErroEmail('');
//             setErroPassword('');
//         }

//         if (!valid) return;
//     }

//     return (
//         <div className="flex h-screen items-center justify-center">
//             <div className="bg-white p-6 rounded shadow w-80">
//                 <h1
//                     className="text-center text-xl mb-4 font-bold text-gray-800"
//                 >
//                     Login
//                 </h1>

//                 <input
//                     type="email"
//                     placeholder="Seu e-mail"
//                     className="w-full border p-2 mb-3 rounded text-gray-600"
//                     value={email}
//                     onChange={(e) => {
//                         setEmail(e.target.value);
//                         setErroEmail('');
//                     }}
//                     onKeyDown={(e) => {
//                         if (e.key === 'Enter') {
//                             handleLogin;
//                         }
//                     }}
//                 />

//                 {erroEmail && 
//                     <p className="text-red-400 text-xs mb-3">{erroEmail}</p>
//                 }

//                 <input
//                     type="password"
//                     placeholder="Sua senha"
//                     className="w-full border p-2 mb-3 rounded text-gray-600"
//                     value={password}
//                     onChange={(e) => {
//                         setPassword(e.target.value);
//                         setErroPassword('');
//                     }}
//                     onKeyDown={(e) => {
//                         if (e.key === 'Enter') {
//                             handleLogin;
//                         }
//                     }}
//                 />

//                 {erroPassword &&
//                     <p className="text-red-400 text-xs mb-3">{erroPassword}</p>
//                 }

//                 <button
//                     onClick={handleLogin}
//                     className="
//                         w-full bg-blue-600 text-white p-2 rounded
//                         cursor-pointer hover:bg-blue-700
//                     "
//                 >
//                     Entrar
//                 </button>
//             </div>
//         </div>
//     );
// }