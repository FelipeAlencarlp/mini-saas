"use client";

import { useRouter } from "next/navigation";
import { Button } from "../form/Button";
import { Form } from "../form/Form";
import { Input } from "../form/Input";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { registerRequest } from "@/app/register/helpers/registerRequest";
import { validateRegisterForm } from "@/app/register/helpers/validateRegisterForm";
import { Section } from "../form/Section";
import { FooterForm } from "./FooterForm";

export function FormRegister() {
    const router = useRouter();
    const { showToast } = useToast();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [registerError, setRegisterError] = useState<string>('');

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const nameInputRef = useRef<HTMLInputElement>(null);

    const handleRegister = async () => {
        setRegisterError('');

        const result = await registerRequest({
            name,
            email,
            password
        });

        if (!result.success) {
            showToast(result.message, 'error');
            return;
        }

        router.push('/login?success=registered');
    };

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateRegisterForm({
            name,
            email,
            password,
            confirmPassword
        });

        setErrors(validationErrors);

        if (
            validationErrors.name || validationErrors.email ||
            validationErrors.password || validationErrors.confirmPassword
        ) {
            nameInputRef.current?.focus();
            return;
        }

        await handleRegister();
    }

    return (
        <Section>
            <Form
                id="login-form"
                title="Cadastre-se"
                error={registerError}
                onSubmit={onSubmit}
            >
                <Input
                    label="Nome"
                    ref={nameInputRef}
                    id="name-register-input"
                    name="name"
                    type="string"
                    value={name}
                    placeholder="Digite seu nome"
                    error={errors.name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setErrors({
                            name: '',
                            email: errors.email,
                            password: errors.password,
                            confirmPassword: errors.confirmPassword,
                        });
                    }}
                />

                <Input
                    label="E-mail"
                    ref={nameInputRef}
                    id="email-register-input"
                    name="email"
                    type="email"
                    value={email}
                    placeholder="example@email.com"
                    error={errors.email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors({
                            name: errors.name,
                            email: '',
                            password: errors.password,
                            confirmPassword: errors.confirmPassword,
                        });
                    }}
                />

                <Input
                    label="Senha"
                    ref={nameInputRef}
                    id="password-register-input"
                    name="password"
                    type="password"
                    value={password}
                    placeholder="example@email.com"
                    error={errors.password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({
                            name: errors.name,
                            email: errors.email,
                            password: '',
                            confirmPassword: errors.confirmPassword,
                        });
                    }}
                />

                <Input
                    label="Confirmar Senha"
                    ref={nameInputRef}
                    id="confirmPassword-register-input"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    placeholder="Digite a mesma senha"
                    error={errors.confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors({
                            name: errors.name,
                            email: errors.email,
                            password: errors.password,
                            confirmPassword: '',
                        });
                    }}
                />

                <Button
                    type="submit"
                    className="
                        bg-gray-800 w-full m-3 text-white
                        p-3 cursor-pointer hover:bg-gray-700
                        items-center justify-center flex gap-3
                        rounded-md
                    "
                >
                    Cadastrar
                </Button>

                <FooterForm
                    childrenP="Já tem uma conta?"
                    href="/login"
                    titleLink="Clique para ir ao login"
                    childrenLink="Entrar"
                />
            </Form>
        </Section>
    );
}