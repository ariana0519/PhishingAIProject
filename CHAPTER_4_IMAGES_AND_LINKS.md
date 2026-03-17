# Chapter 4: Design – Figures and Links

This document lists all figures for the Design chapter and how to access them.

---

## Figure Index

| Figure | Description | File |
|--------|-------------|------|
| Figure 4.1 | Use case diagram (user, interact with phishing sim, view dashboard, view risk analysis) | `public/figures/fig_4_1_use_case.png` |
| Figure 4.2a | Three-tier system architecture (client, backend, dashboard) | `public/figures/fig_4_2_three_tier.png` |
| Figure 4.2b | System interaction sequence diagram (from your diagram) | `public/figures/fig_4_2_sequence.png` |
| Figure 4.2c | Functional overview (Monitor → Analyse → Risk Score → Display) | `public/figures/fig_4_2_functional_overview.png` |
| Figure 4.2d | Data flow (User → Chrome → PhishShield → Behaviour Monitor → Risk Engine → Alert) | `public/figures/fig_4_2_data_flow.png` |
| Figure 4.3 | Database schema (behavior_events table) | `public/figures/fig_4_3_database_schema.png` |
| Figure 4.4 | Phishing simulation wireframe (Google-style homepage, shortcuts) | `public/figures/fig_4_4_phishing_sim_wireframe.png` |
| Figure 4.5 | Session dashboard wireframe (risk card, stats, event timeline) | `public/figures/fig_4_5_dashboard_wireframe.png` |

---

## Access All Figures (Link)

**Design chapter figures gallery:**
- **Local:** Open `public/design-chapter-figures.html` in your browser, or
- **With dev server:** Run `npm run dev`, then open:
  - **http://localhost:5173/design-chapter-figures.html**

---

## One-Time Setup (Copy Images)

The diagrams are generated/copied into `public/figures/`. Run:

```bash
./scripts/setup-design-chapter-figures.sh
```

Or manually:

```bash
mkdir -p public/figures/
cp ~/.cursor/projects/Users-arianaislam-Desktop-PhishingAIProject/assets/fig_4_1_use_case.png public/figures/
cp ~/.cursor/projects/Users-arianaislam-Desktop-PhishingAIProject/assets/fig_4_2_three_tier.png public/figures/
cp ~/.cursor/projects/Users-arianaislam-Desktop-PhishingAIProject/assets/fig_4_3_database_schema.png public/figures/
cp ~/.cursor/projects/Users-arianaislam-Desktop-PhishingAIProject/assets/image-dff0a8cf-3b29-4ec1-a912-6f005246242c.png public/figures/fig_4_2_sequence.png
cp ~/.cursor/projects/Users-arianaislam-Desktop-PhishingAIProject/assets/image-09315d6e-5dbb-4146-98fd-cda86fa9c036.png public/figures/fig_4_2_functional_overview.png
cp ~/.cursor/projects/Users-arianaislam-Desktop-PhishingAIProject/assets/image-c036e473-c2da-4cc2-9a57-cf9ce3fddb86.png public/figures/fig_4_2_data_flow.png
```
