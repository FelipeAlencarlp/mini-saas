import { TableDeleteButton } from "@/components/table/TableDeteleButton";
import { TableEditButton } from "@/components/table/TableEditButton";
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
            header: 'AÇÕES',
            accessor: 'actions',
            render: (client: ClientProps) => (
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
    ] satisfies Column<ClientProps>[]; // não muda o tipo real do array para string
}