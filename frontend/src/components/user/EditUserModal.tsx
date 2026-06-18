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
        password,
        errors,
        nameInputRef,
        emailInputRef,
        passwordInputRef,
        setName,
        setEmail,
        setErrors,
        setPassword,
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
                bgLabel="bg-white"
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
                        email: errors.email,
                        password: errors.password,
                    });
                }}
            />

            <Input
                label="E-mail"
                bgLabel="bg-white"
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
                        email: '',
                        password: errors.password,
                    });
                }}
            />

            <Input
                label="Senha"
                bgLabel="bg-white"
                ref={passwordInputRef}
                id="password-edit-input-modal"
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
                    });
                }}
            />
        </Modal>
    );
}