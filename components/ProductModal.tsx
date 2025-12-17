import React, { useState, useEffect, useRef } from 'react';
import { Product, CartItem } from '../types';
import { X, Check, Shield, Star, Info, Rotate3D, MoveHorizontal } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentRotationRef = useRef(0);

  useEffect(() => {
    if (product) {
      const initialSelections: Record<string, string> = {};
      product.options.forEach(opt => {
        initialSelections[opt.id] = opt.values[0];
      });
      setSelections(initialSelections);
      setRotation(0);
    }
  }, [product]);

  if (!product) return null;

  const handleSelectionChange = (optionId: string, value: string) => {
    setSelections(prev => ({
      ...prev,
      [optionId]: value
    }));
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      cartId: Math.random().toString(36).substr(2, 9),
      selectedOptions: selections,
      quantity: 1
    };
    onAddToCart(cartItem);
    onClose();
  };

  // 360 View Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentRotationRef.current = rotation;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startXRef.current;
    // Sensitivity: 0.5 degrees per pixel
    setRotation(currentRotationRef.current + delta * 0.5);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn" 
        onClick={onClose}
      />
      
      {/* Drawer Layout for Product Details */}
      <div className="relative w-full max-w-5xl bg-[#080808] h-full shadow-2xl flex flex-col md:flex-row animate-slideInRight overflow-hidden border-l border-white/10">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-primary hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Visuals & 360 View */}
        <div className="w-full md:w-1/2 bg-[#050505] relative flex flex-col items-center justify-center p-8 border-r border-white/5 select-none">
           {product.isBestSeller && (
             <div className="absolute top-6 left-6 z-10 bg-primary text-[#050505] text-[0.6rem] font-bold uppercase tracking-[0.2em] px-3 py-1.5">
               Best Seller
             </div>
           )}
           
           <div 
             className="relative w-full max-w-md aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing perspective-1000"
             onMouseDown={handleMouseDown}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}
             onMouseLeave={handleMouseUp}
           >
             <div 
                className="w-full h-full transition-transform duration-75 ease-out preserve-3d"
                style={{ transform: `rotateY(${rotation}deg)` }}
             >
                <img 
                  src={product.image} 
                  alt={product.name}
                  draggable={false}
                  className="w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
                />
             </div>
             
             {/* Interaction Hint Overlay */}
             {!isDragging && rotation === 0 && (
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                 <div className="bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 flex items-center gap-2">
                   <MoveHorizontal size={16} className="text-primary animate-pulse" />
                   <span className="text-[0.6rem] uppercase tracking-widest text-white">Drag to Rotate</span>
                 </div>
               </div>
             )}
           </div>

           <div className="mt-8 text-center space-y-2">
             <p className="text-primary text-xs uppercase tracking-widest flex items-center justify-center gap-2">
               <Rotate3D size={14} /> Interactive 360° View
             </p>
             <p className="text-[0.55rem] text-gray-600">Click and drag image to inspect craftsmanship</p>
           </div>
        </div>

        {/* Right: Details & Config */}
        <div className="w-full md:w-1/2 flex flex-col h-full bg-[#0a0a0a]">
          <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
            
            <div className="mb-8">
              <span className="text-primary text-xs font-bold uppercase tracking-widest">{product.category}</span>
              <h2 className="text-3xl md:text-4xl font-serif text-white mt-2 mb-4">{product.name}</h2>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xl font-mono text-white">${product.price.toFixed(2)}</span>
                <div className="w-[1px] h-4 bg-white/20"></div>
                <div className="flex items-center gap-1 text-primary">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-bold text-white ml-1">{product.rating}</span>
                  <span className="text-xs text-gray-500 underline ml-1">{product.reviews} Reviews</span>
                </div>
              </div>
              <p className="text-gray-400 font-light leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-8">
              {product.options.map((option) => (
                <div key={option.id} className="animate-fadeIn">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[0.6rem] font-bold text-gray-500 uppercase tracking-widest">
                      {option.name}
                    </label>
                    <span className="text-xs text-white">{selections[option.id]}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {option.values.map((value) => (
                      <button
                        key={value}
                        onClick={() => handleSelectionChange(option.id, value)}
                        className={`
                          py-3 px-4 text-xs font-medium border text-center transition-all duration-200
                          ${selections[option.id] === value 
                            ? 'border-primary bg-primary/10 text-white shadow-[inset_0_0_0_1px_#d4b483]' 
                            : 'border-white/10 bg-[#121212] text-gray-400 hover:border-white/30'}
                        `}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="flex flex-col gap-3">
                 {product.features.map((feature, idx) => (
                   <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                     <Shield size={14} className="text-primary" />
                     {feature}
                   </div>
                 ))}
              </div>
            </div>
            
            <div className="mt-6 bg-white/5 p-4 rounded border border-white/5 flex gap-3">
               <Info className="text-gray-400 flex-shrink-0" size={18} />
               <p className="text-xs text-gray-400 leading-relaxed">
                 All Falco holsters are custom made. Please allow 14-20 days for hand-crafting and shipping from our European workshop to Florida before final delivery.
               </p>
            </div>
          </div>

          <div className="p-6 bg-[#050505] border-t border-white/10">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-primary hover:bg-primary-hover text-[#050505] font-bold uppercase tracking-[0.2em] transition-colors"
            >
              Add to Cart - ${product.price.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;