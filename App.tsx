
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CheckoutDrawer from './components/CheckoutDrawer';
import TacticalAdvisor from './components/TacticalAdvisor';
import HolsterBuilder from './components/HolsterBuilder';
import Heritage from './components/Heritage';
import Reviews from './components/Reviews';
import { PRODUCTS } from './constants';
import { Product, CartItem, Category } from './types';
import { ArrowRight, ArrowLeft, Filter } from 'lucide-react';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Cart logic
  const addToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItems]);

  const scrollToBuilder = () => {
    document.getElementById('gun-fit')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBuilderResults = (manufacturer: string, model: string) => {
     const match = PRODUCTS.find(p => p.category === Category.DUTY) || PRODUCTS[0];
     setSelectedProduct(match);
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const categories = ['All', Category.DUTY, Category.HYBRID, Category.SHOULDER];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primary selection:text-black">
      
      <Navbar 
        cartCount={cartItems.length} 
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToBuilder={scrollToBuilder}
      />

      <Hero onExplore={scrollToBuilder} />
      
      <StatsBar />

      {/* Collection Section */}
      <section id="collections" className="py-24 bg-[#080808] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="text-primary text-[0.65rem] font-bold tracking-[0.25em] uppercase">Premium Selection</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mt-3">The Collection</h2>
            </div>
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`
                    px-6 py-2 text-[0.6rem] font-bold uppercase tracking-widest transition-all duration-300 border
                    ${activeCategory === cat 
                      ? 'bg-primary border-primary text-black shadow-[0_0_15px_rgba(212,180,131,0.3)]' 
                      : 'border-white/10 text-gray-400 hover:border-white/30'}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
               <div key={product.id} className="group cursor-pointer animate-fadeIn" onClick={() => setSelectedProduct(product)}>
                  <div className="aspect-[3/4] overflow-hidden bg-[#121212] relative border border-white/5">
                     {product.isBestSeller && (
                       <div className="absolute top-4 left-4 z-10 bg-[#d4b483] text-black text-[0.6rem] font-bold uppercase px-2 py-1 tracking-wider">
                         Best Seller
                       </div>
                     )}
                     <img 
                       src={product.image} 
                       alt={product.name}
                       className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                           View Details <ArrowRight size={14} />
                        </span>
                     </div>
                  </div>
                  <div className="mt-6">
                     <p className="text-[0.65rem] text-gray-500 uppercase tracking-widest mb-1">{product.category}</p>
                     <h3 className="text-xl font-serif text-white group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                     <p className="text-gray-400 text-sm mt-1 group-hover:text-white transition-colors line-clamp-2 font-light">{product.description}</p>
                     <p className="font-mono text-primary mt-3 text-lg">${product.price.toFixed(2)}</p>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      <HolsterBuilder onShowResults={handleBuilderResults} />
      
      <Heritage />
      
      <Reviews />

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-[0.2em] text-white">TACWORLD</span>
                <span className="text-[0.55rem] tracking-[0.3em] text-primary uppercase">Falco US Partner</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                TacWorld is the exclusive distributor of FALCO Holsters in the United States. 
                Bridging European artisan leatherwork with American tactical demands.
              </p>
            </div>
            
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Shop</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-primary transition-colors">IWB Concealed</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">OWB Duty</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Shoulder Rigs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Everyday Carry Belts</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-primary transition-colors">Holster Finder</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Lifetime Warranty</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Returns (US Based)</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Connect</h4>
              <div className="flex gap-4 mb-6">
                {['IG', 'FB', 'YT'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-xs text-white hover:bg-white hover:text-black transition-colors">
                    {social}
                  </a>
                ))}
              </div>
              <p className="text-xs text-gray-500">Boca Raton, FL • USA</p>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[0.6rem] text-gray-600 uppercase tracking-widest">© 2025 TacWorld Holsters. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="text-[0.6rem] text-gray-600 uppercase tracking-widest hover:text-white">Privacy Policy</a>
              <a href="#" className="text-[0.6rem] text-gray-600 uppercase tracking-widest hover:text-white">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart}
      />
      
      <CheckoutDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemoveItem={removeFromCart}
        total={cartTotal}
      />

      <TacticalAdvisor />
      
    </div>
  );
};

export default App;
