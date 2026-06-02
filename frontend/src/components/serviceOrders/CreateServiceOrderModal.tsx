import { ServiceOrderModal } from "../modal/ServiceOrderModal";
import { SearchInput } from "../form/SearchInput";
import { PriceInput } from "../form/PriceInput";
import {
    CreateServiceOrderModalProps
} from "@/types/modal/service_orders/CreateServiceOrderModalProps";
import {
    useCreateServiceOrderModalActions
} from "@/hooks/service_orders/actions/useCreateServiceOrderModalActions";

export function CreateServiceOrderModal({
    isOpen,
    onClose,
    onConfirm,
    isPending
}: CreateServiceOrderModalProps) {
    const {
        clients,
        search,
        isOpenSearch,
        errors,
        setErrors,
        setSearch,
        setClientId,
        setIsOpenSearch,
        handleSubmit,
        handleClose
    } = useCreateServiceOrderModalActions({
        isOpen,
        onClose,
        onConfirm
    });

    return (
        <ServiceOrderModal
            title="Criar Ordem"
            isOpen={isOpen}
            onClose={handleClose}
            onClick={handleSubmit}
            isPending={isPending}
            optionTitle={['Criando...', 'Criar']}
        >
            <SearchInput
                label="Buscar cliente"
                value={search}
                results={clients?.data ?? []}
                isOpen={isOpenSearch}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setIsOpenSearch(true);
                }}
                onSelect={(client) => {
                    setClientId(client.id);
                    setSearch(client.name);
                    setIsOpenSearch(false);
                    console.log(client.id);
                }}
            />
        </ServiceOrderModal>
    );
}