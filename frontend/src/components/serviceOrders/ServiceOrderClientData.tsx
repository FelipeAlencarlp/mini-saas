import { ClientType } from "@/types/dashboard/clients/Client.type";

export function ServiceOrderClientData({
    client
}: { client: ClientType | null }) {
    return (
        <>
            <p
                className="
                    mt-6 bg-gray-300 rounded-t-lg
                    w-full md:w-54 border-b border-gray-200
                    text-center text-xs pt-2 pb-1
                    text-gray-700 font-semibold
                "
            >
                DADOS DO CLIENTE
            </p>

            <div
                className="
                    w-full bg-gray-300
                    shadow-lg p-4 md:p-6
                    rounded-b-lg
                    md:rounded-lg
                    md:rounded-tl-none
                    flex flex-col md:flex-row
                    gap-3 md:gap-5
                    ss-start md:ss-center
                "
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
            </div>
        </>
    );
}