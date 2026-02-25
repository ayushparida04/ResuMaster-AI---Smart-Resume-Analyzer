import spacy
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict

# Professional NLP Pipeline for Resume Analysis
nlp = spacy.load("en_core_web_trf")

def extract_entities(text: str) -> Dict[str, List[str]]:
    """
    Extracts technical skills and tools using a custom NER model.
    """
    doc = nlp(text)
    entities = {
        "SKILLS": [ent.text for ent in doc.ents if ent.label_ == "SKILL"],
        "ORG": [ent.text for ent in doc.ents if ent.label_ == "ORG"],
        "PRODUCT": [ent.text for ent in doc.ents if ent.label_ == "PRODUCT"]
    }
    return entities

def calculate_semantic_match(resume_vec: np.ndarray, jd_vec: np.ndarray) -> float:
    """
    Calculates the cosine similarity between resume and JD embeddings.
    """
    similarity = cosine_similarity(resume_vec.reshape(1, -1), jd_vec.reshape(1, -1))
    return float(similarity[0][0]) * 100

if __name__ == "__main__":
    print("ResuMaster ML Kernel Initialized.")
