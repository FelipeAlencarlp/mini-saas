import { HiOutlineTrash } from "react-icons/hi2";

interface TableEditButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function TableDeleteButton({ onClick }: TableEditButtonProps) {
    return (
        <button
            title="Deletar"
            onClick={onClick}
            className="
                bg-red-500 text-white px-3 py-1 rounded
                hover:bg-red-600 cursor-pointer
            "
        >
            <HiOutlineTrash size={16} />
        </button>
    );
}