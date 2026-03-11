import { api } from './api';
import { Product, ProductsSearchParams } from '@/types';

export const productService = {
    getAll: async (params?: ProductsSearchParams): Promise<Product[]> => {
        let endpoint = '/products';
        const queryParams = new URLSearchParams();

        if (params?.sort) queryParams.append('sort', params.sort);
        if (params?.limit) queryParams.append('limit', params.limit.toString());

        const queryString = queryParams.toString();
        if (queryString) endpoint += `?${queryString}`;

        return api.get<Product[]>(endpoint);
    },

    getById: async (id: number): Promise<Product> => {
        return api.get<Product>(`/products/${id}`);
    },

    getCategories: async (): Promise<string[]> => {
        return api.get<string[]>('/products/categories');
    },

    getByCategory: async (category: string, params?: ProductsSearchParams): Promise<Product[]> => {
        let endpoint = `/products/category/${category}`;
        if (params?.sort) endpoint += `?sort=${params.sort}`;

        return api.get<Product[]>(endpoint);
    },
};
