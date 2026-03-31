'use client';

import {
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

export default function Header({ onSendClick }) {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-surface-secondary border-b border-border-primary gap-4 shrink-0 max-md:flex-wrap max-md:gap-3">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-text-primary m-0 tracking-tight">
          Email Playground
        </h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 max-md:flex-wrap">
        {/* Send email */}
        <button
          className="px-5 py-2 bg-accent-primary border-none rounded-lg text-surface-primary text-[13px] font-semibold cursor-pointer transition-all duration-150 whitespace-nowrap hover:opacity-80 flex items-center gap-2"
          onClick={onSendClick}
        >
          <PaperAirplaneIcon className="w-4 h-4" />
          Send Test Email
        </button>
      </div>
    </header>
  );
}
