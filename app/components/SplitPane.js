'use client';

import { useState, useCallback, useRef } from 'react';

export default function SplitPane({ leftPane, rightPane }) {
  const [splitPercent, setSplitPercent] = useState(50);
  const splitPaneRef = useRef(null);

  const startDrag = useCallback((e) => {
    const isMobile = window.innerWidth < 768;

    const onMove = (moveEvent) => {
      const clientX = moveEvent.touches
        ? moveEvent.touches[0].clientX
        : moveEvent.clientX;
      const clientY = moveEvent.touches
        ? moveEvent.touches[0].clientY
        : moveEvent.clientY;

      if (!splitPaneRef.current) return;
      const { left, top, width, height } =
        splitPaneRef.current.getBoundingClientRect();

      if (isMobile) {
        const newPercent = ((clientY - top) / height) * 100;
        setSplitPercent(Math.max(20, Math.min(newPercent, 80)));
      } else {
        const newPercent = ((clientX - left) / width) * 100;
        setSplitPercent(Math.max(20, Math.min(newPercent, 80)));
      }
    };

    const onEnd = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';

      // Re-enable pointer events for iframes
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((iframe) => (iframe.style.pointerEvents = ''));
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);

    document.body.style.cursor = isMobile ? 'row-resize' : 'col-resize';
    document.body.style.userSelect = 'none';

    // Disable iframe pointer events during drag to prevent mouse getting stuck
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach((iframe) => (iframe.style.pointerEvents = 'none'));
  }, []);

  return (
    <main
      ref={splitPaneRef}
      className="flex flex-1 overflow-hidden max-md:flex-col"
    >
      {/* Editor Pane / Top Pane on mobile */}
      <div
        className="min-w-0 min-h-0 flex-col flex pt-4 pb-4 pl-4 pr-0 max-md:pt-3 max-md:pl-3 max-md:pr-3 max-md:pb-0 shrink-0"
        style={{ flexBasis: `calc(${splitPercent}% - 8px)` }}
      >
        {leftPane}
      </div>

      {/* Draggable Divider */}
      <div
        className="group flex flex-col md:w-4 items-center justify-center cursor-col-resize max-md:flex-row max-md:h-3 max-md:w-full max-md:cursor-row-resize z-10 shrink-0 select-none relative"
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        {/* Hit area extension for easier grabbing */}
        <div className="absolute inset-y-0 w-4 md:group-hover:bg-black/5 dark:md:group-hover:bg-white/5 transition-colors z-0 max-md:inset-x-0 max-md:inset-y-auto max-md:h-3 max-md:w-full max-md:group-hover:bg-black/5 max-md:dark:group-hover:bg-white/5" />
        {/* Visible line */}
        <div className="w-1 h-8 rounded-full bg-border-color group-hover:bg-accent-primary group-active:accent-primary transition-colors z-10 max-md:w-8 max-md:h-1" />
      </div>

      {/* Preview Pane / Bottom Pane on mobile */}
      <div className="min-w-0 min-h-0 pt-4 pb-4 pr-4 pl-0 max-md:pb-3 max-md:pl-3 max-md:pr-3 max-md:pt-0 flex-1 relative flex flex-col">
        {rightPane}
      </div>
    </main>
  );
}
