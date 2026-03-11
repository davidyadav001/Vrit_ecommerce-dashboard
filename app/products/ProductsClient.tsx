'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product, SortOrder } from '@/types';
import { ProductGrid } from '@/components/ProductGrid';
import { Filters } from '@/components/Filters';
import { SearchBar } from '@/components/SearchBar';
import { Pagination } from '@/components/Pagination';
import { Loader } from '@/components/Loader';

interface ProductsClientProps {
    initialProducts: Product[];
    categories: string[];
}

const ITEMS_PER_PAGE = 8;

export default function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [sort, setSort] = useState<SortOrder>((searchParams.get('sort') as SortOrder) || 'asc');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

    useEffect(() => {
        const p = new URLSearchParams();
        if (selectedCategory) p.set('category', selectedCategory);
        if (sort) p.set('sort', sort);
        if (search) p.set('search', search);
        if (page > 1) p.set('page', page.toString());

        router.push(`/products${p.size ? `?${p.toString()}` : ''}`, { scroll: false });
    }, [selectedCategory, sort, search, page, router]);

    const filtered = useMemo(() => {
        return initialProducts
            .filter(p => (
                (selectedCategory === '' || p.category === selectedCategory) &&
                p.title.toLowerCase().includes(search.toLowerCase()) &&
                p.price <= priceRange[1]
            ))
            .sort((a, b) => sort === 'asc' ? a.price - b.price : b.price - a.price);
    }, [initialProducts, selectedCategory, search, priceRange, sort]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return filtered.slice(start, start + ITEMS_PER_PAGE);
    }, [filtered, page]);

    useEffect(() => setPage(1), [selectedCategory, search, sort, priceRange]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-24 space-y-8">
                        <Filters
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            priceRange={priceRange}
                            onPriceRangeChange={setPriceRange}
                            sort={sort}
                            onSortChange={setSort}
                        />
                    </div>
                </aside>

                <main className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <h1 className="text-3xl font-black tracking-tight">
                            Explore <span className="text-blue-600">Products</span>
                        </h1>
                        <SearchBar onSearch={setSearch} initialValue={search} />
                    </div>

                    <div className="mb-6">
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-400">
                            Showing <span className="text-zinc-900 dark:text-zinc-100">{filtered.length}</span> results
                        </p>
                    </div>

                    <ProductGrid products={paginated} />
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </main>
            </div>
        </div>
    );
}
