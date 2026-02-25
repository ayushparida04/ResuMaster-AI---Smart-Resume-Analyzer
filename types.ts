
export interface SkillGap {
  technical: string[];
  tools: string[];
  soft: string[];
  missing: string[];
}

export interface BulletImprovement {
  original: string;
  improved: string;
  reason: string;
}

export interface MLMetadata {
  pythonSnippet: string;
  sqlQuery: string;
  modelWeights: Record<string, number>;
  featureImportance: { feature: string; impact: number }[];
}

export interface AnalysisResult {
  scores: {
    overall: number;
    atsCompatibility: number;
    semanticMatch: number;
    keywordScore: number;
  };
  explanation: string;
  skills: SkillGap;
  bulletPointImprovements: BulletImprovement[];
  formattingIssues: string[];
  grammarInsights: string[];
  quantificationTips: string[];
  professionalSummary: string;
  benchmarking: {
    level: 'Junior' | 'Mid' | 'Senior' | 'Lead';
    comparison: string;
  };
  mlMetadata: MLMetadata;
}

export interface UserInput {
  resumeText: string;
  jobDescription: string;
}
