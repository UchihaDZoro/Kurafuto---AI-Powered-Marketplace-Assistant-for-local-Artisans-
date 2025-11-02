
import React from 'react';
import { type Product } from '../types';
import { ShoppingCartIcon } from './Icon';

interface ProductCardProps {
  product: Product;
  onArtisanClick?: (artisanId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onArtisanClick }) => {
  const handleArtisanClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event when clicking on artisan name
    if (onArtisanClick) {
      onArtisanClick(product.artisanId);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl dark:shadow-none dark:hover:bg-gray-700/50 dark:border dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.name} />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold font-sans text-gray-800 dark:text-gray-100">{product.name}</h3>
        {onArtisanClick && (
           <button onClick={handleArtisanClick} className="text-sm font-semibold text-google-blue hover:underline text-left">
              by {product.artisanName}
            </button>
        )}
        <p className="text-sm font-body text-gray-600 dark:text-gray-400 mt-1 italic">"{product.story}"</p>
        <p className="text-sm font-body text-gray-700 dark:text-gray-300 mt-2 flex-grow">{product.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.hashtags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-blue-100 text-google-blue dark:bg-blue-900/50 dark:text-blue-300 text-xs font-semibold rounded-full">
              {tag}
            </span>
          ))}
        </div>
         <div className="mt-4 flex justify-between items-center">
            {product.price && (
                <p className="text-xl font-bold font-sans text-google-green">${product.price.toFixed(2)}</p>
            )}
            <button onClick={() => alert(`${product.name} added to cart!`)} className="flex items-center gap-2 px-4 py-2 bg-google-blue text-white rounded-lg hover:bg-blue-600 transition-colors transform hover:scale-105">
                <ShoppingCartIcon className="w-5 h-5" />
                <span className="text-sm font-bold">Add to Cart</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
