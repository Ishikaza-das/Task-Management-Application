import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-0 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-bold text-white">Task Manager</h1>
          <p className="text-gray-400 mt-1">Organize your tasks, plan your day, and stay productive.</p>
        </div>
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#about" className="hover:text-white">About</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>
        <div className="flex space-x-4">
          <a href="https://github.com/Ishikaza-das" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Github className="w-5 h-5" />
          </a>
          <a href="www.linkedin.com/in/ritesh-das17" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:someone@example.com" className="hover:text-white">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-6 text-sm">
        &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
