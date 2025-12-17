import React from 'react';
import { Product } from '../types';
import { Star, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      className="group relative bg-tactical-900 border border-tactical-800 rounded-lg overflow-hidden cursor-pointer hover:border-tactical-accent transition-all duration-300 hover:shadow-2xl hover:shadow-tactical-accent/10"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-800 xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur px-2 py-1 rounded text-xs font-mono text-tactical-accent border border-tactical-800">
          {product.category}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-white group-hover:text-tactical-accent transition-colors">
            {product.name}
          </h3>
          <p className="text-lg font-mono text-stone-300">${product.price}</p>
        </div>
        
        <div className="flex items-center space-x-1 text-yellow-500 text-sm">
          <Star className="w-4 h-4 fill-current" />
          <span className="font-bold text-white">{product.rating}</span>
          <span className="text-stone-500">({product.reviews})</span>
        </div>

        <p className="text-stone-400 text-sm line-clamp-2">
          {product.description}
        </p>

        <div className="pt-2 flex items-center text-xs text-stone-500 font-mono">
          <ShieldCheck className="w-3 h-3 mr-1 text-green-500" />
          Lifetime Warranty
        </div>
      </div>
    </div>
  );
};

export default ProductCard;