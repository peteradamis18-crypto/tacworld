import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToBuilder: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onScrollToBuilder }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#050505]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <div className="border border-primary/40 p-2 mr-3">
              <span className="font-serif text-2xl text-primary font-bold">T</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-[0.2em] text-white">TACWORLD</span>
              <span className="text-[0.55rem] tracking-[0.3em] text-primary uppercase">Falco US Partner</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {['Collections', 'Gun Fit', 'Heritage', 'Reviews'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-xs font-medium uppercase tracking-[0.15em] text-gray-300 hover:text-primary transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
             <button
              onClick={onScrollToBuilder}
              className="hidden md:flex bg-primary hover:bg-primary-hover text-[#050505] px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 items-center gap-2"
            >
              Build Holster <span className="text-lg leading-none">→</span>
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2 text-gray-300 hover:text-primary transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-[0.6rem] font-bold leading-none text-black bg-primary rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#050505] border-b border-white/10 animate-fadeIn">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {['Collections', 'Gun Fit', 'Heritage', 'Reviews'].map((item) => (
              <a
                key={item}
                href="#"
                className="block text-sm font-medium uppercase tracking-widest text-gray-300 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
             <button
              onClick={() => {
                onScrollToBuilder();
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-4 bg-primary text-black px-6 py-3 text-xs font-bold uppercase tracking-widest"
            >
              Build Holster
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;