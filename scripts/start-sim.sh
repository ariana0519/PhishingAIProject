#!/bin/bash
# Start both backend and frontend for PhishShield phishing sim.
# Uses simple-server.mjs (no Vite/Base44) - reliable fallback.

set -e
cd "$(dirname "$0")/.."
PROJECT="$PWD"
BACKEND_DIR="/Users/arianaislam/Desktop/behaviour-backend"

echo ""
echo "=== PhishShield sim – starting ==="
echo ""

# 1. Kill anything on 8080 and 5173
echo "Clearing ports 8080 and 5173..."
lsof -ti:8080 | xargs kill -9 2>/dev/null || true
lsof -ti:5173 | xargs kill -9 2>/dev/null || true
sleep 2

# 2. Start backend
echo "Starting backend..."
cd "$BACKEND_DIR"
mvn spring-boot:run -q &
BACKEND_PID=$!
cd "$PROJECT"

# Wait for backend
echo "Waiting for backend on port 8080..."
for i in {1..30}; do
  if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/behavior-events 2>/dev/null | grep -q 200; then
    echo "Backend ready."
    break
  fi
  sleep 1
  if [ $i -eq 30 ]; then
    echo "Backend failed to start. Check $BACKEND_DIR"
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
  fi
done

# 3. Start frontend (simple server)
echo "Starting frontend..."
node scripts/simple-server.mjs &
FRONT_PID=$!

sleep 1
echo ""
echo "=========================================="
echo "  Ready!"
echo "  Open: http://localhost:5173/phishing-sim.html"
echo "  Dashboard: http://localhost:5173/dashboard.html"
echo "=========================================="
echo ""
echo "Press Ctrl+C to stop both servers."
echo ""

wait $BACKEND_PID $FRONT_PID 2>/dev/null || true
