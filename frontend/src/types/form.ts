import { Dispatch, SetStateAction } from "react";

export interface ButtonProps {
    children: React.ReactNode;
    type?: ButtonType;
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className: string;
    disabled?: boolean;
    title?: string;
}

type ButtonType = 'button' | 'submit' | 'reset';

// Phone Input
export interface UsePhoneInputProps {
    setPhone: Dispatch<SetStateAction<string>>;
}

// SearchInput
interface SearchResult {
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