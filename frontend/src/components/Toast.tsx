import { ToastData } from "@/types/toast";

export function Toast({
    message,
    type = 'success'
}: ToastData) {
    return (
        <div
            className={`
                fixed top-5 right-5 px-4 py-2 rounded text-white
                ${type === "success" ? "bg-green-500" : "bg-red-500"}    
            `}
        >
            {message}
        </div>
    );
}