'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/app/components/Navigation';
import HeroSection from '@/app/components/HeroSection';
import MarketsSection from '@/app/components/MarketsSection';
import EducationSection from '@/app/components/EducationSection';
import TradingPanel from '@/app/components/TradingPanel';
import Footer from '@/app/components/Footer';

export default function RealEstateQuest() {
  const [searchQuery, setSearchQuery] = useState('');
  // const [scrollY, setScrollY] = useState(0);
  const [userLevel] = useState(5);
  const [userXP] = useState(1000);
  const [totalXP] = useState(3000);

  // useEffect(() => {
  //   const handleScroll = () => setScrollY(window.scrollY);
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <div className="min-h-screen bg-primary">
      <Navigation  />
      <HeroSection 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        //scrollY={scrollY}
      />
      <MarketsSection />
      <EducationSection />
      <TradingPanel />
      <Footer />
    </div>
  );
}