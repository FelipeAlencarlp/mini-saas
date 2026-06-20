import { useEffect, useRef, useState } from "react";
import {
    validateProductSelectedModal
} from "@/app/admin/service_orders/helpers/validateProductSelectedModal";
import { ClientProps } from "@/types/dashboard/client";
import { ActionType, EditServiceOrderModalProps } from "@/types/modal/service_order";
import { ItemProps } from "@/types/dashboard/service_order";
import { useProductsQuery } from "@/hooks/products/useProductsQuery";
import { useClientsQuery } from "@/hooks/client/useClientsQuery";

export function useEditServiceOrderModalActions({
    serviceOrder,
    isOpen,
    onClose,
    onCancel,
    onConfirm,
    onFinish
}: EditServiceOrderModalProps) {
    const [id, setId] = useState<number>(0);
    const [client, setClient] = useState<ClientProps | null>(null);
    const [productId, setProductId] = useState<string>('');
    const [items, setItems] = useState<ItemProps[]>([]);

    const [subtotal, setSubtotal] = useState<number>(0);
    const [quantityProduct, setQuantityProduct] = useState<number>(0);

    const [action, setAction] = useState<ActionType>(null);

    const [productIdError, setProductIdError] = useState({ productId: '' });

    const { data: products } = useProductsQuery('', 1);
    const { data: clients } = useClientsQuery('', 1);

    const productIdInputRef = useRef<HTMLSelectElement | null>(null);

    useEffect(() => {
        if (isOpen && serviceOrder) {
            setProductId('');
            setId(serviceOrder.id);

            setClient(
                clients?.data.find(
                    client => client.id === serviceOrder.client.id
                ) ?? null
            );

            setItems(
                serviceOrder.items.map(item => ({
                    product: products?.data.find(
                        p => p.id === item.productId
                    )!,
                    quantity: item.quantity,
                    price: products?.data.find(
                        p => p.id === item.productId
                    )!.price!,
                }))
            );
        }
    }, [isOpen, serviceOrder]);

    useEffect(() => {
        if (items.length > 0) {
            handleTotals();
        }
    }, [items]);

    function handleAddProduct() {
        const validationProductIdError = validateProductSelectedModal({
            productId
        });

        setProductIdError(validationProductIdError);

        if (validationProductIdError.productId) {
            productIdInputRef.current?.focus();
            return;
        }

        const productAdded = products?.data.find(
            product => Number(productId) === product.id
        );

        if (!productAdded) return;

        setItems(prev => {
            const existingItem = prev.find(
                item => item.product.id === productAdded?.id
            );

            if (existingItem) {
                return prev.map(item =>
                    item.product.id === productAdded?.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                          }
                        : item
                );
            }

            return [
                ...prev,
                {
                    product: productAdded,
                    quantity: 1,
                    price: productAdded?.price
                }
            ];
        });

        setProductId('');
    }

    function handleChangeQuantity(
        productId: number,
        quantity: string
    ) {
        const quantityNumber = Number(quantity) || 1;

        setItems(prev =>
            prev.map(item =>
                item.product.id === productId
                    ? {
                        ...item,
                        quantity: quantityNumber
                    }
                    : item
            )
        );
    }

    function handleRemoveProductList(
        productId: number
    ) {
        setItems(prev =>
            prev.filter(item =>
                item.product.id !== productId
            )
        );
    }

    function handleTotals() {
        const totals = items.reduce((acc, item) => {
            acc.totalQuantity += item.quantity;
            acc.totalPrice += item.price * item.quantity;
            return acc;
        }, {totalQuantity: 0, totalPrice: 0});

        setSubtotal(totals.totalPrice);
        setQuantityProduct(totals.totalQuantity);
    }

    function handleCancelOrder() {
        onCancel(id);
    }

    function handleConfirm() {
        switch (action) {
            case 'cancel':
                handleCancelOrder?.();
                break;

            case 'update':
                handleUpdateOrder?.();
                break;

            case 'finish':
                handleFinishOrder?.();
                break;
        }

        setAction(null);
    }

    function handleUpdateOrder() {
        onConfirm(
            id,
            items.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
            }))
        );
    }

    function handleFinishOrder() {
        onFinish(id);
    }

    function handleClose() {
        resetForm();
        onClose();
    }

    function resetForm() {
        setClient(null);
        setItems([]);
    }

    return {
        items,
        client,
        action,
        products,
        subtotal,
        productId,
        productIdError,
        quantityProduct,
        productIdInputRef,

        setClient,
        setAction,
        setProductId,
        setProductIdError,

        handleClose,
        handleConfirm,
        handleAddProduct,
        handleChangeQuantity,
        handleRemoveProductList,
    };
}