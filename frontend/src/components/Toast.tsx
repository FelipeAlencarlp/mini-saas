import { ToastType } from "@/types/toast/Toast.type";

export function Toast({ message, type = 'success' }: ToastType) {
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