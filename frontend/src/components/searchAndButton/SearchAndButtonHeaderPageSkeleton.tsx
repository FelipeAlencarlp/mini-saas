export function SearchAndButtonHeaderPageSkeleton() {
    return (
        <div
            className="
                flex flex-col gap-4
                md:flex-row md:items-center md:justify-between
                animate-pulse
            "
        >
            {/* Search skeleton */}
            <div className="md:w-80 w-full">
                <div className="h-4 w-24 bg-gray-300 rounded mb-2" />

                <div className="h-10 w-full bg-gray-300 rounded" />
            </div>

            {/* Button skeleton */}
            <div
                className="
                    flex flex-row items-center justify-center
                    gap-2 px-4 py-2 rounded
                    md:mt-5 md:w-auto
                "
            >
                {/* icon placeholder */}
                <div className="h-5 w-5 bg-gray-300 rounded" />

                {/* text placeholder */}
                <div className="h-4 w-32 bg-gray-300 rounded" />
            </div>
        </div>
    );
}