import Link from "next/link";
import { FooterForm } from "../user/FooterForm";
import { Button } from "./Button";

interface FormProps {
    children: React.ReactNode;
    id: string;
    title: string;
    isPending: boolean;
    titlesButton: string[] | '';
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;

    childrenP: React.ReactNode;
    href: string;
    titleLink: string;
    childrenLink: React.ReactNode;
}

export function Form({
    children,
    id,
    title,
    isPending,
    titlesButton,
    Icon,
    childrenP,
    href,
    titleLink,
    childrenLink,
    onSubmit
}: FormProps) {
    return (
        <div
            className="
                flex flex-col items-center justify-center
                m-4 p-4 bg-white w-11/12 max-w-175 rounded-2xl
            "
        >
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

                <p className="text-gray-800 text-center">
                    {childrenP}
                    <Link
                        href={href}
                        className="
                            pl-1 font-bold cursor pointer
                            hover:underline
                        "
                        title={titleLink}
                    >
                        {childrenLink}
                    </Link>
                </p>
            </form>
        </div>
    );
}