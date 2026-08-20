"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
    useSyncExternalStore,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const SIZE_CLASS = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-[1080px]",
} as const;

export type ModalSize = keyof typeof SIZE_CLASS;

export type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: ReactNode;
    icon?: ReactNode;
    size?: ModalSize;
    closeOnBackdrop?: boolean;
    className?: string;
    children?: ReactNode;
};

type ModalOptions = Omit<ModalProps, "open" | "onClose" | "children"> & {
    content: ReactNode;
};

type ModalContextValue = {
    open: (options: ModalOptions) => void;
    close: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function useMounted() {
    return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );
}

export function useModal() {
    const ctx = useContext(ModalContext);
    if (!ctx) {
        throw new Error("useModal must be used within ModalProvider");
    }
    return ctx;
}

export function ModalProvider({ children }: { children: ReactNode }) {
    const [options, setOptions] = useState<ModalOptions | null>(null);
    const close = useCallback(() => setOptions(null), []);
    const open = useCallback((next: ModalOptions) => setOptions(next), []);
    const value = useMemo(() => ({ open, close }), [open, close]);

    return (
        <ModalContext.Provider value={value}>
            {children}
            <Modal
                open={Boolean(options)}
                onClose={close}
                title={options?.title}
                icon={options?.icon}
                size={options?.size}
                closeOnBackdrop={options?.closeOnBackdrop}
                className={options?.className}
            >
                {options?.content}
            </Modal>
        </ModalContext.Provider>
    );
}

export default function Modal({
    open,
    onClose,
    title,
    icon,
    size = "xl",
    closeOnBackdrop = true,
    className = "",
    children,
}: ModalProps) {
    const mounted = useMounted();
    const titleId = useId();
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        const prevActive = document.activeElement as HTMLElement | null;
        document.addEventListener("keydown", onKeyDown);
        document.documentElement.classList.add("modal-open");
        panelRef.current?.focus();

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.documentElement.classList.remove("modal-open");
            prevActive?.focus?.();
        };
    }, [open, onClose]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {open ? (
                <motion.div
                    key="modal-root"
                    className="fixed inset-0 z-200 flex items-center justify-center p-3 sm:p-6 lg:p-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <button
                        type="button"
                        aria-label="Close modal"
                        className="modal-overlay absolute inset-0 cursor-default"
                        onClick={closeOnBackdrop ? onClose : undefined}
                    />
                    <motion.div
                        ref={panelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? titleId : undefined}
                        tabIndex={-1}
                        data-lenis-prevent
                        initial={{ opacity: 0, y: 18, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 18, scale: 0.985 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className={[
                            "modal-glass relative z-1 flex max-h-[min(90vh,640px)] w-full flex-col overflow-hidden outline-none",
                            SIZE_CLASS[size],
                            className,
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        <div className="relative flex shrink-0 items-center justify-between gap-4 px-6 pt-6 pb-1 sm:px-8 sm:pt-7">
                            <div className="flex min-w-0 items-center gap-3.5">
                                {icon ? (
                                    <span className="modal-icon shrink-0" aria-hidden>
                                        {icon}
                                    </span>
                                ) : null}
                                {title ? (
                                    <h2
                                        id={titleId}
                                        className="truncate text-[17px] font-semibold tracking-[-0.02em] text-white sm:text-[18px]"
                                    >
                                        {title}
                                    </h2>
                                ) : null}
                            </div>
                            <button
                                type="button"
                                aria-label="Close"
                                onClick={onClose}
                                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#8B83A3] transition-colors hover:bg-white/6 hover:text-white"
                            >
                                <X size={15} strokeWidth={1.8} />
                            </button>
                        </div>
                        <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pt-5 pb-6 sm:px-8 sm:pt-6 sm:pb-8">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>,
        document.body,
    );
}
