import React from 'react';
import { TrendingUp, MapPin, Zap, ChevronRight } from 'lucide-react';

export default function FeaturedMarkets() {
  const featuredMarkets = [
    { city: 'Miami', state: 'FL', trend: '+12.5%', icon: '🌴', level: 1, xp: 50 },
    { city: 'Austin', state: 'TX', trend: '+8.3%', icon: '🤠', level: 2, xp: 75 },
    { city: 'Denver', state: 'CO', trend: '+10.1%', icon: '⛰️', level: 2, xp: 75 },
    { city: 'Seattle', state: 'WA', trend: '+6.7%', icon: '☕', level: 3, xp: 100 },
    { city: 'Phoenix', state: 'AZ', trend: '+11.2%', icon: '🌵', level: 1, xp: 50 },
    { city: 'Nashville', state: 'TN', trend: '+9.4%', icon: '🎸', level: 2, xp: 75 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg mb-4">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-gray-700">Trending Now</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          Hot Markets to Explore
        </h2>
        <p className="text-xl text-gray-600">
          Start your quest in these trending cities and earn XP! 🎯
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredMarkets.map((market, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition cursor-pointer group"
            style={{
              animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">{market.icon}</div>
              <div className="flex items-center gap-1 bg-linear-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-600">{market.trend}</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-gray-900 mb-1">
              {market.city}
            </h3>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin className="w-4 h-4" />
              <span>{market.state}</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {market.level}
                </div>
                <span className="text-sm font-semibold text-gray-700">+{market.xp} XP</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition" />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
