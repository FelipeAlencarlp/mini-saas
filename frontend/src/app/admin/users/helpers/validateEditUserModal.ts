import { ValidationEditUserProps } from "@/types/modal/user";

export function validateEditUserModal({
    name,
    email
}: ValidationEditUserProps): ValidationEditUserProps {
    const errors: ValidationEditUserProps = {
        name: '',
        email: ''
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

    return errors;
}