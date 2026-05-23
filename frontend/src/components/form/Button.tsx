interface ButtonProps {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className: string;
    disabled?: boolean;
}

export function Button({
    children,
    type = 'button',
    Icon,
    onClick,
    className,
    disabled
}: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={className}
        >
            {children}
            {Icon && <Icon className="w-5 h-5"/>}
        </button>
    );
}