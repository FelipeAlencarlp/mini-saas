import { useEffect, useRef, useState } from "react";
import { ActionType } from "@/types/modal/modal";
import { CreateUserModalProps } from "@/types/modal/user";
import { validateUserModal } from "@/app/admin/users/helpers/validateUserModal";

export function useCreateUserModalActions({
    isOpen,
    onClose,
    onConfirm
}: CreateUserModalProps) {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [action, setAction] = useState<ActionType>(null);

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (isOpen) {
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setAction(null);
        }
    }, [isOpen]);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const validationErrors = validateUserModal({
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

        setAction('create');
    }

    const handleConfirmCreate = () => {
        onConfirm(
            name.trim(),
            email.trim(),
            password.trim()
        );

        setAction(null);
    };

    function handleClose() {
        resetForm();
        onClose();
    }

    function resetForm() {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        setErrors({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    }

    return {
        name,
        email,
        action,
        errors,
        password,
        confirmPassword,
        
        nameInputRef,
        emailInputRef,
        passwordInputRef,
        confirmPasswordInputRef,
        
        setName,
        setEmail,
        setAction,
        setErrors,
        setPassword,
        setConfirmPassword,

        handleClose,
        handleSubmit,
        handleConfirmCreate,
    };
}