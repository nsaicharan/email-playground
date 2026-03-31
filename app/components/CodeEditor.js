/**
 * CodeEditor component
 * Wraps Monaco Editor for HTML editing with a clean header bar.
 * Lazily loaded since Monaco is a client-only library.
 */
'use client';

import { useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { emmetHTML } from 'emmet-monaco-es';
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function CodeEditor({
  value,
  onChange,
  onCopyClick,
  copySuccess,
}) {
  const handleChange = useCallback(
    (newValue) => {
      onChange(newValue || '');
    },
    [onChange],
  );

  const handleEditorWillMount = (monaco) => {
    emmetHTML(monaco);
  };

  return (
    <div className="flex flex-col h-full bg-surface-primary rounded-xl border border-border-primary overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border-primary bg-surface-secondary">
        <span className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
          HTML Editor
        </span>
        <button
          onClick={onCopyClick}
          className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md cursor-pointer transition-all duration-200 ${
            copySuccess
              ? 'bg-success-bg text-success border border-success/30'
              : 'bg-accent-bg text-accent-primary border border-accent-primary/20 hover:border-accent-primary/40 hover:bg-accent-primary/10'
          }`}
          title="Copy HTML to clipboard"
        >
          {copySuccess ? (
            <>
              <CheckIcon className="w-3.5 h-3.5" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <DocumentDuplicateIcon className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Editor area */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language="html"
          theme="vs-dark"
          beforeMount={handleEditorWillMount}
          value={value}
          onChange={handleChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineHeight: 22,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            padding: { top: 16 },
            automaticLayout: true,
            tabSize: 2,
            renderWhitespace: 'selection',
            smoothScrolling: true,
            bracketPairColorization: { enabled: true },
          }}
          loading={
            <div className="flex flex-col items-center justify-center h-full gap-3 text-text-secondary text-sm">
              <div className="w-6 h-6 border-2 border-border-primary border-t-accent-primary rounded-full animate-spin" />
              <span>Loading editor...</span>
            </div>
          }
        />
      </div>
    </div>
  );
}
