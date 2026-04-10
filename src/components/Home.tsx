import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import Features from './Features';
import Products from './Products';
import About from './About';
import Partners from './Partners';
import Testimonials from './Testimonials';
import Contact from './Contact';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <main>
      <Hero />
      <Partners />
      <Products />
      <Features />
      <About />
      <Testimonials />
      <Contact />
    </main>
  );
}
