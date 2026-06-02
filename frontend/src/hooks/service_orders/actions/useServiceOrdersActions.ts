import { useEffect, useState } from "react";
import { useCreateServiceOrder } from "../useCreateServiceOrder";
// import { useUpdateProduct } from "../useUpdateProduct";
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
    // const updateProductMutation = useUpdateProduct();
    const deleteOrderServiceMutation = useDeleteServiceOrder();

    function handleCreate(
        userId: number,
        clientId: number,
        items: number[]
    ) {
        createServiceOrderMutation.mutate({
            userId,
            clientId,
            items
        });

        closeModal();
    }

    // function handleUpdate(
    //     id: number,
    //     name: string,
    //     price: number,
    //     quantity: number
    // ) {
    //     updateProductMutation.mutate({
    //         id,
    //         name,
    //         price,
    //         quantity
    //     });

    //     closeModal();
    // }

    function handleDelete(id: number) {
        deleteOrderServiceMutation.mutate({ id });

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
        // handleUpdate,
        handleDelete,
        handlePageClick,

        createServiceOrderMutation,
        // updateProductMutation,
        deleteOrderServiceMutation,
    };
}