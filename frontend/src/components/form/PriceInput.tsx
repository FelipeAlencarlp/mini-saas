import { forwardRef } from "react";
import { Input } from "./Input";

interface PriceInputProps {
    label: string;
    bgLabel: string;
    id: string;
    name: string;
    value: string;
    error?: string;
    onChange: (value: string) => void;
}

export const PriceInput = forwardRef<
    HTMLInputElement,
    PriceInputProps
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

        input = (Number(input) / 100).toLocaleString(
            'pt-BR',
            {
                minimumFractionDigits: 2
            }
        );

        onChange(input);
    }

    return (
        <Input
            ref={ref}
            prefix="R$"
            label={label}
            bgLabel={bgLabel}
            id={id}
            name={name}
            value={value}
            inputMode="decimal"
            error={error}
            onChange={handleChange}
            className="pl-10"
        />
    );
});