'use client';

import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/utils/utils';
import { Button } from './Button';
import Link from 'next/link';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';

export const CartSummary = () => {
    const { getTotalPrice, items } = useCartStore();
    const subtotal = getTotalPrice();
    const shipping = items.length > 0 ? 0 : 0; // Free shipping
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax + shipping;

    return (
        <div className="card-premium p-6 sticky top-24">
            <h2 className="text-xl font-black mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-zinc-500 font-medium">
                    <span>Subtotal</span>
                    <span className="text-zinc-900 dark:text-zinc-100">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-500 font-medium">
                    <span>Shipping</span>
                    <span className="text-green-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between text-zinc-500 font-medium">
                    <span>Taxes</span>
                    <span className="text-zinc-900 dark:text-zinc-100">{formatPrice(tax)}</span>
                </div>
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-black text-blue-600">
                        {formatPrice(total)}
                    </span>
                </div>
            </div>

            <Link href="/checkout" className="w-full">
                <Button variant="primary" size="lg" className="w-full h-14 text-lg gap-2" disabled={items.length === 0}>
                    <CreditCard className="w-5 h-5" />
                    Proceed to Checkout
                </Button>
            </Link>

            <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-xs text-zinc-500 font-semibold uppercase tracking-wider">
                    <Truck className="w-4 h-4 text-blue-600" />
                    Fast & Free Delivery
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-500 font-semibold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    Secure Checkout Guarantee
                </div>
            </div>
        </div>
    );
};
