import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Button } from "../form/Button";

interface TableEditButtonProps {
    title: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function TableEditButton({ title, onClick }: TableEditButtonProps) {
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