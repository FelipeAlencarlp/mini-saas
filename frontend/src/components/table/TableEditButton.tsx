import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Button } from "../form/Button";
import { TableButtonProps } from "@/types/table";

export function TableEditButton({ title, onClick }: TableButtonProps) {
    return (
        <Button
            title={title}
            onClick={onClick}
            className="
                bg-blue-500 text-white px-3 py-1 rounded
                hover:bg-blue-700
            "
        >
            <HiOutlinePencilSquare size={16} />
        </Button>
    );
}