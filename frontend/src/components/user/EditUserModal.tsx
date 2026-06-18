import { Modal } from "../modal/Modal";
import { Input } from "../form/Input";
import { EditUserModalProps } from "@/types/modal/user";
import {
    useEditUserModalActions
} from "@/hooks/users/actions/useEditUserModalActions";

export function EditUserModal({
    user,
    isOpen,
    onClose,
    onConfirm,
    isPending
}: EditUserModalProps) {
    const {
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
    } = useEditUserModalActions({
        user,
        isOpen,
        onClose,
        onConfirm
    });

    return (
        <Modal
            title="Editar Usuário"
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
                id="name-edit-input-modal"
                name="name"
                type="text"
                value={name}
                error={errors.name}
                onChange={(e) => {
                    setName(e.target.value);
                    setErrors({
                        name: '',
                        email: errors.email
                    });
                }}
            />

            <Input
                label="E-mail"
                bgLabel="bg-gray-200"
                ref={emailInputRef}
                id="email-edit-input-modal"
                name="email"
                type="email"
                value={email}
                error={errors.email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({
                        name: errors.name,
                        email: ''
                    });
                }}
            />
        </Modal>
    );
}