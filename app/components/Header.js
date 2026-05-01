'use client';

import { LinkIcon } from '@heroicons/react/24/outline';
import { cn } from 'tailwind-cn';

function ShareButton({ onClick, onCopyShareUrl, shareState, shareUrl }) {
  const isDisabled = ['disabled', 'loading', 'copied'].includes(shareState);

  // Extract the short ID from the URL for display
  const shortId = shareUrl ? shareUrl.split('/').pop() : '';

  return (
    <div className="flex items-center gap-2.5">
      {/* Show truncated URL after copying */}
      {(shareState === 'copied' || shareState === 'disabled') && shortId && (
        <button
          onClick={onCopyShareUrl}
          className="text-text-secondary hover:text-text-primary transition-colors duration-150 text-sm font-semibold flex items-center gap-1.5 max-md:hidden cursor-pointer appearance-none bg-transparent border-none p-0 m-0"
          title={shareUrl}
        >
          <LinkIcon className="w-5 h-5 shrink-0  stroke-2" />
          <span className="truncate max-w-35">…/{shortId}</span>
        </button>
      )}

      <button
        className={cn(
          'py-2 min-w-19 text-[13px] font-semibold whitespace-nowrap flex justify-center items-center transition-all duration-150 border rounded-md bg-transparent border-accent-primary/40 text-accent-primary hover:bg-accent-primary/10 cursor-pointer disabled:cursor-not-allowed',
          shareState === 'copied' &&
            'bg-success-bg text-success border border-success/30',
          shareState === 'disabled' && 'opacity-50',
        )}
        onClick={onClick}
        disabled={isDisabled}
        id="share-button"
      >
        {shareState === 'loading' ? (
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : shareState === 'copied' ? (
          <>Copied!</>
        ) : (
          <>Share</>
        )}
      </button>
    </div>
  );
}

export default function Header({
  onSendClick,
  onShareClick,
  onCopyShareUrl,
  shareState = 'idle',
  shareUrl = '',
}) {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-surface-secondary border-b border-border-primary gap-4 shrink-0 max-md:flex-wrap max-md:gap-3">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <h1 className="text-[1.375rem] sm:text-[2rem] font-[150] text-text-primary m-0 tracking-tight">
          Email
          <span className="font-oregano font-normal tracking-wide">
            Playground
          </span>
        </h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 max-md:flex-wrap">
        <ShareButton
          onClick={onShareClick}
          onCopyShareUrl={onCopyShareUrl}
          shareState={shareState}
          shareUrl={shareUrl}
        />

        {/* Send email */}
        <button
          className="px-5 py-2 bg-accent-primary border border-transparent rounded-md text-surface-primary text-[13px] font-semibold cursor-pointer transition-all duration-150 whitespace-nowrap hover:bg-accent-primary/88"
          onClick={onSendClick}
        >
          Send Test Email
        </button>
      </div>
    </header>
  );
}
