import { useEffect, useRef, useState } from "react";
import {
    validateProductSelectedModal
} from "@/app/admin/service_orders/helpers/validateProductSelectedModal";
import { ClientType } from "@/types/dashboard/clients/Client.type";
import {
    EditServiceOrderModalProps
} from "@/types/modal/service_orders/EditServiceOrderModalProps";
import { Item } from "@/types/dashboard/service_orders/Item.type";
import { useProductsQuery } from "@/hooks/products/useProductsQuery";
import { useClientsQuery } from "@/hooks/client/useClientsQuery";

export function useEditServiceOrderModalActions({
    serviceOrder,
    isOpen,
    onClose,
    onConfirm
}: EditServiceOrderModalProps) {
    const [id, setId] = useState<number>(0);
    const [client, setClient] = useState<ClientType | null>(null);
    const [productId, setProductId] = useState<string>('');
    const [items, setItems] = useState<Item[]>([]);

    const [subtotal, setSubtotal] = useState<number>(0);
    const [quantityProduct, setQuantityProduct] = useState<number>(0);

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

    function handleSubmit() {
        if (!client) return;

        onConfirm(
            id,
            items.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
            }))
        );
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
        products,
        subtotal,
        productId,
        productIdError,
        quantityProduct,
        productIdInputRef,

        setClient,
        setProductId,
        setProductIdError,

        handleClose,
        handleSubmit,
        handleAddProduct,
        handleChangeQuantity,
        handleRemoveProductList,
    };
}