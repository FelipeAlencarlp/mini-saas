export function Section({
    children
}: { children: React.ReactNode }) {
    return (
        <section
            className="
                w-full flex flex-row justify-center
                items-center h-screen
            "
        >
            {children}
        </section>
    );
}