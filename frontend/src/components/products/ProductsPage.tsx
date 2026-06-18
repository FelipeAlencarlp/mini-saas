"use client";

import { useMemo, useState } from "react";
import { CreateProductModal } from "@/components/products/CreateProductModal";
import { EditProductModal } from "@/components/products/EditProductModal";
import { DeleteModal } from "@/components/modal/DeleteModal";
import { PageTable } from "@/components/PageTable";
import { useToast } from "@/hooks/useToast";
import { useProductsActions } from "@/hooks/products/actions/useProductsActions";
import { useProductsQuery } from "@/hooks/products/useProductsQuery";
import { getProductsTableColumns } from "@/utils/productsTableColumns";
import { ModalProductsType } from "@/types/modal/product";

export default function ProductsPage() {
    const { showToast } = useToast();

    const [modal, setModal] = useState<ModalProductsType>(null);

    const {
        page,
        search,
        debouncedSearch,
        setSearch,
        handleCreate,
        handleUpdate,
        handleDelete,
        handlePageClick,
        createProductMutation,
        updateProductMutation,
        deleteProductMutation,
    } = useProductsActions({
        closeModal: () => setModal(null)
    });

    const {
        data: products,
        isLoading,
        isFetching,
        error
    } = useProductsQuery(debouncedSearch, page);

    if (error) {
        showToast('Erro ao carregar produtos', 'error');
    }

    const columns = useMemo(
        () => getProductsTableColumns({
            onEdit: (product) => {
                setModal({ type: 'edit', product });
            },

            onDelete: (product) => {
                setModal({ type: 'delete', product });
            }
        }), []
    );

    return (
        <>
            <PageTable
                titlePage="Produtos"
                isLoading={isLoading}
                isFetching={isFetching}
                search={search}
                columns={columns}
                data={products?.data ?? []}
                page={page}
                pageCount={products?.meta.lastPage ?? 0}
                label="Busque pelo nome"
                title="Cadastrar Novo Produto"
                descriptionButton="Adicionar"
                onSearch={(e) => setSearch(e.target.value)}
                onClick={() => setModal({ type: 'create' })}
                handlePageClick={handlePageClick}
            />

            {/* Modals */}
            <CreateProductModal
                isOpen={modal?.type === 'create'}
                onClose={() => setModal(null)}
                onConfirm={handleCreate}
                isPending={createProductMutation.isPending}
            />

            <EditProductModal
                product={modal?.type === 'edit' ? modal.product : null}
                isOpen={modal?.type === 'edit'}
                onClose={() => setModal(null)}
                onConfirm={handleUpdate}
                isPending={updateProductMutation.isPending}
            />

            <DeleteModal
                item={modal?.type === 'delete' ? modal.product : null}
                isOpen={modal?.type === 'delete'}
                onClose={() => setModal(null)}
                onConfirm={handleDelete}
                isPending={deleteProductMutation.isPending}
            />
        </>
    );
}