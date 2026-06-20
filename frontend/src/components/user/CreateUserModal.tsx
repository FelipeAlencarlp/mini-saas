import { Modal } from "../modal/Modal";
import { Input } from "../form/Input";
import { ConfirmActionModal } from "../modal/ConfirmActionModal";
import { CreateUserModalProps } from "@/types/modal/user";
import {
    useCreateUserModalActions
} from "@/hooks/users/actions/useCreateUserModalActions";

export function CreateUserModal({
    isOpen,
    onClose,
    onConfirm,
    isPending
}: CreateUserModalProps) {
    const {
        name,
        email,
        action,
        errors,
        password,
        confirmPassword,
        nameInputRef,
        emailInputRef,
        passwordInputRef,
        confirmPasswordInputRef,
        setName,
        setEmail,
        setAction,
        setErrors,
        setPassword,
        setConfirmPassword,
        handleClose,
        handleSubmit,
        handleConfirmCreate
    } = useCreateUserModalActions({
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
                title="Criar Usuário"
                optionTitle={['Criando...', 'Criar']}
            >
                <Input
                    label="Nome"
                    bgLabel="bg-gray-200"
                    ref={nameInputRef}
                    id="name-create-input-modal"
                    name="name"
                    type="text"
                    value={name}
                    error={errors.name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setErrors({
                            name: '',
                            email: errors.email,
                            password: errors.password,
                            confirmPassword: errors.confirmPassword,
                        });
                    }}
                />

                <Input
                    label="E-mail"
                    bgLabel="bg-gray-200"
                    ref={emailInputRef}
                    id="email-create-input-modal"
                    name="email"
                    type="email"
                    value={email}
                    error={errors.email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors({
                            name: errors.name,
                            email: '',
                            password: errors.password,
                            confirmPassword: errors.confirmPassword,
                        });
                    }}
                />

                <Input
                    label="Senha"
                    bgLabel="bg-gray-200"
                    ref={passwordInputRef}
                    id="password-create-input-modal"
                    name="password"
                    type="password"
                    value={password}
                    error={errors.password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({
                            name: errors.name,
                            email: errors.email,
                            password: '',
                            confirmPassword: errors.confirmPassword,
                        });
                    }}
                />

                <Input
                    label="Confirmar Senha"
                    bgLabel="bg-gray-200"
                    ref={confirmPasswordInputRef}
                    id="confirmPassword-create-input-modal"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    error={errors.confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors({
                            name: errors.name,
                            email: errors.email,
                            password: errors.password,
                            confirmPassword: '',
                        });
                    }}
                />
            </Modal>

            <ConfirmActionModal
                isOpen={action === 'create'}
                onClose={() => setAction(null)}
                onConfirm={handleConfirmCreate}
                title="Atenção"
                description="Tem certeza que deseja criar esse usuário?"
                confirmText="Confirmar"
            />
        </>
    );
}