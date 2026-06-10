import { TableDeleteButton } from "@/components/table/TableDeteleButton";
import { TableEditButton } from "@/components/table/TableEditButton";
import { ProductType } from "@/types/dashboard/products/Product.type";
import { Column } from "@/types/table/Column.type";

interface ProductsTableColumnsProps {
    onEdit: (product: ProductType) => void;
    onDelete: (product: ProductType) => void;
}

export function getProductsTableColumns({
    onEdit,
    onDelete
}: ProductsTableColumnsProps): Column<ProductType>[] {
    return [
        { header: '#', accessor: 'id' },
        { header: 'NOME', accessor: 'name' },
        {
            header: 'PREÇO R$',
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
            render: (product: ProductType) => (
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
    ] satisfies Column<ProductType>[]; // não muda o tipo real do array para string
}