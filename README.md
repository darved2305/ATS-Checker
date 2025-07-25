# 🧠 AI ATS Resume Checker

Analyze your **resume vs. job description (JD)** and get:
- ✅ **ATS-style match score (0–100)**
- 🔑 **Missing & extra keywords**
- 🧠 **AI rewrite tips** (optional LLM)
- 📊 **Section-wise scoring** (Skills, Experience, Education, Projects)

Built with **React + Tailwind CSS**. Optional **Node/Python + OpenAI / Local LLM** backend for smarter NLP.

---

## ✨ Features
- 📤 Upload **PDF/DOCX resume** + paste JD
- 🧮 **Keyword-based & semantic** (embeddings) scoring
- 🧠 **AI suggestions** for summary, skills & bullet points
- 📊 **Breakdown by section** + visual gauge

---

## 🛠 Tech Stack

### Core
- **Frontend**: React 18, Vite (or CRA), Tailwind CSS
- **Parsing**: `pdfjs-dist` (PDF), `mammoth` (DOCX)
- **Scoring**: JS (token overlap, TF–IDF, cosine similarity optional)
- **Hosting**: Vercel / Netlify

