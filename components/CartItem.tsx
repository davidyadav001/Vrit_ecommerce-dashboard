'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { Button } from './Button';
import { formatPrice } from '@/utils/utils';

interface CartItemProps {
    item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
    const { updateQuantity, removeItem } = useCartStore();
    const { id, title, price, quantity, selectedColor, selectedSize, image, category } = item;

    const handleQty = (change: number) => updateQuantity(id, quantity + change, selectedColor, selectedSize);

    return (
        <div className="flex gap-4 py-6 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
            <div className="relative h-24 w-24 bg-white rounded-lg border border-zinc-100 dark:border-zinc-800 p-2 flex-shrink-0">
                <Image src={image} alt={title} fill className="object-contain" sizes="96px" />
            </div>

            <div className="flex flex-col flex-grow min-w-0">
                <div className="flex justify-between gap-2">
                    <h3 className="text-sm font-bold truncate">{title}</h3>
                    <p className="text-sm font-black">{formatPrice(price * quantity)}</p>
                </div>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-black mb-2">{category}</p>

                {(selectedColor || selectedSize) && (
                    <div className="flex gap-4 mb-4">
                        {selectedColor && (
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-zinc-400">Color</span>
                                <span className="text-xs font-bold">{selectedColor}</span>
                            </div>
                        )}
                        {selectedSize && (
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-zinc-400">Size</span>
                                <span className="text-xs font-bold">{selectedSize}</span>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                        <button onClick={() => handleQty(-1)} className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                            <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-black w-8 text-center">{quantity}</span>
                        <button onClick={() => handleQty(1)} className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                            <Plus size={12} />
                        </button>
                    </div>

                    <button
                        onClick={() => removeItem(id, selectedColor, selectedSize)}
                        className="text-zinc-400 hover:text-red-500 transition-all p-1 hover:scale-110"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
