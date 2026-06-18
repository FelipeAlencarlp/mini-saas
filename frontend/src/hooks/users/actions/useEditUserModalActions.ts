import { useEffect, useRef, useState } from "react";
import { EditUserModalProps } from "@/types/modal/user";
import { validateUserModal } from "@/app/admin/users/helpers/validateUserModal";

export function useEditUserModalActions({
    user,
    isOpen,
    onClose,
    onConfirm
}: EditUserModalProps) {
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    });

    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        if (isOpen && user) {
            setId(user.id);
            setName(user.name);
            setEmail(user.email);
            setPassword(user.password);
        }
    }, [isOpen, user]);

    function handleSubmit() {
        const validationErrors = validateUserModal({
            name,
            email,
            password
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

        onConfirm(
            id,
            name.trim(),
            email.trim(),
            password.trim()
        );
    }

    function handleClose() {
        resetForm();
        onClose();
    }

    function resetForm() {
        setErrors({
            name: '',
            email: '',
            password: ''
        });
    }

    return {
        name,
        email,
        password,
        errors,

        nameInputRef,
        emailInputRef,
        passwordInputRef,

        setName,
        setEmail,
        setErrors,
        setPassword,

        handleSubmit,
        handleClose
    };
}