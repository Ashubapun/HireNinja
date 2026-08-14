import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import CaseStudyGrid from './components/CaseStudyGrid';
import AggregateEvidence from './components/AggregateEvidence';
import FinalCTA from './components/FinalCTA';

export default function HomePage() {
  return (
    <div className="grain-overlay min-h-screen bg-canvas">
      <Header />
      <main>
        <HeroSection />
        <CaseStudyGrid />
        <AggregateEvidence />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}