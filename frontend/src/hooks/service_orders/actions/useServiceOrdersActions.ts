import { useEffect, useState } from "react";
import { useCreateServiceOrder } from "../useCreateServiceOrder";
import { useCancelServiceOrder } from "../useCancelServiceOrder";
import { useUpdateServiceOrder } from "../useUpdateServiceOrder";
import { useFinishServiceOrder } from "../useFinishServiceOrder";
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
    const cancelServiceOrderMutation = useCancelServiceOrder();
    const updateServiceOrderMutation = useUpdateServiceOrder();
    const finishServiceOrderMutation = useFinishServiceOrder();
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

    function handleCancel(id: number) {
        cancelServiceOrderMutation.mutate({ id });
        
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

    function handleFinish(id: number) {
        finishServiceOrderMutation.mutate({ id });

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
        handleCancel,
        handleUpdate,
        handleFinish,
        handleDelete,
        handlePageClick,

        createServiceOrderMutation,
        updateServiceOrderMutation,
        deleteServiceOrderMutation,
    };
}