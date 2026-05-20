interface OverlayProps {
    onClose: () => void;
}

export function Overlay({ onClose }: OverlayProps) {
    return (
        <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
        />
    );
}