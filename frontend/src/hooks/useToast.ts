import { useContext } from "react";
import { ToastContext } from "@/contexts/toast/ToastContext";

export function useToast() {
    return useContext(ToastContext);
}