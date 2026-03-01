# Screen A — Growth Horizon + Email Save

## Overview

| Property | Value |
|----------|-------|
| Screen name | `ScreenA` / `GrowthHorizonScreen` |
| Type | Full interstitial — value delivery + email save checkpoint |
| Phase label | None (full-width centered) |
| Progress | ~50% |
| Triggered by | Completing Step 5 (objectives) |
| Transition | Full page transition |
| Data available | `motivation_driver` + `age_range` + `income_range` + `savings_range` + `investment_objective` |

---

## Layout

```
┌──────────────────────────────────────────────────────────┐
│  Forbes ADVISOR                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Based on your profile, here's your                      │
│  growth horizon with an advisor.                         │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  YOUR FINANCIAL PROFILE                            │  │
│  │                                                    │  │
│  │  🎯 Goal          Catching up on retirement        │  │
│  │  🎂 Age           50s                              │  │
│  │  💼 Income        $100K–$150K                      │  │
│  │  💰 Savings       $150K–$350K                      │  │
│  │  📊 Objective     Long-term growth                 │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  YOUR GROWTH HORIZON                               │  │
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
│                  [ Continue → ]                           │
│                                                          │
│        💾 Save your profile — finish anytime             │
│           Enter your email to pick up where you left off │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  Join over 100,000 people who've used Forbes Advisor     │
│  to find their financial advisor — free and confidential.│
└──────────────────────────────────────────────────────────┘
```

---

## Headline

```
Based on your profile, here's your
growth horizon with an advisor.
```

---

## Block 1: Completed Profile Card

All five lines filled:

| Icon | Field | Value (example) |
|------|-------|-----------------|
| 🎯 | Goal | Catching up on retirement |
| 🎂 | Age | 50s |
| 💼 | Income | $100K–$150K |
| 💰 | Savings | $150K–$350K |
| 📊 | Objective | Long-term growth |

---

## Block 2: Growth Horizon Graph

Two-line area chart. Starting Y-value anchored to user's savings midpoint. Horizon based on age.

### Visual Design

- **With advisor line:** Forbes navy (#1B2A4A), 3px solid, area fill 8% opacity
- **Without advisor line:** Muted grey (#B0B0B0), 2px dashed, no fill
- **Gap fill:** Light blue between lines, 10% opacity
- **Starting Y-value:** Midpoint of `savings_range`
- **X-axis:** "Now" → horizon endpoint
- **Y-axis:** Dollar amounts, simplified ($200K, $400K, etc.)
- **Endpoint labels:** Dollar ranges at end of each line
- **No grid lines**
- **Border radius:** 12px on container
- **Padding:** 24px inside container

### Graph Data Anchors

| `savings_range` | Start | Current path (end) | With advisor (end) |
|----------------|-------|--------------------|--------------------|
| Under $50K | $25K | $45K–$65K | $80K–$140K |
| $50K–$150K | $100K | $160K–$220K | $280K–$420K |
| $150K–$350K | $250K | $350K–$450K | $500K–$750K |
| $350K–$750K | $550K | $700K–$900K | $1M–$1.5M |
| $750K–$1.5M | $1.125M | $1.4M–$1.8M | $2M–$2.8M |
| $1.5M+ | $2M | $2.5M–$3.2M | $3.5M–$5M |
| Not sure | Age-based SCF median | Calculated | Calculated |

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
| `preservation` | Flattest curve, focus on stability — gap is narrower but steadier |
| `income_generation` | Moderate growth + income yield overlay annotation |

For `income_generation`, add a small annotation below the endpoint:
```
+ ~$X,XXX/year in projected income
```

### 60s+ Special Treatment

Both lines **decline** (drawdown phase). Advisor line declines more slowly.
- Endpoint labels: "Lasts past 85" vs "Runs out at 74" (not dollar amounts)
- If objective is `preservation` or `income_generation`, advisor line is nearly flat (ideal drawdown)
- Emotional argument shifts from "grow more" to "make it last"

### Animation Sequence

1. Screen enters → 200ms pause
2. Both lines draw left-to-right simultaneously (800ms, ease-out)
3. Gap fill fades in (200ms, 200ms delay)
4. Endpoint labels fade in (200ms)
5. Total: ~1.5 seconds

### Disclaimer

Small muted text below graph:
```
Illustration based on historical averages. Individual results vary.
```

---

## Email Save Checkpoint

Below Continue button. Secondary action — NOT a gate.

### Default state:

```
💾 Save your profile — finish anytime
   Enter your email to pick up where you left off
```

### Expanded state (on tap):

```
┌────────────────────────────────┐
│  📧 your@email.com             │
└────────────────────────────────┘
[ Save & Continue → ]

By saving, you agree to receive a progress
link via email. We won't share your email.
```

### Logic

- Captures `saved_email` with save-progress consent only (NOT TCPA)
- User continues regardless of save action
- If abandoned after Screen A: re-engagement email with deep link
- If completed: `saved_email` pre-fills email step later in funnel
- CAN-SPAM compliant, unsubscribe in every email

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
- Email save consent is separate from TCPA — legal must confirm sufficiency

---

## Behavior

1. Full page transition in
2. Profile card visible immediately
3. Graph animates on entry (~1.5s)
4. User reads, taps Continue → proceeds to Step 6
5. OR taps "Save your profile" → email input expands inline
6. After save: confirmation toast, then Continue proceeds to Step 6

## What Gets Stored

```javascript
// No new form fields — value delivery screen
// Optionally:
{ saved_email: "user@email.com" } // only if email save used
```
