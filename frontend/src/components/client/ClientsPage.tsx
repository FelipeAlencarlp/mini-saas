"use client";

import { useMemo, useState } from "react";
import { EditClientModal } from "@/components/client/EditClientModal";
import { CreateClientModal } from "@/components/client/CreateClientModal";
import { DeleteModal } from "@/components/modal/DeleteModal";
import { PageTable } from "@/components/PageTable";
import { useToast } from "@/hooks/useToast";
import { useClientsActions } from "@/hooks/client/actions/useClientsActions";
import { useClientsQuery } from "@/hooks/client/useClientsQuery";
import { getClientTableColumns } from "@/utils/clientTableColumns";
import { ModalClientType } from "@/types/modal/client";

export default function ClientsPage() {
    const { showToast } = useToast();

    const [modal, setModal] = useState<ModalClientType>(null);

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
            <PageTable
                titlePage="Clientes"
                isLoading={isLoading}
                isFetching={isFetching}
                search={search}
                columns={columns}
                data={clients?.data ?? []}
                page={page}
                pageCount={clients?.meta.lastPage ?? 0}
                label="Busque pelo nome"
                title="Cadastrar Novo Cliente"
                descriptionButton="Adicionar"
                onSearch={(e) => setSearch(e.target.value)}
                onClick={() => setModal({ type: 'create' })}
                handlePageClick={handlePageClick}
            />

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
                item={modal?.type === 'delete' ? modal.client : null}
                isOpen={modal?.type === 'delete'}
                onClose={() => setModal(null)}
                onConfirm={handleDelete}
                isPending={deleteClientMutation.isPending}
            />
        </>
    );
}