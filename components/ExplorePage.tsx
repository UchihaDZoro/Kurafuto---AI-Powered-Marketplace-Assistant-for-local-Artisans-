
import React, { useCallback, useState, useEffect } from 'react';
import { type Artisan, type Product } from '../types';
import * as dbService from '../services/dbService';
import ProductCard from './ProductCard';

interface ExplorePageProps {
  onArtisanSelect: (artisan: Artisan) => void;
}

const ExplorePage: React.FC<ExplorePageProps> = ({ onArtisanSelect }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [artisans, setArtisans] = useState<Artisan[]>([]);

  useEffect(() => {
    setProducts(dbService.getProducts());
    setArtisans(dbService.getArtisans());
  }, []);

  const handleArtisanClick = useCallback((artisanId: string) => {
    const artisan = artisans.find(a => a.id === artisanId);
    if (artisan) {
        onArtisanSelect(artisan);
    }
  }, [onArtisanSelect, artisans]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
          <h1 className="text-3xl font-bold font-sans text-gray-800 dark:text-gray-100">Explore All Crafts</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Discover unique, handmade products from artisans across the nation.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onArtisanClick={handleArtisanClick} />
        ))}
      </div>
      <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-in-out forwards; } @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }`}</style>
    </div>
  );
};

export default ExplorePage;
