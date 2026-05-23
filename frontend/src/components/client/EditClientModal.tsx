"use client";

import { useState, useRef, useEffect } from "react";
import { Modal } from "../modal/Modal";
import { EditModalProps } from "@/types/modal/EditClientModalProps";
import { Input } from "../form/Input";
import { Button } from "../form/Button";
import {
    validateUpdateClientModal
} from "@/app/admin/clients/helpers/validateUpdateClientModal";

export function EditClientModal({
    client,
    isOpen,
    onClose,
    onConfirm,
    isPending
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

    function handleSubmit() {
        const validationErrors = validateUpdateClientModal({
            name,
            email,
            phone
        });

        setErrors(validationErrors);

        const hasErrors =
            validationErrors.name ||
            validationErrors.email ||
            validationErrors.phone;

        if (hasErrors) {
            nameInputRef.current?.focus();
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

    useEffect(() => {
        if (client) {
            setId(client.id);
            setName(client.name);
            setEmail(client?.email || '');
            setPhone(client?.phone || '');
        }
    }, [client]);

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
            isOpen={isOpen}
            onClose={handleClose}
            title="Editar Cliente"
        >
            <Input
                label="Nome"
                ref={nameInputRef}
                id="name-edit-client-modal"
                name="name"
                type="string"
                value={name}
                placeholder="Digite o novo nome"
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
                ref={nameInputRef}
                id="email-edit-client-modal"
                name="email"
                type="string"
                value={email}
                placeholder="Digite o novo e-mail"
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
                ref={nameInputRef}
                id="phone-edit-client-modal"
                name="phone"
                type="string"
                value={phone}
                placeholder="Digite o novo telefone"
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

            <div className="flex gap-3 pt-4">
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="
                        bg-blue-500 text-white px-3
                        py-1 rounded hover:bg-blue-600
                        cursor-pointer
                    "
                >
                    {isPending
                        ? 'Salvando...'
                        : 'Salvar'
                    }
                </Button>

                <Button
                    type="submit"
                    onClick={handleClose}
                    className="
                        bg-gray-500 text-white px-3
                        py-1 rounded hover:bg-gray-600
                        cursor-pointer
                    "
                >
                    Cancelar
                </Button>
            </div>
        </Modal>
    );
}