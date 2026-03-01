# Step 3 — Income

## Overview

| Property | Value |
|----------|-------|
| Screen name | `IncomeRangeScreen` |
| Field | `income_range` |
| Type | Single-select list (full-width rows with letter indicators) |
| Auto-advance | Yes |
| Phase label | BUILDING YOUR FINANCIAL PROFILE |
| Progress | ~30% |
| Data available | `motivation_driver` + `age_range` |

---

## Layout

Centered single-column. Two distinct zones separated by a divider: the confirmation zone (mirrors age input) and the question zone (emotional headline + sub copy + options). Same pattern as Step 2.

```
┌──────────────────────────────────────────┐
│  ← ████████████░░░░░░░░░░░░░░           │
│                                           │
│  ✅                                       │
│  [Motivation confirmation]                │
│                                           │
│  ──────────────────────────────           │
│                                           │
│  BUILDING YOUR FINANCIAL PROFILE          │
│                                           │
│  Your income isn't a score.               │
│  It's a starting point.                   │
│                                           │
│  Estimate your total household income,    │
│  including salary, spouse's income,       │
│  rental income, investments, and any      │
│  side income.                             │
│                                           │
│   A  Under $50K                           │
│   B  $50K–$100K                           │
│   C  $100K–$150K                          │
│   D  $150K–$250K                          │
│   E  $250K–$500K                          │
│   F  $500K+                               │
│                                           │
│   [Motivation-specific advisor            │
│    reassurance]                            │
│                                           │
└──────────────────────────────────────────┘
```

---

## Zone 1: Confirmation

Green checkmark + confirmation of their age input. Generic rather than repeating the age back, since age was already confirmed on the previous screen.

| Element | Spec |
|---------|------|
| Icon | ✅ Filled circle, white checkmark, Forbes teal (#0B6E4F) |
| Size | 32px |
| Positioning | Left-aligned, above confirmation text |
| Confirmation text | Bold, 18px, dark (#1B2A4A) |

### Confirmation Copy

| `motivation_driver` | Confirmation |
|---------------------|-------------|
| `behind_retirement` | Catching up on retirement starts with knowing what you're working with. |
| `family_protection` | Protecting your family starts with knowing what you're working with. |
| `windfall` | Positioning new wealth starts with knowing what you're working with. |
| `optimization` | Optimizing your finances starts with knowing what you're working with. |
| `plan_review` | A meaningful plan review starts with knowing what you're working with. |

---

## Divider

| Element | Spec |
|---------|------|
| Style | 1px solid, light grey (#E0E0E0) |
| Width | Full content width |
| Margin | 24px top and bottom |

---

## Zone 2: Question

Phase label + emotional headline + sub copy + options + helper text.

### Phase Label

```
BUILDING YOUR FINANCIAL PROFILE
```

Small caps, muted. New phase label signals the shift from "understanding you" to "building your profile."

### Emotional Headline

Universal for all motivations. Addresses the core hesitation around sharing income: "Am I going to be judged?"

```
Your income isn't a score. It's a starting point.
```

### Headline Treatment

- **"Your income isn't a score."** — Dark (#1B2A4A), serif/display font (Forbes editorial), 28px
- **"It's a starting point."** — Forbes blue (#0066CC), same font and size
- Same accent color pattern as Step 2

### Sub Copy

Universal instruction for all motivations. Tells them what to include.

```
Estimate your total household income, including salary, spouse's income, rental income, investments, and any side income.
```

### Sub Copy Treatment

- **Style:** Regular weight, 15px
- **Color:** Muted (#666666)

---

## Options

Full-width list rows with letter indicators. Single column, no grid.

| Letter | Label | Stores as |
|--------|-------|-----------|
| A | Under $50K | `under_50k` |
| B | $50K–$100K | `50k_100k` |
| C | $100K–$150K | `100k_150k` |
| D | $150K–$250K | `150k_250k` |
| E | $250K–$500K | `250k_500k` |
| F | $500K+ | `500k_plus` |

### Option Row Spec

| Element | Spec |
|---------|------|
| Row height | 56px |
| Border | 1px solid #E8E8E8, 8px border radius |
| Letter indicator | Circle, 28px, light grey background, centered letter |
| Label | Regular weight, 16px, dark (#1B2A4A) |
| Spacing | 12px between rows |
| Hover | Light blue background (#F0F7FF) |
| Selected | Forbes blue border (#0066CC), light blue fill |

---

## Advisor Reassurance (below options)

Motivation-specific line that explains why this data point matters for their goal. Sits below the options as a reassurance after they've committed.

| `motivation_driver` | Reassurance |
|---------------------|-------------|
| `behind_retirement` | It helps your advisor understand which retirement strategies fit your situation and how aggressively to plan. |
| `family_protection` | It helps your advisor right-size your coverage and build a protection plan that actually fits your household. |
| `windfall` | It helps your advisor understand your baseline, so they can position your new wealth relative to what's coming in. |
| `optimization` | It's where tax optimization starts. It tells your advisor which levers to pull first. |
| `plan_review` | It gives your advisor context for stress-testing your plan against your actual financial picture. |

| Element | Spec |
|---------|------|
| Style | Regular weight, 13px |
| Color | Muted (#999999) |
| Background | Light grey card (#F8F8FA), 8px border radius, 12px padding |

---

## Transition

- **In:** Crossfade from Affirmation screen.
- **Out:** User taps income option, row highlights, after 400ms transitions to Step 4 (Savings).

---

## Animation on Entry

1. Crossfade from Affirmation completes
2. ✅ icon + confirmation text fade in (200ms)
3. Divider fades in (100ms)
4. Phase label + headline fade in (200ms, 100ms delay)
5. Sub copy (instruction) fades in (200ms, 100ms delay)
6. Option rows fade in staggered (100ms each)
7. Advisor reassurance fades in (200ms)
8. Total: ~1.1s after crossfade

---

## What Gets Stored

```javascript
{
  motivation_driver: "behind_retirement",
  age_range: "fifties",
  income_range: "100k_150k"
}
```

---

## Notes

- "Prefer not to say" removed. If users don't want to share, they can use the back button. Removing it keeps the flow clean and avoids a dead-end data gap.
- Pre-tax clarification is implicit in the helper text ("all sources"). If compliance requires explicit "pre-tax" language, add it to the helper text.
- Christine should confirm income framing is compliant. "Starting point" language is process-focused, not outcome-based.
