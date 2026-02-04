'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryModalProps {
  images: string[];
  currentIndex: number | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  title?: string;
  descriptions?: string[];
}

export function GalleryModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  title = 'Image',
  descriptions = [],
}: GalleryModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const hasMultipleImages = images.length > 1;
  const currentImage = currentIndex !== null ? images[currentIndex] : null;
  const currentDescription = currentIndex !== null ? descriptions[currentIndex] : undefined;

  // Keyboard navigation and focus management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && hasMultipleImages && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && hasMultipleImages && onPrevious) {
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
  }, [isOpen, onClose, onNext, onPrevious, hasMultipleImages]);

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  if (!currentImage || currentIndex === null) return null;

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
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            aria-describedby={currentDescription ? 'gallery-modal-description' : undefined}
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/40 hover:bg-black/60 active:bg-black/80 text-white transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              aria-label="Close gallery"
              type="button"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Image Counter */}
            {hasMultipleImages && (
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/40 text-white text-sm font-medium backdrop-blur-sm">
                {currentIndex + 1} / {images.length}
              </div>
            )}

            {/* Previous Button */}
            {hasMultipleImages && onPrevious && (
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 hover:bg-black/60 active:bg-black/80 text-white transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                aria-label="View previous image"
                type="button"
              >
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>
            )}

            {/* Next Button */}
            {hasMultipleImages && onNext && (
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 hover:bg-black/60 active:bg-black/80 text-white transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                aria-label="View next image"
                type="button"
              >
                <ChevronRight className="w-6 h-6" aria-hidden="true" />
              </button>
            )}

            {/* Image Container */}
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl h-[70vh] md:h-[75vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentImage}
                alt={currentDescription || `${title} - Image ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
                quality={90}
              />

              {/* Image Title/Description */}
              {currentDescription && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <p
                    id="gallery-modal-description"
                    className="text-white text-sm md:text-base"
                  >
                    {currentDescription}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Keyboard Shortcuts Hint */}
            {hasMultipleImages && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-3 text-xs text-white/70">
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 bg-white/10 rounded border border-white/20 font-mono">←</kbd>
                  <span>Previous</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 bg-white/10 rounded border border-white/20 font-mono">→</kbd>
                  <span>Next</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 bg-white/10 rounded border border-white/20 font-mono">Esc</kbd>
                  <span>Close</span>
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
