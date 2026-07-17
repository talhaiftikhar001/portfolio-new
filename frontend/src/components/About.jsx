import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Users, Rocket } from 'lucide-react';

const tiles = [
  {
    icon: Target,
    title: 'Problem Solver',
    desc: 'Analytical perspective and creative product planning to dissect and solve complex engineering problems.',
    color: 'from-blue-500/20 to-cyan-500/10',
    border: 'hover:border-blue-400/30'
  },
  {
    icon: Zap,
    title: 'Fast Learner',
    desc: 'Adapting to technical environments, learning fresh developer stacks, and adopting modern tools dynamically.',
    color: 'from-amber-500/20 to-orange-500/10',
    border: 'hover:border-amber-400/30',
    offset: true
  },
  {
    icon: Users,
    title: 'Collaborative',
    desc: 'Working effectively inside cross-functional software teams, sharing knowledge, and building products together.',
    color: 'from-emerald-500/20 to-teal-500/10',
    border: 'hover:border-emerald-400/30'
  },
  {
    icon: Rocket,
    title: 'Full Stack',
    desc: 'Proficient across full-stack layers including frontend, backend, ML pipelines, and automated integrations.',
    color: 'from-indigo-500/20 to-purple-500/10',
    border: 'hover:border-indigo-400/30',
    offset: true
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column - Text Profile */}
          <motion.div 
            className="lg:col-span-5 space-y-6 text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              About <span className="italic font-normal text-blue-400">Myself</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
            
            <div className="space-y-4 font-sans text-gray-300 leading-relaxed text-base sm:text-lg">
              <p>
                I am a student of <strong className="text-white">Bachelor of Computer Engineering</strong> at the prestigious <strong className="text-white">National University of Sciences and Technology (NUST) Islamabad</strong>. My academic journey is built upon a profound enthusiasm for developing highly performant computer architectures and artificial intelligence.
              </p>
              <p>
                Bridging the gap between theory and code, I design and deploy complex ML algorithms, computer vision models, and full-stack web applications. I thrive in workspaces that combine deep intelligence with interactive, premium engineering structures.
              </p>
              <p>
                Whether it is building EEG neural processors, training YOLOv8 checkout assistants, or architecting robust Node.js pipelines, I maintain an uncompromising dedication to visual excellence and high performance.
              </p>
            </div>
          </motion.div>

          {/* Right Column - 2x2 Asymmetric Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 lg:pt-0">
            {tiles.map((tile, idx) => {
              const Icon = tile.icon;
              return (
                <motion.div
                  key={tile.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 150, 
                    damping: 20, 
                    delay: idx * 0.1 
                  }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`p-6 rounded-2xl border border-white/10 bg-gradient-to-br ${tile.color} backdrop-blur-xl ${tile.border} transition-all duration-300 flex flex-col justify-between ${tile.offset ? 'lg:translate-y-6' : ''}`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-blue-400 hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6 text-glow-blue" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mb-3">
                      {tile.title}
                    </h3>
                    <p className="text-sm font-sans text-gray-300 leading-relaxed">
                      {tile.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
