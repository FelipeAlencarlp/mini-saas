export function HeaderSkeleton() {
    return (
        <header
            className="
                fixed top-0 left-0 w-full
                bg-gray-800 h-17 z-40
                flex items-center justify-between
                px-4
            "
        >
            {/* Menu */}
            <div
                className="
                    h-7 w-7
                    rounded bg-gray-600
                    md:hidden
                "
            />

            {/* Logo */}
            <div
                className="
                    h-7 w-40
                    rounded bg-gray-600
                    md:ml-12
                    animate-pulse
                "
            />

            {/* Perfil */}
            <div
                className="
                    h-8 w-8
                    rounded-full bg-gray-600
                    animate-pulse
                "
            />
        </header>
    );
}