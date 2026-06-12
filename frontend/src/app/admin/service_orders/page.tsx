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
import { EditServiceOrderModal } from "@/components/serviceOrders/EditServiceOrderModal";
import { ViewServiceOrderModal } from "@/components/serviceOrders/ViewServiceOrderModal";

export default function ServiceOrdersPage() {
    const { showToast } = useToast();
    
    const [modal, setModal] = useState<ModalServiceOrdersType>(null);

    const {
        page,
        search,
        debouncedSearch,
        setSearch,
        handleCreate,
        handleCancel,
        handleUpdate,
        handleFinish,
        handleDelete,
        handlePageClick,
        createServiceOrderMutation,
        updateServiceOrderMutation,
        deleteServiceOrderMutation,
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
        showToast('Erro ao carregar ordens de serviço', 'error');
    }

    const columns = useMemo(
        () => getServiceOrdersTableColumns({
            onView: (serviceOrder) => {
                setModal({ type: 'view', serviceOrder });
            },

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

            <EditServiceOrderModal
                serviceOrder={modal?.type === 'edit' ? modal.serviceOrder : null}
                isOpen={modal?.type === 'edit'}
                onClose={() => setModal(null)}
                onCancel={handleCancel}
                onConfirm={handleUpdate}
                onFinish={handleFinish}
                isPending={updateServiceOrderMutation.isPending}
            />

            <ViewServiceOrderModal
                serviceOrder={modal?.type === 'view' ? modal.serviceOrder : null}
                isOpen={modal?.type === 'view'}
                onClose={() => setModal(null)}
            />

            <DeleteModal
                item={modal?.type === 'delete' ? modal.serviceOrder : null}
                isOpen={modal?.type === 'delete'}
                onClose={() => setModal(null)}
                onConfirm={handleDelete}
                isPending={deleteServiceOrderMutation.isPending}
            />
        </>
    );
}