"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getClientsRequest } from "./helpers/getClientsRequest";
import { TitlePage } from "@/components/dashboard/TitlePage";
import { Table } from "@/components/table/Table";
import { EditClientModal } from "@/components/client/EditClientModal";
import { CreateClientModal } from "@/components/client/CreateClientModal";
import { DeleteModal } from "@/components/modal/DeleteModal";
import {
    SearchAndButtonHeaderPage
} from "@/components/SearchAndButtonHeaderPage";
import { useUpdateClient } from "@/hooks/client/useUpdateClient";
import { useCreateClient } from "@/hooks/client/useCreateClient";
import { useDeleteClient } from "@/hooks/client/useDeleteClient";
import { useDebounce } from "@/hooks/useDebounce";
import { useToast } from "@/hooks/useToast";
import { getClientTableColumns } from "@/utils/clientTableColumns";
import { ModalType } from "@/types/modal/Modal.type";

export default function ClientsPage() {
    const { showToast } = useToast();

    const [modal, setModal] = useState<ModalType>(null);
    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce(search, 500);

    const {
        data: clients,
        isLoading,
        error
    } = useQuery({
        queryKey: ['clients', debouncedSearch],
        queryFn: () => getClientsRequest(debouncedSearch)
    });

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

    const createClientMutation = useCreateClient();
    const updateClientMutation = useUpdateClient();
    const deleteClientMutation = useDeleteClient();

    function handleCreate(
        name: string,
        email: string,
        phone: string
    ) {
        createClientMutation.mutate({
            name,
            email,
            phone
        });

        setModal(null);
    }

    function handleUpdate(
        id: number,
        name: string,
        email: string,
        phone: string
    ) {
        updateClientMutation.mutate({
            id,
            name,
            email,
            phone
        });

        setModal(null);
    }

    function handleDelete(id: number) {
        deleteClientMutation.mutate({ id });

        setModal(null);
    }

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
                onSearch={(e) => setSearch(e.target.value)}
                onClick={() => setModal({ type: 'create' })}
            />

            {/* Table */}
            <Table
                columns={columns}
                data={clients ?? []}
                isLoading={isLoading}
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
                client={modal?.type === 'delete' ? modal.client : null}
                isOpen={modal?.type === 'delete'}
                onClose={() => setModal(null)}
                onConfirm={handleDelete}
                isPending={deleteClientMutation.isPending}
            />
        </>
    );
}