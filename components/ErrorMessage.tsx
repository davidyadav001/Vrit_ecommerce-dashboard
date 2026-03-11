import { AlertCircle } from 'lucide-react';
import { cn } from '@/utils/utils';

interface ErrorMessageProps {
    message: string;
    className?: string;
}

export const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
    return (
        <div
            className={cn(
                'flex items-center gap-3 p-5 bg-red-500/5 text-red-600 rounded-[2rem] border border-red-500/10 shadow-xl shadow-red-500/5',
                className
            )}
        >
            <AlertCircle size={20} className="flex-shrink-0" />
            <p className="text-xs font-black uppercase tracking-widest leading-relaxed">{message}</p>
        </div>
    );
};
