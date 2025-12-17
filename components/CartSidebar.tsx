import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ArrowRight, ShieldAlert } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  total: number;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onRemoveItem, total }) => {
  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      <div className={`absolute inset-y-0 right-0 max-w-md w-full flex transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex-1 flex flex-col bg-tactical-900 shadow-xl border-l border-tactical-800">
          
          <div className="flex items-center justify-between px-4 py-6 bg-tactical-950 border-b border-tactical-800">
            <h2 className="text-lg font-black text-white uppercase tracking-wider">Mission Loadout</h2>
            <button onClick={onClose} className="text-stone-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-500 space-y-4">
                <ShieldAlert className="w-16 h-16 opacity-20" />
                <p className="text-lg">Your loadout is empty.</p>
                <button onClick={onClose} className="text-tactical-accent underline hover:text-white">
                  Return to armory
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.cartId} className="flex py-2 animate-fadeIn">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded border border-tactical-800">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-white">
                          <h3>{item.name}</h3>
                          <p className="ml-4 font-mono text-tactical-accent">${item.price}</p>
                        </div>
                        <p className="mt-1 text-xs text-stone-400">{item.category}</p>
                      </div>
                      
                      <div className="mt-2 text-xs text-stone-500 space-y-1">
                        {Object.entries(item.selectedOptions).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key}:</span>
                            <span className="text-stone-300">{value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-1 items-end justify-between text-sm mt-2">
                        <p className="text-stone-400">Qty {item.quantity}</p>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartId)}
                          className="font-medium text-red-500 hover:text-red-400 flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-tactical-800 bg-tactical-950 px-4 py-6">
              <div className="flex justify-between text-base font-medium text-white mb-4">
                <p>Subtotal</p>
                <p className="font-mono text-xl text-tactical-accent">${total.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-stone-500 mb-6">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                className="w-full flex items-center justify-center rounded-sm border border-transparent bg-tactical-accent px-6 py-3 text-base font-bold text-black shadow-sm hover:bg-amber-500 transition-all uppercase tracking-widest"
              >
                Checkout <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;