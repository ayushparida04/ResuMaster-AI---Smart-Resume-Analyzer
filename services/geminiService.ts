
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export const analyzeResume = async (resumeText: string, jobDescription: string): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are an ML Engineer specialized in HR-Tech. Analyze this resume vs JD.
    In addition to the standard analysis, provide:
    1. A Python script (using spacy/scikit-learn) that would extract these specific skills.
    2. A SQL query (Postgres/pgvector style) to find similar resumes in a vector DB.
    3. Feature importance weights for the scoring model.

    Resume: ${resumeText}
    JD: ${jobDescription}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          scores: {
            type: Type.OBJECT,
            properties: {
              overall: { type: Type.NUMBER },
              atsCompatibility: { type: Type.NUMBER },
              semanticMatch: { type: Type.NUMBER },
              keywordScore: { type: Type.NUMBER }
            },
            required: ["overall", "atsCompatibility", "semanticMatch", "keywordScore"]
          },
          explanation: { type: Type.STRING },
          skills: {
            type: Type.OBJECT,
            properties: {
              technical: { type: Type.ARRAY, items: { type: Type.STRING } },
              tools: { type: Type.ARRAY, items: { type: Type.STRING } },
              soft: { type: Type.ARRAY, items: { type: Type.STRING } },
              missing: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          bulletPointImprovements: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                improved: { type: Type.STRING },
                reason: { type: Type.STRING }
              }
            }
          },
          formattingIssues: { type: Type.ARRAY, items: { type: Type.STRING } },
          grammarInsights: { type: Type.ARRAY, items: { type: Type.STRING } },
          quantificationTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          professionalSummary: { type: Type.STRING },
          benchmarking: {
            type: Type.OBJECT,
            properties: {
              level: { type: Type.STRING },
              comparison: { type: Type.STRING }
            }
          },
          mlMetadata: {
            type: Type.OBJECT,
            properties: {
              pythonSnippet: { type: Type.STRING },
              sqlQuery: { type: Type.STRING },
              modelWeights: { type: Type.OBJECT, additionalProperties: { type: Type.NUMBER } },
              featureImportance: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    feature: { type: Type.STRING },
                    impact: { type: Type.NUMBER }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!response.text) throw new Error("Processing failed.");
  return JSON.parse(response.text) as AnalysisResult;
};
