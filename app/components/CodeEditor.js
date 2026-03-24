/**
 * CodeEditor component
 * Wraps Monaco Editor for HTML editing with a clean header bar.
 * Lazily loaded since Monaco is a client-only library.
 */
'use client';

import { useCallback } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ value, onChange, theme = 'vs-dark' }) {
  const handleChange = useCallback(
    (newValue) => {
      onChange(newValue || '');
    },
    [onChange],
  );

  return (
    <div className="flex flex-col h-full bg-surface-primary rounded-xl border border-border-primary overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border-primary bg-surface-secondary">
        <span className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
          HTML Editor
        </span>
        <span className="text-[11px] font-semibold text-accent-primary bg-accent-bg px-2.5 py-0.5 rounded-md tracking-wide">
          HTML
        </span>
      </div>

      {/* Editor area */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language="html"
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
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
