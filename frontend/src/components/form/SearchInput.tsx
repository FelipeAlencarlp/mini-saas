import { Input } from "./Input";

type SearchResult = {
    id: number;
    name: string;
};

type SearchInputProps = {
    label: string;
    value: string;
    results: SearchResult[];
    error?: string;
    isOpen?: boolean;

    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;

    onSelect: (
        item: SearchResult
    ) => void;
};

export function SearchInput({
    label,
    value,
    results,
    error,
    isOpen,
    onChange,
    onSelect
}: SearchInputProps) {
    return (
        <div className="relative">
            <Input
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
}