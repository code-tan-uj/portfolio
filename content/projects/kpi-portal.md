---
title: "KPI Portal — AI-Driven Analytics Dashboard"
slug: "kpi-portal"
description: "Real-time executive dashboard consolidating multi-dimensional KPIs with AI-powered insights, supporting 2M+ concurrent users at Bajaj Finserv."
category: "web"
tags: ["React", "TypeScript", "Node.js", "Redis", "MongoDB", "Docker", "WebSocket"]
featured: true
thumbnail: "/projects/project-5.svg"
liveUrl: ""
githubUrl: ""
order: 5
role: "Full Stack Developer"
duration: "3 months"
team: 6
---

## Project Overview

How do you give executives a single-pane-of-glass view into millions of data points while keeping AI agents properly sandboxed? At Bajaj Finserv, I built the **KPI Portal** — a real-time analytics dashboard that consolidates performance metrics across the entire asset portfolio with **sub-second query response** for **2M+ concurrent users**.

The twist? We needed to expose just enough data to AI agents for insight generation while keeping PII locked down tight. 🔐

## The Challenge

Bajaj Finserv's data was scattered:
- Product metrics in one system
- User engagement in another
- OTP success rates somewhere else
- Campaign performance... you get the picture

Executives needed insights *now*, not after 3 days of data team wrangling. And the AI systems needed access — but **not to everything**.

## Key Features

### 📊 Dashboard Capabilities
- **Multi-metric aggregation**: DAU, Sessions, MAU, Bounce Rate — all in one view
- **Real-time computation**: Auto-refresh with WebSocket-powered live updates
- **Dimensional filtering**: Slice by product category, page type, traffic source, campaign
- **Time-series analysis**: 7-day, week-wise, month-wise, business-hours trends
- **Comparative analysis**: D18 vs D17 granularity for trend detection

### 🤖 AI Integration (The Interesting Part)
- **Scoped Data Access**: AI agents see only aggregated metrics — never raw PII
- **Automated Alerting**: Threshold-based alerts with executive notification
- **Anomaly Detection**: ML-powered insight derivation with recommended actions
- **Complete Audit Trail**: Every AI interaction logged for compliance

### ⚡ Performance at Scale
- Sub-second query response through optimized data structures
- 2M+ concurrent users with millisecond latency
- WebSocket real-time updates without polling overhead

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│    React.js + TypeScript + Tailwind + WebSocket Client          │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                         HTTP / WebSocket
                                 │
┌────────────────────────────────┴────────────────────────────────┐
│                     APPLICATION LAYER                           │
│           Express.js REST API + WebSocket Server                │
│     JWT Auth │ Rate Limiting │ Data Aggregation │ Error Handling│
└────────────────────────────────┬────────────────────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
    Cache Layer            Query Layer            AI Agent Layer
         │                       │                       │
    ┌────┴────┐          ┌──────┴──────┐         ┌──────┴──────┐
    │  Redis  │          │   Query     │         │  AI Service │
    │Sessions │          │   Engine    │         │  Insights   │
    │Metrics  │          │Aggregations │         │   Alerts    │
    │Alerts   │          │   Joins     │         │   Actions   │
    └────┬────┘          └──────┬──────┘         └──────┬──────┘
         └───────────────────────┼───────────────────────┘
                                 │
┌────────────────────────────────┴────────────────────────────────┐
│                         DATA LAYER                              │
│          MongoDB (Primary)  │  DocumentDB (Backup/Failover)     │
└─────────────────────────────────────────────────────────────────┘
```

### AI Data Access Model (Security-First)

```
┌───────────────────────────────────┐
│     Full Data (MongoDB)           │
│  • Complete asset information     │
│  • User personal data             │
│  • Transaction history            │
└───────────────┬───────────────────┘
                │ Strict Filtering
                ↓
┌───────────────────────────────────┐
│    Scoped AI Agent Access         │
│  • Aggregated metrics only        │
│  • No PII exposure                │
│  • Time-windowed data             │
│  • Category-filtered views        │
└───────────────┬───────────────────┘
                │ Audit Logging
                ↓
┌───────────────────────────────────┐
│   Insight & Alert Generation      │
│  • Compliance verified            │
│  • Access timestamped             │
│  • Full audit trail               │
└───────────────────────────────────┘
```

## Frontend Excellence

### React + TypeScript Architecture
- **Functional components with hooks** for clean, testable code
- **WeakMap caching** for memory-efficient component data
- **Tailwind CSS** for responsive, accessible design
- **Real-time WebSocket** integration for live dashboard updates

### Performance Optimizations
- Virtualized lists for large datasets
- Memoized selectors preventing unnecessary re-renders
- Lazy loading for non-critical dashboard sections
- Service worker caching for offline capability

## Backend Scalability

### Node.js + Express
- Async, event-driven for maximum throughput
- Connection pooling for database efficiency
- Request batching for API aggregation
- Comprehensive error handling with proper HTTP semantics

### Docker Containerization
```
Docker Multi-container Deployment
├── API Service Container (Express.js)
├── Worker Service Container (Aggregation Jobs)
├── Redis Cache Container
└── Database Service Container (MongoDB + DocumentDB)
```

## Results

| Metric | Achievement |
|--------|-------------|
| Query Response | <1 second |
| Concurrent Users | 2M+ supported |
| AI Data Isolation | 100% PII-free agent access |
| Dashboard Latency | Milliseconds |
| Uptime | 99.9%+ |

## Tech Stack

**Frontend**: React.js, TypeScript, Tailwind CSS, WebSocket
**Backend**: Node.js, Express.js, Redis, MongoDB, DocumentDB
**Infrastructure**: Docker, AWS
**Security**: JWT, Role-based access control, Audit logging

## Key Learnings

Building for scale taught me that **caching strategy is everything**. Redis wasn't just for sessions — it became our real-time metric store, alert buffer, and WebSocket pub/sub backbone.

The AI data isolation pattern we built became a template for the entire organization — proving that you can give AI powerful insights without compromising user privacy.

---

*This project proved that enterprise dashboards don't have to be slow, ugly, or insecure. You can have all three: speed, design, and security.*
