import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  rightIcon?: React.ReactNode;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, icon: Icon, rightIcon, error, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          {Icon && (
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
          )}
          <input
            ref={ref}
            className={`w-full bg-surface-container-high border-none rounded-DEFAULT py-4 font-body focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-outline-variant outline-none ${
              Icon ? 'pl-12' : 'pl-4'
            } ${rightIcon ? 'pr-12' : 'pr-4'} ${error ? 'ring-2 ring-error' : ''} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-error text-xs font-medium ml-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
