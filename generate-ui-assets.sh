#!/usr/bin/env bash
# ============================================================================
# Dispatch Wizard — Enterprise UI Asset Generator
# Generates all 10 UI mockups using Nano Banana 2 (Gemini Flash 3.1)
#
# Usage:  ./generate-ui-assets.sh
# Output: ./assets/ui-mockups/
# ============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
NB_DIR="$SCRIPT_DIR/nano-banana-2-skill"
OUT_DIR="$SCRIPT_DIR/assets/ui-mockups"

mkdir -p "$OUT_DIR"

echo ""
echo "  ⚡ Dispatch Wizard — Enterprise UI Generator"
echo "  ─────────────────────────────────────────────"
echo "  Output: $OUT_DIR"
echo "  Model:  Gemini 3.1 Flash (Nano Banana 2)"
echo ""

# Track PIDs for parallel execution
pids=()
names=()

generate() {
  local name="$1"
  local aspect="$2"
  local size="$3"
  local prompt="$4"

  echo "  [→] Starting: $name ($size @ $aspect)"
  cd "$NB_DIR"
  bun run src/cli.ts "$prompt" \
    -o "$name" \
    -s "$size" \
    -a "$aspect" \
    -d "$OUT_DIR" \
    > "$OUT_DIR/${name}.log" 2>&1 &
  pids+=($!)
  names+=("$name")
}

# ---------------------------------------------------------------------------
# 1. Logo Mark
# ---------------------------------------------------------------------------
generate "dw-logo" "1:1" "1K" \
"Minimal geometric logomark for an enterprise AI dispatch platform called Dispatch Wizard. Abstract shape formed by combining a diamond gem facet with directional arrow pathways, suggesting intelligence and routing. Rendered in a precise indigo-to-violet gradient (#4F46E5 to #7C3AED) on pure white background. Single color mark, no text, no realistic elements. Inspired by Linear and Vercel logo design language. Crisp edges, mathematically precise geometry, silicon valley tech aesthetic. Square composition with generous negative space."

# ---------------------------------------------------------------------------
# 2. Main Dashboard — Full Layout
# ---------------------------------------------------------------------------
generate "dw-dashboard" "16:9" "2K" \
"Enterprise SaaS analytics dashboard, dark theme UI screenshot. Top: slim 56px header bar with small logo left, breadcrumb navigation center, avatar and notification bell right. Below header: row of 6 KPI metric cards with large bold numbers, subtle sparkline graphs, percentage change badges in green and red. Main content: full-width data table with 14 columns, alternating row shading, first column has colored tier badges (gold, emerald, blue, gray), score column has horizontal progress bars, status column has pill badges with dot indicators. Left edge: slim 64px icon-only sidebar with 6 nav icons, active state highlighted in indigo. Color palette: backgrounds #0B0D12 and #141620, accent indigo #6366F1, text #F1F3F9 and #8B8FA8. Font: Inter. Pixel-perfect, production-ready feel like Linear.app or Vercel dashboard. 16:9 aspect ratio."

# ---------------------------------------------------------------------------
# 3. Dashboard — Stats Section Close-Up
# ---------------------------------------------------------------------------
generate "dw-stats" "16:9" "2K" \
"Close-up UI design of 6 enterprise analytics cards in a 3x2 grid, dark theme. Each card: rounded 16px corners, subtle 1px border rgba(255,255,255,0.06), background #141620. Inside each card: top-left has 32px icon in a soft colored circle (indigo, emerald, amber, blue, red, purple), top-right has a delta badge showing +12% in green or -3% in red. Center: large 28px bold white number. Bottom: small gray label text and a 48px wide micro area chart in the accent color with gradient fill fading to transparent. Cards for: 2,847 Total Orders — 342 Tier A — \$186K Broker Rev — 89 Pre-Paid — 67 Due Today — 23 Port Orders. Figma-quality precision, 1px details, Inter font. 16:9."

# ---------------------------------------------------------------------------
# 4. Priority Table — Detail View
# ---------------------------------------------------------------------------
generate "dw-table" "16:9" "2K" \
"Enterprise data table UI component, dark theme, extreme detail. Table header row: uppercase 10px labels in muted gray, subtle bottom border. Data rows alternate between #141620 and #1A1D2A. Columns visible: rank number with circle badge, tier letter in colored pill (A=amber, B=emerald, C=blue, D=gray), order ID in monospace, customer name, vehicle type with small icon, origin→destination with arrow, pickup date, broker fee in green, score shown as number plus horizontal bar chart filling proportionally. Top 3 rows have a soft indigo left border glow. Row hover state shown on one row with lighter background. Scrollbar styled thin. Pixel-perfect table design like Stripe Dashboard or Railway.app. Dark background #0B0D12. 16:9 widescreen."

# ---------------------------------------------------------------------------
# 5. Filter Bar + Search
# ---------------------------------------------------------------------------
generate "dw-filters" "16:9" "2K" \
"Horizontal filter toolbar UI component, dark theme, isolated on dark background. Left side: row of pill-shaped toggle buttons with labels All, Tier A, Tier B, Tier C, Pre-Paid, Aging, New, Today. Active buttons have indigo background #6366F1 with white text, inactive have transparent background with gray border and muted text. Right side: search input with magnifying glass icon, rounded corners, subtle inner shadow, placeholder text Search orders... in muted gray. Below the bar: thin horizontal divider line. Clean spacing 8px between pills. Height 48px total. Matches Linear.app filter bar aesthetic. Dark background #0B0D12. 16:9 wide format."

# ---------------------------------------------------------------------------
# 6. Paste Zone + Action Panel
# ---------------------------------------------------------------------------
generate "dw-paste-zone" "16:9" "2K" \
"Enterprise UI card component for data input, dark theme. Large card with 20px border radius, background #141620, 1px border rgba(255,255,255,0.06). Top section: heading Import Orders with clipboard icon, subtitle Paste live CRM data to rank and prioritize in muted text. Center: code-editor-style textarea with line numbers on left margin, dark inner background #0B0D12, monospace font, showing sample pasted order data with syntax highlighting. Bottom bar: three action buttons — primary Rank Orders button with lightning icon in indigo gradient with glow shadow, secondary Clear ghost button, tertiary Export CSV button with download icon in emerald. Small text showing 47 orders parsed with green checkmark. Inspired by Vercel deployment interface. 16:9."

# ---------------------------------------------------------------------------
# 7. Sync & Memory Panel
# ---------------------------------------------------------------------------
generate "dw-sync-panel" "16:9" "2K" \
"Enterprise notification panel UI, dark theme. Horizontal card layout showing 5 status cards in a row. Each card has: large emoji icon at top (checkmark, sparkle, clock, alert, satellite), bold count number, descriptive label below. Cards for: 12 Dispatched in green tint, 8 New Orders in blue tint, 5 Aging in amber tint, 3 Critical in red tint, 47 Active in indigo tint. Each card has its accent color as a subtle background tint and left border. Below cards: timeline showing recent order events with timestamps. Clear Memory danger button bottom-right, ghost style with red hover state. Background #141620, 1px borders. 16:9."

# ---------------------------------------------------------------------------
# 8. Mobile Responsive View
# ---------------------------------------------------------------------------
generate "dw-mobile" "9:16" "2K" \
"iPhone 15 Pro mockup showing a freight dispatch ranking app, dark UI. Dynamic Island visible at top. Screen shows: compact header with DW logo mark and hamburger menu. Below: horizontally scrollable stat pills showing key numbers. Main area: stacked order cards instead of table — each card shows order ID bold top-left, tier badge top-right (colored pill), customer name, vehicle description, origin city to destination city with arrow, pickup date, and score bar at bottom. Cards have 12px rounded corners, subtle borders, slight elevation. Bottom: iOS-style tab bar with 5 icons (dashboard, orders, analytics, alerts, settings). Active tab highlighted in indigo. Dark background matching desktop palette. 9:16 portrait."

# ---------------------------------------------------------------------------
# 9. Icon Set
# ---------------------------------------------------------------------------
generate "dw-icons" "1:1" "1K" \
"Set of 8 UI icons for an enterprise dispatch SaaS, arranged in 2x4 grid on pure black background. Icons: lightning bolt (priority ranking), snowflake (weather risk), route with pins (lane strength), stopwatch (time urgency), truck front-view (vehicle type), dollar in circle (pricing), brain with circuits (AI scoring), bar chart ascending (analytics). Each icon: 2px stroke weight, rounded caps and joins, rendered in a single indigo-to-cyan gradient (#6366F1 to #06B6D4). Consistent 64px canvas with 8px padding. Geometric precision, Phosphor Icons or Lucide style. No fills, outline only."

# ---------------------------------------------------------------------------
# 10. Hero / Marketing Section
# ---------------------------------------------------------------------------
generate "dw-hero" "16:9" "2K" \
"Website hero section for dispatchwizard.ai, dark premium design. Left side: large headline AI-Powered Dispatch Priority Ranking in white bold Inter font, subtitle paragraph in gray, two CTA buttons (primary indigo gradient Start Ranking, secondary outline Watch Demo). Right side: floating 3D-perspective screenshot of the dashboard UI, tilted 5 degrees with reflection shadow beneath, glowing indigo ambient light behind it. Background: deep navy #0B0D12 with subtle radial gradient glow in indigo/purple center. Floating abstract geometric shapes (low opacity) in background. Premium SaaS landing page style like Linear.app or Raycast.com. 16:9."

# ---------------------------------------------------------------------------
# Wait for all jobs
# ---------------------------------------------------------------------------
echo ""
echo "  ─────────────────────────────────────────────"
echo "  [⏳] All 10 jobs launched. Waiting..."
echo ""

failed=0
for i in "${!pids[@]}"; do
  if wait "${pids[$i]}"; then
    echo "  [✓] ${names[$i]}"
  else
    echo "  [✗] ${names[$i]} — check ${OUT_DIR}/${names[$i]}.log"
    ((failed++))
  fi
done

echo ""
echo "  ─────────────────────────────────────────────"
if [ "$failed" -eq 0 ]; then
  echo "  [✅] All 10 assets generated!"
else
  echo "  [⚠️]  $failed failed. Check logs in $OUT_DIR/"
fi
echo "  Output: $OUT_DIR/"
echo ""
ls -lh "$OUT_DIR"/*.png "$OUT_DIR"/*.jpg 2>/dev/null || echo "  (no images found — check logs)"
echo ""
