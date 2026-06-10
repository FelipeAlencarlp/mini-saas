import { useEffect, useState } from "react";
import { useCreateServiceOrder } from "../useCreateServiceOrder";
import { useUpdateServiceOrder } from "../useUpdateServiceOrder";
import { useDeleteServiceOrder } from "../useDeleteServiceOrder";
import { useDebounce } from "../../useDebounce";

type UseServiceOrdersActionsProps = {
    closeModal: () => void;
};

export function useServiceOrdersActions({
    closeModal
}: UseServiceOrdersActionsProps) {
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch]);

    const createServiceOrderMutation = useCreateServiceOrder();
    const updateServiceOrderMutation = useUpdateServiceOrder();
    const deleteServiceOrderMutation = useDeleteServiceOrder();

    function handleCreate(
        clientId: number,
        items: {
            productId: number,
            quantity: number
        }[]
    ) {
        createServiceOrderMutation.mutate({
            clientId,
            items
        });

        closeModal();
    }

    function handleUpdate(
        id: number,
        items: {
            productId: number,
            quantity: number
        }[]
    ) {
        updateServiceOrderMutation.mutate({
            id,
            items
        });

        closeModal();
    }

    function handleDelete(id: number) {
        deleteServiceOrderMutation.mutate({ id });

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

        createServiceOrderMutation,
        updateServiceOrderMutation,
        deleteServiceOrderMutation,
    };
}