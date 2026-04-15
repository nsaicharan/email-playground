'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import EmailPreview from '@/app/components/EmailPreview';
import Header from '@/app/components/Header';
import SendEmailModal from '@/app/components/SendEmailModal';
import Toast from '@/app/components/Toast';
import SplitPane from '@/app/components/SplitPane';
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

export default function EditorPage({ initialHtml, snippetId }) {
  // ── State ──
  const [html, setHtml] = useState(initialHtml || sampleEmailTemplate);
  const [viewMode, setViewMode] = useState('desktop');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [toast, setToast] = useState(null);

  // Share state: 'idle' | 'loading' | 'copied' | 'disabled'
  const [shareState, setShareState] = useState(snippetId ? 'disabled' : 'idle');
  const [shareUrl, setShareUrl] = useState('');
  const [currentSnippetId, setCurrentSnippetId] = useState(snippetId || null);

  // Track whether HTML has changed since last share
  const [hasChangedSinceShare, setHasChangedSinceShare] = useState(!snippetId);

  // Timer ref for copy feedback
  const copyTimerRef = useRef(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  // ── HTML change handler ──
  const handleHtmlChange = useCallback(
    (newHtml) => {
      setHtml(newHtml);
      if (!hasChangedSinceShare) {
        setHasChangedSinceShare(true);
        setShareState('idle');
      }
    },
    [hasChangedSinceShare],
  );

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

  const handleShare = useCallback(async () => {
    setShareState('loading');

    try {
      const res = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html }),
      });

      const data = await res.json();

      if (data.success) {
        const newUrl = `${window.location.origin}/${data.id}`;

        // Update URL without page reload
        window.history.pushState({}, '', `/${data.id}`);

        // Copy to clipboard
        await navigator.clipboard.writeText(newUrl);

        setCurrentSnippetId(data.id);
        setShareUrl(newUrl);
        setShareState('copied');
        setHasChangedSinceShare(false);

        // Transition to disabled after 2 seconds
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        copyTimerRef.current = setTimeout(() => {
          setShareState('disabled');
        }, 2000);
      } else {
        setToast({
          message: data.error || 'Failed to share.',
          type: 'error',
        });
        setShareState('idle');
      }
    } catch {
      setToast({
        message: 'Network error. Please try again.',
        type: 'error',
      });
      setShareState('idle');
    }
  }, [html]);

  const handleCopyShareUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareState('copied');
      
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => {
        setShareState('disabled');
      }, 2000);
    } catch {
      setToast({ message: 'Failed to copy to clipboard.', type: 'error' });
    }
  }, [shareUrl]);

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
        onShareClick={handleShare}
        onCopyShareUrl={handleCopyShareUrl}
        shareState={shareState}
        shareUrl={shareUrl}
      />

      {/* Main content area: editor + preview */}
      <SplitPane
        leftPane={
          <CodeEditor
            value={html}
            onChange={handleHtmlChange}
            onCopyClick={handleCopy}
            copySuccess={copySuccess}
          />
        }
        rightPane={
          <EmailPreview
            html={html}
            viewMode={viewMode}
            onToggleView={handleToggleView}
          />
        }
      />

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
