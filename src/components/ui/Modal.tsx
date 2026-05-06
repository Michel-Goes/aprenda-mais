import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = '3xl',
  showCloseButton = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-full',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`bg-white flex flex-col w-full ${maxWidthClasses[maxWidth]} max-h-[85vh] rounded-[1.5rem] md:rounded-[2rem] shadow-2xl pointer-events-auto overflow-hidden`}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="px-6 pt-6 pb-4 md:px-8 md:pt-8 flex justify-between items-start border-b border-surface-variant/50 bg-white relative z-10 shrink-0">
                  <div>
                    {title && <h2 className="text-xl md:text-2xl font-headline font-extrabold text-on-surface">{title}</h2>}
                    {description && <p className="text-xs md:text-sm font-body text-on-surface-variant mt-1.5">{description}</p>}
                  </div>
                  {showCloseButton && (
                    <button 
                      onClick={onClose}
                      className="text-primary font-bold font-label text-sm md:text-base hover:text-primary-dim transition-colors pt-1 flex items-center gap-1"
                    >
                      <X className="w-5 h-5 md:hidden" />
                      <span className="hidden md:inline">Fechar</span>
                    </button>
                  )}
                </div>
              )}
              
              {/* Content */}
              <div className="overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
