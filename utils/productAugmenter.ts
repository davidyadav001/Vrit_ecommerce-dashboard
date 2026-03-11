import { Product, ColorVariant } from '@/types';

const CLOTHING_COLORS: ColorVariant[] = [
    { name: 'White', hex: '#FFFFFF', filter: 'brightness(2) contrast(1)' },
    { name: 'Black', hex: '#000000', filter: 'brightness(0.2) contrast(1.2)' },
    { name: 'Blue', hex: '#3B82F6', filter: 'hue-rotate(180deg) brightness(0.8) saturate(1.5)' },
    { name: 'Red', hex: '#EF4444', filter: 'hue-rotate(0deg) saturate(2)' },
    { name: 'Green', hex: '#10B981', filter: 'hue-rotate(90deg) brightness(0.9)' },
];

const CLOTHING_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export const augmentProduct = (product: Product): Product => {
    const category = product.category.toLowerCase();
    const isClothing = category.includes('clothing');

    if (isClothing) {
        return {
            ...product,
            colorVariants: CLOTHING_COLORS.slice(0, 3 + (product.id % 3)), // Give 3-5 variants
            sizes: CLOTHING_SIZES,
        };
    }

    return product;
};
