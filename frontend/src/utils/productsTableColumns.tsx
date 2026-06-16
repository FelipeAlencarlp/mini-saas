import { TableButton } from "@/components/table/TableButton";
import { ProductProps } from "@/types/dashboard/product";
import { Column } from "@/types/table";

interface ProductsTableColumnsProps {
    onEdit: (product: ProductProps) => void;
    onDelete: (product: ProductProps) => void;
}

export function getProductsTableColumns({
    onEdit,
    onDelete
}: ProductsTableColumnsProps): Column<ProductProps>[] {
    return [
        { header: '#', accessor: 'id' },
        { header: 'NOME', accessor: 'name' },
        {
            header: 'PREÇO',
            accessor: 'price',
            format: "currency"
        },
        {
            header: 'QUANTIDADE',
            accessor: 'quantity',
            format: "number"
        },
        {
            header: 'CRIADO EM',
            accessor: 'createdAt',
            render: (product) =>
                new Date(product.createdAt ?? '').toLocaleString("pt-BR")
        },
        {
            header: 'ATUALIZADO EM',
            accessor: 'updatedAt',
            render: (product) =>
                new Date(product.updatedAt ?? '').toLocaleString("pt-BR")
        },
        {
            header: 'AÇÕES',
            accessor: 'actions',
            render: (product: ProductProps) => (
                <div className="flex justify-center gap-2">
                    <TableButton
                        title="Editar Produto"
                        type="edit"
                        onClick={() => onEdit(product)}
                    />

                    <TableButton
                        title="Deletar Produto"
                        type="delete"
                        onClick={() => onDelete(product)}
                    />
                </div>
            ),
        },
    ] satisfies Column<ProductProps>[]; // não muda o tipo real do array para string
}