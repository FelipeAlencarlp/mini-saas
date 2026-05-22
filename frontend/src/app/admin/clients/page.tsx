"use client";

import { useQuery } from "@tanstack/react-query";
import { TitlePage } from "@/components/dashboard/TitlePage";
import { Table } from "@/components/table/Table";
import { TableDeleteButton } from "@/components/table/TableDeteleButton";
import { TableEditButton } from "@/components/table/TableEditButton";
import { getClients } from "@/services/clientsService";

export default function ClientsPage() {
    const { data: clients, isLoading, error } = useQuery({
        queryKey: ['clients'],
        queryFn: getClients
    });

    if (error) console.log(error);

    const columns = [
        { header: '#', accessor: 'id' },
        { header: 'NOME', accessor: 'name' },
        { header: 'E-MAIL', accessor: 'email' },
        { header: 'TELEFONE', accessor: 'phone' },
        {
            header: 'AÇÕES',
            accessor: 'actions',
            render: (cliente: any) => (
                <div className="flex gap-2 justify-center">
                    <TableDeleteButton />
                    <TableEditButton />
                </div>
            ),
        },
    ];

    return (
        <>
            <TitlePage>Clientes</TitlePage>

            <Table columns={columns} data={clients ?? []}/>
        </>
    );
}