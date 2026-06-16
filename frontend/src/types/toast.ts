export type ToastType = 'success' | 'error' | 'warning';

export interface ToastContextType {
    showToast: (message: string, type: ToastType) => void;
}

export interface ToastData {
    message: string;
    type: ToastType;
}