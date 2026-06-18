import { useRef, useState } from "react";
import { useLogin } from "@/hooks/login/useLogin";
import { validateLoginForm } from "@/app/login/helpers/validateLoginForm";

export function useLoginAction() {
    const loginMutation = useLogin();
        
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

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

        await loginMutation.mutateAsync({
            email,
            password
        });
    };

    return {
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
    };
}