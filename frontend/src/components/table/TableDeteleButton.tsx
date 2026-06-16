import { HiOutlineTrash } from "react-icons/hi2";
import { Button } from "../form/Button";
import { TableButtonProps } from "@/types/table";

export function TableDeleteButton({
    title, onClick
}: TableButtonProps) {
    return (
        <Button
            title={title}
            onClick={onClick}
            className="
                bg-red-500 text-white px-3 py-1 rounded
                hover:bg-red-600
            "
        >
            <HiOutlineTrash size={16} />
        </Button>
    );
}