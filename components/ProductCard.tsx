'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, cn } from '@/utils/utils';
import { Button } from './Button';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const addItem = useCartStore(s => s.addItem);
    const { toggleFavorite, isFavorite } = useWishlistStore();
    const isFav = isFavorite(product.id);

    const handleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(product);
    };

    return (
        <div className="card-premium flex flex-col h-full group">
            <Link href={`/products/${product.id}`} className="relative h-64 w-full bg-white p-6 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                <button
                    onClick={handleFavorite}
                    className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all hover:scale-110 active:scale-95 group/heart"
                >
                    <Heart size={16} className={cn("transition-colors", isFav ? "fill-red-500 text-red-500" : "text-zinc-400 group-hover/heart:text-red-500")} />
                </button>

                <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-2 py-1 rounded-md text-xs font-semibold border border-zinc-100 dark:border-zinc-800 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    {product.rating.rate}
                </div>
            </Link>

            <div className="p-5 flex flex-col flex-grow">
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-black mb-1">
                    {product.category}
                </p>
                <Link href={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
                    <h3 className="text-sm font-bold line-clamp-2 mb-2 min-h-[40px]">
                        {product.title}
                    </h3>
                </Link>
                <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-zinc-50 dark:border-zinc-800/50">
                    <p className="text-lg font-black">{formatPrice(product.price)}</p>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="gap-2"
                        onClick={(e) => {
                            e.preventDefault();
                            addItem(product);
                        }}
                    >
                        <ShoppingCart size={14} /> Add
                    </Button>
                </div>
            </div>
        </div>
    );
};
