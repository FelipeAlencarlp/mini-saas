import {
    HiOutlineEye,
    HiOutlinePencilSquare,
    HiOutlineTrash
} from "react-icons/hi2";
import { Button } from "../form/Button";
import { TableButtonProps } from "@/types/table";

export function TableButton({
    title,
    type,
    onClick
}: TableButtonProps) {
    const typeClasses = {
        edit: 'bg-blue-500 hover:bg-blue-700',
        view: 'bg-yellow-400 hover:bg-yellow-500',
        delete: 'bg-red-500 hover:bg-red-600'
    };

    const typeIcons = {
        edit: <HiOutlinePencilSquare size={16} />,
        view: <HiOutlineEye size={16} />,
        delete: <HiOutlineTrash size={16} />
    };

    return (
        <Button
            title={title}
            onClick={onClick}
            className={`
                text-white px-3 py-1 rounded
                ${type ? typeClasses[type] : ''}
            `}
        >
            {type ? typeIcons[type] : null}
        </Button>
    );
}