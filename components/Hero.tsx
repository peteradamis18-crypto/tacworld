import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050505]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30 scale-105"
        >
          <source src="https://cdn.coverr.co/videos/coverr-making-a-leather-wallet-2638/1080p.mp4" type="video/mp4" />
        </video>
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/20 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-transparent to-[#050505]/90" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full pt-20">
          
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center text-left max-w-2xl">
            <div className="mb-8 flex items-center gap-4 text-primary/90 text-[0.65rem] font-bold tracking-[0.35em] uppercase animate-fadeIn">
              <span className="w-12 h-[1px] bg-primary/60"></span>
              Boca Raton, FL • Est. 1989
              <span className="w-12 h-[1px] bg-primary/60"></span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tighter leading-none mb-6 animate-slideUp drop-shadow-2xl">
              OLD WORLD
              <span className="block font-serif italic font-light text-white/90 mt-2">Craftsmanship</span>
            </h1>

            <p className="mt-8 text-lg text-gray-200 font-light leading-relaxed animate-fadeIn delay-200 drop-shadow-lg">
              The exclusive U.S. partner of <strong className="text-white font-medium border-b border-primary/50 pb-0.5">FALCO Holsters</strong>. 
              Premium Italian leather, hand-boned for your specific firearm. 
              <span className="block mt-2 text-primary/80">No overseas wait times.</span>
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-6 animate-fadeIn delay-300">
              <button
                onClick={onExplore}
                className="group relative px-10 py-4 bg-primary text-[#050505] text-xs font-bold uppercase tracking-[0.25em] overflow-hidden min-w-[220px] hover:shadow-[0_0_20px_rgba(212,180,131,0.4)] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Find Your Fit <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </button>
              
              <button
                onClick={() => document.getElementById('collections')?.scrollIntoView({behavior: 'smooth'})}
                className="group px-10 py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all min-w-[220px]"
              >
                Explore Range
              </button>
            </div>
          </div>

          {/* Right: Featured Product Image (as per screenshot request) */}
          <div className="hidden lg:flex items-center justify-center relative group animate-fadeIn delay-500">
            <div className="relative w-full max-w-md aspect-square">
               {/* Decorative border matching the screenshot's dashed box intention */}
               <div className="absolute -inset-4 border border-primary/20 border-dashed rounded-lg pointer-events-none group-hover:border-primary/40 transition-colors duration-500"></div>
               
               {/* Actual Product Image */}
               <img 
                 src="screenshot_1741131113.png" 
                 alt="Featured Falco Holster"
                 className="w-full h-full object-cover rounded-lg shadow-2xl shadow-black/80 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
               />
               
               <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur px-4 py-2 border border-white/10">
                 <p className="text-[0.6rem] font-bold text-primary uppercase tracking-[0.2em]">Featured Model</p>
                 <p className="text-xs text-white uppercase tracking-widest mt-1">Falco Hybrid OWB</p>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;
