'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Design } from '@/types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface DesignModalProps {
  design: Design | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
  currentIndex?: number;
  totalCount?: number;
}

export function DesignModal({
  design,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
  currentIndex,
  totalCount
}: DesignModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Close on escape key, navigate with arrow keys, and manage focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) {
        onPrevious();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrevious, hasNext, hasPrevious]);

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  if (!design) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={backdropRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 active:bg-black/60 text-white transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                aria-label={`Close ${design.title} design details`}
                type="button"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>

              {/* Navigation Counter */}
              {currentIndex !== undefined && totalCount !== undefined && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/40 text-white text-sm font-medium backdrop-blur-sm">
                  {currentIndex + 1} / {totalCount}
                </div>
              )}

              {/* Previous Button */}
              {hasPrevious && onPrevious && (
                <button
                  onClick={onPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 hover:bg-black/60 active:bg-black/80 text-white transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                  aria-label="View previous design"
                  type="button"
                >
                  <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                </button>
              )}

              {/* Next Button */}
              {hasNext && onNext && (
                <button
                  onClick={onNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 hover:bg-black/60 active:bg-black/80 text-white transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                  aria-label="View next design"
                  type="button"
                >
                  <ChevronRight className="w-6 h-6" aria-hidden="true" />
                </button>
              )}

              {/* Image Container */}
              <div className="relative w-full h-[60vh] md:h-[70vh] bg-slate-100 dark:bg-slate-800">
                <Image
                  src={design.image}
                  alt={`${design.title} - ${design.description}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>

              {/* Info Section */}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {design.title}
                    </h2>
                    <p id="modal-description" className="text-slate-600 dark:text-slate-400 text-base md:text-lg mb-4">
                      {design.description}
                    </p>
                    {/* Keyboard shortcuts hint */}
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 font-mono">←</kbd>
                        <span>Previous</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 font-mono">→</kbd>
                        <span>Next</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 font-mono">Esc</kbd>
                        <span>Close</span>
                      </span>
                    </div>
                  </div>
                  {design.category && (
                    <span className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full whitespace-nowrap flex-shrink-0" aria-label={`Category: ${design.category}`}>
                      {design.category}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
