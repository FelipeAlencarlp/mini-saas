import { TitlePageProps } from "@/types/dashboard/dashboard";
import { TitlePageSkeleton } from "./TitlePageSkeleton";

export function TitlePage({
    children,
    isLoading = false
}: TitlePageProps) {
    if (isLoading) return <TitlePageSkeleton/>;

    return (
        <>
            <h1 className="text-2xl font-bold text-gray-800 mt-15">
                {children}
            </h1>
            <hr className="my-2 border-t border-gray-600 w-full" />
        </>
    );
}