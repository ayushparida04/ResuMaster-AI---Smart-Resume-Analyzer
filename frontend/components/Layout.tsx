
import React from 'react';
import { Sparkles, BrainCircuit, ShieldCheck, FileText } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">ResuMaster <span className="text-indigo-600">AI</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Analyzer</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Resources</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-sm font-semibold text-gray-700 hover:text-indigo-600">Login</button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        {children}
      </main>

      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2024 ResuMaster AI. Powering careers with intelligence.</p>
          <div className="flex gap-6">
            <ShieldCheck className="w-5 h-5 text-gray-400" />
            <BrainCircuit className="w-5 h-5 text-gray-400" />
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </footer>
    </div>
  );
};
