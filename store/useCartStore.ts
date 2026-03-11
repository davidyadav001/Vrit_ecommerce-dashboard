import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartState {
    items: CartItem[];
    addItem: (product: Product, selectedColor?: string, selectedSize?: string) => void;
    removeItem: (productId: number, selectedColor?: string, selectedSize?: string) => void;
    updateQuantity: (productId: number, quantity: number, selectedColor?: string, selectedSize?: string) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, selectedColor, selectedSize) => {
                const current = get().items;
                const existingIndex = current.findIndex(
                    (item) => item.id === product.id &&
                        item.selectedColor === selectedColor &&
                        item.selectedSize === selectedSize
                );

                if (existingIndex > -1) {
                    const nextItems = [...current];
                    nextItems[existingIndex] = {
                        ...nextItems[existingIndex],
                        quantity: nextItems[existingIndex].quantity + 1
                    };
                    set({ items: nextItems });
                } else {
                    set({
                        items: [...current, { ...product, quantity: 1, selectedColor, selectedSize }]
                    });
                }
            },
            removeItem: (id, color, size) => {
                set({
                    items: get().items.filter(i => !(i.id === id && i.selectedColor === color && i.selectedSize === size))
                });
            },
            updateQuantity: (id, quantity, color, size) => {
                if (quantity <= 0) {
                    get().removeItem(id, color, size);
                    return;
                }
                set({
                    items: get().items.map(i =>
                        (i.id === id && i.selectedColor === color && i.selectedSize === size)
                            ? { ...i, quantity }
                            : i
                    )
                });
            },
            clearCart: () => set({ items: [] }),
            getTotalPrice: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
            getTotalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
