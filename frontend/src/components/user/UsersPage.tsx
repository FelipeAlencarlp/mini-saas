"use client";

import { useEffect, useMemo, useState } from "react";
import { CreateUserModal } from "@/components/user/CreateUserModal";
import { EditUserModal } from "@/components/user/EditUserModal";
import { DeleteModal } from "@/components/modal/DeleteModal";
import { PageTable } from "@/components/PageTable";
import { useToast } from "@/hooks/useToast";
import { useUsersActions } from "@/hooks/users/actions/useUsersActions";
import { useUsersQuery } from "@/hooks/users/useUsersQuery";
import { getUsersTableColumns } from "@/utils/usersTableColumns";
import { ModalUserType } from "@/types/modal/user";

export default function UsersPage() {
    const { showToast } = useToast();

    const [modal, setModal] = useState<ModalUserType>(null);

    const {
        page,
        search,
        debouncedSearch,
        setSearch,
        handleCreate,
        handleUpdate,
        handleDelete,
        handlePageClick,
        createUserMutation,
        updateUserMutation,
        deleteUserMutation,
    } = useUsersActions({
        closeModal: () => setModal(null)
    });

    const {
        data: users,
        isLoading,
        isFetching,
        error
    } = useUsersQuery(debouncedSearch, page);

    useEffect(() => {
        if (error) {
            showToast('Erro ao carregar usuários', 'error');
        }
    }, [error]);

    const columns = useMemo(
        () => getUsersTableColumns({
            onEdit: (user) => {
                setModal({ type: 'edit', user });
            },

            onDelete: (user) => {
                setModal({ type: 'delete', user });
            }
        }), []
    );

    return (
        <>
            <PageTable
                titlePage="Usuários"
                isLoading={isLoading}
                isFetching={isFetching}
                search={search}
                columns={columns}
                data={users?.data ?? []}
                page={page}
                pageCount={users?.meta.lastPage ?? 0}
                label="Busque pelo nome"
                title="Cadastrar Novo Usuário"
                descriptionButton="Adicionar"
                onSearch={(e) => setSearch(e.target.value)}
                onClick={() => setModal({ type: 'create' })}
                handlePageClick={handlePageClick}
            />

            {/* Modals */}
            <CreateUserModal
                isOpen={modal?.type === 'create'}
                onClose={() => setModal(null)}
                onConfirm={handleCreate}
                isPending={createUserMutation.isPending}
            />

            <EditUserModal
                user={modal?.type === 'edit' ? modal.user : null}
                isOpen={modal?.type === 'edit'}
                onClose={() => setModal(null)}
                onConfirm={handleUpdate}
                isPending={updateUserMutation.isPending}
            />

            <DeleteModal
                item={modal?.type === 'delete' ? modal.user : null}
                isOpen={modal?.type === 'delete'}
                onClose={() => setModal(null)}
                onConfirm={handleDelete}
                isPending={deleteUserMutation.isPending}
            /> 
        </>
    );
}