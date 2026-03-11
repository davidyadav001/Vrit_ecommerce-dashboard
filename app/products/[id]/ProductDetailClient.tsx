'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';
import { Product, ColorVariant } from '@/types';
import { formatPrice, cn } from '@/utils/utils';
import { AddToCartButton } from './AddToCartButton';

interface ProductDetailClientProps {
    product: Product;
}

export const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
    const hasVariants = product.colorVariants && product.colorVariants.length > 0;
    const [color, setColor] = useState<ColorVariant | undefined>(hasVariants ? product.colorVariants![0] : undefined);
    const [size, setSize] = useState<string | undefined>(product.sizes ? product.sizes[1] : undefined);

    const Badge = ({ icon: Icon, text }: { icon: any, text: string }) => (
        <div className="flex items-center gap-3">
            <Icon size={18} className="text-blue-600" />
            <span className="text-xs font-bold text-zinc-500">{text}</span>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="card-premium bg-white p-12 aspect-square relative flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full transition-all duration-300" style={{ filter: color?.filter || 'none' }}>
                    <Image src={product.image} alt={product.title} fill className="object-contain p-8 hover:scale-[1.02] transition-transform" priority />
                </div>
                {color && (
                    <div className="absolute bottom-4 right-4 glass-morphism px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        {color.name}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-6">
                <div>
                    <p className="text-xs text-blue-600 font-black uppercase tracking-[0.2em] mb-2">{product.category}</p>
                    <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{product.title}</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 bg-yellow-400/10 text-yellow-700 px-2 py-1 rounded-lg">
                        <Star size={14} className="fill-yellow-500 text-yellow-500" />
                        <span className="font-black text-sm">{product.rating.rate}</span>
                    </div>
                    <span className="text-zinc-400 text-sm font-bold">{product.rating.count} reviews</span>
                </div>

                <div className="py-6 border-y border-zinc-100 dark:border-zinc-800">
                    <p className="text-4xl font-black text-blue-600">{formatPrice(product.price)}</p>
                </div>

                {hasVariants && (
                    <div className="space-y-4">
                        <h3 className="font-black text-[10px] uppercase tracking-widest text-zinc-400">Color</h3>
                        <div className="flex flex-wrap gap-3">
                            {product.colorVariants?.map((c) => (
                                <button
                                    key={c.name}
                                    onClick={() => setColor(c)}
                                    className={cn(
                                        "w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center",
                                        color?.name === c.name ? "border-blue-600 scale-110 shadow-lg" : "border-zinc-100 dark:border-zinc-800"
                                    )}
                                    style={{ backgroundColor: c.hex }}
                                    title={c.name}
                                >
                                    {color?.name === c.name && <Check size={16} className={c.hex === '#FFFFFF' ? "text-black" : "text-white"} />}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {product.sizes && (
                    <div className="space-y-4">
                        <h3 className="font-black text-[10px] uppercase tracking-widest text-zinc-400">Size</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.sizes.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSize(s)}
                                    className={cn(
                                        "w-12 h-12 rounded-xl text-xs font-black border transition-all",
                                        size === s ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-blue-600"
                                    )}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    <h3 className="font-black text-xs uppercase tracking-widest text-zinc-400">Description</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{product.description}</p>
                </div>

                <AddToCartButton product={product} selectedColor={color?.name} selectedSize={size} />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                    <Badge icon={Truck} text="Free Delivery" />
                    <Badge icon={RotateCcw} text="30-Day Returns" />
                    <Badge icon={ShieldCheck} text="Secure Payment" />
                </div>
            </div>
        </div>
    );
};
