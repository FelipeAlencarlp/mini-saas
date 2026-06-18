import { TableButton } from "@/components/table/TableButton";
import { UserProps } from "@/types/dashboard/user";
import { Column } from "@/types/table";

interface UsersTableColumnsProps {
    onEdit: (user: UserProps) => void;
    onDelete: (user: UserProps) => void;
}

export function getUsersTableColumns({
    onEdit,
    onDelete
}: UsersTableColumnsProps): Column<UserProps>[] {
    return [
        { header: '#', accessor: 'id' },
        { header: 'NOME', accessor: 'name' },
        { header: 'E-MAIL', accessor: 'email' },
        {
            header: 'CRIADO EM',
            accessor: 'createdAt',
            render: (user) =>
                new Date(user.createdAt).toLocaleString("pt-BR")
        },
        {
            header: 'ATUALIZADO EM',
            accessor: 'updatedAt',
            render: (user) =>
                new Date(user.updatedAt).toLocaleString("pt-BR")
        },
        {
            header: 'AÇÕES',
            accessor: 'actions',
            render: (user: UserProps) => (
                <div className="flex justify-center gap-2">
                    <TableButton
                        title="Editar Usuário"
                        type="edit"
                        onClick={() => onEdit(user)}
                    />

                    <TableButton
                        title="Deletar Usuário"
                        type="delete"
                        onClick={() => onDelete(user)}
                    />
                </div>
            ),
        },
    ] satisfies Column<UserProps>[]; // não muda o tipo real do array para string
}