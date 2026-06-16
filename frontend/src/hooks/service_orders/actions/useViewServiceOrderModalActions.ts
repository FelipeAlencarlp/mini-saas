import { useEffect, useState } from "react";
import { ClientProps } from "@/types/dashboard/client";
import { ViewServiceOrderModalProps } from "@/types/modal/service_order";
import { ItemProps } from "@/types/dashboard/service_order";
import { useProductsQuery } from "@/hooks/products/useProductsQuery";
import { useClientsQuery } from "@/hooks/client/useClientsQuery";

export function useViewServiceOrderModalActions({
    serviceOrder,
    isOpen,
    onClose
}: ViewServiceOrderModalProps) {
    const [client, setClient] = useState<ClientProps | null>(null);
    const [items, setItems] = useState<ItemProps[]>([]);

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