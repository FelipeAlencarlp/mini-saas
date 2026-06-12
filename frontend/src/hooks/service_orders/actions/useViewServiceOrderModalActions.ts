import { useEffect, useRef, useState } from "react";
import {
    validateProductSelectedModal
} from "@/app/admin/service_orders/helpers/validateProductSelectedModal";
import { ClientType } from "@/types/dashboard/clients/Client.type";
import {
    ViewServiceOrderModalProps
} from "@/types/modal/service_orders/ViewServiceOrderModalProps";
import { Item } from "@/types/dashboard/service_orders/Item.type";
import { useProductsQuery } from "@/hooks/products/useProductsQuery";
import { useClientsQuery } from "@/hooks/client/useClientsQuery";

export function useViewServiceOrderModalActions({
    serviceOrder,
    isOpen,
    onClose
}: ViewServiceOrderModalProps) {
    const [client, setClient] = useState<ClientType | null>(null);
    const [items, setItems] = useState<Item[]>([]);

    const [subtotal, setSubtotal] = useState<number>(0);
    const [quantityProduct, setQuantityProduct] = useState<number>(0);

    const { data: products } = useProductsQuery('', 1);
    const { data: clients } = useClientsQuery('', 1);

    useEffect(() => {
        if (isOpen && serviceOrder) {
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

    function handleTotals() {
        const totals = items.reduce((acc, item) => {
            acc.totalQuantity += item.quantity;
            acc.totalPrice += item.price * item.quantity;
            return acc;
        }, {totalQuantity: 0, totalPrice: 0});

        setSubtotal(totals.totalPrice);
        setQuantityProduct(totals.totalQuantity);
    }

    function handleClose() {
        setClient(null);
        setItems([]);
        onClose();
    }

    return {
        items,
        client,
        subtotal,
        quantityProduct,
        handleClose
    };
}