import { Modal } from "../modal/Modal";
import { Input } from "../form/Input";
import { ConfirmActionModal } from "../modal/ConfirmActionModal";
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
    } = useEditUserModalActions({
        user,
        isOpen,
        onClose,
        onConfirm
    });

    return (
        <>
            <Modal
                isOpen={isOpen}
                isPending={isPending}
                onClose={handleClose}
                onClick={handleSubmit}
                title="Editar Usuário"
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

            <ConfirmActionModal
                isOpen={action === 'edit'}
                onClose={() => setAction(null)}
                onConfirm={handleConfirmEdit}
                title="Atenção"
                description="Tem certeza que deseja editar esse usuário?"
                confirmText="Confirmar"
            />
        </>
    );
}