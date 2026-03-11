'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/services/authService';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LayoutDashboard, Lock, User } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const setAuth = useAuthStore(s => s.setAuth);

    const [username, setUsername] = useState('mor_2314');
    const [password, setPassword] = useState('83r5^_');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const callbackUrl = searchParams.get('callbackUrl') || '/products';

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await authService.login(username, password);
            setAuth(res.token, { username });
            router.push(callbackUrl);
        } catch (err: any) {
            setError(err.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="card-premium w-full max-w-md p-10">
                <div className="flex flex-col items-center mb-10">
                    <div className="bg-blue-600 p-4 rounded-3xl mb-6 shadow-2xl shadow-blue-500/40">
                        <LayoutDashboard size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-black">Vrit<span className="text-blue-600">Dash</span></h1>
                    <p className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] mt-2">Executive Portal</p>
                </div>

                {error && <ErrorMessage message={error} className="mb-6" />}

                <form onSubmit={onLogin} className="space-y-6">
                    <Input label="Username" value={username} onChange={e => setUsername(e.target.value)} required />
                    <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <Button type="submit" size="lg" className="w-full h-14 text-lg" isLoading={loading}>Authenticate</Button>
                </form>

                <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    <span>Demo Mode Enabled</span>
                    <span className="text-blue-600 cursor-pointer hover:underline">Support</span>
                </div>

                <div className="mt-6 bg-blue-600/5 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-600/10">
                    <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-3">Simulation Credentials</p>
                    <div className="flex justify-between font-mono text-xs">
                        <span className="opacity-50">UN: <span className="opacity-100 text-zinc-900 dark:text-zinc-100 font-bold">mor_2314</span></span>
                        <span className="opacity-50">PW: <span className="opacity-100 text-zinc-900 dark:text-zinc-100 font-bold">83r5^_</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
