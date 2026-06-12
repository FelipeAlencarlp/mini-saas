import { BaseServiceOrderModal } from './BaseServiceOrderModal';
import { Button } from '../form/Button';
import {
    ServiceOrderProps
} from '@/types/modal/service_orders/ServiceOrderProps.type';

export function ServiceOrderModal({
    children,
    items = [],
    isOpen,
    isPending,
    optionTitle,
    onClose,
    onClick
}: ServiceOrderProps) {
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
                    justify-center
                    border-t border-gray-300
                ">
                    <Button
                        type="submit"
                        onClick={onClick}
                        disabled={isPending}
                        className="
                            w-64
                            bg-green-500
                            text-white
                            p-2
                            rounded
                            hover:bg-green-600
                            font-semibold
                        "
                    >
                        {isPending
                            ? `${optionTitle?.[0] ?? ""}`
                            : `${optionTitle?.[1] ?? ""}`
                        }
                    </Button>
                </div>
            )}
        </BaseServiceOrderModal>
    );
}