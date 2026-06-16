import { useEffect, useRef, useState } from "react";
import { EditModalProps } from "@/types/modal/client";
import {
    validateClientModal
} from "@/app/admin/clients/helpers/validateClientModal";
import { usePhoneInput } from "@/hooks/usePhoneInput";

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
        }
    }, [isOpen, client]);

    const { handlePhone } = usePhoneInput({ setPhone });

    function handleSubmit() {
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

        onConfirm(
            id,
            name,
            email,
            phone
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
            phone: ''
        });
    }

    return {
        name,
        email,
        phone,
        errors,

        nameInputRef,
        emailInputRef,
        phoneInputRef,

        setName,
        setEmail,
        setErrors,

        handleSubmit,
        handlePhone,
        handleClose
    };
}