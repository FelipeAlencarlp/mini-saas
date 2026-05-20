export function TitlePage({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-2xl font-bold text-gray-800 mt-15">
            {children}
            <hr className="my-2 border-t border-gray-600 w-full" />
        </h1>
    );
}