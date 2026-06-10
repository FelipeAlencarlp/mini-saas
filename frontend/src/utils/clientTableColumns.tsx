import { TableDeleteButton } from "@/components/table/TableDeteleButton";
import { TableEditButton } from "@/components/table/TableEditButton";
import { ClientType } from "@/types/dashboard/clients/Client.type";
import { Column } from "@/types/table/Column.type";

interface ClientTableColumnsProps {
    onEdit: (client: ClientType) => void;
    onDelete: (client: ClientType) => void;
}

export function getClientTableColumns({
    onEdit,
    onDelete
}: ClientTableColumnsProps): Column<ClientType>[] {
    return [
        { header: '#', accessor: 'id' },
        { header: 'NOME', accessor: 'name' },
        { header: 'E-MAIL', accessor: 'email' },
        { header: 'TELEFONE', accessor: 'phone' },
        {
            header: 'AÇÕES',
            accessor: 'actions',
            render: (client: ClientType) => (
                <div className="flex justify-center gap-2">
                    <TableEditButton
                        title="Editar Cliente"
                        onClick={() => onEdit(client)}
                    />

                    <TableDeleteButton
                        title="Deletar Cliente"
                        onClick={() => onDelete(client)}
                    />
                </div>
            ),
        },
    ] satisfies Column<ClientType>[]; // não muda o tipo real do array para string
}