"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginRequest } from "./helpers/loginRequest";
import { useAuth } from "@/hooks/useAuth";
import { validateLoginForm } from "./helpers/validateLoginForm";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { Button } from "@/components/form/Button";
import { HiOutlineArrowRightStartOnRectangle as loginIcon } from "react-icons/hi2";


export default function Login() {
    const { login } = useAuth();
    const router = useRouter();
    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginError, setLoginError] = useState<string>('');

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async () => {
        setLoginError('');

        const result = await loginRequest({ email, password });

        if (!result.success) {
            setLoginError(result.message);
            return;
        }
        
        login(result.data.accessToken, result.data.refreshToken);

        router.push('/admin');
    };

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateLoginForm({
            email,
            password
        });

        setErrors(validationErrors);

        if (validationErrors.email || validationErrors.password) return;

        await handleLogin();
    };

    return (
        <section
            className="
                w-full flex flex-row justify-center
                items-center h-screen
            "
        >
            <Form
                id="login-form"
                title="Login"
                error={loginError}
                onSubmit={onSubmit}
            >
                <Input
                    label="E-mail"
                    id="email-login-input"
                    name="email"
                    type="email"
                    value={email}
                    placeholder="example@email.com"
                    error={errors.email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors({
                            email: '',
                            password: errors.password
                        });
                    }}
                />

                <Input
                    label="Senha"
                    id="password-login-input"
                    name="password"
                    type="password"
                    value={password}
                    placeholder="Sua senha aqui"
                    error={errors.password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({
                            email: errors.email,
                            password: ''
                        });
                    }}
                />

                <Button
                    type="submit"
                    Icon={loginIcon}
                    className="
                        bg-black w-full m-3 text-white
                        p-3 cursor-pointer hover:bg-gray-900
                        items-center justify-center flex gap-3
                        rounded-md
                    "
                >
                    Entrar
                </Button>
            </Form>
        </section>
    );
}