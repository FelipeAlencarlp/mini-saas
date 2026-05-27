export function Spinner({
    size = 40
}: {
    size?: number
}) {
    return (
        <div
            className="
                animate-spin
                rounded-full
                border-4
                border-gray-300
                border-t-blue-500
            "
            style={{
                width: size,
                height: size
            }}
        />
    );
}