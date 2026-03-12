import { productService } from '@/services/productService';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ProductDetailClient } from './ProductDetailClient';
import { augmentProduct } from '@/utils/productAugmenter';

export async function generateStaticParams() {
    const products = await productService.getAll();
    return products.map((product) => ({
        id: product.id.toString(),
    }));
}

interface ProductDetailPageProps {
    params: { id: string };
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
    const product = await productService.getById(parseInt(params.id));
    return {
        title: `${product.title} | VritDash`,
        description: product.description,
        openGraph: {
            images: [product.image],
        },
    };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const rawProduct = await productService.getById(parseInt(params.id));
    const product = augmentProduct(rawProduct);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        image: product.image,
        description: product.description,
        brand: {
            '@type': 'Brand',
            name: 'VritDash',
        },
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating.rate,
            reviewCount: product.rating.count,
        },
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Link href="/products" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-600 mb-8 transition-colors group">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to products
            </Link>

            <ProductDetailClient product={product} />
        </div>
    );
}
