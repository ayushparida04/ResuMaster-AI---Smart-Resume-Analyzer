
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { AnalysisView } from './components/AnalysisView';
import { analyzeResume } from './services/geminiService';
import { AnalysisResult } from './types';
import { 
  Upload, FileText, Loader2, AlertCircle, X, 
  ChevronRight, Target, Binary, Cpu, Database, Network, Terminal
} from 'lucide-react';

import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://esm.sh/pdfjs-dist@4.10.38/build/pdf.worker.mjs`;

const PIPELINE_STEPS = [
  { label: 'Initializing Python Kernel', icon: Cpu, log: '>>> import torch, spacy\n>>> loading "en_core_web_trf"...' },
  { label: 'Document OCR & Parsing', icon: FileText, log: '>>> pdfjs: extracting binary layers\n>>> mammoth: converting docx to xml' },
  { label: 'SQL DB Search', icon: Database, log: '>>> SELECT * FROM resumes WHERE vector <=> %s ORDER BY similarity...' },
  { label: 'NER Feature Engineering', icon: Binary, log: '>>> transformer_ner.predict(text)\n>>> extracting professional entities...' },
  { label: 'Gradient Boosting Score', icon: Network, log: '>>> xgboost.predict_proba(features)\n>>> calculating final decision matrix...' }
];

const App: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setActiveStep(prev => (prev < PIPELINE_STEPS.length - 1 ? prev + 1 : prev));
      }, 1800);
    } else {
      setActiveStep(0);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const extractTextFromFile = async (file: File): Promise<string> => {
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (fileType === 'pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n';
      }
      return fullText;
    } 
    if (fileType === 'docx') {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    }
    if (fileType === 'txt') return await file.text();
    throw new Error('Unsupported format (PDF/DOCX/TXT only).');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsExtracting(true);
    setError(null);
    try {
      const text = await extractTextFromFile(file);
      setResumeText(text);
    } catch (err: any) {
      setError("File extraction failed.");
    } finally {
      setIsExtracting(false);
      e.target.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Resume and Job Description are required.");
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    try {
      const analysisResult = await analyzeResume(resumeText, jobDescription);
      setResult(analysisResult);
    } catch (err: any) {
      setError("ML Pipeline Execution Error. Check connection.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Layout>
      {!result ? (
        <>
          <Hero />
          
          <div className="max-w-6xl mx-auto px-4 pb-24">
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-100/50 border border-gray-100 p-8 md:p-14 space-y-12 overflow-hidden relative">
              {error && (
                <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center justify-between text-rose-700">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-bold">{error}</span>
                  </div>
                  <button onClick={() => setError(null)}><X className="w-5 h-5" /></button>
                </div>
              )}

              {isAnalyzing && (
                <div className="space-y-10 animate-in fade-in zoom-in duration-500 py-10">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Compiling ML Features...</h2>
                  </div>
                  
                  <div className="max-w-4xl mx-auto space-y-4">
                    <div className="flex justify-between relative px-2">
                      <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-100 -z-10" />
                      {PIPELINE_STEPS.map((step, i) => (
                        <div key={i} className={`flex flex-col items-center gap-3 transition-all duration-700 ${i <= activeStep ? 'opacity-100' : 'opacity-10'}`}>
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${i === activeStep ? 'bg-indigo-600 text-white scale-110 shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
                            <step.icon className="w-5 h-5" />
                          </div>
                          <span className="text-[9px] font-black uppercase tracking-tighter text-gray-500 whitespace-nowrap hidden sm:block">{step.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-900 rounded-2xl p-6 font-mono text-[11px] text-indigo-400 shadow-xl border border-gray-800 h-32 overflow-hidden">
                      <div className="flex items-center gap-2 mb-3 text-gray-500 border-b border-gray-800 pb-2">
                        <Terminal className="w-3 h-3" />
                        <span className="uppercase tracking-widest text-[9px]">Python 3.10 Kernel Log</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-600">[{new Date().toLocaleTimeString()}] System initializing...</p>
                        <p className="animate-pulse">{PIPELINE_STEPS[activeStep].log}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!isAnalyzing && (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-black tracking-tight">Source</h2>
                    </div>
                    <div className="p-8 border-2 border-dashed border-gray-200 rounded-[2rem] hover:border-indigo-400 transition-all text-center bg-gray-50/50">
                      <label className="cursor-pointer block">
                        {isExtracting ? (
                          <Loader2 className="w-12 h-12 text-indigo-500 mx-auto animate-spin" />
                        ) : (
                          <>
                            <Upload className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                            <span className="block text-sm font-bold text-gray-700 mb-1">Upload Resume</span>
                            <span className="block text-xs text-gray-400">PDF, DOCX supported</span>
                          </>
                        )}
                        <input type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={handleFileUpload} />
                      </label>
                    </div>
                    <textarea
                      className="w-full h-48 bg-white border border-gray-100 rounded-2xl p-6 text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none text-gray-600"
                      placeholder="Resume content..."
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                    />
                  </div>

                  <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                        <Target className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-black tracking-tight">Target JD</h2>
                    </div>
                    <textarea
                      className="w-full h-full min-h-[400px] bg-white border border-gray-100 rounded-[2rem] p-8 text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none shadow-inner text-gray-600 font-medium leading-relaxed"
                      placeholder="Paste the target job description to build feature vectors..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {!isAnalyzing && (
                <div className="flex flex-col items-center gap-6 pt-6 border-t border-gray-50">
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !resumeText.trim() || !jobDescription.trim()}
                    className="group relative flex items-center justify-center gap-4 bg-gray-900 text-white px-20 py-6 rounded-full font-black text-xl hover:bg-indigo-600 transition-all shadow-2xl hover:-translate-y-1 active:scale-95 disabled:opacity-20"
                  >
                    DEPLOY ANALYSIS
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center gap-8 text-[9px] font-black text-gray-300 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400" /> Python 3.10</span>
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400" /> SQL Vector DB</span>
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400" /> XGBoost Kernel</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <AnalysisView data={result} onReset={() => setResult(null)} />
      )}
    </Layout>
  );
};

export default App;
