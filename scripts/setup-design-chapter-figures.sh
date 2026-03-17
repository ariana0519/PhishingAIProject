#!/bin/bash
# Copy Chapter 4 Design figures to public/figures/ for the design-chapter-figures.html gallery

set -e
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FIGURES="${PROJECT_ROOT}/figures"
ASSETS="/Users/arianaislam/.cursor/projects/Users-arianaislam-Desktop-PhishingAIProject/assets"

mkdir -p "$FIGURES"

# Generated figures
[ -f "$ASSETS/fig_4_1_use_case.png" ] && cp "$ASSETS/fig_4_1_use_case.png" "$FIGURES/" && echo "✓ fig_4_1_use_case.png"
[ -f "$ASSETS/fig_4_2_three_tier.png" ] && cp "$ASSETS/fig_4_2_three_tier.png" "$FIGURES/" && echo "✓ fig_4_2_three_tier.png"
[ -f "$ASSETS/fig_4_3_database_schema.png" ] && cp "$ASSETS/fig_4_3_database_schema.png" "$FIGURES/" && echo "✓ fig_4_3_database_schema.png"

# User-provided diagrams (mapped to Chapter 4)
[ -f "$ASSETS/image-dff0a8cf-3b29-4ec1-a912-6f005246242c.png" ] && cp "$ASSETS/image-dff0a8cf-3b29-4ec1-a912-6f005246242c.png" "$FIGURES/fig_4_2_sequence.png" && echo "✓ fig_4_2_sequence.png"
[ -f "$ASSETS/image-09315d6e-5dbb-4146-98fd-cda86fa9c036.png" ] && cp "$ASSETS/image-09315d6e-5dbb-4146-98fd-cda86fa9c036.png" "$FIGURES/fig_4_2_functional_overview.png" && echo "✓ fig_4_2_functional_overview.png"
[ -f "$ASSETS/image-c036e473-c2da-4cc2-9a57-cf9ce3fddb86.png" ] && cp "$ASSETS/image-c036e473-c2da-4cc2-9a57-cf9ce3fddb86.png" "$FIGURES/fig_4_2_data_flow.png" && echo "✓ fig_4_2_data_flow.png"

echo ""
echo "Done. Open design-chapter-figures.html (double-click or open in browser)."
