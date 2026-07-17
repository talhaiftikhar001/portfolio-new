import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Award, Calendar } from 'lucide-react';

const history = [
  {
    type: 'award',
    icon: Award,
    title: 'National Competition Winner',
    organization: 'COMPECC @ NUST',
    date: '2026',
    desc: 'Awarded First Runner-Up in the Software Applications Track at NUST\'s premier national technology showcase, demonstrating excellence in engineering deployment.'
  },
  {
    type: 'work',
    icon: Briefcase,
    title: 'MERN Stack Developer',
    organization: 'CODESLOOP',
    date: 'Jun 2025 – Aug 2025',
    desc: 'Led full-stack application modules, implemented responsive REST APIs, and managed database caching schemas under Agile development sprints.'
  },
  {
    type: 'work',
    icon: Briefcase,
    title: 'ML & Web Development Intern',
    organization: 'RiseTech',
    date: 'Jun 2024 – Aug 2024',
    desc: 'Built prototype machine learning classifiers and linked backend APIs to client web views, improving data transfer efficiency.'
  }
];

export default function Timeline() {
  const containerRef = useRef(null);
  
  // Track scroll position of the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 bg-transparent border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Work History & <span className="italic font-normal text-blue-400">Timeline</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto"></div>
          <p className="font-sans text-gray-300 text-base sm:text-lg">
            Chronological journey illustrating internships, software engineering experience, and competitive academic milestones.
          </p>
        </div>

        {/* Timeline Path Container */}
        <div ref={containerRef} className="relative max-w-3xl mx-auto min-h-[500px] pl-8 sm:pl-0">
          
          {/* Static gray background track */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2"></div>
          
          {/* Dynamic drawing glow line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-4 sm:left-1/2 top-0 w-[2px] bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-600 origin-top -translate-x-1/2 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          />

          {/* Timeline Nodes */}
          <div className="space-y-16">
            {history.map((item, idx) => {
              const Icon = item.icon;
              const isEven = idx % 2 === 0;

              return (
                <div key={item.title} className="relative grid grid-cols-1 sm:grid-cols-12 gap-8 items-start">
                  
                  {/* Left layout side (even index details or empty placeholder for odd on desktop) */}
                  <div className={`hidden sm:block sm:col-span-5 text-right ${isEven ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    {isEven && (
                      <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        className="space-y-2"
                      >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-xs text-blue-400 font-sans border border-white/5">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                        <h4 className="text-xl font-heading font-bold text-white">{item.title}</h4>
                        <p className="text-sm font-semibold text-blue-400 font-sans">{item.organization}</p>
                        <p className="text-sm text-gray-400 font-sans leading-relaxed pt-2">{item.desc}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Node Dot Column */}
                  <div className="absolute left-0 sm:relative sm:col-span-2 flex justify-center h-full">
                    {/* Glowing dynamic ring dot */}
                    <motion.div
                      initial={{ 
                        scale: 0.8, 
                        borderWidth: '2px', 
                        borderColor: 'rgba(255,255,255,0.1)', 
                        backgroundColor: '#132033',
                        boxShadow: 'none'
                      }}
                      whileInView={{ 
                        scale: 1.25, 
                        borderWidth: '3px',
                        borderColor: '#60a5fa', 
                        backgroundColor: '#0d1b2a',
                        boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)'
                      }}
                      viewport={{ once: false, amount: 0.9 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-8 h-8 rounded-full border flex items-center justify-center z-10 cursor-pointer"
                    >
                      <Icon className="w-4 h-4 text-glow-blue" />
                    </motion.div>
                  </div>

                  {/* Right layout side (odd index details or empty placeholder for even on desktop) */}
                  <div className="sm:col-span-5 text-left">
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                      className="space-y-2 pl-4 sm:pl-0"
                    >
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-xs text-blue-400 font-sans border border-white/5 sm:hidden">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                      {!isEven && (
                        <>
                          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-xs text-blue-400 font-sans border border-white/5">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </span>
                          <h4 className="text-xl font-heading font-bold text-white">{item.title}</h4>
                          <p className="text-sm font-semibold text-blue-400 font-sans">{item.organization}</p>
                          <p className="text-sm text-gray-400 font-sans leading-relaxed pt-2">{item.desc}</p>
                        </>
                      )}
                      {isEven && (
                        <div className="sm:hidden">
                          <h4 className="text-xl font-heading font-bold text-white">{item.title}</h4>
                          <p className="text-sm font-semibold text-blue-400 font-sans">{item.organization}</p>
                          <p className="text-sm text-gray-400 font-sans leading-relaxed pt-2">{item.desc}</p>
                        </div>
                      )}
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
