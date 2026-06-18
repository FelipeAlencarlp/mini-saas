import {
    UserModalProps,
    ValidationUserErrorsProps
} from "@/types/modal/user";

export function validateUserModal({
    name,
    email,
    password,
    confirmPassword
}: UserModalProps): ValidationUserErrorsProps {
    const errors: ValidationUserErrorsProps = {
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
        errors.password = 'Senha é obrigatória'
    } else if (password.length < 4) {
        errors.password = 'Senha deve ter no mínimo 4 caracteres';
    }

    // ConfirmPassword
    if (!confirmPassword) {
        errors.confirmPassword = 'Obrigatório confirmar a senha.';
    } else if (confirmPassword !== password) {
        errors.confirmPassword = 'As senhas não são iguais.';
    }

    return errors;
}