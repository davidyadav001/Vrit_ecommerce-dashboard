'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/Button';
import { Loader } from '@/components/Loader';
import {
    User,
    Mail,
    MapPin,
    Package,
    CreditCard,
    Settings,
    ArrowLeft,
    ShoppingBag,
    Bell,
    ShieldCheck,
    Star,
    Phone
} from 'lucide-react';
import Link from 'next/link';
import { formatPrice, cn } from '@/utils/utils';

export default function ProfilePage() {
    const router = useRouter();
    const { user, isAuthenticated, logout, updateProfile } = useAuthStore();
    const { items, getTotalPrice } = useCartStore();
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    const [form, setForm] = useState({
        homeAddress: user?.homeAddress || '',
        officeAddress: user?.officeAddress || '',
        phone: user?.phone || '',
    });

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login?callbackUrl=/profile');
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        if (user) setForm({
            homeAddress: user.homeAddress || '',
            officeAddress: user.officeAddress || '',
            phone: user.phone || '',
        });
    }, [user]);

    const onSave = () => {
        updateProfile(form);
        setEditing(false);
    };

    if (loading) return (
        <div className="h-[80vh] flex items-center justify-center">
            <Loader size="lg" />
        </div>
    );

    const StatCard = ({ icon: Icon, label, value, color }: any) => (
        <div className="card-premium p-6 hover:-translate-y-1 transition-transform group">
            <Icon className={cn("w-6 h-6 mb-4 transition-transform group-hover:scale-110", color)} />
            <p className="text-2xl font-black">{value}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-1">{label}</p>
        </div>
    );

    const InfoRow = ({ icon: Icon, label, value, color }: any) => (
        <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group">
            <div className={cn("p-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 shadow-sm transition-transform group-hover:rotate-6", color)}>
                <Icon size={16} />
            </div>
            <div className="flex-grow min-w-0">
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-0.5">{label}</p>
                <p className="text-sm font-bold truncate text-zinc-700 dark:text-zinc-300">{value || 'Not provided'}</p>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <Link href="/products" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-600 mb-12 transition-all group font-black uppercase text-[10px] tracking-widest">
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Back to Market
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                <aside className="lg:col-span-1 space-y-6">
                    <div className="card-premium p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-blue-600/10 to-transparent" />
                        <div className="relative mb-6 inline-block">
                            <div className="w-32 h-32 rounded-3xl bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/30 rotate-3">
                                <span className="text-5xl font-black text-white">{user?.username?.[0]?.toUpperCase()}</span>
                            </div>
                            <button onClick={() => setEditing(!editing)} className={cn(
                                "absolute -bottom-2 -right-2 p-3 rounded-2xl shadow-xl border transition-all hover:scale-110",
                                editing ? "bg-red-500 text-white border-red-400" : "bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700"
                            )}>
                                <Settings size={16} className={editing ? 'animate-spin' : ''} />
                            </button>
                        </div>

                        <h2 className="text-2xl font-black mb-1">{user?.username}</h2>
                        <p className="text-xs font-black text-blue-600 uppercase tracking-widest opacity-80 mb-8">Premium Customer</p>

                        <div className="space-y-2 text-left bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-3xl">
                            {editing ? (
                                <div className="space-y-4 p-2">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Phone</label>
                                        <input className="input-premium w-full" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Home Address</label>
                                        <input className="input-premium w-full" value={form.homeAddress} onChange={e => setForm({ ...form, homeAddress: e.target.value })} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Office Address</label>
                                        <input className="input-premium w-full" value={form.officeAddress} onChange={e => setForm({ ...form, officeAddress: e.target.value })} />
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <Button className="flex-grow" onClick={onSave}>Update Profile</Button>
                                        <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <InfoRow icon={Mail} label="Contact Email" value={`${user?.username}@vrit.com`} color="text-zinc-500" />
                                    <InfoRow icon={Phone} label="Contact Phone" value={user?.phone} color="text-green-500" />
                                    <InfoRow icon={MapPin} label="Home Base" value={user?.homeAddress} color="text-blue-500" />
                                    <InfoRow icon={ShoppingBag} label="Working At" value={user?.officeAddress} color="text-purple-500" />
                                </>
                            )}
                        </div>

                        <Button variant="outline" className="w-full mt-8 border-none bg-zinc-100 dark:bg-zinc-800 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600" onClick={() => { logout(); router.push('/'); }}>
                            Terminate Session
                        </Button>
                    </div>
                </aside>

                <main className="lg:col-span-2 space-y-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <StatCard icon={Package} label="Loyalty Rank" value="DIAMOND" color="text-blue-600" />
                        <StatCard icon={ShoppingBag} label="Cart Power" value={items.length} color="text-green-600" />
                        <StatCard icon={Star} label="Wishlist Size" value="8" color="text-yellow-600" />
                        <StatCard icon={CreditCard} label="Market Value" value={formatPrice(getTotalPrice())} color="text-purple-600" />
                    </div>

                    <div className="card-premium overflow-hidden">
                        <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
                            <h3 className="text-xl font-black">Shipment Logs</h3>
                            <Button variant="ghost" size="sm" className="font-bold text-[10px] uppercase tracking-widest">Global History</Button>
                        </div>
                        <div className="p-8 space-y-10">
                            {[
                                { title: 'Package Delivered', time: '2h ago', status: 'COMPLETE', info: 'Fashion Collection #VRIT-3921' },
                                { title: 'Route Updated', time: 'Yesterday', status: 'PENDING', info: 'Carrier redirected to office address' },
                                { title: 'Wallet Verified', time: '3d ago', status: 'SECURE', info: 'Primary card linked successfully' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 relative">
                                    {i < 2 && <div className="absolute left-[3px] top-4 w-[1px] h-16 bg-zinc-200 dark:bg-zinc-800" />}
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 z-10 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                                    <div className="flex-grow">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-black text-sm">{item.title}</h4>
                                            <span className="text-[9px] font-black uppercase tracking-tighter text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">{item.status}</span>
                                        </div>
                                        <p className="text-xs text-zinc-500 font-medium mb-1">{item.info}</p>
                                        <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
