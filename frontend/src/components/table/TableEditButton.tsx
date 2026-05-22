import { HiOutlinePencilSquare } from "react-icons/hi2";

export function TableEditButton() {
    return (
        <button
            title="Editar"
            className="
                bg-blue-500 text-white px-3 py-1 rounded
                hover:bg-blue-700 cursor-pointer
            "
        >
            <HiOutlinePencilSquare size={16} />
        </button>
    );
}