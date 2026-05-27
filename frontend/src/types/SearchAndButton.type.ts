export type SearchAndButton = {
    label: string;
    title?: string;
    descriptionButton?: string;
    search: string;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};