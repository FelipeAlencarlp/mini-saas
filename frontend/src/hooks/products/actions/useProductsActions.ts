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

    const handleCreate = async (
        name: string,
        price: number,
        quantity: number
    ) => {
        await createProductMutation.mutateAsync({
            name,
            price,
            quantity
        });

        closeModal();
    };

    const handleUpdate = async (
        id: number,
        name: string,
        price: number,
        quantity: number
    ) => {
        await updateProductMutation.mutateAsync({
            id,
            name,
            price,
            quantity
        });

        closeModal();
    };

    const handleDelete = async (id: number) => {
        await deleteProductMutation.mutateAsync({ id });

        closeModal();
    };

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