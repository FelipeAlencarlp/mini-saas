import { TableDeleteButton } from "@/components/table/TableDeteleButton";
import { TableEditButton } from "@/components/table/TableEditButton";
import {
    ServiceOrdersType
} from "@/types/dashboard/service_orders/ServiceOrders.type";
import { Column } from "@/types/table/Column.type";

interface ServiceOrdersTableColumnsProps {
    onEdit: (serviceOrder: ServiceOrdersType) => void;
    onDelete: (serviceOrder: ServiceOrdersType) => void;
}

export function getServiceOrdersTableColumns({
    onEdit,
    onDelete
}: ServiceOrdersTableColumnsProps): Column<ServiceOrdersType>[] {
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
                    {serviceOrder.status === 'Iniciado'
                        ? (
                            <span className="bg-blue-500 px-2 py-1 rounded">
                                {serviceOrder.status.toUpperCase()}
                            </span>
                          )
                        : (
                            <span className="bg-red-500 px-2 py-1 rounded">
                                {serviceOrder.status.toUpperCase()}
                            </span>
                        )
                    }
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
                    {serviceOrder.status !== 'Finalizado' && (
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
    ] satisfies Column<ServiceOrdersType>[]; // não muda o tipo real do array para string
}