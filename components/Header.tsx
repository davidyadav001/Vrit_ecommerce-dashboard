'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, User, LayoutDashboard, LogOut, Heart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { Button } from './Button';
import { cn } from '@/utils/utils';

export const Header = () => {
    const router = useRouter();
    const total = useCartStore(s => s.getTotalItems());
    const favorites = useWishlistStore(s => s.favorites.length);
    const { isAuthenticated, logout } = useAuthStore();

    const onLogout = () => {
        logout();
        router.push('/');
    };

    const CartBadge = ({ count, color = "bg-blue-600" }: { count: number, color?: string }) => (
        count > 0 ? (
            <span className={cn("absolute -top-1 -right-1 text-white text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center", color)}>
                {count}
            </span>
        ) : null
    );

    return (
        <header className="sticky top-0 z-50 w-full glass-morphism border-b border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-all">
                        <LayoutDashboard size={20} className="text-white" />
                    </div>
                    <span className="font-black text-xl tracking-tight hidden sm:block">
                        Vrit<span className="text-blue-600">Dash</span>
                    </span>
                </Link>

                <div className="flex items-center gap-2 sm:gap-4">
                    <Link href="/wishlist">
                        <Button variant="ghost" size="icon" className="relative group/wish">
                            <Heart size={20} className="group-hover/wish:fill-red-500 group-hover/wish:text-red-500 transition-colors" />
                            <CartBadge count={favorites} color="bg-red-500" />
                        </Button>
                    </Link>

                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart size={20} />
                            <CartBadge count={total} />
                        </Button>
                    </Link>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-2 ml-2">
                            <Link href="/profile">
                                <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                                    <User size={16} /> Profile
                                </Button>
                            </Link>
                            <Button variant="ghost" size="icon" onClick={onLogout} title="Sign Out">
                                <LogOut size={20} className="text-zinc-500 hover:text-zinc-900" />
                            </Button>
                        </div>
                    ) : (
                        <Link href="/login" className="ml-2">
                            <Button size="sm">Log In</Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};
