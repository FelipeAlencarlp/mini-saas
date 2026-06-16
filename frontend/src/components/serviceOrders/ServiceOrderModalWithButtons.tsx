import { BaseServiceOrderModal } from './BaseServiceOrderModal';
import { Button } from '../form/Button';
import {
    ServiceOrderModalWithButtonsProps,
    ActionType
} from '@/types/modal/service_order';
import { ConfirmActionModal } from '../modal/ConfirmActionModal';

export function ServiceOrderModalWithButtons({
    children,
    items = [],
    isOpen,
    action,
    optionTitle,
    optionTitle1,
    optionTitle2,
    isCancelPending,
    isUpdatePending,
    isFinishPending,
    setAction,
    onClose,
    onConfirm
}: ServiceOrderModalWithButtonsProps) {
    const modalConfig = {
        cancel: {
            title: 'Cancelar Ordem',
            description:
                'Tem certeza que deseja cancelar esta ordem de serviço?',
            confirmText: 'Cancelar Ordem'
        },

        update: {
            title: 'Atualizar Ordem',
            description:
                'Deseja realmente atualizar esta ordem de serviço?',
            confirmText: 'Atualizar Ordem'
        },

        finish: {
            title: 'Finalizar Ordem',
            description:
                'Tem certeza que deseja finalizar esta ordem de serviço?',
            confirmText: 'Finalizar Ordem'
        }
    };

    return (
        <>
            <BaseServiceOrderModal
                isOpen={isOpen}
                onClose={onClose}
            >
                <div className="flex-1 overflow-auto px-6 pb-6">
                    {children}
                </div>

                {items?.length > 0 && (
                    <div className="
                        p-6 flex
                        md:justify-around
                        justify-center
                        gap-2
                        border-t border-gray-300
                    ">
                        <Button
                            type="submit"
                            onClick={() => setAction('cancel')}
                            disabled={isCancelPending}
                            className="
                                w-64
                                bg-gray-500
                                text-white
                                p-2
                                rounded
                                hover:bg-gray-600
                                font-semibold
                            "
                        >
                            {isCancelPending
                                ? `${optionTitle?.[0] ?? ""}`
                                : `${optionTitle?.[1] ?? ""}`
                            }
                        </Button>

                        <Button
                            type="submit"
                            onClick={() => setAction('update')}
                            disabled={isUpdatePending}
                            className="
                                w-64
                                bg-blue-500
                                text-white
                                p-2
                                rounded
                                hover:bg-blue-600
                                font-semibold
                            "
                        >
                            {isUpdatePending
                                ? `${optionTitle1?.[0] ?? ""}`
                                : `${optionTitle1?.[1] ?? ""}`
                            }
                        </Button>

                        <Button
                            type="submit"
                            onClick={() => setAction('finish')}
                            disabled={isFinishPending}
                            className="
                                w-64
                                bg-orange-500
                                text-white
                                p-2
                                rounded
                                hover:bg-orange-600
                                font-semibold
                            "
                        >
                            {isFinishPending
                                ? `${optionTitle2?.[0] ?? ""}`
                                : `${optionTitle2?.[1] ?? ""}`
                            }
                        </Button>
                    </div>
                )}
            </BaseServiceOrderModal>

            <ConfirmActionModal
                isOpen={!!action}
                onClose={() => setAction(null)}
                onConfirm={onConfirm}
                title="Atenção"
                description={action ? modalConfig[action].description : ''}
                confirmText="Confirmar"
            />
        </>
    );
}