"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    HiOutlineArrowRightStartOnRectangle as loginIcon
} from "react-icons/hi2";
import { validateLoginForm } from "@/app/login/helpers/validateLoginForm";
import { useToast } from "@/hooks/useToast";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { Button } from "@/components/form/Button";
import { FooterForm } from "./FooterForm";
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

        showToast('Cadastro realizado com sucesso. Faça login', 'success');

        router.replace('/login');
    }, [searchParams]);

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateLoginForm({
            email,
            password
        });

        setErrors(validationErrors);

        if (validationErrors.email || validationErrors.password) return;

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
                    disabled={loginMutation.isPending}
                    className="
                        bg-gray-800 w-full m-3 text-white
                        p-3 cursor-pointer hover:bg-gray-700
                        items-center justify-center flex gap-3
                        rounded-md
                    "
                >
                    {loginMutation.isPending
                        ? "Entrando..."
                        : "Entrar"
                    }
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