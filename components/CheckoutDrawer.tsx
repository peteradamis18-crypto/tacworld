import React from 'react';
import { CartItem } from '../types';
import { X, Lock, ShieldCheck, ChevronRight, CreditCard } from 'lucide-react';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  total: number;
}

const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({ isOpen, onClose, items, onRemoveItem, total }) => {
  return (
    <div className={`fixed inset-0 z-[60] overflow-hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      <div className={`absolute inset-y-0 right-0 max-w-md w-full bg-[#121212] shadow-2xl transform transition-transform duration-300 ease-out border-l border-white/10 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[#0a0a0a]">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
            Your Cart <span className="text-primary">({items.length})</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
              <ShoppingBagIcon />
              <p className="text-sm font-medium">Your cart is currently empty.</p>
              <button onClick={onClose} className="text-primary text-xs uppercase tracking-widest hover:underline">Continue Shopping</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartId} className="flex gap-4 group">
                <div className="w-20 h-24 bg-white/5 rounded-sm overflow-hidden flex-shrink-0 border border-white/5 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-white font-medium font-serif leading-tight pr-2">{item.name}</h3>
                      <p className="text-sm text-white/90 font-mono">${item.price}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{Object.values(item.selectedOptions).join(' / ')}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-white/10 rounded-sm">
                       <button className="px-2 py-1 text-gray-500 hover:text-white text-xs hover:bg-white/5 transition-colors">-</button>
                       <span className="px-2 text-xs text-white font-mono">{item.quantity}</span>
                       <button className="px-2 py-1 text-gray-500 hover:text-white text-xs hover:bg-white/5 transition-colors">+</button>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(item.cartId)}
                      className="text-[0.65rem] uppercase tracking-wider text-gray-500 hover:text-red-400 underline decoration-gray-700 underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="border-t border-white/10 bg-[#0a0a0a] p-6 space-y-4">
            
            {/* Upsell / Protection */}
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded border border-white/5 hover:border-primary/30 transition-colors cursor-pointer group">
               <ShieldCheck size={18} className="text-primary" />
               <div className="flex-1">
                 <p className="text-xs text-white font-medium group-hover:text-primary transition-colors">Shipping Protection</p>
                 <p className="text-[0.65rem] text-gray-400">Protect against loss, theft, or damage.</p>
               </div>
               <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer bg-primary/20">
                  <div className="absolute left-0.5 top-0.5 bg-primary w-3 h-3 rounded-full shadow-sm"></div>
               </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-white font-bold text-lg">
                <span>Total</span>
                <span className="font-mono text-primary">${total.toFixed(2)}</span>
              </div>
              <p className="text-[0.65rem] text-gray-500 text-center">Shipping & taxes calculated at checkout</p>
            </div>

            <button className="w-full bg-primary hover:bg-primary-hover text-[#050505] py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/10">
              <Lock size={12} /> Secure Checkout
            </button>
            
             <button className="w-full bg-[#111] border border-white/10 hover:bg-white/5 text-white py-3 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors">
               <span className="font-sans font-black tracking-tighter">Pay<span className="text-blue-400">Pal</span></span>
            </button>

            {/* Payment Badges Mockup */}
            <div className="flex justify-center gap-3 pt-2">
               {/* Apple Pay */}
               <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                  <svg viewBox="0 0 384 512" fill="black" className="h-4"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 46.9 126.7 89.8 126.7 22.8 0 29.4-18.3 64.9-18.3 36.7 0 42.8 18.3 66.1 18.3 35 0 63.3-80 65.5-84.8-1.7-.5-41.2-18.3-41.2-76.7zM202 53.9c16.1-23.9 33.3-37.2 60-39.7-1.1 27.2-16.1 53.3-33.3 75-17.2 21.7-40 33.3-61.1 33.3-1.1-28.3 18.9-51.7 34.4-68.6z"/></svg>
               </div>
               {/* Stripe */}
               <div className="w-10 h-6 bg-[#635BFF] rounded flex items-center justify-center">
                  <span className="text-white font-bold text-[0.6rem] italic">stripe</span>
               </div>
               {/* Visa */}
               <div className="w-10 h-6 bg-white rounded flex items-center justify-center border border-gray-200">
                  <span className="text-blue-800 font-bold text-[0.6rem] uppercase tracking-tighter">VISA</span>
               </div>
               {/* Klarna */}
               <div className="w-10 h-6 bg-[#FFB3C7] rounded flex items-center justify-center">
                  <span className="text-black font-bold text-[0.5rem] lowercase tracking-tight">Klarna.</span>
               </div>
            </div>
            
            <p className="text-[0.6rem] text-center text-gray-600 flex items-center justify-center gap-1">
               <Lock size={10} /> Guaranteed safe & secure checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ShoppingBagIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-20">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
)

export default CheckoutDrawer;