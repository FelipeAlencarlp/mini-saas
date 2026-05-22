import { HiOutlineTrash } from "react-icons/hi2";

export function TableDeleteButton() {
    return (
        <button
            title="Deletar"
            className="
                bg-red-500 text-white px-3 py-1 rounded
                hover:bg-red-600 cursor-pointer
            "
        >
            <HiOutlineTrash size={16} />
        </button>
    );
}