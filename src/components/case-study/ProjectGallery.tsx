'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { GalleryModal } from '@/components/ui/GalleryModal';

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

  const handleClose = () => {
    setSelectedImage(null);
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
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
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

      {/* Gallery Modal */}
      <GalleryModal
        images={images}
        currentIndex={selectedImage}
        isOpen={selectedImage !== null}
        onClose={handleClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
        title={title}
      />
    </section>
  );
}