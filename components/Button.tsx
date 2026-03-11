import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
        const variants = {
            primary: 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] shadow-xl shadow-blue-500/20',
            secondary: 'bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white',
            outline: 'border-2 border-zinc-100 bg-transparent hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-800 dark:hover:bg-zinc-900',
            ghost: 'bg-transparent hover:bg-zinc-100 active:scale-[0.98] dark:hover:bg-zinc-900',
            danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-[0.98] shadow-xl shadow-red-500/20',
        };

        const sizes = {
            sm: 'h-10 px-4 text-[10px] tracking-widest uppercase font-black',
            md: 'h-12 px-6 text-xs tracking-widest uppercase font-black',
            lg: 'h-14 px-10 text-sm tracking-widest uppercase font-black',
            icon: 'w-10 h-10',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                ) : null}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
