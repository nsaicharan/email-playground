/**
 * EmailPreview component
 * Renders the HTML content in a sandboxed iframe for safe live preview.
 * Updates instantly whenever the html prop changes.
 */
'use client';

import { useRef, useEffect } from 'react';
import {
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';

export default function EmailPreview({
  html,
  viewMode = 'desktop',
  onToggleView,
}) {
  const iframeRef = useRef(null);

  // Write the HTML content into the iframe whenever it changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html || '');
      doc.close();
    }
  }, [html]);

  return (
    <div className="flex flex-col h-full bg-surface-primary rounded-xl border border-border-primary overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-border-primary bg-surface-secondary">
        <span className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
          Preview
        </span>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => viewMode !== 'desktop' && onToggleView()}
            className={`flex items-center justify-center w-8 h-8 rounded-md cursor-pointer transition-all duration-200 ${
              viewMode === 'desktop'
                ? 'bg-accent-bg text-accent-primary border border-accent-primary/40 shadow-sm'
                : 'text-text-secondary border border-transparent hover:text-text-primary hover:bg-surface-primary/5'
            }`}
            title="Desktop view"
          >
            <ComputerDesktopIcon className="w-4 h-4" />
          </button>

          <button
            onClick={() => viewMode !== 'mobile' && onToggleView()}
            className={`flex items-center justify-center w-8 h-8 rounded-md cursor-pointer transition-all duration-200 ${
              viewMode === 'mobile'
                ? 'bg-accent-bg text-accent-primary border border-accent-primary/40 shadow-sm'
                : 'text-text-secondary border border-transparent hover:text-text-primary hover:bg-surface-primary/5'
            }`}
            title="Mobile view"
          >
            <DevicePhoneMobileIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div
        className={`flex-1 overflow-auto flex justify-center items-center bg-preview-bg`}
      >
        <div
          className={`transition-[width_height] duration-300 ease-in-out ${
            viewMode === 'mobile'
              ? 'h-[calc(100%-32px)] w-[390px] mx-auto rounded-xl overflow-hidden shadow-[0_0_0_8px_var(--color-border-primary),0_8px_32px_rgba(0,0,0,0.15)]'
              : 'h-full w-full'
          }`}
        >
          <iframe
            ref={iframeRef}
            title="Email Preview"
            className="w-full h-full border-none bg-white"
            sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>
    </div>
  );
}
