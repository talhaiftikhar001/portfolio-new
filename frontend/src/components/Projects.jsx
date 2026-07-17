import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Filter } from 'lucide-react';
import axios from 'axios';

// Fallback projects list in case API fails
const fallbackProjects = [
  {
    id: 'neuromind-platform',
    title: 'NeuroMind Platform',
    category: 'AI/ML & Fullstack',
    description: 'A clinical neurological diagnostic software suite designed to assist medical practitioners. Incorporates transfer-learning ShallowFBCSPNet architectures, autoencoder neural networks for signal anomaly classification, and custom RAG model agents to provide personalized diagnostic insights and therapeutic recommendations.',
    tags: ['React', 'Node.js', 'Python', 'Machine Learning', 'Signal Processing', 'RAG'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  },
  {
    id: 'heart-disease-predictor',
    title: 'Heart Disease Risk Predictor',
    category: 'AI/ML',
    description: 'Machine learning model predicting cardiovascular hazards using patient biometric parameters. Features automated CI/CD deployment pipelines alongside custom GitHub actions validating model weights, testing accuracy metrics, and checking compliance frameworks on every commit.',
    tags: ['Python', 'Machine Learning', 'CI/CD', 'GitHub Actions', 'Scikit-Learn'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  },
  {
    id: 'self-driving-vision-assistant',
    title: 'Embedded Self-Driving Vision Assistant',
    category: 'Robotics & Vision',
    description: 'Low-latency computer vision framework deployed on a Raspberry Pi embedded module. Performs real-time lane tracking, traffic sign segmentation, obstacle avoidance, and sensory feedback loops utilizing OpenCV filters and path-planning algorithms.',
    tags: ['OpenCV', 'Python', 'Raspberry Pi', 'Embedded Systems', 'Computer Vision'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  },
  {
    id: 'emotion-recognition-layer',
    title: 'Real-Time Emotion Recognition Layer',
    category: 'AI/ML',
    description: 'An AI-powered neural analysis framework tracking facial expressions from live camera streams. Deploys highly optimized convolutional layers to minimize inference latency and enable high-fidelity integration into interactive applications.',
    tags: ['Python', 'OpenCV', 'TensorFlow', 'Deep Learning', 'Low Latency'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  },
  {
    id: 'audio-signal-classification',
    title: 'Audio Signal Classification Application',
    category: 'AI/ML',
    description: 'A Web audio interface analyzing raw voice and acoustic waves. Extracts mel-spectrogram arrays, audio features (MFCCs, spectral centroid), and runs signal recognition pipelines using custom neural nets with a Flask backend server interface.',
    tags: ['Python', 'Flask', 'Machine Learning', 'Audio Processing', 'Librosa'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  },
  {
    id: 'iot-rfid-gateway',
    title: 'Distributed IoT RFID Scanning Gateway',
    category: 'Web Dev',
    description: 'A multi-scanner management system for warehouse and asset telemetric tracking. Collects data from distributed ESP32 RFID modules, coordinates communication queues via custom protocols, and displays live metrics on a Node.js dashboard.',
    tags: ['Node.js', 'IoT', 'Express', 'Web Dashboard', 'RFID', 'ESP32'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  },
  {
    id: 'universal-metals-ecommerce',
    title: 'Universal Metals E-Commerce System',
    category: 'Web Dev',
    description: 'B2B e-commerce enterprise solution targeting metal fabrication and supply operations. Integrates advanced pricing matrices, custom weight calculators, search filtering, and robust schema management driven by a MySQL database engine.',
    tags: ['Flask', 'MySQL', 'Python', 'E-Commerce', 'Database Design'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  },
  {
    id: 'retail-yolov8-scanner',
    title: 'Retail YOLOv8 Automated Object Scanner',
    category: 'Robotics & Vision',
    description: 'Smart self-checkout visual tracking engine executing high-speed YOLOv8 object detection pipelines. Automatically identifies retail items in camera frames, registers items with price lookup servers, and handles item overlap scenarios.',
    tags: ['YOLOv8', 'OpenCV', 'PyTorch', 'Computer Vision', 'Retail Tech'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  },
  {
    id: 'fpga-processor-design',
    title: 'FPGA Hardware Architecture Processor Design',
    category: 'Hardware',
    description: 'A custom structural processor architecture modeled in Verilog. Includes register file architectures, arithmetic logic units (ALU), memory decoders, control pathways, and successful validation outputs through physical FPGA synthesis pipelines.',
    tags: ['Verilog', 'FPGA', 'Computer Architecture', 'Synthesis', 'Hardware Design'],
    github: 'https://github.com/talhaiftikhar001',
    demo: '#'
  }
];

const categories = ['All', 'AI/ML', 'Web Dev', 'Robotics & Vision', 'Hardware'];

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        if (response.data && Array.isArray(response.data)) {
          setProjects(response.data);
        }
      } catch (err) {
        console.warn('Backend server not responding. Using fallback project list.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category.includes(activeFilter) || p.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase())));

  return (
    <section id="projects" className="py-24 bg-transparent border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Portfolio <span className="italic font-normal text-blue-400">Showcase</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto"></div>
          <p className="font-sans text-gray-300 text-base sm:text-lg">
            An filterable repository of systems engineering products, hardware processors, and deep neural analysis applications.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 mr-2">
            <Filter className="w-4 h-4 text-blue-400" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold font-sans transition-all duration-300 ${activeFilter === cat ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                whileHover={{ y: -6 }}
                className="flex flex-col justify-between p-6 rounded-2xl bg-[#132033]/70 border border-white/10 backdrop-blur-md hover:border-white/20 hover:bg-[#172840]/90 transition-all duration-300 shadow-xl group"
              >
                <div>
                  {/* Card category pill */}
                  <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 font-sans mb-4">
                    {project.category}
                  </div>
                  
                  {/* Card title */}
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 group-hover:text-glow-blue transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Card description */}
                  <p className="text-gray-300 font-sans text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-sans font-medium bg-white/5 text-gray-300 border border-white/5 group-hover:bg-white/10 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <Github className="w-4 h-4" />
                      Repository
                    </a>
                    
                    {project.demo !== '#' && (
                      <a
                        href={project.demo}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-sans">
            No projects found in this category.
          </div>
        )}

      </div>
    </section>
  );
}
