'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/Button';
import { Loader } from '@/components/Loader';
import { formatPrice, cn } from '@/utils/utils';
import {
    ChevronRight,
    CreditCard,
    Truck,
    CheckCircle2,
    ShieldCheck,
    ShoppingBag,
    Wallet,
    MapPin
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Step = 'shipping' | 'payment' | 'processing' | 'success';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getTotalPrice, clearCart } = useCartStore();
    const { user, isAuthenticated } = useAuthStore();
    const [step, setStep] = useState<Step>('shipping');
    const [loading, setLoading] = useState(true);

    const subtotal = getTotalPrice();
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const [shipping, setShipping] = useState({
        fullName: user?.username || '',
        email: user?.username ? `${user.username}@example.com` : '',
        address: user?.homeAddress || '',
        city: '',
        zipCode: '',
        country: 'United States'
    });

    const [payment, setPayment] = useState({
        cardNumber: '',
        expiry: '',
        cvc: '',
        nameOnCard: user?.username || ''
    });

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login?callbackUrl=/checkout');
        } else if (items.length === 0 && step !== 'success') {
            router.push('/products');
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, items.length, router, step]);

    const onPay = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('processing');
        setTimeout(() => {
            setStep('success');
            clearCart();
        }, 2000);
    };

    if (loading) return (
        <div className="h-[80vh] flex items-center justify-center">
            <Loader size="lg" />
        </div>
    );

    const StepIcon = ({ active, icon: Icon, label }: { active: boolean, icon: any, label: string }) => (
        <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition-all",
            active ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
        )}>
            <Icon size={14} /> {label}
        </div>
    );

    const InputField = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
        <div className="space-y-1.5 flex-grow">
            <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider ml-1">{label}</label>
            <input className="input-premium w-full" required {...props} />
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">
                        {step === 'success' ? 'Order' : 'Safe'} <span className="text-blue-600">Checkout</span>
                    </h1>
                    <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest opacity-80">
                        {step === 'success' ? 'Receipt verified' : 'Secure Transaction'}
                    </p>
                </div>

                {step !== 'processing' && step !== 'success' && (
                    <div className="flex items-center gap-4">
                        <StepIcon active={step === 'shipping'} icon={Truck} label="Shipping" />
                        <ChevronRight size={14} className="text-zinc-300" />
                        <StepIcon active={step === 'payment'} icon={CreditCard} label="Payment" />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    {step === 'shipping' && (
                        <div className="card-premium p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <MapPin size={20} className="text-blue-600" /> Shipping Info
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Full Name" value={shipping.fullName} onChange={e => setShipping({ ...shipping, fullName: e.target.value })} />
                                <InputField label="Email Address" type="email" value={shipping.email} onChange={e => setShipping({ ...shipping, email: e.target.value })} />
                                <div className="md:col-span-2">
                                    <InputField label="Street Address" value={shipping.address} onChange={e => setShipping({ ...shipping, address: e.target.value })} />
                                </div>
                                <InputField label="City" value={shipping.city} onChange={e => setShipping({ ...shipping, city: e.target.value })} />
                                <InputField label="ZIP Code" value={shipping.zipCode} onChange={e => setShipping({ ...shipping, zipCode: e.target.value })} />
                            </div>
                            <Button className="w-full h-14 text-lg" onClick={() => setStep('payment')}>Continue to Payment</Button>
                        </div>
                    )}

                    {step === 'payment' && (
                        <form onSubmit={onPay} className="card-premium p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <ShieldCheck size={20} className="text-blue-600" /> Payment details
                            </h2>
                            <div className="bg-zinc-900 rounded-3xl p-8 text-white relative overflow-hidden mb-8 shadow-2xl shadow-blue-500/20 aspect-[16/9] flex flex-col justify-between max-w-md mx-auto">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/30 rounded-full -mr-16 -mt-16 blur-3xl" />
                                <div className="flex justify-between items-start z-10">
                                    <div className="w-12 h-9 bg-zinc-800 rounded-lg" />
                                    <Wallet size={32} className="opacity-40" />
                                </div>
                                <div className="space-y-1 z-10">
                                    <p className="text-[10px] uppercase font-black opacity-40">Card Number</p>
                                    <p className="text-xl font-mono tracking-[0.2em]">{payment.cardNumber || '•••• •••• •••• ••••'}</p>
                                </div>
                                <div className="flex justify-between items-end z-10">
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase font-black opacity-40">Holder</p>
                                        <p className="font-bold text-sm uppercase">{payment.nameOnCard || 'User Name'}</p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p className="text-[10px] uppercase font-black opacity-40">Expires</p>
                                        <p className="font-bold text-sm tracking-widest">{payment.expiry || 'MM/YY'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <InputField label="Card Number" value={payment.cardNumber} onChange={e => setPayment({ ...payment, cardNumber: e.target.value })} />
                                </div>
                                <InputField label="Expiry" placeholder="MM/YY" value={payment.expiry} onChange={e => setPayment({ ...payment, expiry: e.target.value })} />
                                <InputField label="CVC" placeholder="•••" value={payment.cvc} onChange={e => setPayment({ ...payment, cvc: e.target.value })} />
                            </div>
                            <div className="flex gap-4">
                                <Button type="button" variant="outline" onClick={() => setStep('shipping')}>Back</Button>
                                <Button type="submit" className="flex-grow h-14 text-lg bg-blue-600">Pay {formatPrice(total)}</Button>
                            </div>
                        </form>
                    )}

                    {step === 'processing' && (
                        <div className="card-premium p-12 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]">
                            <div className="relative">
                                <div className="w-20 h-20 border-4 border-blue-600/10 rounded-full animate-spin border-t-blue-600" />
                                <ShieldCheck size={32} className="text-blue-600 absolute inset-0 m-auto" />
                            </div>
                            <h2 className="text-2xl font-black">Securely Processing</h2>
                            <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest opacity-60">Verification in progress</p>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="card-premium p-12 flex flex-col items-center text-center space-y-8 animate-in zoom-in-95 duration-700">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                                <CheckCircle2 size={40} className="text-green-500" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black mb-2">Order Confirmed!</h2>
                                <p className="text-zinc-500 font-bold">Ref: #VRIT-{Math.floor(1000 + Math.random() * 9000)}</p>
                            </div>
                            <div className="w-full max-w-sm bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-8 text-left space-y-4">
                                <p className="text-xs leading-relaxed text-zinc-500 font-medium">
                                    We&apos;ve sent a receipt to <span className="text-blue-600 font-black">{shipping.email}</span>.
                                    Delivery expected in <span className="text-zinc-900 dark:text-zinc-100 font-black">2-4 business days</span>.
                                </p>
                            </div>
                            <Link href="/products" className="w-full max-w-xs">
                                <Button className="w-full h-14 text-lg">Return to Shop</Button>
                            </Link>
                        </div>
                    )}
                </div>

                <aside className="lg:sticky lg:top-32 space-y-6">
                    <div className="card-premium p-6">
                        <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                            <ShoppingBag size={20} className="text-blue-600" /> Order Summary
                        </h3>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-6 custom-scrollbar">
                            {items.map((i) => (
                                <div key={`${i.id}-${i.selectedColor}-${i.selectedSize}`} className="flex gap-4">
                                    <div className="w-16 h-16 bg-white rounded-2xl p-2 flex-shrink-0 border border-zinc-100">
                                        <Image src={i.image} alt={i.title} width={64} height={64} className="object-contain" />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <p className="text-xs font-black truncate">{i.title}</p>
                                        <p className="text-[10px] text-zinc-400 font-black uppercase">
                                            {i.quantity}x • {i.selectedColor} • {i.selectedSize}
                                        </p>
                                        <p className="text-sm font-black text-blue-600 mt-1">{formatPrice(i.price * i.quantity)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="flex justify-between text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                                <span>Estimated Tax</span>
                                <span>{formatPrice(tax)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-6 mt-2 border-t border-zinc-100 dark:border-zinc-800">
                                <span className="text-lg font-black">Total</span>
                                <span className="text-2xl font-black text-blue-600">{formatPrice(total)}</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
