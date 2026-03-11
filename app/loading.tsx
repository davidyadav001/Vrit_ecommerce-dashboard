import { Loader } from '@/components/Loader';

export default function Loading() {
    return (
        <div className="h-screen flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm fixed inset-0 z-[100]">
            <div className="flex flex-col items-center gap-4">
                <Loader size="lg" />
                <p className="text-sm font-bold text-zinc-500 animate-pulse uppercase tracking-widest">
                    Loading VritDash...
                </p>
            </div>
        </div>
    );
}
