# Screen A — Growth Horizon

## Overview

| Property | Value |
|----------|-------|
| Screen name | `ScreenA` / `GrowthHorizonScreen` |
| Type | Full interstitial — value delivery |
| Phase label | None (full-width centered) |
| Progress | ~50% |
| Triggered by | Completing Step 5 (objectives) |
| Transition | Full page transition (third "new page" in funnel) |
| Data available | `motivation_driver` + `age_range` + `income_range` + `savings_range` + `investment_objective` |

---

## Layout

Graph-first. The visual payoff leads, the profile details support. Same pattern as affirmation screen (chart first, explanation after).

```
┌──────────────────────────────────────────────────────────┐
│  Forbes ADVISOR                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Based on your profile, here's your                      │
│  growth horizon with an advisor.                         │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │                                                    │  │
│  │  With advisor ────────────   $450K–$650K           │  │
│  │              ╱╱╱╱╱╱╱                               │  │
│  │        ╱╱╱╱╱╱╱                                     │  │
│  │   ╱╱╱╱╱╱                                           │  │
│  │  ╱╱╱      ╱╱╱╱╱╱╱╱╱╱╱╱╱╱   $250K–$350K           │  │
│  │  ╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱   Current path - - -   │  │
│  │  ├──────────────────────────────────────┤          │  │
│  │  Now                         15 years              │  │
│  │                                                    │  │
│  │  Illustration based on historical averages.        │  │
│  │  Individual results vary.                          │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ──────────────────────────────────────────               │
│                                                          │
│  YOUR FINANCIAL PROFILE                                  │
│                                                          │
│  Goal          Catching up on retirement                 │
│  Age           50s                                       │
│  Income        $100K–$150K                               │
│  Savings       $150K–$350K                               │
│  Objective     Long-term growth                          │
│                                                          │
│  ──────────────────────────────────────────               │
│                                                          │
│                  [ Continue → ]                           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Headline

```
Based on your profile, here's your growth horizon with an advisor.
```

### Headline Treatment

- **"Based on your profile, here's your"** — Dark (#1B2A4A), serif/display font (Forbes editorial), 32px
- **"growth horizon with an advisor."** — Forbes blue (#0066CC), same font and size
- Blue accent lands on the payoff: the growth horizon is the reward for completing the profile

---

## Block 1: Growth Horizon Graph

The hero visual. Leads the screen. Two-line area chart showing current path vs. advisor-guided path.

### Visual Design

| Element | Spec |
|---------|------|
| With advisor line | Forbes blue (#0066CC), 3px solid, area fill 8% opacity |
| Current path line | Muted grey (#B0B0B0), 2px dashed, no fill |
| Gap fill | Light blue between lines, 10% opacity |
| Starting Y-value | Midpoint of `savings_range` |
| X-axis | "Now" → horizon endpoint |
| Y-axis | Dollar amounts, simplified ($200K, $400K, etc.) |
| Endpoint labels | Dollar ranges at end of each line |
| Grid lines | None |
| Container | 12px border radius, 24px padding |

### Graph Data Anchors

| `savings_range` | Start | Current path (end) | With advisor (end) |
|----------------|-------|--------------------|--------------------|
| Under $50K | $25K | $45K–$65K | $80K–$140K |
| $50K–$150K | $100K | $160K–$220K | $280K–$420K |
| $150K–$350K | $250K | $350K–$450K | $500K–$750K |
| $350K–$750K | $550K | $700K–$900K | $1M–$1.5M |
| $750K–$1.5M | $1.125M | $1.4M–$1.8M | $2M–$2.8M |
| $1.5M+ | $2M | $2.5M–$3.2M | $3.5M–$5M |

### Horizon by Age

| `age_range` | X-axis span | End label |
|-------------|-------------|-----------|
| Under 30 | Now → 40 years | "40 years" |
| 30s | Now → 30 years | "30 years" |
| 40s | Now → 25 years | "25 years" |
| 50s | Now → 15 years | "15 years" |
| 60s+ | Now → 20 years | "20 years" |

### Objective Modifier

The `investment_objective` adjusts the shape of the advisor line:

| Objective | Effect on advisor line |
|-----------|----------------------|
| `growth` | Steepest curve, highest endpoint |
| `balanced` | Moderate curve, mid-range endpoint |
| `preservation` | Flattest curve, focus on stability. Gap is narrower but steadier |
| `income_generation` | Moderate growth + income yield overlay annotation |

For `income_generation`, add a small annotation below the endpoint:
```
+ ~$X,XXX/year in projected income
```

### 60s+ Special Treatment

Both lines decline (drawdown phase). Advisor line declines more slowly.

- Endpoint labels: "Lasts past 85" vs "Runs out at 74" (not dollar amounts)
- If objective is `preservation` or `income_generation`, advisor line is nearly flat (ideal drawdown)
- Emotional argument shifts from "grow more" to "make it last"

### Graph Animation

1. Screen enters → 200ms pause
2. Both lines draw left-to-right simultaneously (800ms, ease-out)
3. Gap fill fades in (200ms, 200ms delay)
4. Endpoint labels fade in (200ms)
5. Total: ~1.5 seconds

### Disclaimer

Small muted text below graph, inside the container:

```
Illustration based on historical averages. Individual results vary.
```

| Element | Spec |
|---------|------|
| Style | Regular weight, 12px |
| Color | Muted (#999999) |

---

## Divider

| Element | Spec |
|---------|------|
| Style | 1px solid, light grey (#E0E0E0) |
| Width | Full content width |
| Margin | 24px top and bottom |

---

## Block 2: Profile Summary

Clean, minimal display of collected data. No emojis, no card container. Just labels and values, same typography as the rest of the flow. Confirms "here's what we used to build this."

### Header

```
YOUR FINANCIAL PROFILE
```

Small caps, muted (#999999), 12px. Same treatment as phase labels.

### Fields

| Label | Value (example) |
|-------|-----------------|
| Goal | Catching up on retirement |
| Age | 50s |
| Income | $100K–$150K |
| Savings | $150K–$350K |
| Objective | Long-term growth |

### Field Spec

| Element | Spec |
|---------|------|
| Label | Regular weight, 14px, muted (#999999) |
| Value | Medium weight, 14px, dark (#1B2A4A) |
| Layout | Two-column: label left-aligned, value right-aligned |
| Row spacing | 8px between rows |
| Divider between rows | None. Clean whitespace only |

### Goal Label Mapping

The "Goal" field uses the motivation label, not the raw value:

| `motivation_driver` | Displays as |
|---------------------|-------------|
| `behind_retirement` | Catching up on retirement |
| `family_protection` | Protecting your family |
| `windfall` | Managing new wealth |
| `optimization` | Optimizing your finances |
| `plan_review` | Getting a professional review |

### Objective Label Mapping

| `investment_objective` | Displays as |
|------------------------|-------------|
| `growth` | Long-term growth |
| `preservation` | Wealth preservation |
| `income_generation` | Income generation |
| `balanced` | Balanced growth and safety |

---

## Divider

Same spec as above.

---

## Continue CTA

```
Continue →
```

Full-width button, Forbes blue (#0066CC), white text, same spec as other screens. Final element on the page.

---

## Full Animation Sequence

1. Full page transition in
2. Headline fades in (200ms)
3. Graph container appears (200ms)
4. Both lines draw left-to-right (800ms, ease-out)
5. Gap fill fades in (200ms, 200ms delay)
6. Endpoint labels fade in (200ms)
7. Disclaimer fades in (100ms)
8. Divider + profile summary fades in (300ms)
9. Continue button fades in (200ms)
10. Total: ~2.3 seconds

---

## Data Sources (verify before shipping)

| Stat | Source |
|------|--------|
| Advisor wealth multiplier (2.7×) | Vanguard Advisor's Alpha, 2024 |
| Baseline savings by age | Federal Reserve Survey of Consumer Finances, 2022 |
| Drawdown extension (5–10 years) | Morningstar Retirement Income Research, 2023 |

---

## Compliance Notes

- Graph shows directional ranges, not personalized projections
- Dollar amounts are illustrative, not tied to user's exact savings
- "With advisor" line reflects published multipliers, not guaranteed returns
- Disclaimer required: "Illustration based on historical averages. Individual results vary."
- Christine must review final visualization

---

## Behavior

1. Full page transition in
2. Graph animates on entry (~1.5s)
3. Profile summary confirms the inputs used
4. User taps Continue → email save modal appears with trust stats
5. User either saves email or skips → proceeds to Step 6

## What Gets Stored

```javascript
// No new form fields — value delivery screen
// Optionally:
{ saved_email: "user@email.com" } // only if email saved in modal
```

---

## Email Save Modal

Triggered when user taps Continue. Appears as an overlay before proceeding to Step 6. Combines email save with trust stats for a single "checkpoint" moment.

### Layout

Two-column modal. Graph on the left reinforces the value they just saw. Email save on the right.

```
┌──────────────────────────────────────────────────────────┐
│                         │                                 │
│   ┌─────────────────┐   │  Save your progress?            │
│   │                 │   │                                 │
│   │  With advisor   │   │  You're halfway there. Enter    │
│   │  ──────── $450K │   │  your email to pick up where    │
│   │     ╱╱╱╱        │   │  you left off anytime.          │
│   │  ╱╱╱╱╱╱╱ $250K  │   │                                 │
│   │  ─ ─ ─ ─ ─ ─   │   │  ┌──────────────────────────┐  │
│   │  Now    15 yrs  │   │  │  your@email.com           │  │
│   │                 │   │  └──────────────────────────┘  │
│   └─────────────────┘   │                                 │
│                         │  [ Save & Continue → ]          │
│                         │                                 │
│                         │  Skip for now                   │
│                         │                                 │
│                         │  ───────────────────            │
│                         │                                 │
│                         │  100%     100K+      ~3 min     │
│                         │  Free &   People     To         │
│                         │  confid.  matched    complete   │
│                         │                                 │
└──────────────────────────────────────────────────────────┘
```

### Modal Spec

| Element | Spec |
|---------|------|
| Overlay | Black, 50% opacity |
| Container | White, 16px border radius |
| Max width | 720px, centered |
| Layout | Two-column: graph left (40%), content right (60%) |
| Animation | Slide up from bottom (300ms, ease-out) |
| Mobile | Stacks vertically: graph on top, content below |

### Left Column: Graph

A smaller, static version of the growth horizon graph they just viewed. Not re-animated. Shows their personalized lines, endpoints, and labels exactly as rendered on the main page.

| Element | Spec |
|---------|------|
| Sizing | Fills left column, maintains aspect ratio |
| Background | Light grey (#F8F8FA) |
| Border radius | 16px left corners only (follows modal shape) |
| Padding | 24px |
| State | Static, no animation. Already seen. |

### Right Column Content

Padding: 32px.

#### Headline

```
Save your progress?
```

| Element | Spec |
|---------|------|
| Style | Serif/display font, 24px, dark (#1B2A4A) |

#### Sub Copy

```
You're halfway there. Enter your email to pick up where you left off anytime.
```

| Element | Spec |
|---------|------|
| Style | Regular weight, 15px, muted (#666666) |

### Email Input

| Element | Spec |
|---------|------|
| Height | 48px |
| Border | 1px solid #E0E0E0, 8px border radius |
| Placeholder | "your@email.com" |
| Keyboard | Email type |

### Primary CTA

```
Save & Continue →
```

Full-width, Forbes blue (#0066CC), white text.

### Skip Link

```
Skip for now
```

| Element | Spec |
|---------|------|
| Style | Regular weight, 14px, muted (#999999) |
| Position | Centered below CTA |
| Tap target | Full width, 44px min height |

### Trust Stats

Same three stats, inside the modal below the divider:

```
100%                 100K+                ~3 min
Free & confidential  People matched       To complete
```

| Element | Spec |
|---------|------|
| Style | Bold stat + regular label, 13px |
| Color | Dark stat (#1B2A4A), muted label (#999999) |
| Layout | Three-column, evenly spaced |

### Disclaimer

```
We'll send a link so you can pick up where you left off. We won't share your email.
```

| Element | Spec |
|---------|------|
| Style | Regular weight, 12px, muted (#999999) |
| Position | Below trust stats |

### Logic

- Captures `saved_email` with save-progress consent only (NOT TCPA)
- "Save & Continue" stores email and proceeds to Step 6
- "Skip for now" proceeds to Step 6 with no email stored
- If abandoned after Screen A: re-engagement email with deep link (if saved)
- If completed: `saved_email` pre-fills email step later in funnel
- CAN-SPAM compliant, unsubscribe in every email
- Legal must confirm email save consent is sufficient

---

## Notes

- Graph leads, profile supports. The visual payoff hits first, then the user can verify their inputs below. Same pattern as affirmation screen (chart → narrative → details).
- Profile summary is clean text, no emojis, no card container. Matches the minimal typography of Steps 2–5.
- "With advisor" line uses Forbes blue (#0066CC) instead of navy to match the accent color thread throughout the funnel.
- Email save and trust stats moved to a modal triggered by Continue. The main page is pure value delivery with no competing actions.
