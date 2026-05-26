interface ButtonProps {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className: string;
    disabled?: boolean;
    title?: string;
}

export function Button({
    children,
    type = 'button',
    Icon,
    onClick,
    className,
    disabled,
    title
}: ButtonProps) {
    return (
        <button
            type={type}
            title={title}
            disabled={disabled}
            onClick={onClick}
            className={`
                ${className} cursor-pointer transition
                duration-300 ease-in-out hover:scale-105
            `}
        >
            {children}
            {Icon && <Icon className="w-5 h-5"/>}
        </button>
    );
}