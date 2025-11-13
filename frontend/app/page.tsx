'use client';

import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import FeaturedMarkets from './components/FeaturedMarkets';
import FeaturesGrid from './components/FeaturesGrid';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function GameifiedRealEstateSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [userLevel] = useState(1);
  const [userXP] = useState(250);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-purple-50">
      <Navigation />
      <HeroSection 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        scrollY={scrollY}
        userLevel={userLevel}
        userXP={userXP}
      />
      <FeaturedMarkets />
      <FeaturesGrid />
      <CTASection />
      <Footer />
    </div>
  );
}