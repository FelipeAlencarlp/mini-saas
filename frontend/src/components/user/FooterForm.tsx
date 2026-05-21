import Link from "next/link";

interface FooterFormProps {
    childrenP: React.ReactNode;
    href: string;
    titleLink: string;
    childrenLink: React.ReactNode;
}

export function FooterForm({
    childrenP,
    href,
    titleLink,
    childrenLink
}: FooterFormProps) {
    return (
        <p className="text-gray-800">
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
    );
}