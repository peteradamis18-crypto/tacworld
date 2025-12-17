import React, { useState } from 'react';
import { MANUFACTURERS, GUN_MODELS, PRODUCTS } from '../constants';
import { ChevronDown, Cuboid as Cube, CheckCircle2, Loader2, Sparkles, Rotate3D } from 'lucide-react';
import { generateHolsterImage } from '../services/geminiService';
import { Category } from '../types';

interface HolsterBuilderProps {
  onShowResults: (manufacturer: string, model: string) => void;
}

const HolsterBuilder: React.FC<HolsterBuilderProps> = ({ onShowResults }) => {
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [isRotating, setIsRotating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // Image Generation States
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const availableModels = manufacturer ? GUN_MODELS[manufacturer] || [] : [];

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      onShowResults(manufacturer, model);
    }, 1500);
  };

  const handleGeneratePreview = async () => {
    if (!manufacturer || !model) return;
    setIsGenerating(true);
    setGeneratedImage(null);
    const imgData = await generateHolsterImage(manufacturer, model);
    setGeneratedImage(imgData);
    setIsGenerating(false);
  };
  
  // Recommendation logic: find a flagship product from each category to display
  const recommendedProduct = PRODUCTS.find(p => p.id === 'h201') || PRODUCTS[0];

  return (
    <div id="gun-fit" className="bg-[#080808] min-h-[750px] flex flex-col md:flex-row border-t border-white/5">
      
      {/* Left: Selector Form */}
      <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden">
        {/* Background texture for form */}
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
           <Cube size={300} strokeWidth={0.5} />
        </div>

        <div className="relative z-10">
          <div className="mb-2 text-primary text-[0.65rem] font-bold tracking-[0.25em] uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Holster Finder
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
            Build Your Carry. <br />
            <span className="italic text-white/50">Precision Fit.</span>
          </h2>
          <p className="text-gray-400 text-sm mb-12 max-w-md leading-relaxed">
            Every Falco holster is hand-boned on a specific mold of your firearm. 
            Select your weapon and visualize your custom rig using our <strong>AI Configurator</strong>.
          </p>

          <div className="space-y-6 max-w-md">
            {/* Manufacturer Dropdown */}
            <div className="space-y-2">
              <label className="text-[0.6rem] uppercase tracking-widest text-gray-500 font-bold">01. Firearm Make</label>
              <div className="relative group">
                <select 
                  value={manufacturer}
                  onChange={(e) => {
                    setManufacturer(e.target.value);
                    setModel('');
                    setGeneratedImage(null);
                  }}
                  className="w-full bg-[#121212] border border-white/10 text-white p-4 text-sm uppercase tracking-wide appearance-none focus:border-primary focus:outline-none transition-colors rounded-none cursor-pointer"
                >
                  <option value="">Select Manufacturer...</option>
                  {MANUFACTURERS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            {/* Model Dropdown */}
            <div className={`space-y-2 transition-all duration-500 ${manufacturer ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 pointer-events-none'}`}>
              <label className="text-[0.6rem] uppercase tracking-widest text-gray-500 font-bold">02. Firearm Model</label>
              <div className="relative">
                <select 
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                    setGeneratedImage(null);
                  }}
                  disabled={!manufacturer}
                  className="w-full bg-[#121212] border border-white/10 text-white p-4 text-sm uppercase tracking-wide appearance-none focus:border-primary focus:outline-none transition-colors rounded-none disabled:opacity-50 cursor-pointer"
                >
                  <option value="">{manufacturer ? 'Select Model...' : 'Select Make First...'}</option>
                  {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button 
                disabled={!model || isGenerating}
                onClick={handleGeneratePreview}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white p-4 text-xs font-bold uppercase tracking-[0.2em] transition-all disabled:opacity-30 flex items-center justify-center gap-2 border border-white/10"
              >
                {isGenerating ? (
                   <Loader2 className="animate-spin" size={16} />
                ) : (
                   <Sparkles size={16} className="text-primary" />
                )}
                Visualize
              </button>

              <button 
                disabled={!model || isSearching}
                onClick={handleSearch}
                className="flex-1 bg-primary hover:bg-primary-hover text-[#050505] p-4 text-xs font-bold uppercase tracking-[0.2em] transition-all disabled:opacity-30 flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <>Checking...</>
                ) : (
                  <>Shop Now <CheckCircle2 size={16} /></>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Right: Visualization Area */}
      <div className="w-full md:w-1/2 relative bg-[#050505] flex items-center justify-center overflow-hidden border-l border-white/5 min-h-[400px]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />
        
        {model ? (
           <div className="relative z-10 text-center animate-fadeIn w-full h-full flex flex-col items-center justify-center p-8">
              <div 
                className="relative w-full h-[400px] flex items-center justify-center group perspective-1000"
                onMouseEnter={() => generatedImage && setIsRotating(true)}
                onMouseLeave={() => setIsRotating(false)}
              >
                {isGenerating ? (
                  <div className="flex flex-col items-center text-primary animate-pulse">
                    <Loader2 size={48} className="animate-spin mb-4" />
                    <p className="text-xs uppercase tracking-widest font-bold">Forging Custom Visual...</p>
                    <p className="text-[0.6rem] text-gray-500 mt-2">Using Nano Banana Model</p>
                  </div>
                ) : generatedImage ? (
                  // AI Generated Preview
                  <div 
                    className={`relative w-full h-full transition-transform duration-[800ms] ease-out preserve-3d`}
                    style={{ 
                      transform: isRotating ? 'rotateY(5deg) scale(1.02)' : 'rotateY(0deg) scale(1)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <img 
                      src={generatedImage} 
                      alt="AI Generated Holster"
                      className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg"
                    />
                    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur px-3 py-1 rounded text-[0.5rem] uppercase tracking-wider text-primary border border-white/10">
                      AI Generated Preview
                    </div>
                  </div>
                ) : (
                  // Suggested Product (Fallback/Default)
                  <div className="text-center opacity-80 animate-fadeIn">
                     <p className="text-[0.65rem] uppercase tracking-widest text-gray-500 mb-4">Recommended Match</p>
                     <div className="relative w-64 h-64 mx-auto">
                        <img 
                          src={recommendedProduct.image} 
                          alt="Recommended Holster"
                          className="w-full h-full object-contain drop-shadow-2xl opacity-90"
                        />
                     </div>
                     <div className="mt-4">
                        <p className="font-serif text-2xl text-white">{recommendedProduct.name.split(',')[0]}</p>
                        <p className="font-mono text-primary text-xl">${recommendedProduct.price.toFixed(2)}</p>
                     </div>
                  </div>
                )}
              </div>
           </div>
        ) : (
          <div className="flex flex-col items-center justify-center opacity-20">
            <div className="w-48 h-48 border border-dashed border-white/30 rounded-full flex items-center justify-center mb-6 animate-pulse-slow">
              <Cube size={64} strokeWidth={0.5} />
            </div>
            <p className="font-serif text-3xl text-white tracking-wide">Awaiting Specifications</p>
            <p className="text-gray-500 text-sm mt-2 font-light">Select firearm to begin configuration.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HolsterBuilder;