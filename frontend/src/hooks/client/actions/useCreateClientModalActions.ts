import { useEffect, useRef, useState } from "react";
import { validateClientModal } from "@/app/admin/clients/helpers/validateClientModal";
import { CreateModalProps } from "@/types/modal/client";
import { usePhoneInput } from "../../usePhoneInput";
import { ActionType } from "@/types/modal/modal";

export function useCreateClientModalActions({
    isOpen,
    onClose,
    onConfirm
}: CreateModalProps) {
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
        if (isOpen) {
            setName('');
            setEmail('');
            setPhone('');
            setAction(null);
        }
    }, [isOpen]);

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

        setAction('create');
    }

    const handleConfirmCreate = () => {
        onConfirm(
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
        setName('');
        setEmail('');
        setPhone('');

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
        setPhone,
        setAction,
        setErrors,

        handlePhone,
        handleClose,
        handleSubmit,
        handleConfirmCreate
    };
}