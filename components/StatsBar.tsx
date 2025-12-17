import React from 'react';

const StatsBar: React.FC = () => {
  return (
    <div className="bg-[#0a0a0a] border-y border-white/5 py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
          <div className="space-y-2">
            <h3 className="font-serif text-3xl text-primary">2,400+</h3>
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-400">Gun Models Supported</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-3xl text-white">USA</h3>
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-400">Stocked & Shipped</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-3xl text-white">LIFETIME</h3>
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-400">Limited Warranty</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-3xl text-white">30 DAY</h3>
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-400">Buy Back Guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;