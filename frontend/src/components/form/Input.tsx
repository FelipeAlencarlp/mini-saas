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

export function Input({
    label,
    id,
    name,
    type = 'text',
    value,
    placeholder,
    error,
    onChange
}: InputProps) {
    return (
        <div className="w-full flex flex-col gap-2 my-3">
            <label
                className="text-gray-800 text-xl"
                htmlFor={id}
            >
                {label}
            </label>

            <input
                id={id}
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className="border p-2 rounded h-11 text-gray-600"
            />

            {error && (
                <span className="text-red-400 text-xs">
                    {error}
                </span>
            )}
        </div>
    );
}