---
title: "FoodieMap"
slug: "foodiemap"
description: "A mobile-first restaurant discovery app with AI-powered recommendations, real-time wait times, and social dining features."
category: "mobile"
tags: ["React Native", "MongoDB", "Express", "Maps API"]
featured: false
thumbnail: "/projects/project-4.svg"
liveUrl: "https://example.com"
githubUrl: "https://github.com"
order: 4
role: "Full Stack Developer"
duration: "5 months"
team: 3
---

## Project Overview

FoodieMap helps users discover nearby restaurants with personalized AI-powered recommendations. The app provides real-time wait time estimates and social features for coordinating group dining experiences.

## Key Features

- **AI Recommendations**: Machine learning model trained on user preferences, dietary restrictions, and dining history
- **Real-time Wait Times**: Crowdsourced wait time data with predictive estimates
- **Social Dining**: Plan group dinners, split bills, and share restaurant lists with friends
- **Interactive Map**: Custom map markers with restaurant previews and walking directions
- **Photo Reviews**: Visual-first review system with automatic dish recognition

## Technical Highlights

React Native was chosen for cross-platform development, sharing 90% of the codebase between iOS and Android. The backend API is built with Express and MongoDB, with Redis caching for frequently accessed restaurant data.

The recommendation engine uses a collaborative filtering algorithm running on a Python microservice, communicating with the main API through a message queue.

## Results

- **5,000+** active users in the San Francisco Bay Area
- **4.6** star rating on the App Store
- Partnership with 200+ local restaurants
