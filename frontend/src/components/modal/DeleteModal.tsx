import { useEffect, useState } from "react";
import { DeleteModalProps } from "@/types/modal/modal";
import { Modal } from "./Modal";

export function DeleteModal({
    item,
    isOpen,
    isPending,
    onClose,
    onConfirm
}: DeleteModalProps) {
    const [id, setId] = useState<number>(0);

    function handleSubmit() {
        onConfirm(id);
    }

    useEffect(() => {
        if(isOpen && item) {
            setId(item.id);
        }
    }, [isOpen, item])

    return (
        <Modal
            title="Tem certeza?"
            isOpen={isOpen}
            onClose={onClose}
            onClick={handleSubmit}
            isPending={isPending}
            optionTitle={['Excluindo...', 'Excluir']}
        >
            <p className="
                flex flex-col text-gray-600
                text-center text-xl pt-6 pb-2
            ">
                Deseja realmente excluir:
                <b>{item?.name ?? "Essa ordem"}?</b>
            </p>

            <p className="
                text-right text-xs text-red-500 mt-2
            ">
                ATENÇÃO: Não pode ser revertido!
            </p>
        </Modal>
    );
}