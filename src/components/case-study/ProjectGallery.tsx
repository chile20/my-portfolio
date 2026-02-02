'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setSelectedImage(null);
  };

  // Bento grid layout patterns based on image count
  const getGridLayout = (index: number, total: number) => {
    if (total === 1) return 'col-span-full row-span-2';
    if (total === 2) return 'col-span-full lg:col-span-1 row-span-1';
    if (total === 3) {
      if (index === 0) return 'col-span-full lg:col-span-2 row-span-2';
      return 'col-span-full lg:col-span-1 row-span-1';
    }
    if (total >= 4) {
      if (index === 0) return 'col-span-full lg:col-span-2 row-span-2';
      if (index === 1) return 'col-span-full lg:col-span-1 row-span-1';
      if (index === 2) return 'col-span-full lg:col-span-1 row-span-1';
      return 'col-span-full sm:col-span-1 row-span-1';
    }
    return 'col-span-full sm:col-span-1 row-span-1';
  };

  return (
    <section ref={ref} className="relative overflow-hidden py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Project Gallery
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid auto-rows-[240px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`group relative cursor-pointer overflow-hidden bg-slate-100 dark:bg-slate-900 ${getGridLayout(index, images.length)}`}
              onClick={() => setSelectedImage(index)}
              aria-label={`View ${title} - Image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${title} - Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Minimal Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            tabIndex={0}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-6 top-6 z-10 text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Close lightbox"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Image counter */}
            <div className="absolute left-1/2 top-6 -translate-x-1/2 text-sm font-medium text-white/70">
              {selectedImage + 1} / {images.length}
            </div>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-10 w-10" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-10 w-10" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative mx-6 h-[75vh] w-[85vw] max-w-4xl" // Changed from max-w-7xl to max-w-4xl
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage]}
                alt={`${title} - Image ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="85vw"
                priority
                quality={85}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}