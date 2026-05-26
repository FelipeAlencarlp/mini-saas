import { useEffect, useState } from "react";
import { DeleteModalProps } from "@/types/modal/client/DeleteModalProps.type";
import { Modal } from "./Modal";

export function DeleteModal({
    client,
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
        if(isOpen && client) {
            setId(client.id);
        }
    }, [isOpen, client])

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
                text-center text-xl pb-2
            ">
                Deseja realmente excluir:
                <b>{client?.name}?</b>
            </p>

            <p className="
                text-right text-xs text-red-500 mt-2
            ">
                ATENÇÃO: Não pode ser revertido!
            </p>
        </Modal>
    );
}