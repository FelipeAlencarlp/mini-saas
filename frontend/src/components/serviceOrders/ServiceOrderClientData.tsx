import { BaseCardServiceOrder } from "./BaseCardServiceOrder";
import { ClientType } from "@/types/dashboard/clients/Client.type";

export function ServiceOrderClientData({
    client
}: { client: ClientType | null }) {
    return (
        <>
            <BaseCardServiceOrder
                titleP="DADOS DO CLIENTE"
                className="md:flex-row"
            >
                <p className="text-gray-400 font-semibold wrap-break-word">
                    NOME:{' '}
                    <span className="font-normal text-gray-500">
                        {client?.name}
                    </span>
                </p>


                {client?.phone && (
                    <>
                        <p className="hidden md:block text-gray-500">|</p>

                        <p className="
                            text-gray-400 font-semibold wrap-break-word
                        ">
                            TELEFONE:{' '}
                            <span className="font-normal text-gray-500">
                                {client.phone}
                            </span>
                        </p>
                    </>
                )}

                {client?.email && (
                    <>
                        <p className="hidden md:block text-gray-500">|</p>

                        <p className="text-gray-400 font-semibold break-all">
                            E-MAIL:{' '}
                            <span className="font-normal text-gray-500">
                                {client.email}
                            </span>
                        </p>
                    </>
                )}
            </BaseCardServiceOrder>
        </>
    );
}