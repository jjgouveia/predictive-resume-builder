import React from 'react';
import FAQ from '../components/FAQ';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import ScrollToTopButton from '../components/ScrollToTopBtn';
import Values from '../components/Values';

export default function LandingPage() {
  return (
    <div className="my-12 flex flex-col min-h-[70vh] w-full justify-center text-gray-900">
      <Hero />
      <Values />
      <HowItWorks />
      <FAQ />
      <ScrollToTopButton />
    </div>
  );
}
