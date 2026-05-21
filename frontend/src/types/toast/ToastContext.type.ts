import { ToastType } from "./Toast.type";

export type ToastContextType = {
    showToast: (message: string, type: ToastType) => void;
}