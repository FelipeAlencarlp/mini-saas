import { HiOutlinePlus } from "react-icons/hi2";
import { Input } from "./form/Input";
import { Button } from "./form/Button";
import { SearchAndButton } from "@/types/SearchAndButton.type";

export function SearchAndButtonHeaderPage({
    label,
    title,
    descriptionButton,
    search,
    onSearch,
    onClick
}: SearchAndButton) {
    return (
        <div className="
            flex flex-col gap-4
            md:flex-row md:items-center md:justify-between
        ">
            <div className="md:w-80 w-full">
                <Input
                    label={label}
                    bgLabel="bg-gray-200"
                    id="search-client-input"
                    name="search"
                    type="search"
                    value={search}
                    onChange={onSearch}
                />
            </div>
            
            <Button
                Icon={HiOutlinePlus}
                title={title}
                onClick={onClick}
                className="
                    flex flex-row items-center justify-center
                    gap-2 bg-green-500 px-4 py-2 text-white
                    rounded hover:bg-green-600

                    md:mt-5 md:w-auto
                "
            >
                {descriptionButton}
            </Button>
        </div>
    );
}