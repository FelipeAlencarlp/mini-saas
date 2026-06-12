import { BaseServiceOrderModalProps } from "@/types/modal/service_orders/BaseServiceOrderModalProps.type";
import { HiXMark } from "react-icons/hi2";

export function BaseServiceOrderModal({
    children,
    isOpen,
    onClose
}: BaseServiceOrderModalProps) {
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

                {children}
            </div>
        </div>
    );
}