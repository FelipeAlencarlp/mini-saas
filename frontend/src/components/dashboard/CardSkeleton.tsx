export function CardSkeleton() {
    return (
        <div className="
            flex flex-col box-border shadow-md
            items-center justify-center mt-10 mx-5
            rounded-xl border-2 h-auto
            w-full max-w-60 border-gray-300
            animate-pulse
        ">
            {/* Header */}
            <div className="
                bg-gray-300 w-full
                rounded-t-md py-5
            " />

            {/* Content */}
            <div className="flex flex-col items-center py-4 w-full gap-3">
                <div className="
                    h-5 w-32 rounded-md bg-gray-300
                " />

                <div className="
                    h-5 w-24 rounded-md bg-gray-300
                " />
            </div>
        </div>
    );
}