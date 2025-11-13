import React from 'react';

export default function CTASection() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="bg-linear-to-r from-green-500 via-blue-500 to-purple-500 rounded-3xl p-12 text-center shadow-2xl">
        <div className="text-6xl mb-6">🏆</div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          Ready to Start Your Quest?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join 500,000+ investors exploring real estate markets worldwide. Level up, earn rewards, and make smarter investments!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-black text-lg hover:shadow-2xl transform hover:scale-105 transition">
            Start Free Quest
          </button>
          <button className="px-8 py-4 bg-white/20 backdrop-blur text-white rounded-full font-black text-lg hover:bg-white/30 transition border-2 border-white">
            Watch Demo
          </button>
        </div>
      </div>
    </div>
  );
}