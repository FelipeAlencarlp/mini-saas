"use client";

import {
    HiOutlineArrowRightStartOnRectangle as loginIcon
} from "react-icons/hi2";
import { Section } from "../form/Section";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { useLoginAction } from "@/hooks/login/actions/useLoginActions";

export function FormLogin() {
    const {
        email,
        errors,
        password,
        loginMutation,
        emailInputRef,
        passwordInputRef,
        setEmail,
        setErrors,
        setPassword,
        onSubmit
    } = useLoginAction();

    return (
        <Section>
            <Form
                id="login-form"
                title="Login"
                Icon={loginIcon}
                onSubmit={onSubmit}
                isPending={loginMutation.isPending}
                titlesButton={["Entrando...","Entrar"]}
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