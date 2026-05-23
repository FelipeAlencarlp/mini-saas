import { forwardRef } from "react";

interface InputProps {
    label: string;
    id: string;
    name: string;
    type?: string;
    value: string;
    placeholder: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({
    label,
    id,
    name,
    type = 'text',
    value,
    placeholder,
    error,
    onChange
}, ref) => {
    return (
        <div className="w-full flex flex-col gap-1 my-3">
            <label
                className="text-gray-800 text-md"
                htmlFor={id}
            >
                {label}
            </label>

            <input
                ref={ref}
                id={id}
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className={`
                    border border-gray-400 p-2 rounded h-11 text-gray-600
                    ${error
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-gray-300 focus:border-blue-500'
                    }
                `}
            />

            {error && (
                <span className="text-red-400 text-xs">
                    {error}
                </span>
            )}
        </div>
    );
});