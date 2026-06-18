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

    const [errors, setErrors] = useState({
        name: '',
        email: ''
    });

    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        if (isOpen && user) {
            setId(user.id);
            setName(user.name);
            setEmail(user.email);
        }
    }, [isOpen, user]);

    function handleSubmit() {
        const validationErrors = validateUserModal({
            name,
            email
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

        onConfirm(
            id,
            name.trim(),
            email.trim()
        );
    }

    function handleClose() {
        resetForm();
        onClose();
    }

    function resetForm() {
        setErrors({
            name: '',
            email: ''
        });
    }

    return {
        name,
        email,
        errors,

        nameInputRef,
        emailInputRef,

        setName,
        setEmail,
        setErrors,

        handleSubmit,
        handleClose
    };
}