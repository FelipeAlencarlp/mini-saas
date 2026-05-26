import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Button } from "../form/Button";

interface TableEditButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function TableEditButton({ onClick }: TableEditButtonProps) {
    return (
        <Button
            title="Editar Cliente"
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