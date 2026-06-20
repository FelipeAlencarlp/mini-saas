import { forwardRef } from "react";
import { Modal } from "../modal/Modal";
import { SearchInput } from "../form/SearchInput";
import { SelectClientModalProps } from "@/types/modal/service_order";

export const SelectClientModal = forwardRef<
    HTMLInputElement,
    SelectClientModalProps
>(({
    value,
    error,
    isOpen,
    results,
    isPending,
    isOpenSearch,
    onChange,
    onSelect,
    onClose,
    onClick
}, ref) => {
    return (
        <Modal
            title="Escolher Cliente"
            isOpen={isOpen}
            onClose={onClose}
            onClick={onClick}
            isPending={isPending}
            optionTitle={['Avançando...', 'Avançar']}
        >
            <SearchInput
                label="Buscar cliente"
                ref={ref}
                value={value}
                results={results}
                isOpen={isOpenSearch}
                error={error}
                onChange={onChange}
                onSelect={onSelect}
            />
        </Modal>
    );
});