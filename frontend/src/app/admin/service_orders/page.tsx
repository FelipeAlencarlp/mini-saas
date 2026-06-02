"use client";

import { useMemo, useState } from "react";
import { PageTable } from "@/components/PageTable";
import { DeleteModal } from "@/components/modal/DeleteModal";
import {
    CreateServiceOrderModal
} from "@/components/serviceOrders/CreateServiceOrderModal";
import { useToast } from "@/hooks/useToast";
import {
    useServiceOrdersQuery
} from "@/hooks/service_orders/useServiceOrdersQuery";
import {
    useServiceOrdersActions
} from "@/hooks/service_orders/actions/useServiceOrdersActions";
import {
    ModalServiceOrdersType
} from "@/types/modal/service_orders/ModalServiceOrders.type";
import { getServiceOrdersTableColumns } from "@/utils/serviceOrdersTableColumns";

export default function ServiceOrdersPage() {
    const { showToast } = useToast();
    
    const [modal, setModal] = useState<ModalServiceOrdersType>(null);

    const {
        page,
        search,
        debouncedSearch,
        setSearch,
        handleCreate,
        // handleUpdate,
        handleDelete,
        handlePageClick,
        createServiceOrderMutation,
        // updateProductMutation,
        deleteOrderServiceMutation,
    } = useServiceOrdersActions({
        closeModal: () => setModal(null)
    });

    const {
        data: serviceOrders,
        isLoading,
        isFetching,
        error
    } = useServiceOrdersQuery(debouncedSearch, page);

    if (error) {
        showToast('Erro ao carregar produtos', 'error');
    }

    const columns = useMemo(
        () => getServiceOrdersTableColumns({
            onEdit: (serviceOrder) => {
                setModal({ type: 'edit', serviceOrder });
            },

            onDelete: (serviceOrder) => {
                setModal({ type: 'delete', serviceOrder });
            }
        }), []
    );

    return (
        <>
            <PageTable
                titlePage="Ordens de Serviço"
                isLoading={isLoading}
                isFetching={isFetching}
                search={search}
                columns={columns}
                data={serviceOrders?.data ?? []}
                page={page}
                pageCount={serviceOrders?.meta.lastPage ?? 0}
                label="Busque pelo cliente"
                title="Criar Nova Ordem"
                descriptionButton="Criar"
                onSearch={(e) => setSearch(e.target.value)}
                onClick={() => setModal({ type: 'create' })}
                handlePageClick={handlePageClick}
            />

            {/* Modals */}
            <CreateServiceOrderModal
                isOpen={modal?.type === 'create'}
                onClose={() => setModal(null)}
                onConfirm={handleCreate}
                isPending={createServiceOrderMutation.isPending}
            />

            <DeleteModal
                item={modal?.type === 'delete' ? modal.serviceOrder : null}
                isOpen={modal?.type === 'delete'}
                onClose={() => setModal(null)}
                onConfirm={handleDelete}
                isPending={deleteOrderServiceMutation.isPending}
            />
        </>
    );
}