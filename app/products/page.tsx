import { Suspense } from 'react';
import { productService } from '@/services/productService';
import ProductsClient from './ProductsClient';
import { Loader } from '@/components/Loader';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Products | VritDash E-commerce',
    description: 'Browse our extensive collection of products with real-time filtering and sorting.',
};

export default async function ProductsPage() {
    // Fetch data on the server
    const [products, categories] = await Promise.all([
        productService.getAll(),
        productService.getCategories(),
    ]);

    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader size="lg" /></div>}>
            <ProductsClient initialProducts={products} categories={categories} />
        </Suspense>
    );
}
