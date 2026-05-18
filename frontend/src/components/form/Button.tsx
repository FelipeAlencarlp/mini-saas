interface ButtonProps {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
    children,
    type = 'button',
    onClick
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="
                bg-black w-full m-3 text-white
                p-3 cursor-pointer hover:bg-gray-900
            "
        >
            {children}
        </button>
    );
}