---
title: "Core Web Vitals Optimization"
slug: "web-vitals-optimization"
description: "Performance engineering initiative achieving 68% improvement in LCP, FID, and CLS scores through advanced frontend optimization techniques."
category: "web"
tags: ["Solid.js", "Node.js", "AEM", "Akamai CDN", "Performance"]
featured: false
thumbnail: "/projects/project-6.svg"
liveUrl: ""
githubUrl: ""
order: 6
role: "Performance Engineer"
duration: "2 months"
team: 4
---

## Project Overview

When Google makes Core Web Vitals a ranking factor, you either optimize or watch your SEO tank. At Bajaj Finserv, I led a performance blitz that achieved **68% improvement across all CWV metrics** — transforming sluggish pages into speed demons.

This wasn't just about faster load times. It was about **user experience that converts** and **SEO rankings that climb**.

## The Performance Problem

Our starting point:
- **LCP**: 3.8s (Google wants <2.5s)
- **FID**: 145ms (Google wants <100ms)
- **CLS**: 0.25 (Google wants <0.1)

Translation: Pages felt slow, interactions lagged, and layouts shifted around like furniture in an earthquake. Not great for a financial services platform handling millions of users.

## Optimization Strategies

### Image Optimization (The Biggest Win)

**Format Conversion**
```
Original JPG/PNG → WebP
Result: 30-40% size reduction
```

**Responsive Serving**
- `srcset` for different breakpoints
- Automatic format detection by browser support
- Lazy loading with Intersection Observer
- Progressive JPEG for perceived performance

### JavaScript Optimization

**Bundle Reduction**
- Code splitting per route with dynamic imports
- Tree shaking for unused dependencies
- Minification + obfuscation
- Gzip compression (70% reduction!)

**Execution Optimization**
- Async/defer for non-critical scripts
- Web Workers for CPU-intensive operations
- Service Workers for offline functionality

### CSS Optimization

**Critical Path CSS**
```
Strategy:
1. Inline critical CSS (<14KB) in <head>
2. Defer non-critical CSS loading
3. CSS-in-JS optimization for Solid.js

Result: 45% reduction in unused CSS
```

### Node.js Middleware

**Backend Performance**
- Response compression (gzip + brotli)
- HTTP caching headers optimization
- Connection pooling for database queries
- Request batching for API aggregation

## Architecture

```
┌──────────────────────────────────────┐
│           User Browser               │
│   Solid.js Components + SW Cache     │
└──────────────────────────────────────┘
                │
        ┌───────┴───────┐
        ↓               ↓
   Static Assets    Dynamic Content
        ↓               ↓
┌──────────────┐ ┌─────────────────┐
│  Akamai CDN  │ │  Node.js Server │
│   Images     │ │   Middleware    │
│   CSS/JS     │ │   Caching       │
│  HTML Cache  │ │   Compression   │
└──────────────┘ └─────────────────┘
        │               │
        └───────┬───────┘
                ↓
        ┌──────────────┐
        │  AEM Content │
        │   Pages      │
        │   Assets     │
        │  Components  │
        └──────────────┘
```

## Results

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **LCP** | 3.8s | 1.2s | 68% ↓ |
| **FID** | 145ms | 45ms | 69% ↓ |
| **CLS** | 0.25 | 0.08 | 68% ↓ |
| Page Load Time | 4.5s | 1.8s | 60% ↓ |
| Time to Interactive | 6.2s | 2.3s | 63% ↓ |

**All metrics now in Google's "Good" (green) range!**

## Technical Deep Dive

### Why Solid.js?

For dynamic pages, we chose Solid.js over React for:
- **True reactivity** without Virtual DOM overhead
- **Smaller bundle size** (~7KB vs React's ~40KB)
- **Faster updates** for interactive components
- **Compiled approach** eliminates runtime overhead

### Akamai CDN Strategy

- Edge caching for static assets
- Geographic distribution for global users
- Automatic WebP conversion at edge
- HTTP/2 push for critical resources

### Measurement & Monitoring

- Lighthouse CI in deployment pipeline
- Real User Monitoring (RUM) for field data
- Core Web Vitals dashboard tracking trends
- Alert thresholds for regression detection

## Business Impact

**SEO Benefits**
- Improved Google rankings for finance keywords
- Better crawl efficiency for new content
- Enhanced mobile-first indexing scores

**User Experience**
- 15-25% reduction in bounce rates
- Higher engagement metrics
- Improved conversion rates

**Competitive Advantage**
- Faster than competitor financial portals
- Professional, responsive experience
- Mobile performance critical for 65%+ mobile traffic

## Tech Stack

**Frontend**: Solid.js, AEM (Adobe Experience Manager)
**Performance**: Akamai CDN, Service Workers, Intersection Observer
**Backend**: Node.js, Express.js
**Tooling**: Lighthouse, WebPageTest, Chrome DevTools

## Key Learnings

Performance optimization is **death by a thousand cuts, reversed**. No single change made the difference — it was:
- Image optimization (30% gain)
- JS bundle reduction (20% gain)
- Critical CSS inlining (15% gain)
- Server compression (15% gain)
- CDN caching (20% gain)

The compound effect is what took us from "slow" to "fast."

Also learned: **Measure before optimizing**. Without proper RUM data, we would have optimized the wrong things.

---

*This project taught me that performance engineering is as much about user psychology as it is about bytes and milliseconds. Perceived performance matters as much as actual performance.*
