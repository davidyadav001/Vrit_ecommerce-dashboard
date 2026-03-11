import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    token: string | null;
    user: {
        username: string;
        homeAddress?: string;
        officeAddress?: string;
        phone?: string;
    } | null;
    setAuth: (token: string, user?: { username: string }) => void;
    updateProfile: (data: { homeAddress?: string; officeAddress?: string; phone?: string }) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            setAuth: (token, userData) => set({
                token,
                user: userData ? {
                    username: userData.username,
                    homeAddress: '',
                    officeAddress: '',
                    phone: ''
                } : null,
                isAuthenticated: true
            }),
            updateProfile: (data) => set((state) => ({
                user: state.user ? { ...state.user, ...data } : null
            })),
            logout: () => set({ token: null, user: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
