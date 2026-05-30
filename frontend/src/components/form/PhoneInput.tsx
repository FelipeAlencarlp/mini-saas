import { forwardRef } from "react";
import { Input } from "./Input";

interface PhoneInputProps {
    label: string;
    bgLabel: string;
    id: string;
    name: string;
    value: string;
    error?: string;
    onChange: (value: string) => void;
}

export const PhoneInput = forwardRef<
    HTMLInputElement,
    PhoneInputProps
>(({
    label,
    bgLabel,
    id,
    name,
    value,
    error,
    onChange
}, ref) => {

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        let input = e.target.value;

        input = input.replace(/\D/g, '');
        input = input.replace(/(\d{2})(\d)/, "($1) $2");
        input = input.replace(/(\d{5})(\d)/, "$1-$2");

        onChange(input.slice(0, 15));
    }

    return (
        <Input
            ref={ref}
            label={label}
            bgLabel={bgLabel}
            id={id}
            name={name}
            value={value}
            error={error}
            onChange={handleChange}
        />
    );
});