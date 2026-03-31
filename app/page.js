/**
 * Main page component — Email Sandbox
 *
 * Orchestrates the editor, preview, navbar, send modal, and toast notifications.
 */
'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import EmailPreview from '@/app/components/EmailPreview';
import Header from '@/app/components/Header';
import SendEmailModal from '@/app/components/SendEmailModal';
import Toast from '@/app/components/Toast';
import { sampleEmailTemplate } from '@/app/lib/sampleTemplate';

// Dynamically import Monaco Editor (client-side only, no SSR)
const CodeEditor = dynamic(() => import('@/app/components/CodeEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-text-secondary text-sm">
      Loading editor...
    </div>
  ),
});

export default function Home() {
  // ── State ──
  const [html, setHtml] = useState(sampleEmailTemplate);
  const [viewMode, setViewMode] = useState('desktop');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [toast, setToast] = useState(null);

  // ── Handlers ──

  const handleToggleView = useCallback(() => {
    setViewMode((prev) => (prev === 'desktop' ? 'mobile' : 'desktop'));
  }, []);



  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      setToast({ message: 'Failed to copy to clipboard.', type: 'error' });
    }
  }, [html]);

  const handleSendClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleSendEmail = useCallback(
    async ({ recipients, subject }) => {
      setIsSending(true);

      try {
        const res = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ html, recipients, subject }),
        });

        const data = await res.json();

        if (data.success) {
          setToast({
            message: `Email sent successfully to ${recipients.join(', ')}`,
            type: 'success',
          });
          setIsModalOpen(false);
        } else {
          setToast({ message: data.error, type: 'error' });
        }
      } catch {
        setToast({
          message: 'Network error. Please try again.',
          type: 'error',
        });
      } finally {
        setIsSending(false);
      }
    },
    [html],
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <Header
        onSendClick={handleSendClick}
      />

      {/* Main content area: editor + preview */}
      <main className="flex flex-1 overflow-hidden max-md:flex-col">
        <div className="flex-1 min-w-0 p-4 pr-2 max-md:p-3 max-md:h-1/2 max-md:flex-none">
          <CodeEditor
            value={html}
            onChange={setHtml}
            onCopyClick={handleCopy}
            copySuccess={copySuccess}
          />
        </div>
        <div className="flex-1 min-w-0 p-4 pl-2 max-md:p-3 max-md:h-1/2 max-md:flex-none">
          <EmailPreview
            html={html}
            viewMode={viewMode}
            onToggleView={handleToggleView}
          />
        </div>
      </main>

      {/* Send email modal */}
      <SendEmailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSend={handleSendEmail}
        isSending={isSending}
      />

      {/* Toast notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
