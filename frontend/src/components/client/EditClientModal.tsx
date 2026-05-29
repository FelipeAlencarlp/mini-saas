import { Modal } from "../modal/Modal";
import { Input } from "../form/Input";
import { EditModalProps } from "@/types/modal/client/EditClientModalProps";
import {
    useEditClientModalActions
} from "@/hooks/client/actions/useEditClientModalActions";

export function EditClientModal({
    client,
    isOpen,
    onClose,
    onConfirm,
    isPending
}: EditModalProps) {
    const {
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
    } = useEditClientModalActions({
        client,
        isOpen,
        onClose,
        onConfirm
    });

    return (
        <Modal
            title="Editar Cliente"
            isOpen={isOpen}
            onClose={handleClose}
            onClick={handleSubmit}
            isPending={isPending}
            optionTitle={['Salvando...', 'Salvar']}
        >
            <Input
                label="Nome"
                bgLabel="bg-gray-200"
                ref={nameInputRef}
                id="name-edit-client-modal"
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
                id="email-edit-client-modal"
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
                id="phone-edit-client-modal"
                name="phone"
                type="tel"
                value={phone}
                maxlength={15}
                error={errors.phone}
                onChange={(e) => {
                    handlePhone(e);
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