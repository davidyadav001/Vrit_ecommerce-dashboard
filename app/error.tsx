'use client';

import { useEffect } from 'react';
import { Button } from '@/components/Button';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="h-screen flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-full mb-8">
                <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-3xl font-black mb-4 tracking-tight">Something went wrong!</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-2 max-w-md">
                We encountered an unexpected error.
            </p>
            <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8 max-w-md break-all">
                {error.message || 'Unknown error'}
            </div>
            <Button onClick={() => reset()} size="lg" className="gap-2">
                <RefreshCcw className="w-4 h-4" />
                Try again
            </Button>
        </div>
    );
}
