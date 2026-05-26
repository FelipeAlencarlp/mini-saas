import { ClientType } from "@/types/dashboard/Client.type";

export type DeleteModalProps = {
    client: ClientType | null;
    isOpen: boolean;
    isPending: boolean;
    onClose: () => void;
    onConfirm: (id: number) => void;
};