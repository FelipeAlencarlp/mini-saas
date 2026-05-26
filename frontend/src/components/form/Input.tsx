import { forwardRef } from "react";

interface InputProps {
    label: string;
    bgLabel: string;
    id: string;
    name: string;
    type?: string;
    value: string;
    placeholder?: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({
    label,
    bgLabel,
    id,
    name,
    type = 'text',
    value,
    placeholder,
    error,
    onChange
}, ref) => {
    return (
        <div className="relative mt-6">
            <input
                ref={ref}
                id={id}
                name={name}
                value={value}
                type={type}
                placeholder=" "
                onChange={onChange}
                className={`
                    peer block w-full rounded-md border
                    bg-transparent px-3 pb-2.5 pt-4 text-sm
                    text-gray-600 focus:outline-none focus:ring-0
                    ${error
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-400 focus:border-blue-600'
                    }
                `}
            />

            <label 
                htmlFor={id}
                className={`
                    absolute left-2 top-1 z-10
                    origin-[0] ${bgLabel} px-1
                    text-sm text-gray-500
                    duration-300 transform

                    peer-placeholder-shown:translate-y-2
                    peer-placeholder-shown:scale-100

                    peer-focus:-translate-y-2
                    peer-focus:scale-75
                    peer-focus:text-blue-600

                    peer-not-placeholder-shown:-translate-y-2
                    peer-not-placeholder-shown:scale-75
                `}
            >
                {label}
            </label>

            {error && (
                <span className="text-red-400 text-xs">
                    {error}
                </span>
            )}
        </div>
    );
});