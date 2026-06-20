import { Modal } from "../modal/Modal";
import { Input } from "../form/Input";
import { ConfirmActionModal } from "../modal/ConfirmActionModal";
import { EditModalProps } from "@/types/modal/client";
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
    } = useEditClientModalActions({
        client,
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
                title="Editar Cliente"
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

            <ConfirmActionModal
                isOpen={action === 'edit'}
                onClose={() => setAction(null)}
                onConfirm={handleConfirmEdit}
                title="Atenção"
                description="Tem certeza que deseja editar esse cliente?"
                confirmText="Confirmar"
            />
        </>
    );
}