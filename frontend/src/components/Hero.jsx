import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-12 flex items-center justify-center relative overflow-hidden bg-transparent">
      {/* Space glowing blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Layout Side */}
          <motion.div 
            className="lg:col-span-7 space-y-6 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status Pill */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
              variants={itemVariants}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 pulse-green"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                AI/ML Engineer & Full Stack Developer
              </span>
            </motion.div>

            {/* Giant Title */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1]"
              variants={itemVariants}
            >
              Hi, I am <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-glow-blue neon-glow">Talha</span> Iftikhar.
            </motion.h1>

            {/* Subtitle Pitch */}
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-300 font-sans max-w-xl leading-relaxed"
              variants={itemVariants}
            >
              Building intelligent systems that matter. I specialize in machine learning, computer vision, and modern web technologies to create impactful solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              variants={itemVariants}
            >
              {/* View My Work Button */}
              <motion.a 
                href="#projects"
                whileHover={{ y: -5, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 neon-shadow-hover transition-shadow duration-300"
              >
                View My Work
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              {/* Get In Touch Button */}
              <motion.a 
                href="#contact"
                whileHover={{ y: -5, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent text-white font-semibold border border-white/10 hover:border-blue-400/50 hover:bg-blue-500/5 transition-colors duration-300"
              >
                Get In Touch
                <Mail className="w-5 h-5 text-blue-400" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Layout Side */}
          <motion.div 
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.4 }}
          >
            {/* Interactive Image Container */}
            <motion.div 
              whileHover={{ rotateY: 10, rotateX: -5, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/10 cursor-pointer group animate-float"
              style={{ perspective: 1000 }}
            >
              {/* Alpha-gradient vector mask overlay */}
              <div 
                className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-75"
                style={{
                  background: 'linear-gradient(160deg, rgba(59,130,246,0.15) 0%, transparent 60%)'
                }}
              ></div>
              
              {/* Secondary cyber border glow on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/30 rounded-3xl z-20 transition-all duration-300"></div>

              {/* Profile Image */}
              <img 
                src="/img1.jpeg" 
                alt="Talha Iftikhar Profile Picture"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
