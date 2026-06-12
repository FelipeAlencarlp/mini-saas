import { BaseServiceOrderModal } from './BaseServiceOrderModal';
import { Button } from '../form/Button';
import {
    ServiceOrderModalWithButtonsProps
} from '@/types/modal/service_orders/ServiceOrderModalWithButtonsProps';

export function ServiceOrderModalWithButtons({
    children,
    items = [],
    isOpen,
    isPending,
    optionTitle,
    optionTitle1,
    optionTitle2,
    onClose,
    onCancelOrder,
    onUpdateOrder,
    onFinishOrder
}: ServiceOrderModalWithButtonsProps) {
    return (
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
                        onClick={onCancelOrder}
                        disabled={isPending}
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
                        {isPending
                            ? `${optionTitle?.[0] ?? ""}`
                            : `${optionTitle?.[1] ?? ""}`
                        }
                    </Button>

                    <Button
                        type="submit"
                        onClick={onUpdateOrder}
                        disabled={isPending}
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
                        {isPending
                            ? `${optionTitle1?.[0] ?? ""}`
                            : `${optionTitle1?.[1] ?? ""}`
                        }
                    </Button>

                    <Button
                        type="submit"
                        onClick={onFinishOrder}
                        disabled={isPending}
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
                        {isPending
                            ? `${optionTitle2?.[0] ?? ""}`
                            : `${optionTitle2?.[1] ?? ""}`
                        }
                    </Button>
                </div>
            )}
        </BaseServiceOrderModal>
    );
}