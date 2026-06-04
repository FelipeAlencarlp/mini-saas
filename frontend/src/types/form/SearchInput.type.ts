type SearchResult = {
    id: number;
    name: string;
};

export type SearchInputProps = {
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