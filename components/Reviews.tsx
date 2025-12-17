import React from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from '../constants';

const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="bg-[#0a0a0a] py-32 border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-primary/50 to-transparent"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-primary/30 text-primary mb-6">
            <Star className="fill-primary w-5 h-5" />
          </div>
          <h2 className="text-4xl font-serif text-white tracking-tight">Operator Feedback</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-[#121212] p-10 border border-white/5 hover:border-primary/30 transition-colors group">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-primary fill-primary" />
                ))}
              </div>
              <p className="text-gray-300 font-light leading-relaxed mb-8 min-h-[80px]">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white group-hover:bg-primary group-hover:text-black transition-colors">
                  {review.author.charAt(0)}{review.author.split(' ')[1]?.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white uppercase tracking-wide">{review.author}</div>
                  <div className="text-[0.6rem] text-primary uppercase tracking-widest">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;