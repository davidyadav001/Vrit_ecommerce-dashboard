import Link from 'next/link';
import { Button } from '@/components/Button';
import { LayoutDashboard, ArrowRight, ShoppingBag, Zap, ShieldCheck, Globe } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 -z-10" />

      <main className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <div className="bg-blue-600/10 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold mb-8 animate-bounce">
          Introducing VritDash 2.0
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 max-w-4xl leading-[1.1]">
          Modern E-Commerce <br />
          <span className="text-blue-600">Dashboard for Visionaries</span>
        </h1>

        <p className="text-xl text-zinc-500 dark:text-zinc-400 mb-12 max-w-2xl leading-relaxed">
          Experience the power of Next.js 14 and Fake Store API.
          Blazing fast, secure, and designed for ultimate productivity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-24">
          <Link href="/products">
            <Button size="lg" className="h-16 px-8 text-lg gap-2 shadow-2xl shadow-blue-500/40">
              Launch Dashboard <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/documentation">
            <Button variant="outline" size="lg" className="h-16 px-8 text-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              View Documentation
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {[
            { icon: Zap, title: "Extreme Speed", desc: "Optimized with SSR and ISR for instant page loads." },
            { icon: ShoppingBag, title: "Cart System", desc: "Persistent shopping cart with Zustand state management." },
            { icon: ShieldCheck, title: "Auth Protected", desc: "Secure authentication flow and protected dashboard routes." }
          ].map((feature, i) => (
            <div key={i} className="card-premium p-8 text-left hover:border-blue-500/50 transition-colors group">
              <div className="bg-blue-600/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
