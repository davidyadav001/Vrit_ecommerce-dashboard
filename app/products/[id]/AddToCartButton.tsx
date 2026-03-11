'use client';

import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/Button';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
    product: Product;
    selectedColor?: string;
    selectedSize?: string;
}

export const AddToCartButton = ({ product, selectedColor, selectedSize }: AddToCartButtonProps) => {
    const addItem = useCartStore(s => s.addItem);
    const onAdd = () => addItem(product, selectedColor, selectedSize);

    return (
        <Button variant="primary" size="lg" className="w-full h-14 text-lg gap-3" onClick={onAdd}>
            <ShoppingCart size={20} />
            Add to Shopping Cart
        </Button>
    );
};
