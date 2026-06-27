import { Button } from "./Button";
import { FormProps } from "@/types/form";

export function Form({
    children,
    id,
    title,
    isPending,
    titlesButton,
    Icon,
    onSubmit
}: FormProps) {
    return (
        <div
            className="
                flex flex-col items-center justify-center
                py-6 bg-white w-11/12 max-w-175 rounded-2xl
            "
        >
            <div className="flex justify-center">
                <p className="
                    bg-linear-to-r from-gray-300 to-blue-600
                    bg-clip-text text-transparent
                    font-semibold text-5xl mb-6
                ">Mini SaaS</p>
            </div>
            <form
                id={id}
                onSubmit={onSubmit}
                className="
                    flex flex-col w-11/12 max-w-125
                "
            >
                <h2
                    className="
                        text-3xl text-gray-800 text-center
                        font-black my-2
                    "
                >
                    {title}
                </h2>
                
                {children}

                <Button
                    type="submit"
                    Icon={Icon}
                    disabled={isPending}
                    className="
                        bg-gray-800 w-full my-6 text-white
                        p-3 hover:bg-gray-700 rounded-md
                        items-center justify-center flex gap-3
                    "
                >
                    {isPending
                        ? `${titlesButton?.[0] ?? ""}`
                        : `${titlesButton?.[1] ?? ""}`
                    }
                </Button>
            </form>
        </div>
    );
}