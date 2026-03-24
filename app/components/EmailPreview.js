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
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-border-primary bg-surface-secondary">
        <span className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
          Preview
        </span>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => viewMode !== 'desktop' && onToggleView()}
            className={`cursor-pointer transition-all duration-150 ${
              viewMode === 'desktop'
                ? 'bg-surface-secondary text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            title="Desktop view"
          >
            <ComputerDesktopIcon className="w-4 h-4" />
          </button>

          <button
            onClick={() => viewMode !== 'mobile' && onToggleView()}
            className={`cursor-pointer transition-all duration-150 ${
              viewMode === 'mobile'
                ? 'bg-surface-secondary text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            title="Mobile view"
          >
            <DevicePhoneMobileIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto flex justify-center p-5 bg-preview-bg">
        <div
          className={`h-full transition-[width] duration-300 ease-in-out ${
            viewMode === 'mobile'
              ? 'w-[390px] mx-auto rounded-[20px] overflow-hidden shadow-[0_0_0_8px_var(--color-border-primary),0_8px_32px_rgba(0,0,0,0.15)]'
              : 'w-full'
          }`}
        >
          <iframe
            ref={iframeRef}
            title="Email Preview"
            className="w-full h-full border-none bg-white rounded"
            sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>
    </div>
  );
}
