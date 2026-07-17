import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Research from './components/Research';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StarsBackground from './components/StarsBackground';

export default function App() {
  return (
    <div className="min-h-screen text-[#e2e8f0] flex flex-col justify-between relative">
      {/* Background space elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#0d1b2a]"></div>
        <StarsBackground />
        {/* Fine background space nodes */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400/30 rounded-full blur-[1px]"></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-cyan-400/40 rounded-full blur-[1px]"></div>
        <div className="absolute top-10 right-10 w-3 h-3 bg-indigo-500/20 rounded-full blur-[2px]"></div>
        <div className="absolute bottom-20 left-10 w-2 h-2 bg-blue-500/20 rounded-full blur-[1px]"></div>
      </div>
      
      {/* Page layers */}
      <div className="z-10 w-full flex flex-col">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Research />
        <Projects />
        <Timeline />
        <Stats />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
