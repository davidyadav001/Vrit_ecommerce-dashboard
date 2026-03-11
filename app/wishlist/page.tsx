'use client';

import { useWishlistStore } from '@/store/useWishlistStore';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/Button';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
    const favorites = useWishlistStore(s => s.favorites);

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <h1 className="text-4xl font-black tracking-tight mb-8">
                Your <span className="text-red-500">Wishlist</span>
            </h1>

            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {favorites.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            ) : (
                <div className="card-premium p-12 flex flex-col items-center justify-center text-center py-24">
                    <div className="bg-red-50 dark:bg-red-900/10 p-8 rounded-[2.5rem] mb-8 rotate-6 animate-pulse">
                        <Heart size={48} className="text-red-300" />
                    </div>
                    <h2 className="text-2xl font-black mb-2">Your wishlist is empty</h2>
                    <p className="text-zinc-500 mb-10 max-w-xs font-medium">
                        Curate your perfect collection. Start adding items you love!
                    </p>
                    <Link href="/products">
                        <Button size="lg" className="px-8">Explore Products</Button>
                    </Link>
                </div>
            )}

            <Link href="/products" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-600 mt-12 transition-all group font-black uppercase text-[10px] tracking-widest">
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Return to Shop
            </Link>
        </div>
    );
}
