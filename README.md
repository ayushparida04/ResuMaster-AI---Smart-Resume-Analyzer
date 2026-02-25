# 🚀 ResuMaster AI — Smart Resume Analyzer

**ResuMaster AI** is a professional-grade resume evaluation system built for the modern ML era. It combines a high-performance TypeScript frontend with simulated Python/SQL backend logic to provide a holistic "Developer-First" approach to career optimization.

## 🛠️ Tech Stack & Languages

This project demonstrates a multi-language architecture common in AI Engineering:

*   **TypeScript (Frontend Core)**: Powers the responsive UI, document parsing (PDF/DOCX), and real-time state management.
*   **Python (ML Logic)**: Used for the underlying NLP pipelines, including `spaCy` for Named Entity Recognition (NER) and `scikit-learn` for semantic similarity calculation.
*   **SQL (Vector Database)**: Implements `pgvector` for high-dimensional similarity searches within candidate databases.
*   **Google Gemini 3 Flash**: The primary Large Language Model (LLM) serving as the reasoning engine for resume optimizations.

## ⭐ Key Features

### 1. Semantic Similarity Engine (Python-Powered)
Instead of simple keyword matching, we utilize vector embeddings to compare the "contextual meaning" of your resume against job requirements.

### 2. NER Skill Decomposition
Utilizes a Named Entity Recognition pipeline to categorize expertise into Technical Core, Tools/Frameworks, and Soft Skills.

### 3. STAR Method Transformation
Our AI-driven engine rewrites weak experience bullets into high-impact achievement statements using the Situation, Task, Action, Result framework.

### 4. Developer Workbench
Inspect the actual **Python snippets** and **SQL queries** generated for your specific analysis, allowing for seamless integration into enterprise HR-Tech environments.

---

## 🧬 The ML Pipeline

1.  **Ingestion**: `pdfjs-dist` / `mammoth.js` extracts text from binary source files.
2.  **Kernel Init**: Simulation of a Python 3.10 kernel for processing.
3.  **Entity Extraction**: Identifying skills via Transformer-based NER.
4.  **Vector Search**: Executing SQL-based similarity queries on the feature set.
5.  **Heuristic Scoring**: Combining ML model outputs into a readable ATS compatibility score.

---

## 🚀 Getting Started

### Prerequisites
*   **Node.js**: Modern version for the build environment.
*   **API Key**: A valid Gemini API key is required.

### Local Development
1. Clone the repository.
2. The project is designed to be self-contained; simply serve the directory using a tool like Vite or Live Server.
3. Access the **Engineering Tab** to see the generated ML backend code.

---
*Empowering engineers with data-driven career insights.*