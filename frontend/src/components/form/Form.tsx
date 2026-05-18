interface FormProps {
    children: React.ReactNode;
    id: string;
    title: string;
    error?: string;
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export function Form({
    children,
    id,
    title,
    error,
    onSubmit
}: FormProps) {
    return (
        <div
            className="
                m-4 p-4 bg-white w-11/12 max-w-175
                flex flex-col items-center justify-center rounded-2xl
            "
        >
            <form
                id={id}
                onSubmit={onSubmit}
                className="
                    w-11/12 max-w-125 flex-col
                    flex items-center justify-center
                "
            >
                <h2
                    className="
                        inter-normal text-[28px]
                        text-black font-black mb-4
                    "
                >
                    {title}
                </h2>

                {children}

                {error && (
                    <span className="text-red-400 text-xl mb-3">
                        {error}
                    </span>
                )}
            </form>
        </div>
    );
}