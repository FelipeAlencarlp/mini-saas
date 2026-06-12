import { HiOutlineEye  } from "react-icons/hi2";
import { Button } from "../form/Button";

interface TableViewButtonProps {
    title: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function TableViewButton({ title, onClick }: TableViewButtonProps) {
    return (
        <Button
            title={title}
            onClick={onClick}
            className="
                bg-yellow-400 text-white px-3 py-1 rounded
                hover:bg-yellow-500
            "
        >
            <HiOutlineEye size={16} />
        </Button>
    );
}