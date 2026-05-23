import { ModalProps } from "@/types/modal/ModalProps.type";

export function Modal({
    isOpen,
    onClose,
    title,
    children
}: ModalProps) {
    return (
        <div
            onClick={onClose}
            className={`
                fixed inset-0 z-50
                flex items-center justify-center
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
                bg-gray-200 p-4 rounded border-3 w-90
                transform transition-all duration-300

                ${
                    isOpen
                        ? "translate-y-0 scale-100"
                        : "-translate-y-10 scale-95"
                }
            `}
        >
        <h3
            className="
                text-gray-600 text-2xl text-center
                font-bold mb-5 pb-4 border-b
            "
        >
            {title}
        </h3>

        {children}
        </div>
    </div>
    );
}