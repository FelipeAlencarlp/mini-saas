import { ClientType } from "@/types/dashboard/clients/Client.type";

export type ModalClientType =
    | { type: 'create' }
    | { type: 'edit'; client: ClientType }
    | { type: 'delete'; client: ClientType }
    | null;