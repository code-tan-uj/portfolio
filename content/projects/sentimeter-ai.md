---
title: "Sentimeter AI — Chat Screenshot Intelligence"
slug: "sentimeter-ai"
description: "Research initiative at Samsung transforming chat screenshots into actionable sentiment intelligence using OCR, speaker diarization, and fine-tuned RoBERTa transformers."
category: "research"
tags: ["BERT", "RoBERTa", "OpenCV", "EasyOCR", "Python", "NLP", "Transformers"]
featured: true
thumbnail: "/projects/project-3.svg"
liveUrl: ""
githubUrl: ""
order: 3
role: "Research Intern"
duration: "6 months"
team: 4
---

## Project Overview

What happens when customer complaints arrive as screenshots instead of text? At **Samsung PRISM Research**, I tackled this fascinating problem — building a pipeline that extracts emotional intelligence from chat screenshots with **0.92+ F1-score** across WhatsApp, Slack, and Samsung Messages.

This wasn't just OCR → Sentiment. We solved the *hard* problems: speaker attribution from bubble positioning, sarcasm detection in chat slang, and privacy-first PII redaction — all production-grade.

## The Research Challenge

Traditional sentiment analysis works on text. But in the real world:
- Customer grievances are shared as **screenshots** on social media
- Support QA teams review **images of conversations**, not transcripts
- Competitive intelligence involves analyzing **competitor app screenshots**

We needed to bridge the gap between unstructured visual data and actionable emotional insights.

## Key Innovations

### Three-Stage Pipeline Architecture

**Stage 1: Image Pre-processing & ROI Detection**
- Bilateral filtering for noise reduction while preserving text edges
- Dynamic contrast enhancement (CLAHE) for low-contrast mobile UIs
- Contour-based ROI extraction isolating chat content from UI chrome
- **94.3% accuracy** on 500-image test set across diverse apps

**Stage 2: OCR with Speaker Context Preservation**
- **EasyOCR** selection over Tesseract (96.8% vs 89.3% confidence score)
- Novel speaker attribution algorithm using spatial clustering
- Left/right bubble positioning → User/Respondent classification
- **97.1% accuracy** in speaker attribution (validated on 200 screenshots)

**Stage 3: Transformer-Based Sentiment Classification**
- Fine-tuned **RoBERTa** over BERT for superior sarcasm handling
- Custom chat-specific preprocessing (emoji → text, slang normalization)
- Speaker-level sentiment tracking with temporal trajectory analysis

### Model Performance

| Class | Precision | Recall | F1-Score |
|-------|-----------|--------|----------|
| Positive | 0.912 | 0.935 | 0.923 |
| Neutral | 0.934 | 0.896 | 0.914 |
| Negative | 0.918 | 0.950 | 0.934 |
| **Overall** | - | - | **0.923** |

### Privacy-First PII Redaction

Built hybrid NER + rule-based PII detection achieving **95.5% F1-score**:
- Named entity recognition for PERSON, PHONE, EMAIL, ADDRESS
- Automatic redaction before cloud processing
- GDPR/CCPA compliance built-in
- Complete audit trails for regulatory evidence

## Technical Deep Dive

### Why RoBERTa Over BERT?
```
RoBERTa Advantages:
✓ No Next Sentence Prediction (removes noise)
✓ Dynamic masking (40 copies of training data)
✓ Larger batch sizes (8000 across 1024 GPUs training)
✓ 2-3% F1 improvement on sentiment tasks
✓ Better sarcasm capture — critical for chat analysis
```

### Speaker Context Preservation Algorithm
```python
# Novel contribution: Speaker attribution without explicit bubble detection
1. Spatial Clustering → Group OCR boxes by vertical proximity
2. Horizontal Position Analysis:
   - x_median < image_width/3 → User speaker
   - x_median > 2*image_width/3 → Respondent speaker
3. Temporal Sequencing → Order top-to-bottom
4. Insert <SPEAKER_CHANGE> tokens at conversation turns
```

### Chat-Specific Text Normalization
- Emoji conversion: 😠 → [ANGRY_FACE] (preserves sentiment signal)
- Slang dictionary: 1000+ mappings ("lol" → "laugh out loud")
- ALL-CAPS detection: 1.25× sentiment multiplier (shouting signal)
- Punctuation intensity: "!!!" → 1.3× weight factor

## Enterprise Product: Sentimeter AI

The research culminated in a CTO pitch for enterprise deployment:

- **Automated QA**: Process thousands of support chats daily
- **Crisis Early Warning**: Detect sentiment spikes before public escalation
- **Competitive Intelligence**: Systematic analysis of competitor app feedback
- **Compliance Automation**: GDPR/CCPA-ready with audit trails

## Tech Stack

**ML/NLP**: RoBERTa, BERT, spaCy NER, HuggingFace Transformers
**Computer Vision**: OpenCV, EasyOCR
**Backend**: Python, Streamlit (prototype)
**Training**: NVIDIA A100, AdamW optimizer, CrossEntropy with label smoothing

## Key Learnings

Research taught me the value of **ablation studies** — our final 0.923 F1-score came from dozens of experiments comparing:
- Tesseract vs EasyOCR (EasyOCR won handily)
- BERT vs RoBERTa (RoBERTa's dynamic masking made the difference)
- Various spatial clustering thresholds

The most elegant solution wasn't the most complex — our speaker attribution algorithm required no ML, just clever geometry.

---

*This research showed me that the best AI systems often combine multiple modalities — here, computer vision, NLP, and spatial reasoning working together.*
