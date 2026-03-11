import { ArrowLeft, Book, Code, Rocket, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/Button';

export default function DocumentationPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-600 mb-12 transition-all group font-black uppercase text-[10px] tracking-widest">
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Back to Dashboard
            </Link>

            <div className="flex flex-col gap-6 mb-16">
                <div className="bg-blue-600/10 w-20 h-20 rounded-3xl flex items-center justify-center rotate-3 shadow-xl shadow-blue-500/10">
                    <Book size={32} className="text-blue-600" />
                </div>
                <h1 className="text-5xl font-black tracking-tighter">Documentation</h1>
                <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                    Welcome to the VritDash developer portal. Explore our technical architecture and core dashboard features.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                <div className="card-premium p-8 border-l-4 border-blue-600">
                    <Rocket size={24} className="text-blue-600 mb-6" />
                    <h3 className="text-xl font-black mb-3 text-zinc-900 dark:text-zinc-100">Quick Start</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-medium">
                        Get up and running in minutes with our streamlined setup process using Next.js 14 and Tailwind.
                    </p>
                    <ul className="text-xs space-y-3 text-zinc-400 font-black uppercase tracking-widest ml-1">
                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-600 rounded-full" /> npm install</li>
                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-600 rounded-full" /> npm run dev</li>
                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-600 rounded-full" /> localhost:3000</li>
                    </ul>
                </div>

                <div className="card-premium p-8 border-l-4 border-zinc-200 dark:border-zinc-800">
                    <Code size={24} className="text-blue-600 mb-6" />
                    <h3 className="text-xl font-black mb-3 text-zinc-900 dark:text-zinc-100">API Service</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-medium">
                        Pre-configured type-safe fetch wrapper for the Fake Store API with integrated error handling.
                    </p>
                    <div className="bg-zinc-900 rounded-2xl p-4 text-[10px] font-mono whitespace-pre overflow-x-auto text-blue-400 border border-zinc-800">
                        {`import { api } from '@/services/api';
const data = await api.get('/products');`}
                    </div>
                </div>
            </div>

            <div className="space-y-16">
                <section>
                    <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                        <Zap size={24} className="text-blue-600" />
                        Infrastructure
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {[
                            { title: 'SSR Architecture', desc: 'Server-side rendered by default for maximum SEO and performance.' },
                            { title: 'Zustand State', desc: 'Lightweight global state with persistent middleware for carts/wishlists.' },
                            { title: 'Luxury UI Kit', desc: 'Custom Tailwind design system with glassmorphism and focus on aesthetics.' },
                            { title: 'Secure Flow', desc: 'Verified multi-step checkout with simulated encryption and validation.' }
                        ].map((feat, i) => (
                            <div key={i} className="space-y-2">
                                <h4 className="font-black text-sm uppercase tracking-widest text-zinc-900 dark:text-zinc-100">{feat.title}</h4>
                                <p className="text-sm text-zinc-500 font-medium leading-relaxed">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-blue-600 rounded-[3rem] p-10 md:p-16 text-white overflow-hidden relative shadow-2xl shadow-blue-500/40">
                    <div className="relative z-10 max-w-md">
                        <h2 className="text-4xl font-black mb-6 tracking-tight">Need technical support?</h2>
                        <p className="text-blue-100 mb-10 font-medium leading-relaxed">
                            Access our full source library and community benchmarks to optimize your production integration.
                        </p>
                        <Button variant="secondary" className="bg-white text-blue-600 hover:bg-zinc-100 h-14 px-8 font-black text-sm uppercase tracking-widest">
                            Source Repository
                        </Button>
                    </div>
                    <Shield className="absolute -right-16 -bottom-16 w-80 h-80 text-white/5 rotate-12" />
                </section>
            </div>
        </div>
    );
}
