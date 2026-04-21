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
    if (isOpen) {
      dialogRef.current?.showModal();
      document.body.classList.add("overlay");
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const dialog = (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="m-auto bg-canvas p-300 text-content shadow-blocky-floating backdrop:bg-backdrop sm:px-400"
    >
      {children}
    </dialog>
  );

  return isOpen ? createPortal(dialog, document.body) : null;
}
