import { ClientType } from "../dashboard/Client.type";

export type ModalType =
    | { type: 'create' }
    | { type: 'edit'; client: ClientType }
    | { type: 'delete'; client: ClientType }
    | null;