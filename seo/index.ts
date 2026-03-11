import { Metadata } from 'next';

export const siteConfig = {
    name: 'VritDash E-commerce',
    description: 'Production-ready E-commerce Dashboard built with Next.js 14, TailwindCSS and Zustand.',
    url: 'https://vritdash.ecommerce.com',
};

export function constructMetadata({
    title = siteConfig.name,
    description = siteConfig.description,
    image = '/og-image.png',
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title: {
            default: title,
            template: `%s | ${siteConfig.name}`,
        },
        description,
        openGraph: {
            title,
            description,
            images: [{ url: image }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: '@vrittechnologies',
        },
        icons: {
            icon: '/favicon.ico',
        },
        metadataBase: new URL(siteConfig.url),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
