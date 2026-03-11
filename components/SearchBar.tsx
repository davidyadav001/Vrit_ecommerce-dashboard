'use client';

import { Search, X } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { useState, useEffect } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    initialValue?: string;
}

export const SearchBar = ({ onSearch, initialValue = '' }: SearchBarProps) => {
    const [query, setQuery] = useState(initialValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return (
        <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-400" />
            </div>
            <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="pl-10 pr-10"
            />
            {query && (
                <button
                    onClick={() => setQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};
