export interface ColorVariant {
    name: string;
    hex: string;
    filter?: string; // CSS Filter to simulate color on the base image
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    colorVariants?: ColorVariant[];
    sizes?: string[];
}

export interface CartItem extends Product {
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    name: {
        firstname: string;
        lastname: string;
    };
}

export interface AuthResponse {
    token: string;
}

export type SortOrder = 'asc' | 'desc';

export interface ProductsSearchParams {
    sort?: SortOrder;
    category?: string;
    limit?: number;
}

export interface FilterState {
    category: string;
    priceRange: [number, number];
    search: string;
    sort: SortOrder;
}
