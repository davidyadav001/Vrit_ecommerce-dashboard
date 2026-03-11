'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { CartItem } from '@/components/CartItem';
import { CartSummary } from '@/components/CartSummary';
import { Button } from '@/components/Button';
import { Loader } from '@/components/Loader';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CartClient() {
    const router = useRouter();
    const items = useCartStore(s => s.items);
    const isAuthenticated = useAuthStore(s => s.isAuthenticated);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login?callbackUrl=/cart');
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, router]);

    if (loading) return (
        <div className="h-[60vh] flex items-center justify-center">
            <Loader size="lg" />
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <h1 className="text-4xl font-black tracking-tight mb-8">
                Your <span className="text-blue-600">Cart</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-grow">
                    {items.length > 0 ? (
                        <div className="card-premium p-6">
                            <div className="flex flex-col">
                                {items.map((item) => (
                                    <CartItem key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} item={item} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="card-premium p-12 flex flex-col items-center justify-center text-center">
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-full mb-6">
                                <ShoppingBag size={48} className="text-zinc-300" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                            <p className="text-zinc-500 mb-8 max-w-xs">
                                Looks like you haven&apos;t added anything to your cart yet.
                            </p>
                            <Link href="/products">
                                <Button>Start Shopping</Button>
                            </Link>
                        </div>
                    )}

                    <Link href="/products" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-600 mt-8 transition-colors group font-bold">
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        Continue shopping
                    </Link>
                </div>

                <aside className="w-full lg:w-96 flex-shrink-0">
                    <CartSummary />
                </aside>
            </div>
        </div>
    );
}
