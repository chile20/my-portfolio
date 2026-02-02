import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

/**
 * Container component for consistent max-width and centering
 */
const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-5xl', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export default Container;