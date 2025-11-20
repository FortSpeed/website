"use client";
import React, { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
};

// Minimal accessible modal with focus lock and ESC/overlay close
export default function Modal({ open, onClose, children, ariaLabel = "Dialog", className = "" }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      // save active element and focus dialog
      const prev = document.activeElement as HTMLElement | null;
      dialogRef.current?.focus();
      return () => {
        document.removeEventListener("keydown", onKey);
        prev?.focus?.();
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose();
  }

  return (
    <div
      ref={overlayRef}
      onMouseDown={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      aria-hidden={!open}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={`relative w-full max-w-3xl mx-4 rounded-2xl bg-neutral-900 border border-neutral-700 shadow-2xl max-h-[85vh] overflow-y-auto ${className}`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full p-2 text-neutral-300 hover:text-white hover:bg-white/10 focus:outline-none"
          aria-label="Close dialog"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
