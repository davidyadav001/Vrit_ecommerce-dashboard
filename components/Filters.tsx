'use client';

import { useMemo } from 'react';
import { cn } from '@/utils/utils';
import { Button } from './Button';

interface FiltersProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    priceRange: [number, number];
    onPriceRangeChange: (range: [number, number]) => void;
    sort: 'asc' | 'desc';
    onSortChange: (sort: 'asc' | 'desc') => void;
}

export const Filters = ({
    categories,
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceRangeChange,
    sort,
    onSortChange,
}: FiltersProps) => {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4 uppercase tracking-wider">
                    Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={selectedCategory === '' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => onCategoryChange('')}
                    >
                        All
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? 'primary' : 'outline'}
                            size="sm"
                            className="capitalize"
                            onClick={() => onCategoryChange(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4 uppercase tracking-wider">
                    Sort by Price
                </h3>
                <div className="flex gap-2">
                    <Button
                        variant={sort === 'asc' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => onSortChange('asc')}
                    >
                        Lowest First
                    </Button>
                    <Button
                        variant={sort === 'desc' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => onSortChange('desc')}
                    >
                        Highest First
                    </Button>
                </div>
            </div>

            <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4 uppercase tracking-wider">
                    Price Range (Max: ${priceRange[1]})
                </h3>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => onPriceRangeChange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-2 text-xs font-medium text-zinc-500">
                    <span>$0</span>
                    <span>$1000+</span>
                </div>
            </div>
        </div>
    );
};
