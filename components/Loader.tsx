import { cn } from '@/utils/utils';

interface LoaderProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const Loader = ({ className, size = 'md' }: LoaderProps) => {
    const sizeClasses = {
        sm: 'w-6 h-6 border-2',
        md: 'w-10 h-10 border-[3px]',
        lg: 'w-16 h-16 border-4',
    };

    return (
        <div className={cn('flex items-center justify-center p-8', className)}>
            <div
                className={cn(
                    'animate-spin rounded-full border-zinc-100 dark:border-zinc-800 border-t-blue-600 shadow-2xl shadow-blue-500/20',
                    sizeClasses[size]
                )}
            />
        </div>
    );
};
