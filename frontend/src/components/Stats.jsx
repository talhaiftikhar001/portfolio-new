import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ShieldCheck, GraduationCap, Flame, Sparkles, Database, Code } from 'lucide-react';
import axios from 'axios';

function CountUp({ to, duration = 1.5, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = parseInt(to);
    if (isNaN(end) || start === end) {
      setCount(to);
      return;
    }

    const totalMiliseconds = duration * 1000;
    const stepTime = Math.max(Math.floor(totalMiliseconds / end), 30);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        setCount(end); // ensure exact number
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  const [liveStats, setLiveStats] = useState({
    projects: 9,
    skills: 15,
    researchPapers: 2,
    certifications: 3
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/stats');
        if (response.data && response.data.success) {
          setLiveStats({
            projects: response.data.projects || 9,
            skills: response.data.skills || 15,
            researchPapers: response.data.researchPapers || 2,
            certifications: response.data.certifications || 3
          });
        }
      } catch (err) {
        // Fallback silently
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Projects Completed', value: liveStats.projects, suffix: '+' },
    { label: 'Technical Skills', value: liveStats.skills, suffix: '+' },
    { label: 'Research Papers', value: liveStats.researchPapers, suffix: '' },
    { label: 'Professional Credentials', value: liveStats.certifications, suffix: '+' }
  ];

  return (
    <section id="achievements" className="py-24 bg-transparent border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-950/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Stats & <span className="italic font-normal text-blue-400">Achievements</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto"></div>
          <p className="font-sans text-gray-300 text-base sm:text-lg">
            Quantitative telemetry and certified proofs of academic and software engineering accomplishments.
          </p>
        </div>

        {/* 4-Column Count-up Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-[#132033]/60 border border-white/5 backdrop-blur-md text-center flex flex-col justify-center min-h-[140px]"
            >
              <span className="text-4xl sm:text-5xl font-heading font-bold text-white tracking-tight neon-glow">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs sm:text-sm font-sans font-medium text-gray-400 mt-2 uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Highlight Grid */}
        <h3 className="text-2xl font-heading font-bold text-white text-left mb-8 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-400" />
          Key Milestones
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -6 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/10 to-indigo-950/20 border border-white/10 hover:border-blue-400/30 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-yellow-500">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-heading font-bold text-white mb-2">🏆 Competition Winner</h4>
            <p className="text-sm font-sans text-gray-300 leading-relaxed">
              Awarded First Runner-Up at the COMPEC National Software applications track (2026) for deploying high-fidelity full-stack services.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -6 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-cyan-900/10 to-blue-950/20 border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-cyan-400">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-heading font-bold text-white mb-2">🔬 Research Excellence</h4>
            <p className="text-sm font-sans text-gray-300 leading-relaxed">
              Researched and integrated EEG diagnostic architectures (ShallowFBCSPNet) and complex Mel-frequency audio models.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -6 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/10 to-purple-950/20 border border-white/10 hover:border-indigo-400/30 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-indigo-400">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-heading font-bold text-white mb-2">⭐ Full Stack Master</h4>
            <p className="text-sm font-sans text-gray-300 leading-relaxed">
              Highly capable of linking advanced python pipelines, embedded arrays, and web controllers into unified high-performance pipelines.
            </p>
          </motion.div>
        </div>

        {/* Credentials / Certifications Grid */}
        <h3 id="certifications" className="text-2xl font-heading font-bold text-white text-left mb-8 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-400" />
          Credentials & Certifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#132033]/60 border border-white/5 flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-lg text-blue-400 mt-1">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-base">Bachelor of Computer Engineering</h4>
              <p className="text-xs text-blue-400 font-sans mt-0.5">NUST Islamabad</p>
              <p className="text-xs text-gray-400 font-sans mt-2">Class of 2022 – 2026. Specialized studies in neural processing, embedded microprocessors, and OS architectures.</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#132033]/60 border border-white/5 flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-lg text-blue-400 mt-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-base">Machine Learning Specialization</h4>
              <p className="text-xs text-blue-400 font-sans mt-0.5">DeepLearning.AI</p>
              <p className="text-xs text-gray-400 font-sans mt-2">Comprehensive training in neural networks, supervised classifiers, unsupervised algorithms, and recommender platforms.</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#132033]/60 border border-white/5 flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-lg text-blue-400 mt-1">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-base">C++ Essentials</h4>
              <p className="text-xs text-blue-400 font-sans mt-0.5">Cisco Networking Academy</p>
              <p className="text-xs text-gray-400 font-sans mt-2">Rigorous certification validating core object-oriented structures, memory buffers, templates, and pointers.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
