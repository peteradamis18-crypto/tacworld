import React from 'react';

const Heritage: React.FC = () => {
  return (
    <section id="heritage" className="bg-[#050505] py-24 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="aspect-[4/3] overflow-hidden rounded-sm relative shadow-2xl shadow-black/50">
               {/* Bojnice Castle, Slovakia - Specific ID for reliability */}
               <img 
                 src="https://images.unsplash.com/photo-1599587428362-e25c5035227c?q=80&w=2070&auto=format&fit=crop" 
                 alt="Bojnice Castle Slovakia"
                 className="w-full h-full object-cover sepia-[0.2] contrast-125 group-hover:scale-105 transition-transform duration-[2000ms]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
               <div className="absolute bottom-6 right-6 text-right">
                  <p className="text-white font-serif text-2xl italic">Bojnice Castle</p>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <span className="w-8 h-[1px] bg-primary"></span>
                    <span className="text-[0.6rem] font-bold text-primary uppercase tracking-widest">Slovakia • Est. 1113</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="text-primary text-[0.65rem] font-bold tracking-[0.25em] uppercase">The Process</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                Born in Slovakia. <br />
                Stocked in the USA.
              </h2>
            </div>
            
            <p className="text-gray-400 leading-relaxed font-light">
              Since 1989, FALCO has crafted leather goods for falconers and marksmen in the mountains of Slovakia. 
              This heritage demands leather that is tough enough to withstand talons, yet flexible enough for movement.
            </p>
            
            <p className="text-gray-400 leading-relaxed font-light">
              We use only premium Italian full-grain leather, hand-dyed and lacquered. 
              Unlike mass-produced holsters, ours are wet-molded by hand to the exact dimensions of your firearm, 
              creating a retention "click" usually reserved for Kydex.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <h4 className="font-serif text-2xl text-white mb-2">Veg-Tan</h4>
                <p className="text-[0.6rem] uppercase tracking-widest text-gray-500">Premium Leather</p>
              </div>
              <div>
                <h4 className="font-serif text-2xl text-white mb-2">Hand-Boned</h4>
                <p className="text-[0.6rem] uppercase tracking-widest text-gray-500">Custom Retention</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heritage;