#!/bin/bash
# Capture Chapter 6 Figures
# Run this after: 1) npm run dev (port 5173), 2) backend on port 8080

set -e
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FIGURES="${PROJECT_ROOT}/figures"
mkdir -p "$FIGURES"

# Copy Figure 6.1 if it exists in Cursor assets
ASSETS="/Users/arianaislam/.cursor/projects/Users-arianaislam-Desktop-PhishingAIProject/assets/fig_6_1_testing_flow.png"
if [ -f "$ASSETS" ]; then
  cp "$ASSETS" "$FIGURES/fig_6_1_testing_flow.png"
  echo "✓ Copied fig_6_1_testing_flow.png"
fi

echo ""
echo "Screenshots (6.2–6.6) must be captured manually with your browser:"
echo "  1. Ensure 'npm run dev' and backend (mvn spring-boot:run) are running"
echo "  2. Open each URL below, perform the action, then take a screenshot"
echo "  3. Save to figures/ with the filenames shown"
echo ""
echo "  Fig 6.2: http://localhost:5173/phishing-sim.html → figures/fig_6_2_phishing_sim_home.png"
echo "  Fig 6.3: http://localhost:5173/test-events.html (click 'Click me') → figures/fig_6_3_test_events_success.png"
echo "  Fig 6.4: Run suspicious session, open dashboard → figures/fig_6_4_dashboard_risk_display.png"
echo "  Fig 6.5: Run normal session, open dashboard → figures/fig_6_5_dashboard_normal.png"
echo "  Fig 6.6: http://localhost:8080/api/behavior-events → figures/fig_6_6_backend_events_api.png"
