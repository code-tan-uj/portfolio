---
title: "Chat With Your Files — RAG Document Intelligence"
slug: "chat-with-files"
description: "Production-grade RAG application enabling natural language queries over enterprise documents — built in 8 weeks from research to deployment at American Axle Manufacturing."
category: "ai"
tags: ["LangChain", "FAISS", "Cohere", "Streamlit", "Python", "RAG"]
featured: true
thumbnail: "/projects/project-4.svg"
liveUrl: ""
githubUrl: ""
order: 4
role: "AI Intern"
duration: "8 weeks"
team: 3
---

## Project Overview

What if your 500-page technical manual could answer questions? At **American Axle Manufacturing**, I built exactly that — a conversational AI that transforms static PDFs, CSVs, and DOCX files into interactive knowledge assets.

Built on **LangChain + FAISS + Cohere** in just **8 weeks** (research → production!), this RAG system reduced information retrieval time from **45 minutes to under 2 minutes**.

## The Problem

Enterprise documentation is a graveyard of underutilized knowledge:
- Engineers spend 20-45 minutes searching through manuals
- Technical specs exist but aren't accessible to non-technical users
- Knowledge walks out the door when SMEs leave
- Compliance audits require digging through mountains of PDFs

The solution? Make documents **conversational**.

## Key Features

- **📄 Multi-Format Ingestion**: PDF, CSV, DOCX support with intelligent text extraction and structure preservation

- **🧠 Semantic Chunking**: 500-1000 token segments with overlap, balancing context richness and retrieval granularity

- **⚡ FAISS Vector Search**: Sub-second similarity matching across document collections using Cohere embeddings

- **💬 Conversational Memory**: Multi-turn interactions with LangChain's ConversationalRetrievalChain maintaining context across questions

- **📎 Source Attribution**: Every answer links back to specific document passages — perfect for compliance and verification

## Technical Architecture

```
User Upload → Document Parsing → Semantic Chunking
                                       ↓
                              Cohere Embeddings
                                       ↓
                              FAISS Vector Index
                                       ↓
User Query → Query Embedding → Similarity Search → Top-K Retrieval
                                                          ↓
                                              LLM Answer Generation (Cohere)
                                                          ↓
                                              Response + Source Attribution
```

### RAG Pipeline Details

**Embedding Generation**
- Cohere `embed-english-v3.0` (768-dimensional vectors)
- Batched API calls with retry logic
- Metadata association for traceability

**Vector Store**
- FAISS Flat index for accurate retrieval (perfect for mid-sized corpora)
- Persistence to disk — no re-embedding needed
- Index lifecycle management for document updates

**Conversational Chain**
- LangChain `ConversationalRetrievalChain` with memory buffer
- Carefully crafted prompts emphasizing document grounding
- Temperature tuning for consistent, factual responses

## Technology Selection Rationale

### Why Cohere?
- Enterprise-grade reliability and stable API contracts
- Strong instruction-following for document Q&A
- Cost-effective for mid-to-large document collections
- Official LangChain integration with comprehensive docs

### Why FAISS?
- Production-proven at Facebook scale
- CPU-friendly with fast similarity search
- No external dependencies (unlike Qdrant, Milvus)
- Seamless LangChain abstraction for future migration

### Why LangChain?
- Pre-built RAG chains reduce implementation time
- Modular design enables easy component swapping
- Prompt engineering best practices baked in
- Strong community and ecosystem

## 8-Week Sprint Timeline

| Week | Phase | Deliverable |
|------|-------|-------------|
| 1-2 | Research | Tech selection matrix, architecture design |
| 3-4 | Core Pipeline | PDF parsing, embeddings, FAISS indexing |
| 5-6 | RAG Integration | Full chain wired with Streamlit UI |
| 7-8 | Validation | Testing with real docs, latency optimization |

## Results

- **Indexing**: 50+ technical documents in <5 minutes
- **Query Latency**: <3 seconds for typical questions
- **User Feedback**: Positive ratings from engineers, managers, support staff
- **Information Retrieval**: 45 minutes → 2 minutes (95%+ reduction)

## Business Impact

**For Engineers**: Query specs, test reports, work instructions in seconds
**For Managers**: Ask targeted questions about KPIs, metrics, program status
**For New Hires**: Onboard faster by exploring documentation interactively
**For Compliance**: Audit trails via source attribution

## Tech Stack

**AI/LLM**: Cohere Chat/Command, Cohere Embeddings
**Framework**: LangChain, FAISS
**Backend**: Python 3.10+
**Frontend**: Streamlit
**Parsing**: PyPDF2, python-docx

## Key Learnings

This project taught me the **RAG pattern from scratch** — not just implementation, but the critical decisions:
- Chunk size matters enormously (too small = lost context, too large = retrieval noise)
- Top-K selection is an art (3-5 works well for generation)
- Prompt engineering is underrated (the difference between hallucination and grounded answers)

Most importantly: **8 weeks is enough to go from zero to production** if you make decisive technology choices early.

---

*My first production AI system — and the one that convinced me that LLMs aren't just chatbots, they're interfaces to human knowledge.*
