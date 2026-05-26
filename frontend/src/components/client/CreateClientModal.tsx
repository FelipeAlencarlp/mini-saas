"use client";

import { useState, useRef, useEffect } from "react";
import { Modal } from "../modal/Modal";
import { CreateModalProps } from "@/types/modal/client/CreateClientModalProps";
import { Input } from "../form/Input";
import {
    validateClientModal
} from "@/app/admin/clients/helpers/validateClientModal";

export function CreateClientModal({
    isOpen,
    onClose,
    onConfirm,
    isPending
}: CreateModalProps) {
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
            name,
            email,
            phone
        );
    }

    useEffect(() => {
        if (isOpen) {
            setName('');
            setEmail('');
            setPhone('');
        }
    }, [isOpen]);

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

    return (
        <Modal
            title="Criar Cliente"
            isOpen={isOpen}
            onClose={handleClose}
            onClick={handleSubmit}
            isPending={isPending}
            optionTitle={['Criando...', 'Criar']}
        >
            <Input
                label="Nome"
                bgLabel="bg-gray-200"
                ref={nameInputRef}
                id="name-create-client-modal"
                name="name"
                type="text"
                value={name}
                error={errors.name}
                onChange={(e) => {
                    setName(e.target.value);
                    setErrors({
                        name: '',
                        email: errors.email,
                        phone: errors.phone
                    });
                }}
            />

            <Input
                label="E-mail"
                bgLabel="bg-gray-200"
                ref={emailInputRef}
                id="email-create-client-modal"
                name="email"
                type="email"
                value={email}
                error={errors.email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({
                        name: errors.name,
                        email: '',
                        phone: errors.phone
                    });
                }}
            />

            <Input
                label="Telefone"
                bgLabel="bg-gray-200"
                ref={phoneInputRef}
                id="phone-create-client-modal"
                name="phone"
                type="tel"
                value={phone}
                error={errors.phone}
                onChange={(e) => {
                    setPhone(e.target.value);
                    setErrors({
                        name: errors.name,
                        email: errors.email,
                        phone: ''
                    });
                }}
            />
        </Modal>
    );
}