import { forwardRef } from "react";
import { Input } from "./Input";
import { SearchInputProps } from "@/types/form";

export const SearchInput = forwardRef<
    HTMLInputElement,
    SearchInputProps
>(({
    label,
    value,
    results,
    error,
    isOpen,
    onChange,
    onSelect
}, ref) => {
    return (
        <div className="relative">
            <Input
                ref={ref}
                label={label}
                bgLabel="bg-gray-200"
                id="search"
                name="search"
                type="search"
                autoComplete="off"
                value={value}
                error={error}
                onChange={onChange}
            />

            {isOpen &&
                value.trim().length >= 2 &&
                results.length > 0 && (
                <div
                    className="
                        absolute z-50
                        w-full mt-1
                        bg-gray-300
                        border border-gray-300
                        rounded-md shadow-lg
                        max-h-60 overflow-y-auto
                    "
                >
                    {results.map(item => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onSelect(item)}
                            className="
                                w-full px-3 py-2
                                text-left text-gray-700
                                border border-gray-200
                                hover:bg-gray-200
                                transition-colors
                            "
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
});