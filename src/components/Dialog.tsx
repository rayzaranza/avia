import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface DialogProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function Dialog({ children, isOpen, onClose }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const ref = dialogRef.current;
    if (isOpen) {
      ref?.showModal();
    } else {
      ref?.close();
    }
    return () => ref?.close();
  }, [isOpen]);

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="m-auto bg-canvas p-300 text-content shadow-blocky-floating backdrop:bg-backdrop sm:px-400"
    >
      {isOpen && children}
    </dialog>,
    document.body,
  );
}
