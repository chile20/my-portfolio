'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Design } from '@/types';

interface DesignCardProps {
  design: Design;
  index: number;
  onClick: () => void;
}

export function DesignCard({ design, index, onClick }: DesignCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="group relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
      aria-label={`View design details: ${design.title}`}
      type="button"
    >
      {/* Image */}
      <div className="relative h-full w-full">
        {design.image && (
          <Image
            src={design.image}
            alt={`${design.title} - ${design.description}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {/* Overlay with title and description */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-sm font-semibold mb-1">{design.title}</h3>
            <p className="text-xs text-slate-200 line-clamp-2">{design.description}</p>
          </div>
        </div>
      </div>

      {/* Fallback for missing images */}
      {!design.image && (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
              {design.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 px-4">
              {design.description}
            </p>
          </div>
        </div>
      )}
    </motion.button>
  );
}
