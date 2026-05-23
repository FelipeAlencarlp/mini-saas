import { HiOutlinePencilSquare } from "react-icons/hi2";

interface TableEditButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function TableEditButton({ onClick }: TableEditButtonProps) {
    return (
        <button
            title="Editar"
            onClick={onClick}
            className="
                bg-blue-500 text-white px-3 py-1 rounded
                hover:bg-blue-700 cursor-pointer
            "
        >
            <HiOutlinePencilSquare size={16} />
        </button>
    );
}