import React from 'react';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import Products from '../components/Products';
import Features from '../components/Features';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <main>
      <section id="beranda">
        <Hero />
      </section>
      <section id="mitra">
        <Partners />
      </section>
      <section id="produk">
        <Products />
      </section>
      <section id="keunggulan">
        <Features />
      </section>
      <section id="tentang">
        <About />
      </section>
      <section id="testimoni">
        <Testimonials />
      </section>
      <section id="kontak">
        <Contact />
      </section>
    </main>
  );
}
