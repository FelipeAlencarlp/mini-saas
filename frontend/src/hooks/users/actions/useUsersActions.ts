import { useEffect, useState } from "react";
import { useCreateUser } from "../useCreateUser";
import { useUpdateUser } from "../useUpdateUser";
import { useDeleteUser } from "../useDeleteUser";
import { useDebounce } from "../../useDebounce";

interface UseUsersActionsProps {
    closeModal: () => void;
}

export function useUsersActions({ closeModal }: UseUsersActionsProps) {
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch]);

    const createUserMutation = useCreateUser();
    const updateUserMutation = useUpdateUser();
    const deleteUserMutation = useDeleteUser();

    async function handleCreate(
        name: string,
        email: string,
        password: string
    ) {
        await createUserMutation.mutateAsync({
            name,
            email,
            password
        });

        closeModal();
    }

    async function handleUpdate(
        id: number,
        name: string,
        email: string,
        password: string
    ) {
        await updateUserMutation.mutateAsync({
            id,
            name,
            email,
            password
        });

        closeModal();
    }

    async function handleDelete(id: number) {
        await deleteUserMutation.mutateAsync({ id });

        closeModal();
    }

    function handlePageClick(event: { selected: number }) {
        setPage(event.selected + 1);
    }

    return {
        page,
        search,
        debouncedSearch,

        setPage,
        setSearch,

        handleCreate,
        handleUpdate,
        handleDelete,
        handlePageClick,

        createUserMutation,
        updateUserMutation,
        deleteUserMutation,
    };
}