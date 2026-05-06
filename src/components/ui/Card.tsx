import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, padding = 'md', hoverEffect = false, ...props }, ref) => {
    
    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    const baseStyles = 'bg-white rounded-lg shadow-[0_12px_32px_rgba(0,46,82,0.06)]';
    const hoverStyles = hoverEffect ? 'hover:shadow-[0_16px_40px_rgba(0,46,82,0.1)] transition-shadow duration-300' : '';

    return (
      <motion.div
        ref={ref}
        className={`${baseStyles} ${paddingClasses[padding]} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
