import { HiXMark } from 'react-icons/hi2';
import { ModalProps } from "@/types/modal/modal";
import { Button } from '../form/Button';

export function Modal({
    children,
    isOpen,
    title,
    onClose,
    onClick,
    isPending,
    optionTitle
}: ModalProps) {
    return (
        <div
            onClick={onClose}
            className={`
                fixed inset-0 z-50
                flex items-center justify-center
                bg-black/50 transition-all duration-300

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
                    w-120 max-w-175 flex flex-col 
                    rounded-2xl bg-gray-200 p-6
                    transform transition-all duration-300

                    ${
                        isOpen
                            ? "translate-y-0 scale-100"
                            : "-translate-y-10 scale-95"
                    }
                `}
            >
                <div className="flex justify-end">
                    <button
                        className="text-gray-600 cursor-pointer"
                        onClick={onClose}
                    >
                        <HiXMark size={24} />
                    </button>
                </div>

                <h3
                    className={`
                        text-gray-600 text-2xl text-center
                        font-bold
                        ${title
                            ? "border-b pb-4"
                            : "border-b-0 pb-0"
                        }
                    `}
                >
                    {title}
                </h3>
                
                <div>
                    {children}
                </div>

                <Button
                    type="submit"
                    onClick={onClick}
                    disabled={isPending}
                    className="
                        w-full bg-blue-500 text-white p-2
                        mt-6 rounded hover:bg-blue-600
                        font-semibold
                    "
                >
                    {isPending
                        ? `${optionTitle?.[0] ?? ""}`
                        : `${optionTitle?.[1] ?? ""}`
                    }
                </Button>
            </div>
        </div>
    );
}