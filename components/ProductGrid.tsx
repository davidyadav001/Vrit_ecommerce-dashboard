import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
    products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-500 dark:text-zinc-400 font-medium">No products found fitting your criteria.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
