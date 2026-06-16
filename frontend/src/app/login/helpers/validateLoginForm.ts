import {
    ValidateLoginFormProps,
    ValidationErrors
} from "@/types/login";

export function validateLoginForm({
    email,
    password
}: ValidateLoginFormProps): ValidationErrors {
    const errors: ValidationErrors = {
        email: '',
        password: '',
    };

    // Email
    if (!email) {
        errors.email = 'E-mail obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'E-mail inválido';
    }

    // Password
    if (!password) {
        errors.password = 'Senha é obrigatória'
    } else if (password.length < 4) {
        errors.password = 'Senha deve ter no mínimo 4 caracteres';
    }

    return errors;
}