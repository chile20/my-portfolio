import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import Container from './Container';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  noPadding?: boolean;
}

/**
 * Section component for page sections with consistent spacing
 */
const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, containerSize = 'lg', noPadding = false, children, ...props }, ref) => {
    return (
      <section ref={ref} className={cn(!noPadding && 'py-16 md:py-24', className)} {...props}>
        <Container size={containerSize}>{children}</Container>
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
