import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';

interface WishlistState {
    favorites: Product[];
    toggleFavorite: (product: Product) => void;
    isFavorite: (productId: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            favorites: [],
            toggleFavorite: (product) => {
                const current = get().favorites;
                const exists = current.some(p => p.id === product.id);

                set({
                    favorites: exists
                        ? current.filter(p => p.id !== product.id)
                        : [...current, product]
                });
            },
            isFavorite: (id) => get().favorites.some(p => p.id === id),
        }),
        {
            name: 'wishlist-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
