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
            render: (serviceOrder: ServiceOrdersType) => (
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
            header: 'TOTAL',
            accessor: 'total',
            format: "currency"
        },
        {
            header: 'DATA/HORA',
            accessor: 'createdAt',
            render: (serviceOrder) =>
                new Date(serviceOrder.createdAt).toLocaleString("pt-BR")
        },
        {
            header: 'AÇÕES',
            accessor: 'actions',
            render: (serviceOrder: ServiceOrdersType) => (
                <div className="flex justify-center gap-2">
                    {serviceOrder.status !== 'Finalizado' && (
                        <TableEditButton
                            onClick={() => onEdit(serviceOrder)}
                        />
                    )}

                    <TableDeleteButton
                        onClick={() => onDelete(serviceOrder)}
                    />
                </div>
            ),
        },
    ] satisfies Column<ServiceOrdersType>[]; // não muda o tipo real do array para string
}