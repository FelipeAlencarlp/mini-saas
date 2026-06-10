import { HiOutlineTrash } from "react-icons/hi2";
import { Button } from "../form/Button";

interface TableEditButtonProps {
    title: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function TableDeleteButton({ title, onClick }: TableEditButtonProps) {
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