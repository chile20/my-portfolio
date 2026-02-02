import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Badge component for tags, categories, and status indicators
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center font-medium transition-colors rounded-full border';

    const variants = {
      default: 'bg-slate-100 text-slate-900 border-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700',
      primary: 'bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
      secondary: 'bg-violet-100 text-violet-900 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800',
      success: 'bg-green-100 text-green-900 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
      warning: 'bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
      danger: 'bg-red-100 text-red-900 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
      outline: 'bg-transparent border-slate-300 dark:border-slate-600',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
