import { useEffect, useRef, useState } from "react";
import { ActionType } from "@/types/modal/modal";
import { EditUserModalProps } from "@/types/modal/user";
import { validateEditUserModal } from "@/app/admin/users/helpers/validateEditUserModal";

export function useEditUserModalActions({
    user,
    isOpen,
    onClose,
    onConfirm
}: EditUserModalProps) {
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [action, setAction] = useState<ActionType>(null);

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
            setAction(null);
        }
    }, [isOpen, user]);

    const handleSubmit = () => {
        const validationErrors = validateEditUserModal({
            user,
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

        setAction('edit');
    }

    const handleConfirmEdit = () => {
        onConfirm(
            id,
            name.trim(),
            email.trim()
        );

        setAction(null);
    };

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
        action,
        errors,

        nameInputRef,
        emailInputRef,

        setName,
        setEmail,
        setAction,
        setErrors,

        handleClose,
        handleSubmit,
        handleConfirmEdit
    };
}