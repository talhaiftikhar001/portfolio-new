import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/60 border-t border-white/5 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Brand */}
        <div className="flex justify-center items-center gap-2">
          <a href="#" className="font-heading text-xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors duration-300">
            Talha <span className="italic font-light">Iftikhar</span>
          </a>
        </div>

        {/* Short bio */}
        <p className="text-gray-500 font-sans text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          AI/ML Engineer & Full Stack Developer. Specialized in machine learning models, digital signal analysis, and highly-performant web interfaces.
        </p>

        {/* Social anchors row */}
        <div className="flex justify-center items-center gap-6">
          <a 
            href="mailto:talhaiftikhar001@gmail.com" 
            className="text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/talha-iftikhar-81aa24327" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="https://github.com/talhaiftikhar001" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright info */}
        <div className="text-xs text-gray-600 font-sans pt-6 border-t border-white/5">
          &copy; {new Date().getFullYear()} Talha Iftikhar. All rights reserved. Built with React, Tailwind CSS, & Express.
        </div>

      </div>
    </footer>
  );
}
