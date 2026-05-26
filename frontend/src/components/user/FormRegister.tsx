"use client";

import { Form } from "../form/Form";
import { Input } from "../form/Input";
import { useRef, useState } from "react";
import { validateRegisterForm } from "@/app/register/helpers/validateRegisterForm";
import { Section } from "../form/Section";
import { useRegisterUser } from "@/hooks/useRegisterUser";

export function FormRegister() {
    const registerUserMutation = useRegisterUser();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateRegisterForm({
            name,
            email,
            password,
            confirmPassword
        });

        setErrors(validationErrors);

        if (validationErrors.name) {
            nameInputRef.current?.focus();
            return;
        }

        if (validationErrors.email) {
            emailInputRef.current?.focus();
            return;
        }

        if (validationErrors.password) {
            passwordInputRef.current?.focus();
            return;
        }

        if (validationErrors.confirmPassword) {
            confirmPasswordInputRef.current?.focus();
            return;
        }

        registerUserMutation.mutate({
            name,
            email,
            password
        });
    }

    return (
        <Section>
            <Form
                id="login-form"
                title="Cadastre-se"
                titlesButton={["Cadastrando...","Cadastrar"]}
                isPending={registerUserMutation.isPending}
                childrenP="Já tem uma conta?"
                href="/login"
                titleLink="Clique para ir ao login"
                childrenLink="Entrar"
                onSubmit={onSubmit}
            >
                <Input
                    label="Nome"
                    bgLabel="bg-white"
                    ref={nameInputRef}
                    id="name-register-input"
                    name="name"
                    type="text"
                    value={name}
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
                    bgLabel="bg-white"
                    ref={emailInputRef}
                    id="email-register-input"
                    name="email"
                    type="email"
                    value={email}
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
                    bgLabel="bg-white"
                    ref={passwordInputRef}
                    id="password-register-input"
                    name="password"
                    type="password"
                    value={password}
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
                    bgLabel="bg-white"
                    ref={confirmPasswordInputRef}
                    id="confirmPassword-register-input"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
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
            </Form>
        </Section>
    );
}