"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    HiOutlineArrowRightStartOnRectangle as loginIcon
} from "react-icons/hi2";
import { validateLoginForm } from "@/app/login/helpers/validateLoginForm";
import { useToast } from "@/hooks/useToast";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { Section } from "../form/Section";
import { useLogin } from "@/hooks/useLogin";

export function FormLogin() {
    const router = useRouter();
    const { showToast } = useToast();
    const loginMutation = useLogin();
    const searchParams = useSearchParams();
    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        const success = searchParams.get('success');

        if (success !== 'registered') return;

        showToast(
            'Cadastro realizado com sucesso. Faça login',
            'success'
        );

        router.replace('/login');
    }, [searchParams]);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateLoginForm({
            email,
            password
        });

        setErrors(validationErrors);

        if (validationErrors.email) {
            emailInputRef.current?.focus();
            return;
        }

        if (validationErrors.password) {
            passwordInputRef.current?.focus();
            return;
        }

        loginMutation.mutate({
            email,
            password
        });
    };

    return (
        <Section>
            <Form
                id="login-form"
                title="Login"
                titlesButton={["Entrando...","Entrar"]}
                isPending={loginMutation.isPending}
                Icon={loginIcon}
                childrenP="Não tem uma conta?"
                href="/register"
                titleLink="Clique para se cadastrar"
                childrenLink="Cadastre-se"
                onSubmit={onSubmit}
            >
                <Input
                    label="E-mail"
                    bgLabel="bg-white"
                    ref={emailInputRef}
                    id="email-login-input"
                    name="email"
                    type="email"
                    value={email}
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
                    bgLabel="bg-white"
                    ref={passwordInputRef}
                    id="password-login-input"
                    name="password"
                    type="password"
                    value={password}
                    error={errors.password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({
                            email: errors.email,
                            password: ''
                        });
                    }}
                />
            </Form>
        </Section>
    );
}