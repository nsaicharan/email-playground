/**
 * SendEmailModal component
 * A modal dialog for collecting recipient email addresses and sending test emails.
 * Supports adding multiple recipients with validation.
 */
'use client';

import { useState, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { isValidEmail } from '@/app/lib/validators';

export default function SendEmailModal({ isOpen, onClose, onSend, isSending }) {
  const [emailInput, setEmailInput] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [subject, setSubject] = useState('Test Email');
  const [error, setError] = useState('');

  /** Add a recipient email to the list */
  const addRecipient = useCallback(() => {
    const email = emailInput.trim();
    if (!email) return;

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (recipients.includes(email)) {
      setError('This email is already added.');
      return;
    }

    setRecipients((prev) => [...prev, email]);
    setEmailInput('');
    setError('');
  }, [emailInput, recipients]);

  /** Remove a recipient from the list */
  const removeRecipient = useCallback((email) => {
    setRecipients((prev) => prev.filter((r) => r !== email));
  }, []);

  /** Handle Enter key in the email input */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addRecipient();
      }
    },
    [addRecipient],
  );

  /** Submit and send the email */
  const handleSend = useCallback(() => {
    if (recipients.length === 0) {
      setError('Add at least one recipient.');
      return;
    }
    onSend({ recipients, subject });
  }, [recipients, subject, onSend]);

  /** Reset state and close */
  const handleClose = useCallback(() => {
    setEmailInput('');
    setRecipients([]);
    setSubject('Test Email');
    setError('');
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  const inputClass =
    'flex-1 px-3.5 py-2.5 bg-surface-secondary border border-border-primary rounded-lg text-text-primary text-sm outline-none transition-colors duration-150 focus:border-accent-primary placeholder:text-text-secondary';

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-1000 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="bg-surface-primary border border-border-primary rounded-2xl w-[90%] max-w-120 shadow-[0_24px_64px_rgba(0,0,0,0.3)] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-primary">
          <h2 className="text-lg font-bold text-text-primary m-0">
            Send Test Email
          </h2>
          <button
            className="bg-transparent border-none text-text-secondary text-base cursor-pointer px-2 py-1 rounded-md transition-all duration-150 hover:bg-surface-secondary hover:text-text-primary flex items-center justify-center font-bold"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-4">
          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={inputClass}
              placeholder="Email subject line"
            />
          </div>

          {/* Recipients input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
              Recipients
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  setError('');
                }}
                onKeyDown={handleKeyDown}
                className={inputClass}
                placeholder="Enter email address..."
                disabled={isSending}
              />
              <button
                className="px-4.5 py-2.5 bg-surface-secondary border border-border-primary rounded-lg text-text-primary text-[13px] font-semibold cursor-pointer transition-all duration-150 whitespace-nowrap hover:bg-accent-bg hover:border-accent-primary hover:text-accent-primary disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={addRecipient}
                disabled={isSending || !emailInput.trim()}
                type="button"
              >
                Add
              </button>
            </div>
            {error && <p className="text-[13px] text-error m-0">{error}</p>}
          </div>

          {/* Recipient chips */}
          {recipients.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {recipients.map((email) => (
                <span
                  key={email}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-bg border border-accent-primary/30 rounded-full text-[13px] text-accent-primary font-medium"
                >
                  {email}
                  <button
                    className="bg-transparent border-none text-accent-primary cursor-pointer p-0 opacity-70 transition-opacity duration-150 flex items-center justify-center hover:opacity-100"
                    onClick={() => removeRecipient(email)}
                    disabled={isSending}
                    aria-label={`Remove ${email}`}
                  >
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2.5 px-6 py-4 border-t border-border-primary">
          <button
            className="px-5 py-2.5 bg-transparent border border-border-primary rounded-lg text-text-secondary text-sm font-medium cursor-pointer transition-all duration-150 hover:bg-surface-secondary disabled:opacity-40"
            onClick={handleClose}
            disabled={isSending}
          >
            Cancel
          </button>
          <button
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent-primary border-none rounded-lg text-surface-primary text-sm font-semibold cursor-pointer transition-all duration-150 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSend}
            disabled={isSending || recipients.length === 0}
          >
            {isSending ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-surface-primary/30 border-t-surface-primary rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>Send Email</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
