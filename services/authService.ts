import { api } from './api';
import { AuthResponse } from '@/types';

export const authService = {
    login: async (username: string, password: string): Promise<AuthResponse> => {
        return api.post<AuthResponse>('/auth/login', {
            username,
            password,
        });
    },
};
