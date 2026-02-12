---
title: "Gen AI Bannerization Platform"
slug: "gen-ai-bannerization"
description: "Enterprise-scale AI system automating banner creation with multi-agent LLMs, Vision Transformer QC, and distributed processing — generating 9,000+ production-ready banners daily."
category: "ai"
tags: ["Python", "Vision Transformers", "LangGraph", "RabbitMQ", "Celery", "OpenCV", "FastAPI"]
featured: true
thumbnail: "/projects/project-1.svg"
liveUrl: ""
githubUrl: ""
order: 1
role: "AI Engineer"
duration: "12 months"
team: 8
---

## Project Overview

Ever wondered what happens when you throw LLMs, Vision Transformers, and distributed computing at a design team's nightmare? You get a system that went from **6 hours per banner to 1 minute** — and I got to build it! 🚀

Gen AI Bannerization is an end-to-end intelligent automation platform that revolutionized how Bajaj Finserv creates marketing banners. We didn't just automate design — we built an AI assembly line with **98% quality accuracy** that produces **9,000+ unique banners daily**.

## The Challenge

Picture this: A design team drowning in repetitive banner requests — thousands of variants for web, mobile, email across 20+ product lines. Manual creation was the bottleneck; campaigns waited weeks to go live. We needed to make the impossible possible.

## Key Features

- **🤖 Multi-Agent Design System**: Built an orchestra of specialized AI agents (Strategist, Background Designer, Foreground Designer, Developer) using LangGraph that collaborate to generate banners from simple campaign briefs

- **🔍 Vision Transformer QC**: Fine-tuned ViT model achieving 98% accuracy in detecting design defects, brand violations, text overflow, and color compliance issues — with per-banner confidence scoring

- **⚡ Parallel Processing Engine**: Architected RabbitMQ + Celery distributed system handling 100+ simultaneous generation tasks without breaking a sweat

- **✂️ U²-Net Image Segmentation**: Custom fine-tuned deep segmentation network for precise background removal with 94%+ accuracy on brand-specific imagery

- **🏷️ MetaPrompting Intelligence**: Automatic extraction of high-value metadata for personalized content recommendations

## Technical Deep Dive

### The AI Agent Architecture
```
Campaign Brief → Strategist Agent → Background Designer → U²-Net Segmentation 
→ Foreground Designer → Developer Agent → Banner Assembly → ViT QC → Publishing
```

Each agent is purpose-built: the Strategist analyzes brand guidelines and historical performance; the Background Designer wields diffusion models; the Developer Agent outputs production-ready SVG/HTML5.

### Quality Control That Actually Works
Our ViT-based QC system went from 94% to **98% accuracy** through continuous learning on custom failure cases. It catches:
- Text misalignment and overflow
- Logo placement violations
- Brand color deviations (>5% from spec)
- WCAG contrast compliance issues
- CTA rendering problems

### Scale That Doesn't Break
Built on RabbitMQ + Celery with intelligent task routing:
- GPU-equipped workers handle image-heavy tasks
- Priority queues ensure QC never waits
- Kubernetes HPA auto-scales based on queue depth
- Dead letter queues catch and analyze failures

## Results That Matter

| Metric | Before | After | Impact |
|--------|--------|-------|--------|
| Banner Creation Time | 6 hours | 1 minute | 99.7% ↓ |
| Daily Production | ~50 | 9,000+ | 180x ↑ |
| Manual Design Effort | 100% | 30% | 70% ↓ |
| QC Accuracy | Human (~85%) | 98% | 15% ↑ |
| Design Rework | Frequent | Rare | 80% ↓ |

## Tech Stack

**AI/ML**: Vision Transformers, U²-Net, Diffusion Models, LangGraph, GPT-4
**Backend**: Python, FastAPI, Flask, Celery
**Infrastructure**: RabbitMQ, Redis, Docker, Kubernetes
**Computer Vision**: OpenCV, ONNX Runtime, OpenVINO
**Integration**: Adobe Experience Manager (AEM), Pimcore

## What I Learned

Building AI systems at scale is 20% model training and 80% systems engineering. The hardest part wasn't getting the models to work — it was making them work reliably at 9,000 requests per day while maintaining quality guardrails that real stakeholders trust.

---

*This project taught me that the best AI systems are the ones users forget are AI — they just work, at scale, reliably.*
