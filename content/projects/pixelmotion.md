---
title: "PixelMotion"
slug: "pixelmotion"
description: "A creative coding playground for generative art. Export to SVG, GIF, or video. Built for artists who think in algorithms."
category: "design"
tags: ["React", "Canvas API", "WebGL", "Framer Motion"]
featured: false
thumbnail: "/projects/project-6.svg"
liveUrl: "https://example.com"
order: 6
role: "Creator & Developer"
duration: "4 months"
team: 1
---

## Project Overview

PixelMotion is a browser-based creative coding environment where artists can write code to generate visual art. The platform supports multiple rendering backends including Canvas 2D, WebGL, and SVG, and can export creations in various formats.

## Key Features

- **Multi-renderer**: Switch between Canvas 2D, WebGL, and SVG renderers on the fly
- **Live Preview**: Real-time rendering as you type with hot module replacement
- **Export Options**: Save as SVG, PNG, GIF animation, or MP4 video
- **Community Gallery**: Share your creations and explore what others have built
- **Template Library**: Pre-built templates for common generative art patterns

## Technical Highlights

The code editor is powered by CodeMirror 6 with custom syntax highlighting for the creative coding DSL. The WebGL renderer uses a custom shader compilation pipeline that translates the user's code into GLSL fragment shaders.

GIF and video export leverage OffscreenCanvas and WebCodecs API for efficient frame capture without blocking the main thread.

## Results

- **500+** artworks created in the community gallery
- Used in 3 university creative coding courses
- 1,200+ GitHub stars
