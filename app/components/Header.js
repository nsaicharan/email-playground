'use client';

import {
  SunIcon,
  MoonIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

export default function Header({
  onSendClick,
  onCopyClick,
  theme,
  onToggleTheme,
  copySuccess,
}) {
  const headerBtnBase =
    'px-3.5 py-2 bg-surface-secondary border border-border-primary rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 whitespace-nowrap hover:bg-surface-primary hover:border-border-hover hover:text-text-primary';

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
        {/* Theme toggle */}
        <button
          className={`${headerBtnBase} flex items-center gap-2`}
          onClick={onToggleTheme}
          title={
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
          }
        >
          {theme === 'dark' ? (
            <>
              <SunIcon className="w-4 h-4" />
              Light
            </>
          ) : (
            <>
              <MoonIcon className="w-4 h-4" />
              Dark
            </>
          )}
        </button>

        {/* Copy HTML */}
        <button
          className={`${headerBtnBase} flex items-center gap-2 ${
            copySuccess ? 'bg-success-bg border-success text-success' : ''
          }`}
          onClick={onCopyClick}
          title="Copy HTML to clipboard"
        >
          {copySuccess ? (
            <>
              <CheckIcon className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <DocumentDuplicateIcon className="w-4 h-4" />
              Copy HTML
            </>
          )}
        </button>

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
