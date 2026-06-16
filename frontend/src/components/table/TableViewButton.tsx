import { HiOutlineEye  } from "react-icons/hi2";
import { Button } from "../form/Button";
import { TableButtonProps } from "@/types/table";

export function TableViewButton({
    title, onClick
}: TableButtonProps) {
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