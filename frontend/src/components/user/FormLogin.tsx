"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    HiOutlineArrowRightStartOnRectangle as loginIcon
} from "react-icons/hi2";
import { loginRequest } from "@/app/login/helpers/loginRequest";
import { validateLoginForm } from "@/app/login/helpers/validateLoginForm";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { Button } from "@/components/form/Button";
import { FooterForm } from "./FooterForm";
import { Section } from "../form/Section";

export function FormLogin() {
    const { login } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();
    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const searchParams = useSearchParams();
    
    useEffect(() => {
        const success = searchParams.get('success');

        if (success === 'registered') {
            showToast('Cadastro realizado com sucesso', 'success');
        }
    }, []);

    const handleLogin = async () => {
        const result = await loginRequest({ email, password });

        if (!result.success) {
            showToast(result.message, 'error');
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
        <Section>
            <Form
                id="login-form"
                title="Login"
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
                        bg-gray-800 w-full m-3 text-white
                        p-3 cursor-pointer hover:bg-gray-700
                        items-center justify-center flex gap-3
                        rounded-md
                    "
                >
                    Entrar
                </Button>

                <FooterForm
                    childrenP="Não tem uma conta?"
                    href="/register"
                    titleLink="Clique para se cadastrar"
                    childrenLink="Cadastre-se"
                />
            </Form>
        </Section>
    );
}