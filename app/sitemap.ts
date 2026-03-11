import { MetadataRoute } from 'next';
import { productService } from '@/services/productService';
import { BASE_URL } from '@/services/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await productService.getAll();

    const productUrls = products.map((product) => ({
        url: `${BASE_URL}/products/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/products`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        ...productUrls,
    ];
}
