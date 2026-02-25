
import React from 'react';
import { MousePointer2, Zap, Target, Search } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative pt-20 pb-16 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[100px] opacity-50" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-4 animate-bounce">
          <Zap className="w-4 h-4" /> Powered by Gemini 3 Flash
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1]">
          Stop guessing. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Master the ATS.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed font-medium">
          Upload your resume and get a comprehensive AI analysis, keyword matching, and bullet point optimizations to land your dream interview.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-indigo-600">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold">Match Score</h3>
            <p className="text-sm text-gray-500 text-center">Precise percentage match against any specific job description.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-indigo-600">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold">Skill Extraction</h3>
            <p className="text-sm text-gray-500 text-center">Identifies hard and soft skills automatically from your text.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-indigo-600">
              <MousePointer2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold">STAR Rewriter</h3>
            <p className="text-sm text-gray-500 text-center">Transform weak bullets into high-impact achievement statements.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
