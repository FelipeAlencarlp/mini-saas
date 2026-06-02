import { useEffect, useRef, useState } from "react";
import {
    validateServiceOrderModal
} from "@/app/admin/service_orders/helpers/validateServiceOrderModal";
import {
    CreateServiceOrderModalProps
} from "@/types/modal/service_orders/CreateServiceOrderModalProps";
import { useClientsQuery } from "@/hooks/client/useClientsQuery";

export function useCreateServiceOrderModalActions({
    isOpen,
    onClose,
    onConfirm
}: CreateServiceOrderModalProps) {
    const [search, setSearch] = useState<string>('');
    const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
    const [clientId, setClientId] = useState<number | null>(null);
    const [items, setItems] = useState<number[]>([]);

    const [errors, setErrors] = useState({
        clientId: '',
        items: ''
    });

    const { data: clients } = useClientsQuery(
        search,
        1,
        search.length >= 2
    );

    const clientIdInputRef = useRef<HTMLInputElement>(null);
    const itemsInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        
    }, [isOpen]);

    function handleSubmit() {
        const validationErrors = validateServiceOrderModal({
            clientId,
            items
        });

        setErrors(validationErrors);

        if (validationErrors.clientId) {
            clientIdInputRef.current?.focus();
            return;
        }

        if (validationErrors.items) {
            itemsInputRef.current?.focus();
            return;
        }

        // onConfirm(
        //     clientId,
        //      items
        // );
    }

    function handleClose() {
        resetForm();
        onClose();
    }

    function resetForm() {
        setErrors({
            clientId: '',
            items: ''
        });
    }

    return {
        clients,
        search,
        clientId,
        items,
        errors,
        isOpenSearch,

        setErrors,
        setSearch,
        setClientId,
        setItems,
        setIsOpenSearch,

        handleSubmit,
        handleClose
    };
}