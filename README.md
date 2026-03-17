# PhishShield AI

Behavioural phishing simulation and risk analysis prototype for dissertation research. Captures user interactions (clicks, typing, scroll) on a simulated phishing-style page and presents session risk scores on a dashboard.

## What it does

- **Phishing simulation**: Google-style homepage with shortcuts (Gmail, Outlook, Drive, Maps, YouTube, Docs). Simulates search, login flows, and phishing emails with credential-harvesting links.
- **Event capture**: Tracks first interaction timing, clicks, keypresses, scroll depth, and session end.
- **Backend**: Spring Boot service (separate repo: `behaviour-backend`) stores events in H2 and computes heuristic risk scores.
- **Dashboard**: Shows session risk scores, contributing factors, and event timelines.

## Quick start

### 1. Backend (Spring Boot)

The backend runs separately. From the `behaviour-backend` directory:

```bash
./mvnw spring-boot:run
```

Runs on **http://localhost:8080**. Uses H2 file database.

### 2. Frontend

```bash
node scripts/simple-server.mjs
```

Then open:

- **Phishing sim**: http://localhost:5173/phishing-sim.html
- **Dashboard**: http://localhost:5173/dashboard.html
- **Wireframes**: http://localhost:5173/wireframes.html
- **Flowchart**: http://localhost:5173/routeSearch-flowchart.html

## Project structure

```
PhishingAIProject/
├── public/           # Static frontend (phishing-sim, dashboard, wireframes)
├── scripts/          # simple-server.mjs, export-flowcharts-png.mjs
├── docs/             # Mermaid flowcharts (.mmd), dissertation chapters
├── figures/          # Generated figures for dissertation
└── README.md
```

## Tech stack

- Frontend: vanilla HTML/CSS/JS (no framework)
- Backend: Spring Boot, H2 database (separate repository)
- Event capture: DOM listeners, fetch/sendBeacon

## Dissertation

This project supports the PhishShield AI dissertation.
