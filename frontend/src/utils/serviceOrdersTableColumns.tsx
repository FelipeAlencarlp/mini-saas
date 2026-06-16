import { TableDeleteButton } from "@/components/table/TableDeteleButton";
import { TableEditButton } from "@/components/table/TableEditButton";
import { TableViewButton } from "@/components/table/TableViewButton";
import { ServiceOrdersProps } from "@/types/dashboard/service_order";
import { Column } from "@/types/table";

interface ServiceOrdersTableColumnsProps {
    onView: (serviceOrder: ServiceOrdersProps) => void;
    onEdit: (serviceOrder: ServiceOrdersProps) => void;
    onDelete: (serviceOrder: ServiceOrdersProps) => void;
}

export function getServiceOrdersTableColumns({
    onView,
    onEdit,
    onDelete
}: ServiceOrdersTableColumnsProps): Column<ServiceOrdersProps>[] {
    return [
        { header: '#', accessor: 'id' },
        {
            header: 'USUÁRIO',
            accessor: 'user',
            render: (serviceOrder) => serviceOrder.user.name
        },
        {
            header: 'CLIENTE',
            accessor: 'client',
            render: (serviceOrder) => serviceOrder.client.name
        },
        {
            header: 'STATUS',
            accessor: 'status',
            render: (serviceOrder) => (
                <div className="w-full text-white text-xs">
                    <span
                        className={`
                            ${
                                {
                                    Iniciado: "bg-blue-500",
                                    Finalizado: "bg-orange-500",
                                    Cancelado: "bg-gray-500",
                                }[serviceOrder.status] || ""
                            }
                            px-2 py-1 rounded
                        `}
                    >
                        {serviceOrder.status.toUpperCase()}
                    </span>
                </div>
            ),
        },
        {
            header: 'TOTAL ITEMS',
            accessor: 'totalProducts',
            render: (serviceOrder) =>
                serviceOrder.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                )
        },
        {
            header: 'VALOR TOTAL',
            accessor: 'total',
            format: "currency"
        },
        {
            header: 'CRIADO EM',
            accessor: 'createdAt',
            render: (serviceOrder) =>
                new Date(serviceOrder.createdAt).toLocaleString("pt-BR")
        },
        {
            header: 'ATUALIZADO EM',
            accessor: 'updatedAt',
            render: (serviceOrder) =>
                new Date(serviceOrder.updatedAt).toLocaleString("pt-BR")
        },
        {
            header: 'AÇÕES',
            accessor: 'actions',
            render: (serviceOrder) => (
                <div className="flex justify-center gap-2">
                    {serviceOrder.status !== 'Cancelado' && (
                        <TableViewButton
                            title="Visualizar Ordem"
                            onClick={() => onView(serviceOrder)}
                        />
                    )}

                    {serviceOrder.status === 'Iniciado' && (
                        <TableEditButton
                            title="Editar Ordem"
                            onClick={() => onEdit(serviceOrder)}
                        />
                    )}

                    <TableDeleteButton
                        title="Deletar Ordem"
                        onClick={() => onDelete(serviceOrder)}
                    />
                </div>
            ),
        },
    ] satisfies Column<ServiceOrdersProps>[]; // não muda o tipo real do array para string
}