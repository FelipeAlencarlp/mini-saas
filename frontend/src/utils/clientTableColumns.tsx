import { TableButton } from "@/components/table/TableButton";
import { ClientProps } from "@/types/dashboard/client";
import { Column } from "@/types/table";

interface ClientTableColumnsProps {
    onEdit: (client: ClientProps) => void;
    onDelete: (client: ClientProps) => void;
}

export function getClientTableColumns({
    onEdit,
    onDelete
}: ClientTableColumnsProps): Column<ClientProps>[] {
    return [
        { header: '#', accessor: 'id' },
        { header: 'NOME', accessor: 'name' },
        { header: 'E-MAIL', accessor: 'email' },
        { header: 'TELEFONE', accessor: 'phone' },
        {
            header: 'CRIADO EM',
            accessor: 'createdAt',
            render: (client) =>
                new Date(client.createdAt ?? '').toLocaleString("pt-BR")
        },
        {
            header: 'ATUALIZADO EM',
            accessor: 'updatedAt',
            render: (client) =>
                new Date(client.updatedAt?? '').toLocaleString("pt-BR")
        },
        {
            header: 'AÇÕES',
            accessor: 'actions',
            render: (client: ClientProps) => (
                <div className="flex justify-center gap-2">
                    <TableButton
                        title="Editar Cliente"
                        type="edit"
                        onClick={() => onEdit(client)}
                    />

                    <TableButton
                        title="Deletar Cliente"
                        type="delete"
                        onClick={() => onDelete(client)}
                    />
                </div>
            ),
        },
    ] satisfies Column<ClientProps>[]; // não muda o tipo real do array para string
}