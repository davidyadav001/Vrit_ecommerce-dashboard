const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // Final confirmed repository name: Vrit_ecommerce-dashboard
    basePath: isProd ? '/Vrit_ecommerce-dashboard' : '',
    assetPrefix: isProd ? '/Vrit_ecommerce-dashboard/' : '',
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com',
            },
        ],
    },
    trailingSlash: true,
};

export default nextConfig;
