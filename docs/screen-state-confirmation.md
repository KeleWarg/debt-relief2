# Screen — State Confirmation

## Overview

| Property | Value |
|----------|-------|
| Screen name | `StateConfirmationScreen` |
| Type | Interstitial (no input, CTA only) |
| Phase label | None (full-width interstitial, no progress bar) |
| Appears after | Step 9 (ZIP code) |
| Leads to | Step 10 (Advisor Relationship) |
| Data available | Full profile + specialties + life situation + ZIP + derived_state |

---

## Purpose

Payoff screen after ZIP input. Same rhythm as Affirmation (after Step 1) and Screen A (after Step 5). Confirms advisor availability in the user's state with a visual map, state-specific social proof, and motivation-relevant stat.

Modeled on Remedy Meds' "Confirmed / We have GLP-1 Medications available in New York" pattern.

---

## Layout

```
  Confirmed

  We have licensed financial advisors
  available in New York.

  You're in good company. Thousands in your
  state already use Forbes Advisor.

  +------------------------------------------+
  |                                          |
  |          [State map with pin]            |
  |                                          |
  |              New York                    |
  |                                          |
  +------------------------------------------+

  [Motivation-specific stat]

  [Social proof row]

             [ Next -> ]
```

---

## Confirmed Badge

```
Confirmed
```

| Element | Spec |
|---------|------|
| Icon | Green checkmark circle, 20px |
| Text | "Confirmed", medium weight, 14px, green (#22C55E) |
| Layout | Icon + text inline |
| Spacing | 32px below Forbes header, 12px below badge |

---

## Headline

```
We have licensed financial advisors available in [State].
```

| Element | Spec |
|---------|------|
| Style | Serif/display font, 28px, dark (#1B2A4A) |
| `[State]` | Bold weight within the headline |
| Spacing | 8px below to sub copy |

---

## Sub Copy

```
You're in good company. Thousands in your state already use Forbes Advisor.
```

| Element | Spec |
|---------|------|
| Style | Regular weight, 16px, muted (#666666) |
| Spacing | 16px below to map |

---

## State Map

| Element | Spec |
|---------|------|
| Container | Full content width, max 560px, 8px border radius |
| Background | Dark blue (#1B2A4A) |
| State shape | Filled medium blue, lighter than background |
| Pin | Glowing dot at ZIP centroid (Forbes blue with subtle radial glow) |
| State name | Medium weight, 20px, white, centered below map shape |
| Height | 280px (desktop), 220px (mobile) |

Use pre-rendered SVG set of US state outlines. Pin position from ZIP centroid lookup. If exact centroid unavailable, center on state.

### Pin Animation

Pin drops in on load (300ms ease-out bounce). Glow pulses once (500ms). Not looping.

---

## Motivation-Specific Stat

Below the map. One line connecting their state to their goal.

| `motivation_driver` | Stat line |
|---------------------|-----------|
| `behind_retirement` | The average retirement savings in [State] is [amount]. Your advisor will help you plan from where you are. |
| `family_protection` | [State] has specific estate and insurance regulations. Your advisor will be licensed to navigate them. |
| `windfall` | [State]'s tax landscape affects how new wealth should be positioned. Your advisor knows the local rules. |
| `optimization` | [State] [has no state income tax / has a [rate]% top marginal rate]. Your advisor will optimize around it. |
| `plan_review` | Your advisor will be licensed in [State] and familiar with local tax and estate regulations. |

| Element | Spec |
|---------|------|
| Style | Regular weight, 15px, dark (#1B2A4A) |
| Spacing | 20px above, 20px below |

---

## Social Proof Row

Horizontal row of three trust indicators.

```
100% Free            Licensed in          Takes about
& confidential       [State]              3 minutes
```

| Element | Spec |
|---------|------|
| Layout | Three columns, equal width |
| Stat | Medium weight, 14px, dark (#1B2A4A) |
| Label | Regular weight, 12px, muted (#999999) |
| Spacing | 16px above, 24px below to CTA |

---

## CTA

```
Next ->
```

Full-width button, Forbes blue (#0066CC), white text.

---

## State Data

Lightweight lookup keyed by `derived_state`:

```javascript
stateData = {
  NY: {
    name: "New York",
    match_count: "12,000",
    avg_retirement_savings: "$142,000",
    has_state_income_tax: true,
    top_marginal_rate: "10.9",
  },
  TX: {
    name: "Texas",
    match_count: "18,000",
    avg_retirement_savings: "$126,000",
    has_state_income_tax: false,
    top_marginal_rate: null,
  },
  CA: {
    name: "California",
    match_count: "22,000",
    avg_retirement_savings: "$156,000",
    has_state_income_tax: true,
    top_marginal_rate: "13.3",
  },
  // ... all 50 states + DC
}
```

Fallback if state data unavailable:

```
Your advisor will be licensed in [State] and familiar with local regulations.
```

---

## Behavior

1. Screen loads after Step 9 validates ZIP
2. Pin drops with bounce animation (300ms)
3. Content is static, no inputs
4. User taps Next
5. Transitions to Step 10 (Advisor Relationship)

---

## What Gets Stored

Nothing. Display-only interstitial.

---

## Notes

- Third interstitial in the funnel. Rhythm: Step 1 -> Affirmation -> Steps 2-5 -> Screen A -> Steps 6-9 -> State Confirmation -> Steps 10-12 -> Screen B
- Directly modeled on Remedy Meds' confirmed availability pattern: badge, headline with location, sub copy with social proof, map visual, CTA.
- No progress bar on this screen, same as Affirmation and Screen A.
- CTA is "Next" not "Continue" to differentiate interstitials from input steps.
