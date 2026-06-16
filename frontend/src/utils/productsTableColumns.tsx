import { TableDeleteButton } from "@/components/table/TableDeteleButton";
import { TableEditButton } from "@/components/table/TableEditButton";
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
            header: 'AÇÕES',
            accessor: 'actions',
            render: (product: ProductProps) => (
                <div className="flex justify-center gap-2">
                    <TableEditButton
                        title="Editar Produto"
                        onClick={() => onEdit(product)}
                    />

                    <TableDeleteButton
                        title="Deletar Produto"
                        onClick={() => onDelete(product)}
                    />
                </div>
            ),
        },
    ] satisfies Column<ProductProps>[]; // não muda o tipo real do array para string
}