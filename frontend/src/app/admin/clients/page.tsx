"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getClients } from "@/services/clientsService";
import { useToast } from "@/hooks/useToast";
import { TitlePage } from "@/components/dashboard/TitlePage";
import { Table } from "@/components/table/Table";
import { TableDeleteButton } from "@/components/table/TableDeteleButton";
import { TableEditButton } from "@/components/table/TableEditButton";
import { EditClientModal } from "@/components/client/EditClientModal";
import { ClientType } from "@/types/dashboard/Client.type";
import { useUpdateClient } from "@/hooks/useUpdateClient";

export default function ClientsPage() {
    const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const {
        data: clients,
        isLoading,
        error
    } = useQuery({
        queryKey: ['clients'],
        queryFn: getClients
    });

    if (error) console.log(error);

    const updateClientMutation = useUpdateClient();

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
    }

    const columns = [
        { header: '#', accessor: 'id' },
        { header: 'NOME', accessor: 'name' },
        { header: 'E-MAIL', accessor: 'email' },
        { header: 'TELEFONE', accessor: 'phone' },
        {
            header: 'AÇÕES',
            accessor: 'actions',
            render: (cliente: ClientType) => (
                <div className="flex gap-2 justify-center">
                    <TableEditButton
                        onClick={() => {
                            setSelectedClient(cliente);
                            setIsEditOpen(true);
                        }}
                    />

                    <TableDeleteButton
                        onClick={() => {
                            setSelectedClient(cliente);
                            setIsDeleteOpen(true);
                        }}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <TitlePage>Clientes</TitlePage>

            <Table
                columns={columns}
                data={clients ?? []}
            />

            <EditClientModal
                client={selectedClient}
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onConfirm={handleUpdate}
                isPending={updateClientMutation.isPending}
            />
        </>
    );
}