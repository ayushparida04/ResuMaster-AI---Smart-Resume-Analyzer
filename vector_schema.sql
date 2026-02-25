-- Vector Database Schema for Resume Similarity Search
-- Requires pgvector extension

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS candidate_resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_name TEXT NOT NULL,
    resume_text TEXT NOT NULL,
    embedding vector(1536), -- Dimension size for Gemini/OpenAI embeddings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for efficient similarity search
CREATE INDEX ON candidate_resumes USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Example Similarity Query used in the ResuMaster AI Backend
-- SELECT 
--     candidate_name, 
--     1 - (embedding <=> :target_jd_vector) AS similarity_score
-- FROM candidate_resumes
-- ORDER BY similarity_score DESC
-- LIMIT 5;
