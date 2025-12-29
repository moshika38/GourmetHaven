import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Slot } from '@radix-ui/react-slot';

// Utility for class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-primary cursor-pointer text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25': variant === 'default',
            'border border-input bg-transparent hover:bg-muted hover:text-foreground': variant === 'outline',
            'hover:bg-muted hover:text-foreground': variant === 'ghost',
            'bg-secondary text-secondary-foreground hover:opacity-80': variant === 'secondary',
            'bg-white text-black hover:bg-gray-100': variant === 'accent',
            'h-9 px-4 py-2 text-sm': size === 'sm',
            'h-10 px-6 py-2 text-base': size === 'md',
            'h-12 px-8 py-3 text-lg': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, cn };
