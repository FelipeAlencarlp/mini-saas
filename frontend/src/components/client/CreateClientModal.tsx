import { Modal } from "../modal/Modal";
import { Input } from "../form/Input";
import { ConfirmActionModal } from "../modal/ConfirmActionModal";
import { CreateModalProps } from "@/types/modal/client";
import {
    useCreateClientModalActions
} from "@/hooks/client/actions/useCreateClientModalActions";

export function CreateClientModal({
    isOpen,
    onClose,
    onConfirm,
    isPending
}: CreateModalProps) {
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
        handleConfirmCreate
    } = useCreateClientModalActions({
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
                title="Criar Cliente"
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
                isOpen={action === 'create'}
                onClose={() => setAction(null)}
                onConfirm={handleConfirmCreate}
                title="Atenção"
                description="Tem certeza que deseja criar esse cliente?"
                confirmText="Confirmar"
            />
        </>
    );
}