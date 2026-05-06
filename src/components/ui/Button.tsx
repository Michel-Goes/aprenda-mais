import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'tertiary' | 'outline' | 'ghost' | 'danger';
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', fullWidth, isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'rounded-lg font-headline font-extrabold transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2';
    
    const variants = {
      primary: 'bg-gradient-to-br from-primary to-primary-container text-white shadow-[0_8px_16px_rgba(0,94,160,0.25)] hover:scale-[1.02] active:scale-[0.98]',
      tertiary: 'bg-gradient-to-br from-tertiary to-tertiary-container text-white shadow-[0_8px_16px_rgba(110,90,0,0.25)] hover:scale-[1.02] active:scale-[0.98]',
      outline: 'border-2 border-surface-variant text-on-surface hover:bg-surface-container-lowest',
      ghost: 'text-primary hover:bg-primary/10',
      danger: 'bg-error text-white shadow-[0_8px_16px_rgba(179,27,37,0.25)] hover:scale-[1.02] active:scale-[0.98]'
    };

    const widthClass = fullWidth ? 'w-full' : '';
    const paddingClass = 'py-4 px-6';
    const textClass = 'text-lg';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${widthClass} ${paddingClass} ${textClass} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
