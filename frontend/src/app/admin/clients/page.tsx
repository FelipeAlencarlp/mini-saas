"use client";

import { useMemo, useState } from "react";
import { TitlePage } from "@/components/dashboard/titlePage/TitlePage";
import { Table } from "@/components/table/Table";
import { EditClientModal } from "@/components/client/EditClientModal";
import { CreateClientModal } from "@/components/client/CreateClientModal";
import { DeleteModal } from "@/components/modal/DeleteModal";
import {
    SearchAndButtonHeaderPage
} from "@/components/searchAndButton/SearchAndButtonHeaderPage";
import { TableSkeleton } from "@/components/table/TableSkeleton";
import { useToast } from "@/hooks/useToast";
import { useClientsActions } from "@/hooks/client/useClientsActions";
import { getClientTableColumns } from "@/utils/clientTableColumns";
import { ModalType } from "@/types/modal/Modal.type";
import { useClientsQuery } from "@/hooks/client/useClientsQuery";

export default function ClientsPage() {
    const { showToast } = useToast();

    const [modal, setModal] = useState<ModalType>(null);

    const {
        page,
        search,
        debouncedSearch,
        setSearch,
        handleCreate,
        handleUpdate,
        handleDelete,
        handlePageClick,
        createClientMutation,
        updateClientMutation,
        deleteClientMutation,
    } = useClientsActions({
        closeModal: () => setModal(null)
    });

    const {
        data: clients,
        isLoading,
        isFetching,
        error
    } = useClientsQuery(debouncedSearch, page);

    if (error) {
        showToast('Erro ao carregar clientes', 'error');
    }

    const columns = useMemo(
        () => getClientTableColumns({
            onEdit: (client) => {
                setModal({ type: 'edit', client });
            },

            onDelete: (client) => {
                setModal({ type: 'delete', client });
            }
        }), []
    );

    return (
        <>
            {/* Header */}
            <TitlePage isLoading={isLoading}>
                Clientes
            </TitlePage>

            {/* Button and Search */}
            <SearchAndButtonHeaderPage
                label="Busque pelo nome"
                title="Cadastrar Novo Cliente"
                descriptionButton="Adicionar"
                search={search}
                isLoading={isLoading}
                onSearch={(e) => setSearch(e.target.value)}
                onClick={() => setModal({ type: 'create' })}
            />

            {/* Table */}
            {isLoading
                ?
                    <TableSkeleton
                        columns={columns.length}
                        rows={6}
                    />
                :
                    <Table
                        columns={columns}
                        data={clients?.data ?? []}
                        isLoading={isFetching}
                        handlePageClick={handlePageClick}
                        pageCount={clients?.meta.lastPage ?? 0}
                        page={page}
                    />
            }

            {/* Modals */}
            <CreateClientModal
                isOpen={modal?.type === 'create'}
                onClose={() => setModal(null)}
                onConfirm={handleCreate}
                isPending={createClientMutation.isPending}
            />

            <EditClientModal
                client={modal?.type === 'edit' ? modal.client : null}
                isOpen={modal?.type === 'edit'}
                onClose={() => setModal(null)}
                onConfirm={handleUpdate}
                isPending={updateClientMutation.isPending}
            />

            <DeleteModal
                client={modal?.type === 'delete' ? modal.client : null}
                isOpen={modal?.type === 'delete'}
                onClose={() => setModal(null)}
                onConfirm={handleDelete}
                isPending={deleteClientMutation.isPending}
            />
        </>
    );
}