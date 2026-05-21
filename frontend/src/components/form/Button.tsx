interface ButtonProps {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className: string;
}

export function Button({
    children,
    type = 'button',
    Icon,
    onClick,
    className
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={className}
        >
            {children}
            {Icon && <Icon className="w-5 h-5"/>}
        </button>
    );
}