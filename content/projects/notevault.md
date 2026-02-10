---
title: "NoteVault"
slug: "notevault"
description: "An end-to-end encrypted note-taking app with Markdown support, cross-device sync, and offline-first architecture."
category: "web"
tags: ["Next.js", "TypeScript", "IndexedDB", "Tailwind"]
featured: false
thumbnail: "/projects/project-5.svg"
liveUrl: "https://example.com"
githubUrl: "https://github.com"
order: 5
role: "Solo Developer"
duration: "3 months"
team: 1
---

## Project Overview

NoteVault is a privacy-first note-taking application that uses end-to-end encryption to ensure only you can read your notes. Built with an offline-first architecture, it works seamlessly even without an internet connection.

## Key Features

- **End-to-End Encryption**: AES-256-GCM encryption with keys derived from your passphrase
- **Markdown Editor**: Full GFM support with live preview, syntax highlighting, and LaTeX math
- **Offline-first**: Service Worker + IndexedDB for complete offline functionality
- **Cross-device Sync**: Encrypted sync through a thin relay server — the server never sees plaintext
- **Smart Organization**: Notebooks, tags, and full-text search across encrypted content

## Technical Highlights

The encryption layer uses the Web Crypto API for zero-dependency client-side encryption. The key derivation uses PBKDF2 with 600,000 iterations for strong passphrase-based key generation.

Offline support is built on a Service Worker that caches the app shell and an IndexedDB database that stores encrypted notes locally. Sync uses a CRDT-based merge strategy to handle concurrent edits across devices.

## Results

- Zero data breaches since launch
- Sub-100ms note loading time even with 1,000+ notes
- Featured in "Privacy Tools" weekly newsletter
