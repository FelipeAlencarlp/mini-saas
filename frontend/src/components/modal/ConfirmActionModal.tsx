import { Modal } from "./Modal";
import { ConfirmActionModalProps } from "@/types/modal/service_order";

export function ConfirmActionModal({
    isOpen,
    title,
    description,
    confirmText,
    onClose,
    onConfirm
}: ConfirmActionModalProps) {
    return (
        <Modal
            title={title}
            isOpen={isOpen}
            onClose={onClose}
            onClick={onConfirm}
            optionTitle={['Processando...', confirmText]}
        >
            <p className="text-center text-gray-600 text-lg mt-4">
                {description}
            </p>
        </Modal>
    );
}