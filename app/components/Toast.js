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
      className={`fixed bottom-6 right-6 flex items-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-medium shadow-[0_8px_32px_rgba(0,0,0,0.2)] z-2000 animate-toast-in max-w-105 ${
        isSuccess
          ? 'bg-success-bg border border-success text-success'
          : 'bg-error-bg border border-error text-error'
      }`}
    >
      {/* Icon */}
      <span
        className={`flex items-center justify-center w-5.5 h-5.5 rounded-full shrink-0 text-white ${
          isSuccess ? 'bg-success' : 'bg-error'
        }`}
      >
        {isSuccess ? (
          <CheckIcon className="w-3.5 h-3.5" />
        ) : (
          <XMarkIcon className="w-3.5 h-3.5" />
        )}
      </span>

      {/* Message */}
      <span className="flex-1">{message}</span>

      {/* Dismiss */}
      <button
        className="bg-transparent border-none text-inherit text-sm cursor-pointer opacity-60 px-1 py-0.5 transition-opacity duration-150 flex items-center justify-center hover:opacity-100"
        onClick={onClose}
        aria-label="Dismiss"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
