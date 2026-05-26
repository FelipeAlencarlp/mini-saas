"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HiOutlinePlus } from "react-icons/hi2";
import { getClients } from "@/services/clientsService";
import { TitlePage } from "@/components/dashboard/TitlePage";
import { Table } from "@/components/table/Table";
import { EditClientModal } from "@/components/client/EditClientModal";
import { CreateClientModal } from "@/components/client/CreateClientModal";
import { DeleteModal } from "@/components/modal/DeleteModal";
import { Button } from "@/components/form/Button";
import { ClientType } from "@/types/dashboard/Client.type";
import { useUpdateClient } from "@/hooks/client/useUpdateClient";
import { useCreateClient } from "@/hooks/client/useCreateClient";
import { useDeleteClient } from "@/hooks/client/useDeleteClient";
import { getClientTableColumns } from "@/utils/clientTableColumns";

export default function ClientsPage() {
    const [selectedClient, setSelectedClient] =
        useState<ClientType | null>(null);

    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

    const {
        data: clients,
        isLoading,
        error
    } = useQuery({
        queryKey: ['clients'],
        queryFn: getClients
    });

    if (error) console.log(error);

    const columns = getClientTableColumns({
        onEdit: (client) => {
            setSelectedClient(client);
            setIsEditOpen(true);
        },

        onDelete: (client) => {
            setSelectedClient(client);
            setIsDeleteOpen(true);
        }
    });

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

        setIsCreateOpen(false);
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

        setIsEditOpen(false);
    }

    function handleDelete(id: number) {
        deleteClientMutation.mutate({ id });

        setIsDeleteOpen(false);
    }

    return (
        <>
            {/* Header */}
            <TitlePage isLoading={isLoading}>
                Clientes
            </TitlePage>

            {/* Button and Search */}
            {!isLoading &&
                <div className="flex justify-end">
                    <Button
                        Icon={HiOutlinePlus}
                        title="Cadastrar novo cliente"
                        onClick={() => setIsCreateOpen(true)}
                        className="
                            bg-green-500 text-white px-3
                            py-1 rounded hover:bg-green-600
                            mt-5 flex gap-2 items-center
                        "
                    >
                        Novo Cliente
                    </Button>
                </div>
            }

            {/* Table */}
            <Table
                columns={columns}
                data={clients ?? []}
                isLoading={isLoading}
            />

            {/* Modals */}
            <CreateClientModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onConfirm={handleCreate}
                isPending={updateClientMutation.isPending}
            />

            <EditClientModal
                client={selectedClient}
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onConfirm={handleUpdate}
                isPending={updateClientMutation.isPending}
            />

            <DeleteModal
                client={selectedClient}
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                isPending={deleteClientMutation.isPending}
            />
        </>
    );
}