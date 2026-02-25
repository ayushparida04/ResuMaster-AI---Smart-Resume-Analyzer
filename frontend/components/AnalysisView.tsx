
import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { 
  Target, Award, Zap, BookOpen, Layers, 
  RefreshCw, Check, Cpu, BarChart3, Binary, 
  Code2, Database, Terminal, ChevronDown, ChevronUp, FileCode2
} from 'lucide-react';
import { 
  ResponsiveContainer, Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';

interface AnalysisViewProps {
  data: AnalysisResult;
  onReset: () => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState<'results' | 'engineering'>('results');

  const radarData = [
    { subject: 'Similarity', A: data.scores.semanticMatch },
    { subject: 'Keywords', A: data.scores.keywordScore },
    { subject: 'Formatting', A: data.scores.atsCompatibility },
    { subject: 'Impact', A: Math.min(100, data.scores.overall + 5) },
    { subject: 'Clarity', A: 85 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex bg-gray-50 p-1 rounded-xl w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('results')}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'results' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Analysis Results
          </button>
          <button 
            onClick={() => setActiveTab('engineering')}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'engineering' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Engineering (Python/SQL)
          </button>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-bold text-sm"
          >
            <RefreshCw className="w-4 h-4" /> New Scan
          </button>
        </div>
      </div>

      {activeTab === 'results' ? (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Overall Quality', value: data.scores.overall, icon: BarChart3, color: 'indigo' },
              { label: 'Semantic Match', value: data.scores.semanticMatch, icon: Target, color: 'blue' },
              { label: 'ATS Compliance', value: data.scores.atsCompatibility, icon: Layers, color: 'emerald' },
              { label: 'Keyword Density', value: data.scores.keywordScore, icon: Binary, color: 'amber' },
            ].map((score, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className={`w-10 h-10 bg-${score.color}-50 text-${score.color}-600 rounded-xl flex items-center justify-center mb-4`}>
                  <score.icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-black text-gray-900 mb-1">{score.value}%</div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-tight">{score.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" /> Semantic Alignment Profile
              </h3>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full h-64 md:w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="subject" fontSize={11} fontWeight={600} />
                      <Radar name="Analysis" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-gray-700 leading-relaxed italic text-sm">"{data.explanation}"</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {data.benchmarking.level}
                    </div>
                    <div className="text-xs text-gray-500 font-bold uppercase">{data.benchmarking.comparison}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-900 rounded-2xl p-8 text-white">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-300" /> Impact Metrics
              </h3>
              <div className="space-y-4">
                {data.quantificationTips.map((tip, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <Check className="w-4 h-4 text-indigo-300 shrink-0 mt-1" />
                    <p className="text-sm leading-snug">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skill NER View */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Binary className="w-5 h-5 text-gray-500" /> NER Skill Decomposition
              </h3>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Transformer-Based NER</div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Technical Core', items: data.skills.technical, color: 'indigo' },
                { label: 'Tools & Frameworks', items: data.skills.tools, color: 'blue' },
                { label: 'Soft/Domain Skills', items: data.skills.soft, color: 'emerald' },
                { label: 'Identified Gaps', items: data.skills.missing, color: 'rose' },
              ].map((cat, i) => (
                <div key={i}>
                  <h4 className={`text-xs font-black text-${cat.color}-400 uppercase mb-4 tracking-widest`}>{cat.label}</h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((s, idx) => (
                      <span key={idx} className={`px-2.5 py-1 bg-${cat.color}-50 text-${cat.color}-700 text-[11px] font-bold rounded-lg border border-${cat.color}-100`}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Feature Importance Chart */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" /> Feature Importance (XGBoost)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.mlMetadata.featureImportance} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="feature" type="category" fontSize={11} width={100} fontWeight={600} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="impact" radius={[0, 4, 4, 0]}>
                      {data.mlMetadata.featureImportance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4f46e5' : '#818cf8'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-xs text-gray-400 font-medium">Model shows high reliance on {data.mlMetadata.featureImportance[0]?.feature || 'skills'} as a primary predictive factor.</p>
            </div>

            {/* SQL Vector Query */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
              <div className="px-6 py-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">PostgreSQL Vector Search</span>
                </div>
                <button onClick={() => navigator.clipboard.writeText(data.mlMetadata.sqlQuery)} className="text-gray-500 hover:text-white transition-colors">
                  <FileCode2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 font-mono text-[13px] text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre">
                {data.mlMetadata.sqlQuery}
              </div>
            </div>
          </div>

          {/* Python Notebook View */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Python NER Implementation (Databricks)</span>
              </div>
              <button onClick={() => navigator.clipboard.writeText(data.mlMetadata.pythonSnippet)} className="text-gray-500 hover:text-white transition-colors">
                <FileCode2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-8 font-mono text-[13px] text-blue-300 leading-relaxed overflow-x-auto whitespace-pre">
              {data.mlMetadata.pythonSnippet}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
