import { Suspense } from 'react';
import CartClient from './CartClient';
import { Loader } from '@/components/Loader';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shopping Cart | VritDash',
    description: 'Manage your cart items and proceed to checkout.',
};

export default function CartPage() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader size="lg" /></div>}>
            <CartClient />
        </Suspense>
    );
}
