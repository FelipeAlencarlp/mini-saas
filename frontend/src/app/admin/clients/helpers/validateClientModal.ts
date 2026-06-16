import {
    ClientModalProps,
    ValidationClientErrors
} from "@/types/dashboard/client";

export function validateClientModal({
    name,
    email,
    phone
}: ClientModalProps): ValidationClientErrors {
    const errors: ValidationClientErrors = {
        name: '',
        email: '',
        phone: ''
    };

    // Name
    if (!name) {
        errors.name = 'Nome é obrigatório';
    } else if (name.length < 3) {
        errors.name = 'Nome deve ter no mínimo 3 caracteres.';
    }

    // Email
    if (email && !/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'E-mail inválido';
    }

    // Phone
    if (phone && phone.length !== 15) {
        errors.phone = 'Telefone inválido';
    }

    return errors;
}