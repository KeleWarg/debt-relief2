# Step 1 — Motivation

## Overview

| Property | Value |
|----------|-------|
| Screen name | `MotivationScreen` |
| Field | `motivation_driver` |
| Type | Single-select radio |
| Auto-advance | Yes — triggers crossfade to Step 2 |
| Phase label | LET'S UNDERSTAND YOU |
| Progress | ~8% |
| sideContent | Lifestyle image carousel with strategy pills |
| Data available | None — first question |

---

## Layout

Two-column desktop layout:
- **Left:** sideContent image carousel with "RECOMMENDED STRATEGY" pills + Forbes trust bar
- **Right:** Section label, headline, sub copy, options, social proof line

```
┌─────────────────────┬────────────────────────────┐
│                     │  LET'S UNDERSTAND YOU       │
│  [Lifestyle image]  │                             │
│                     │  You deserve a plan that    │
│  RECOMMENDED        │  works as hard as you do.   │
│  STRATEGY           │                             │
│  [pills appear      │  What matters most to you   │
│   after selection]  │  right now?                 │
│                     │                             │
│                     │  [ A ] Option...            │
│  ─────────────────  │  [ B ] Option...            │
│  Forbes ADVISOR     │  [ C ] Option...            │
│  $2B+ | 100K+ |    │  [ D ] Option...            │
│  Free | ~3 min      │  [ E ] Option...            │
│                     │                             │
│                     │  [Social proof line]        │
└─────────────────────┴────────────────────────────┘
```

---

## Headline

```
You deserve a plan that
works as hard as you do.
```

## Sub Copy

```
What matters most to you right now?
```

---

## Options

| Key | Label | Stores as |
|-----|-------|-----------|
| A | I'm worried I'm behind on retirement | `behind_retirement` |
| B | I want to make sure my family is protected | `family_protection` |
| C | I've come into money and need guidance | `windfall` |
| D | I want to stop leaving money on the table | `optimization` |
| E | I just want a professional to review my plan | `plan_review` |

---

## sideContent — Image Carousel

Two lifestyle images rotating:

**Image 1 (older couple):**
```
RECOMMENDED STRATEGY
[ Catch-Up Planning ]  [ Social Security Timing ]  [ Tax-Efficient Drawdown ]
```

**Image 2 (younger person):**
```
RECOMMENDED STRATEGY
[ Growth Strategy ]  [ Tax Optimization ]  [ Wealth Building ]
```

Pills: frosted glass effect, top-left corner of image, 16px from edges.

Below image — Forbes trust bar:
```
Forbes ADVISOR
$2B+ in financial advice  |  100K+ people matched
100% free & confidential  |  Takes only ~3 minutes
```

---

## Social Proof Line (below options)

```
Behind on retirement? Managing a windfall? Just want a second opinion?
The right advisor handles all of it — the cost of waiting is the
only thing they can't fix.
```

---

## Footer

```
Join over 100,000 people who've used Forbes Advisor to find their financial advisor — free and confidential.
```

---

## Behavior

1. User lands → image carousel active, no strategy pills visible
2. User selects an option → letter indicator fills blue, option highlights
3. Strategy pills on current image animate in (fade + slide, 300ms)
4. After 500ms → crossfade to Step 2 (content area swaps, sideContent image fades out)

---

## What Gets Stored

```javascript
{ motivation_driver: "behind_retirement" }
```
