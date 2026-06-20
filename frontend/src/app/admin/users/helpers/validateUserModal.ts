import { ValidationUserProps } from "@/types/modal/user";

export function validateUserModal({
    name,
    email,
    password,
    confirmPassword
}: ValidationUserProps): ValidationUserProps {
    const errors: ValidationUserProps = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    // Name
    if (!name) {
        errors.name = 'Nome é obrigatório';
    } else if (name.length < 3) {
        errors.name = 'Nome deve ter no mínimo 3 caracteres.';
    }

    // Email
    if (!email) {
        errors.email = 'E-mail obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'E-mail inválido';
    }

    // Password
    if (!password) {
         errors.password = 'Senha obrigatória';
    } else if (password.length < 4) {
        errors.email = 'Senha deve conter no mínimo 4 caracteres';
    }

    // Confirm Password
    if (!confirmPassword) {
        errors.confirmPassword = 'Obrigatório confirmar senha';
    } else if (confirmPassword !== password) {
        errors.email = 'As senhas devem ser iguais';
    }

    return errors;
}