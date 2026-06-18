export function SidebarSkeleton() {
    return (
        <aside className="
                fixed left-0 top-17 z-50
                w-64
                h-[calc(100vh-68px)]
                bg-gray-800

                transform transition-transform duration-300
                md:translate-x-0
                flex flex-col
            "
        >
            {/* Header */}
            <div className="
                    md:hidden flex items-center
                    justify-between p-5 border-b
                    animate-pulse
                "
            >
                <div className="h-6 w-40 rounded bg-gray-600"/>
            </div>

            {/* Nav */}
            <div className="mt-5 flex flex-col gap-3 animate-pulse">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="
                            flex items-center gap-3
                            px-3 py-2 mx-5 rounded
                        "
                    >
                        {/* Ícone */}
                        <div className="h-5 w-5 rounded bg-gray-600"/>

                        {/* Texto */}
                        <div className="h-4 w-32 rounded bg-gray-600"/>
                    </div>
                ))}
            </div>
        </aside>
    );
}