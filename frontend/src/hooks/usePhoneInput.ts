import { Dispatch, SetStateAction } from "react";

type UsePhoneInputProps = {
    phone: string;
    setPhone: Dispatch<SetStateAction<string>>;
};

export function usePhoneInput({
    phone,
    setPhone
}: UsePhoneInputProps) {

    function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
        let input = e.target.value;

        input = input.replace(/\D/g, '');
        input = input.replace(/(\d{2})(\d)/, "($1) $2");
        input = input.replace(/(\d{5})(\d)/, "$1-$2");

        setPhone(input.slice(0, 15));
    }

    return { handlePhone };
}