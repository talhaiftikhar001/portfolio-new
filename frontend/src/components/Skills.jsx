import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Brain, Database, Wrench, Cpu } from 'lucide-react';

const skillGroups = [
  {
    icon: Code,
    title: 'Languages',
    skills: ['C++', 'Python', 'JavaScript', 'SQL', 'Verilog HDL'],
    glow: 'group-hover:shadow-blue-500/10'
  },
  {
    icon: Server,
    title: 'Frameworks',
    skills: ['React (Vite)', 'Node.js', 'Express.js', 'Flask', 'Tailwind CSS'],
    glow: 'group-hover:shadow-cyan-500/10'
  },
  {
    icon: Brain,
    title: 'AI/ML',
    skills: ['TensorFlow', 'PyTorch', 'YOLOv8', 'OpenCV', 'Scikit-Learn', 'RAG Agents', 'Signal Processing'],
    glow: 'group-hover:shadow-indigo-500/10'
  },
  {
    icon: Database,
    title: 'Databases',
    skills: ['MongoDB', 'MySQL', 'Local fallback structures'],
    glow: 'group-hover:shadow-purple-500/10'
  },
  {
    icon: Wrench,
    title: 'Tools / DevOps',
    skills: ['Git', 'GitHub Actions', 'CI/CD Pipelines', 'Docker', 'Raspberry Pi array'],
    glow: 'group-hover:shadow-emerald-500/10'
  },
  {
    icon: Cpu,
    title: 'Core CS',
    skills: ['Computer Architecture', 'FPGA Design', 'Data Structures & Algorithms', 'Operating Systems'],
    glow: 'group-hover:shadow-amber-500/10'
  }
];

function SkillCard({ group, idx }) {
  const [hovered, setHovered] = useState(false);
  const Icon = group.icon;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        }
      }}
      className={`relative p-8 rounded-2xl bg-[#132033] border border-white/10 overflow-hidden group hover:bg-[#172840] hover:border-white/20 transition-colors duration-300 shadow-md ${group.glow}`}
    >
      {/* Edge Illumination Tracking Line */}
      {hovered && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: '200%' }}
          transition={{ duration: 1.2, ease: 'linear', repeat: Infinity }}
          className="absolute top-0 right-0 w-[2.5px] h-32 bg-gradient-to-b from-transparent via-blue-400 to-transparent shadow-[0_0_8px_#3b82f6]"
        />
      )}

      {/* Glow dot on hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:text-glow-blue transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-heading font-bold text-white tracking-wide">
          {group.title}
        </h3>
      </div>

      <ul className="flex flex-wrap gap-2.5">
        {group.skills.map((skill) => (
          <li
            key={skill}
            className="px-3.5 py-1.5 rounded-lg text-sm font-sans bg-white/5 border border-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-200"
          >
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <section id="skills" className="py-24 bg-transparent border-t border-white/5 relative overflow-hidden">
      <div className="absolute -top-40 right-0 w-96 h-96 bg-blue-950/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Technical <span className="italic font-normal text-blue-400">Skills Matrix</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto"></div>
          <p className="font-sans text-gray-300 text-base sm:text-lg">
            Structured skill distribution highlighting primary capabilities spanning ML research, custom processors, and modern server frameworks.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillGroups.map((group, idx) => (
            <SkillCard key={group.title} group={group} idx={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
