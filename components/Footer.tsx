import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="font-black text-xl tracking-tight">
                            Vrit<span className="text-blue-600">Dash</span>
                        </span>
                    </div>
                    <p className="text-zinc-500 text-sm">
                        © {new Date().getFullYear()} Vrit Technologies. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/documentation" className="text-zinc-400 hover:text-blue-600 text-sm transition-colors">Documentation</Link>
                        <Link href="/privacy" className="text-zinc-400 hover:text-blue-600 text-sm transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
