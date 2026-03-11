import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={cn(
                        'flex h-12 w-full rounded-2xl border border-zinc-100 bg-zinc-50/50 px-4 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/5 focus-visible:border-blue-600 dark:border-zinc-800 dark:bg-zinc-900 dark:placeholder:text-zinc-500',
                        error && 'border-red-500 focus-visible:ring-red-500/5 focus-visible:border-red-500',
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-tight">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
