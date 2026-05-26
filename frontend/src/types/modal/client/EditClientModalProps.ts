import { ClientType } from "../../dashboard/Client.type";

export type EditModalProps = {
    client: ClientType | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
        id: number,
        name: string,
        email: string,
        phone: string
    ) => void;
    isPending?: boolean;
};