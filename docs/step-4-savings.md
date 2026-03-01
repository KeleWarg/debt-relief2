# Step 4 — Total Savings & Assets

## Overview

| Property | Value |
|----------|-------|
| Screen name | `SavingsRangeScreen` |
| Field | `savings_range` |
| Type | Single-select list (full-width rows with letter indicators) |
| Auto-advance | Yes |
| Phase label | BUILDING YOUR FINANCIAL PROFILE |
| Progress | ~38% |
| Data available | `motivation_driver` + `age_range` + `income_range` |

---

## Layout

Centered single-column. Two distinct zones separated by a divider: confirmation zone (connects income to savings through motivation) and question zone (emotional headline + instruction + options + advisor reassurance). Same pattern as Steps 2–3.

```
┌──────────────────────────────────────────┐
│  ← ██████████████░░░░░░░░░░░            │
│                                           │
│  ✅                                       │
│  [Motivation confirmation — bridges       │
│   income to savings]                      │
│                                           │
│  ──────────────────────────────           │
│                                           │
│  BUILDING YOUR FINANCIAL PROFILE          │
│                                           │
│  Whatever you've saved, it's workable.    │
│  That's what advisors do.                 │
│                                           │
│  Estimate your total savings and assets,  │
│  including cash, investments, retirement  │
│  accounts, and home equity.               │
│                                           │
│   A  Under $50K                           │
│   B  $50K–$150K                           │
│   C  $150K–$350K                          │
│   D  $350K–$750K                          │
│   E  $750K–$1.5M                          │
│   F  $1.5M+                               │
│                                           │
│   [Motivation-specific advisor            │
│    reassurance]                            │
│                                           │
└──────────────────────────────────────────┘
```

---

## Zone 1: Confirmation

Green checkmark + motivation-specific line that bridges from income (what they just shared) to savings (what's next). Each one acknowledges income and sets up the savings ask.

| Element | Spec |
|---------|------|
| Icon | ✅ Filled circle, white checkmark, Forbes teal (#0B6E4F) |
| Size | 32px |
| Positioning | Left-aligned, above confirmation text |
| Confirmation text | Bold, 18px, dark (#1B2A4A) |

### Confirmation Copy

| `motivation_driver` | Confirmation |
|---------------------|-------------|
| `behind_retirement` | Your income is locked in. Now, how much have you saved? |
| `family_protection` | Your income is locked in. Now, how much have you set aside? |
| `windfall` | Your income is locked in. Now let's look at what you've saved alongside it. |
| `optimization` | Your income is locked in. Now let's see what you've accumulated. |
| `plan_review` | Your income is locked in. Now let's add your savings to the picture. |

---

## Divider

| Element | Spec |
|---------|------|
| Style | 1px solid, light grey (#E0E0E0) |
| Width | Full content width |
| Margin | 24px top and bottom |

---

## Zone 2: Question

Phase label + emotional headline + instruction + options + advisor reassurance.

### Phase Label

```
BUILDING YOUR FINANCIAL PROFILE
```

Same phase label as Step 3. Continuity signals they're still in the same section.

### Emotional Headline

Universal for all motivations. Addresses the core hesitation around sharing savings ("I haven't saved enough") and names savings directly so it's clear this is a different question from income.

```
Whatever you've saved, it's workable. That's what advisors do.
```

### Headline Treatment

- **"Whatever you've saved, it's workable."** — Dark (#1B2A4A), serif/display font (Forbes editorial), 28px
- **"That's what advisors do."** — Forbes blue (#0066CC), same font and size
- Same accent color pattern as Steps 2–3

### Sub Copy

Universal instruction. Tells them what to include.

```
Estimate your total savings and assets, including cash, investments, retirement accounts, and home equity.
```

### Sub Copy Treatment

- **Style:** Regular weight, 15px
- **Color:** Muted (#666666)

---

## Options

Full-width list rows with letter indicators. Single column.

| Letter | Label | Stores as |
|--------|-------|-----------|
| A | Under $50K | `under_50k` |
| B | $50K–$150K | `50k_150k` |
| C | $150K–$350K | `150k_350k` |
| D | $350K–$750K | `350k_750k` |
| E | $750K–$1.5M | `750k_1.5m` |
| F | $1.5M+ | `1.5m_plus` |

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

Motivation-specific line that explains why savings data matters for their goal. Sits below the options as reassurance.

| `motivation_driver` | Reassurance |
|---------------------|-------------|
| `behind_retirement` | A rough estimate is fine. This helps your advisor understand the gap and how aggressively to plan. |
| `family_protection` | Your total assets shape the scope of protection planning your advisor will recommend. |
| `windfall` | This helps us find advisors experienced at your level of wealth. A ballpark is all we need. |
| `optimization` | Asset level determines which optimization strategies are available to you. A rough number works. |
| `plan_review` | This gives your advisor a sense of scale before they review your plan. Estimates are fine. |

| Element | Spec |
|---------|------|
| Style | Regular weight, 13px |
| Color | Muted (#999999) |
| Background | Light grey card (#F8F8FA), 8px border radius, 12px padding |

---

## Transition

- **In:** Crossfade from Step 3.
- **Out:** User taps savings option, row highlights, after 400ms transitions to Step 5 (Objectives).

---

## Animation on Entry

1. Crossfade from Step 3 completes
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
  income_range: "100k_150k",
  savings_range: "150k_350k"
}
```

---

## Notes

- Recap card removed. The confirmation zone bridges from income to savings without needing a separate data display.
- "Not sure" removed. Keeps the flow clean and consistent with Step 3. If Screen A graph needs savings data and none is provided, it falls back to age-based median from Federal Reserve SCF data.
- Christine should confirm savings framing is compliant. "Whatever the number, it's workable" is supportive, not outcome-based.
