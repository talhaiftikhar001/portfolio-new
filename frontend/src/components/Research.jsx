import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Award } from 'lucide-react';

const papers = [
  {
    num: '01',
    title: 'NeuroMind: Clinical Neurological Diagnostic System',
    subtitle: 'EEG Signal Diagnostic Pipeline & RAG Insights',
    desc: 'Research focusing on Dravet Syndrome detection and seizure patterns. Implements transfer-learned ShallowFBCSPNet neural architectures for band-power feature extraction, deep autoencoders for classification of anomalous brain activities, and customized RAG model recommenders matching diagnostic logs to clinical advice databases.',
    tags: ['Machine Learning', 'Healthcare AI', 'Signal Processing', 'Autoencoders', 'EEG Analysis'],
    achievement: 'NUST Senior Research Project & Deployment Model'
  },
  {
    num: '02',
    title: "Acoustic Feature Analysis of Qur'anic Recitation",
    subtitle: 'Quantitative Voice Waveform & Calming Metrics',
    desc: 'A comparative study investigating the physiological calming impacts of Qur\'anic recitation audio waveforms. Performs extensive digital audio parsing over multi-speaker databases to extract acoustic features (pitch variance, MFCC distributions, formants, intensity levels) to mathematically evaluate stress-reduction factors.',
    tags: ['Audio Processing', 'Signal Analysis', 'Data Science', 'Feature Extraction', 'Calming Analytics'],
    achievement: 'Peer-Reviewed Study & Acoustics Analysis'
  }
];

export default function Research() {
  return (
    <section id="research" className="py-24 bg-transparent border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Research & <span className="italic font-normal text-blue-400">Publications</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto"></div>
          <p className="font-sans text-gray-300 text-base sm:text-lg">
            Investigating computer engineering applications in medical diagnostics and audio-biological digital signal analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {papers.map((paper, idx) => (
            <motion.div
              key={paper.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 150, damping: 22, delay: idx * 0.15 }}
              whileHover={{ y: -5 }}
              className="relative p-8 sm:p-10 rounded-3xl bg-[#132033]/80 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Giant Translucent Number Label */}
              <div className="absolute right-6 top-0 font-heading text-[10rem] sm:text-[13rem] italic font-bold text-white/5 select-none pointer-events-none leading-none -z-10 translate-y-[-10px] sm:translate-y-[-30px]">
                {paper.num}
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  <FileText className="w-3.5 h-3.5" />
                  Academic Research
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white leading-snug max-w-[85%]">
                  {paper.title}
                </h3>
                
                <p className="text-sm font-semibold text-blue-400 font-sans">
                  {paper.subtitle}
                </p>

                <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed">
                  {paper.desc}
                </p>
              </div>

              <div className="space-y-6 pt-6 mt-6 border-t border-white/5">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium font-sans bg-white/5 text-gray-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Achievement Highlight */}
                <div className="flex items-center gap-2 text-xs text-amber-400/90 font-sans font-semibold">
                  <Award className="w-4 h-4" />
                  <span>{paper.achievement}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
