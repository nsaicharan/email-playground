/**
 * Toast component
 * Displays success/error notification toasts that auto-dismiss.
 */
'use client';

import { useEffect } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Toast({
  message,
  type = 'success',
  onClose,
  duration = 4000,
}) {
  // Auto-dismiss after duration
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div
      role="status"
      className={`fixed bottom-6 right-6 flex items-center gap-3 px-4.5 py-3.5 rounded-xl text-sm font-medium shadow-[0_12px_40px_rgba(0,0,0,0.6)] z-2000 animate-toast-in max-w-105 bg-surface-secondary text-text-primary border ${
        isSuccess ? 'border-success/40' : 'border-error/40'
      }`}
    >
      {/* Icon */}
      <span
        className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 ${
          isSuccess ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
        }`}
      >
        {isSuccess ? (
          <CheckIcon className="w-4 h-4" />
        ) : (
          <XMarkIcon className="w-4 h-4" />
        )}
      </span>

      {/* Message */}
      <span className="flex-1 leading-snug">{message}</span>

      {/* Dismiss */}
      <button
        type="button"
        className="bg-transparent border-none text-text-secondary hover:text-text-primary text-sm cursor-pointer p-1 rounded-md transition-colors duration-150 flex items-center justify-center ml-1"
        onClick={onClose}
        aria-label="Dismiss"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
