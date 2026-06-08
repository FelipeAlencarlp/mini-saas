import { HiXMark } from 'react-icons/hi2';
import { ModalProps } from "@/types/modal/ModalProps.type";
import { Button } from '../form/Button';

export function ServiceOrderModal({
    children,
    isOpen,
    onClose,
    onClick,
    isPending,
    optionTitle,
    optionTitle2,
    items = []
}: ModalProps) {
    return (
        <div
            className={`
                fixed inset-0 z-50
                bg-black/50
                transition-all duration-300
                ${
                    isOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                }
            `}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                    absolute inset-10
                    flex flex-col
                    rounded-2xl
                    bg-gray-200
                    transform transition-all duration-300
                    ${
                        isOpen
                            ? "translate-y-0 scale-100"
                            : "-translate-y-4 scale-95"
                    }
                `}
            >
                <div className="
                    flex justify-end p-3
                    border-b border-gray-300
                ">
                    <button
                        className="text-gray-600 cursor-pointer"
                        title="Fechar"
                        onClick={onClose}
                    >
                        <HiXMark size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-auto px-6 pb-6">
                    {children}
                </div>

                {items?.length > 0 && (
                    <div className="
                        p-6 flex
                        flex-col
                        gap-2
                        md:flex-row
                        md:justify-center
                        border-t border-gray-300
                    ">
                        <Button
                            type="submit"
                            onClick={onClick}
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
                                ? `${optionTitle?.[0] ?? ""}`
                                : `${optionTitle?.[1] ?? ""}`
                            }
                        </Button>
                        
                        <Button
                            type="submit"
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
                                ? `${optionTitle2?.[0] ?? ""}`
                                : `${optionTitle2?.[1] ?? ""}`
                            }
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}