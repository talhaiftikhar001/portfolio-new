import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await axios.post('/api/contact', formData);
      if (response.data && response.data.success) {
        setStatus({
          type: 'success',
          message: response.data.message || 'Thank you! Your message was received.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Failed to submit form. Please try again later.';
      setStatus({
        type: 'error',
        message: errMsg
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-transparent border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Get In <span className="italic font-normal text-blue-400">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto"></div>
          <p className="font-sans text-gray-300 text-base sm:text-lg">
            Have a project in mind, an opportunity, or just want to discuss machine learning? Reach out below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left Side: Info and External Profiles */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-heading font-bold text-white text-left">Collaboration Details</h3>
              <p className="text-sm font-sans text-gray-400 leading-relaxed text-left">
                Currently open to graduate roles, contract partnerships, and systems development opportunities.
              </p>
            </div>

            <div className="space-y-4 font-sans text-sm text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Email Address</p>
                  <a href="mailto:talhaiftikhar001@gmail.com" className="text-white hover:text-blue-400 font-semibold transition-colors duration-200">
                    talhaiftikhar001@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">LinkedIn Profile</p>
                  <a 
                    href="https://www.linkedin.com/in/talha-iftikhar-81aa24327" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-blue-400 font-semibold transition-colors duration-200"
                  >
                    talha-iftikhar-81aa24327
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">GitHub Repository</p>
                  <a 
                    href="https://github.com/talhaiftikhar001" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-blue-400 font-semibold transition-colors duration-200"
                  >
                    @talhaiftikhar001
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Neon-framed glassmorphic form */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="p-8 rounded-3xl bg-[#132033]/60 border border-white/10 backdrop-blur-xl shadow-2xl relative"
            >
              {/* Top border neon glow array line */}
              <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2 flex flex-col items-start">
                    <label htmlFor="name" className="text-xs font-semibold text-gray-300 font-sans uppercase tracking-wider">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 font-sans text-white focus:outline-none focus:border-blue-400/50 transition-colors duration-200"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2 flex flex-col items-start">
                    <label htmlFor="email" className="text-xs font-semibold text-gray-300 font-sans uppercase tracking-wider">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 font-sans text-white focus:outline-none focus:border-blue-400/50 transition-colors duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2 flex flex-col items-start">
                  <label htmlFor="subject" className="text-xs font-semibold text-gray-300 font-sans uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Job Collaboration, Project Request..."
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 font-sans text-white focus:outline-none focus:border-blue-400/50 transition-colors duration-200"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2 flex flex-col items-start">
                  <label htmlFor="message" className="text-xs font-semibold text-gray-300 font-sans uppercase tracking-wider">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project details..."
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 font-sans text-white focus:outline-none focus:border-blue-400/50 transition-colors duration-200 resize-none"
                    required
                  ></textarea>
                </div>

                {/* Feedback Panel */}
                <AnimatePresence mode="wait">
                  {status.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-4 rounded-xl flex items-start gap-3 text-sm font-sans w-full ${status.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-300' : 'bg-red-500/10 border border-red-500/20 text-red-300'}`}
                    >
                      {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                      <span>{status.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
