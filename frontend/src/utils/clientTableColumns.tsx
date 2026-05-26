import { TableDeleteButton } from "@/components/table/TableDeteleButton";
import { TableEditButton } from "@/components/table/TableEditButton";
import { ClientType } from "@/types/dashboard/Client.type";

interface ClientTableColumnsProps {
    onEdit: (client: ClientType) => void;
    onDelete: (client: ClientType) => void;
}

export function getClientTableColumns({
    onEdit,
    onDelete
}: ClientTableColumnsProps) {
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
                        onClick={() => onEdit(client)}
                    />

                    <TableDeleteButton
                        onClick={() => onDelete(client)}
                    />
                </div>
            ),
        },
    ];
}