import { useEffect, useRef, useState } from "react";
import { EditModalProps } from "@/types/modal/client";
import {
    validateClientModal
} from "@/app/admin/clients/helpers/validateClientModal";
import { usePhoneInput } from "@/hooks/usePhoneInput";
import { ActionType } from "@/types/modal/modal";

export function useEditClientModalActions({
    client,
    isOpen,
    onClose,
    onConfirm
}: EditModalProps) {
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const [action, setAction] = useState<ActionType>(null);

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        if (isOpen && client) {
            setId(client.id);
            setName(client.name);
            setEmail(client?.email || '');
            setPhone(client?.phone || '');
            setAction(null);
        }
    }, [isOpen, client]);

    const { handlePhone } = usePhoneInput({ setPhone });

    const handleSubmit = () => {
        const validationErrors = validateClientModal({
            name,
            email,
            phone
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

        if (validationErrors.phone) {
            phoneInputRef.current?.focus();
            return;
        }

        setAction('edit');
    }

    const handleConfirmEdit = () => {
        onConfirm(
            id,
            name.trim(),
            email.trim(),
            phone.trim()
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
            email: '',
            phone: ''
        });
    }

    return {
        name,
        email,
        phone,
        action,
        errors,

        nameInputRef,
        emailInputRef,
        phoneInputRef,

        setName,
        setEmail,
        setAction,
        setErrors,

        handlePhone,
        handleClose,
        handleSubmit,
        handleConfirmEdit
    };
}