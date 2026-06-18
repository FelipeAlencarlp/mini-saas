import { Dispatch, SetStateAction } from "react";

export interface FormProps {
    children: React.ReactNode;
    id: string;
    title: string;
    isPending: boolean;
    titlesButton: string[] | '';
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

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

// Input
type InputMode =
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search';

export interface InputProps {
    label: string;
    bgLabel: string;
    id: string;
    name: string;
    type?: string;
    value: string | number;
    placeholder?: string;
    maxlength?: number;
    min?: number;
    prefix?: string;
    inputMode?: InputMode;
    autoComplete?: string;
    error?: string;
    className?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Phone Input
export interface PhoneInputProps {
    label: string;
    bgLabel: string;
    id: string;
    name: string;
    value: string;
    error?: string;
    onChange: (value: string) => void;
}

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

// PriceInput
export interface PriceInputProps {
    label: string;
    bgLabel: string;
    id: string;
    name: string;
    value: string;
    error?: string;
    onChange: (value: string) => void;
}

// Footer
export interface FooterFormProps {
    childrenP: React.ReactNode;
    href: string;
    titleLink: string;
    childrenLink: React.ReactNode;
}