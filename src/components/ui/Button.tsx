import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

/**
 * Reusable Button component with multiple variants and sizes
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', isLoading = false, disabled, children, ...props },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600',
      secondary:
        'bg-violet-600 text-white hover:bg-violet-700 focus-visible:ring-violet-500 dark:bg-violet-500 dark:hover:bg-violet-600',
      outline:
        'border-2 border-slate-300 bg-transparent hover:bg-slate-100 focus-visible:ring-slate-500 dark:border-slate-600 dark:hover:bg-slate-800',
      ghost: 'hover:bg-slate-100 focus-visible:ring-slate-500 dark:hover:bg-slate-800',
      link: 'text-blue-600 underline-offset-4 hover:underline dark:text-blue-400',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm rounded-md',
      md: 'h-11 px-6 text-base rounded-lg',
      lg: 'h-14 px-8 text-lg rounded-xl',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
