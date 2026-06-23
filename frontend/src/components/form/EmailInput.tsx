import { forwardRef } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useCheckEmail } from "@/hooks/users/useUserQuery";
import { EmailInputProps } from "@/types/form";

export const EmailInput = forwardRef<
    HTMLInputElement,
    EmailInputProps
>(({ value, onChange }, ref) => {
    const debouncedEmail = useDebounce(value, 500);

    const {
        emailExists,
        isLoading
    } = useCheckEmail(debouncedEmail);

    const isAvailable =
        debouncedEmail &&
        !isLoading &&
        !emailExists;

    const invalidEmail =
        value.length > 0 &&
        !/\S+@\S+\.\S+/.test(value);

    return (
        <>
            <div className="relative mt-6">
                <input
                    ref={ref}
                    id="email"
                    value={value}
                    placeholder=" "
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    className={`
                        peer block w-full rounded-md border
                        bg-transparent px-3 pb-2.5 pt-4 text-sm
                        text-gray-600 focus:outline-none focus:ring-0
                        ${
                            isAvailable
                                ? "border-green-500 focus:border-green-600"
                                : ""
                        }
                        ${
                            emailExists || invalidEmail
                                ? "border-red-500 focus:border-red-600"
                                : "border-gray-400 focus:border-blue-600"
                        }
                    `}
                />

                <label 
                    htmlFor="email"
                    className={`
                        absolute left-2 top-1 z-10
                        origin-left bg-gray-200 px-1
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
                    E-mail
                </label>
            </div>

            {isLoading && (
                <span className="text-blue-600 text-xs mt-1">
                    Verificando...
                </span>
            )}

            {emailExists && (
                <span className="text-red-400 text-xs mt-1">
                    E-mail já está em uso
                </span>
            )}

            {invalidEmail && !isLoading && (
                <span className="text-red-400 text-xs mt-1">
                    E-mail inválido
                </span>
            )}
        </>
    );
});