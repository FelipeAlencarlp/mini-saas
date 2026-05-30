import { useEffect, useState } from "react";
import { useCreateProduct } from "../useCreateProduct";
import { useUpdateProduct } from "../useUpdateProduct";
import { useDeleteProduct } from "../useDeleteProduct";
import { useDebounce } from "../../useDebounce";

type UseProductsActionsProps = {
    closeModal: () => void;
};

export function useProductsActions({ closeModal }: UseProductsActionsProps) {
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch]);

    const createProductMutation = useCreateProduct();
    const updateProductMutation = useUpdateProduct();
    const deleteProductMutation = useDeleteProduct();

    function handleCreate(
        name: string,
        price: number,
        quantity: number
    ) {
        createProductMutation.mutate({
            name,
            price,
            quantity
        });

        closeModal();
    }

    function handleUpdate(
        id: number,
        name: string,
        price: number,
        quantity: number
    ) {
        updateProductMutation.mutate({
            id,
            name,
            price,
            quantity
        });

        closeModal();
    }

    function handleDelete(id: number) {
        deleteProductMutation.mutate({ id });

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

        createProductMutation,
        updateProductMutation,
        deleteProductMutation,
    };
}