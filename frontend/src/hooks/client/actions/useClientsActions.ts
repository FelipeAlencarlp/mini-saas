import { useEffect, useState } from "react";
import { useCreateClient } from "../useCreateClient";
import { useUpdateClient } from "../useUpdateClient";
import { useDeleteClient } from "../useDeleteClient";
import { useDebounce } from "../../useDebounce";

type UseClientsActionsProps = {
    closeModal: () => void;
};

export function useClientsActions({ closeModal }: UseClientsActionsProps) {
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch]);

    const createClientMutation = useCreateClient();
    const updateClientMutation = useUpdateClient();
    const deleteClientMutation = useDeleteClient();

    const handleCreate = async (
        name: string,
        email: string,
        phone: string
    ) => {
        await createClientMutation.mutateAsync({
            name,
            email,
            phone
        });

        closeModal();
    };

    const handleUpdate = async (
        id: number,
        name: string,
        email: string,
        phone: string
    ) => {
        await updateClientMutation.mutateAsync({
            id,
            name,
            email,
            phone
        });

        closeModal();
    };

    const handleDelete = async (id: number) => {
        await deleteClientMutation.mutateAsync({ id });

        closeModal();
    }

    function handlePageClick(event: { selected: number }) {
        setPage(event.selected + 1);
    }

    return {
        search,
        setSearch,
        debouncedSearch,

        page,
        setPage,

        handleCreate,
        handleUpdate,
        handleDelete,
        handlePageClick,

        createClientMutation,
        updateClientMutation,
        deleteClientMutation,
    };
}