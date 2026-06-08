import { useEffect, useRef, useState } from "react";
import {
    validateServiceOrderModal
} from "@/app/admin/service_orders/helpers/validateServiceOrderModal";
import {
    validateClientSelectedModal
} from "@/app/admin/service_orders/helpers/validateClientSelectedModal";
import {
    validateProductSelectedModal
} from "@/app/admin/service_orders/helpers/validateProductSelectedModal";
import {
    CreateServiceOrderModalProps
} from "@/types/modal/service_orders/CreateServiceOrderModalProps";
import { useClientsQuery } from "@/hooks/client/useClientsQuery";
import { useProductsQuery } from "@/hooks/products/useProductsQuery";
import { ClientType } from "@/types/dashboard/clients/Client.type";
import { Item } from "@/types/dashboard/service_orders/Item.type";

export function useCreateServiceOrderModalActions({
    isOpen,
    onClose,
    onConfirm
}: CreateServiceOrderModalProps) {
    const [search, setSearch] = useState<string>('');
    const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);

    const [step, setStep] = useState<'client' | 'serviceOrder'>('client');

    const [client, setClient] = useState<ClientType | null>(null);
    const [productId, setProductId] = useState<string>('');
    const [items, setItems] = useState<Item[]>([]);

    const [subtotal, setSubtotal] = useState<number>(0);
    const [quantityProduct, setQuantityProduct] = useState<number>(0);

    const [clientError, setClientError] = useState({ client: '' });
    const [productIdError, setProductIdError] = useState({ productId: '' });
    const [errors, setErrors] = useState({
        client: '',
        items: ''
    });

    const { data: clients } = useClientsQuery(
        search,
        1,
        search.length >= 2
    );

    const { data: products } = useProductsQuery('', 1);

    const clientInputRef = useRef<HTMLInputElement | null>(null);
    const productIdInputRef = useRef<HTMLSelectElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            setClient(null);
            setProductId('');
            setItems([]);
            setSearch('');
            setStep('client');
        }
    }, [isOpen]);

    useEffect(() => {
        if (items.length > 0) {
            handleTotals();
        }
    }, [items]);

    function handleAdvance() {
        const validationClientError = validateClientSelectedModal({
            client
        });

        setClientError(validationClientError);

        if (validationClientError.client) {
            clientInputRef.current?.focus();
            return;
        }

        setStep('serviceOrder');
    }

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

    function handleSave() {

    }

    function handleSubmit() {
        // const validationErrors = validateServiceOrderModal({
        //     client,
        //     items
        // });

        // setErrors(validationErrors);

        // if (validationErrors.items) {
        //     itemsInputRef.current?.focus();
        //     return;
        // }

        // onConfirm(
        //     client,
        //      items
        // );
    }

    function handleCloseClient() {
        resetFormClient();
        onClose();
    }

    function handleClose() {
        resetForm();
        onClose();
    }

    function resetFormClient() {
        setClient(null);
        setSearch('');
        setStep('client');

        setClientError({
            client: ''
        });
    }

    function resetForm() {
        setClient(null);
        setStep('client');
        setItems([]);

        setErrors({
            client: '',
            items: ''
        });
    }

    return {
        step,
        items,
        search,
        client,
        errors,
        clients,
        products,
        subtotal,
        productId,
        clientError,
        isOpenSearch,
        productIdError,
        clientInputRef,
        quantityProduct,
        productIdInputRef,

        setItems,
        setSearch,
        setClient,
        setErrors,
        setProductId,
        setClientError,
        setIsOpenSearch,
        setProductIdError,

        handleClose,
        handleSubmit,
        handleAdvance,
        handleAddProduct,
        handleCloseClient,
        handleChangeQuantity,
        handleRemoveProductList,
    };
}