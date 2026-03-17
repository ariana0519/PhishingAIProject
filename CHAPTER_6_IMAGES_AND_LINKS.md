# Chapter 6: Images and Links Reference

This document lists all figures, screenshots, and links referenced in Chapter 6. Capture the screenshots and place the images where indicated.

---

## Figure Placement in Chapter 6

| Figure | Location in Chapter | Description | File to Save As |
|--------|-------------------|--------------|-----------------|
| Figure 6.1 | After Section 6.1 (first paragraph) | Testing flow diagram showing: Phishing Sim → Event Capture → Backend → Dashboard | `figures/fig_6_1_testing_flow.png` |
| Figure 6.2 | Section 6.2, after "Event capture" paragraph | Screenshot of phishing simulation home page (Google-style interface with shortcuts) | `figures/fig_6_2_phishing_sim_home.png` |
| Figure 6.3 | Section 6.2, after "Event transmission" paragraph | Screenshot of test-events.html page showing "Event sent" green status | `figures/fig_6_3_test_events_success.png` |
| Figure 6.4 | Section 6.2, after "Dashboard display" paragraph | Screenshot of dashboard with risk card (Suspicious or Moderate risk), factors, and event timeline | `figures/fig_6_4_dashboard_risk_display.png` |
| Figure 6.5 | Section 6.2, after "Dashboard display" paragraph | Screenshot of dashboard with Normal risk (green) for comparison | `figures/fig_6_5_dashboard_normal.png` |
| Figure 6.6 | Section 6.3, after "Event transmission" paragraph | Screenshot of backend API response (GET /api/behavior-events) showing event JSON | `figures/fig_6_6_backend_events_api.png` |

---

## How to Capture Each Screenshot

### Figure 6.1 (Testing Flow Diagram)
**Generated.** Saved at `figures/fig_6_1_testing_flow.png` in the project. Also at: `/Users/arianaislam/.cursor/projects/Users-arianaislam-Desktop-PhishingAIProject/assets/fig_6_1_testing_flow.png`

### Figure 6.2 (Phishing Sim Home)
1. Start the dev server: `npm run dev`
2. Open `http://localhost:5173/phishing-sim.html`
3. Ensure the page shows: Google heading, search box, Gmail/Outlook/Drive/Maps/YouTube/Docs shortcuts, tab bar, address bar
4. Capture full viewport

### Figure 6.3 (Test Events Success)
1. Ensure backend is running on port 8080
2. Open `http://localhost:5173/test-events.html`
3. Click "Click me" or type in the text input
4. Wait for green "Event sent: click" (or similar) status
5. Capture the page showing the green success message

### Figure 6.4 (Dashboard High Risk)
1. Run a "suspicious" session: open phishing-sim, click or type very quickly (under 2 seconds), scroll little, type several characters
2. Click "Session dashboard" or "View session dashboard"
3. Capture dashboard showing risk card with red/amber border, higher risk score, and factors like "Very fast first interaction"

### Figure 6.5 (Dashboard Normal)
1. Run a "normal" session: open phishing-sim, wait 5+ seconds, scroll deeply, then interact
2. Open dashboard
3. Capture dashboard showing risk card with green border and "Normal" classification

### Figure 6.6 (Backend API)
1. With backend running, open `http://localhost:8080/api/behavior-events` in browser
2. Capture the JSON response (array of event objects)
3. Or use browser DevTools Network tab showing the GET request and response

---

## Accessible Links

| Link | URL | Purpose |
|------|-----|---------|
| Phishing Simulation | `http://localhost:5173/phishing-sim.html` | Main simulated phishing page |
| Test Events Page | `http://localhost:5173/test-events.html` | Isolated event capture/transmission test |
| Dashboard | `http://localhost:5173/dashboard.html` | Session dashboard and risk display |
| Backend Events API | `http://localhost:8080/api/behavior-events` | Raw events endpoint (when backend running) |
| Project Root | File path or repo URL | For document readers |

**Note:** Replace `localhost` with your actual host when sharing or documenting for different environments.

---

## Figures Folder Structure

Create a `figures` folder in the project root:

```
PhishingAIProject/
  figures/
    fig_6_1_testing_flow.png
    fig_6_2_phishing_sim_home.png
    fig_6_3_test_events_success.png
    fig_6_4_dashboard_risk_display.png
    fig_6_5_dashboard_normal.png
    fig_6_6_backend_events_api.png
```

---

## Referencing Figures in Your Thesis Document

When you insert the figures into your final document (Word, LaTeX, etc.), use captions like:

- **Figure 6.1** Testing flow: from phishing simulation through event capture to backend and dashboard.
- **Figure 6.2** Phishing simulation home page mimicking a Google-style new tab.
- **Figure 6.3** Test events page showing successful event transmission (green status).
- **Figure 6.4** Dashboard displaying a session flagged as Suspicious with contributing factors.
- **Figure 6.5** Dashboard displaying a Normal risk session for comparison.
- **Figure 6.6** Backend API response showing stored behavioural events.
