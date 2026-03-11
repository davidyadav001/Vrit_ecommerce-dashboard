import { ArrowLeft, Shield, Lock, Eye, FileText, Globe } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-600 mb-8 transition-colors group">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Dashboard
            </Link>

            <div className="flex flex-col gap-6 mb-12">
                <div className="bg-blue-600/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-4xl font-black tracking-tight">Privacy Policy</h1>
                <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    At VritDash, we take your privacy seriously. This document outlines how we collect, use, and protect your information.
                </p>
            </div>

            <div className="space-y-12">
                <section className="card-premium p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Eye className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold">Data Collection</h2>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                        We collect minimal technical information to provide you with the best experience. This includes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                        <li>Session and authentication tokens stored securely via Zustand and localStorage.</li>
                        <li>Browser-level information to optimize responsiveness and theme synchronization.</li>
                        <li>Cart items and preferences to ensure persistence across sessions.</li>
                    </ul>
                </section>

                <section className="card-premium p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Lock className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold">Security Measures</h2>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        All data processed by VritDash is handled with industry-standard encryption. We never share your shopping habits or authentication credentials with third-party vendors. Your account security is our top priority.
                    </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-blue-600 font-bold">
                            <FileText className="w-5 h-5" />
                            <h4>GDPR Compliance</h4>
                        </div>
                        <p className="text-sm text-zinc-500">Fully compliant with global data protection regulations to give you full control over your digital footprint.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-blue-600 font-bold">
                            <Globe className="w-5 h-5" />
                            <h4>Global Standards</h4>
                        </div>
                        <p className="text-sm text-zinc-500">Adhering to the highest international security protocols for e-commerce data integrity.</p>
                    </div>
                </div>

                <section className="pt-12 border-t border-zinc-100 dark:border-zinc-800 italic">
                    <p className="text-zinc-400 text-sm">
                        Last updated: March 11, 2026. For further inquiries regarding our privacy practices, please contact our legal department at legal@vritdash.com.
                    </p>
                </section>
            </div>
        </div>
    );
}
