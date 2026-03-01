# Step 2 — Age

## Overview

| Property | Value |
|----------|-------|
| Screen name | `AgeRangeScreen` |
| Field | `age_range` |
| Type | Single-select list (full-width rows with letter indicators) |
| Auto-advance | Yes, triggers full page transition to Affirmation |
| Phase label | LET'S UNDERSTAND YOU |
| Progress | ~15% |
| sideContent | None |
| Data available | `motivation_driver` |

---

## Layout

Centered single-column. Two distinct zones separated by a divider: the confirmation zone (mirrors Step 1) and the question zone (emotional headline + sub copy + options).

```
┌──────────────────────────────────────────┐
│  ← ████████░░░░░░░░░░░░░░░░░░           │
│                                           │
│  ✅                                       │
│  Got it! You want to catch up             │
│  on retirement.                           │
│                                           │
│  ──────────────────────────────           │
│                                           │
│  LET'S UNDERSTAND YOU                     │
│                                           │
│  [Emotional headline]                     │
│  [Sub copy — why age matters]             │
│                                           │
│   A  Under 30                             │
│   B  30s                                  │
│   C  40s                                  │
│   D  50s                                  │
│   E  60s+                                 │
│                                           │
└──────────────────────────────────────────┘
```

---

## Zone 1: Confirmation

Green checkmark + confirmation line. Mirrors their Step 1 choice back instantly.

| Element | Spec |
|---------|------|
| Icon | ✅ Filled circle, white checkmark, Forbes teal (#0B6E4F) |
| Size | 32px |
| Positioning | Left-aligned, above confirmation text |
| Confirmation text | Bold, 18px, dark (#1B2A4A) |

### Confirmation Copy

| `motivation_driver` | Confirmation |
|---------------------|-------------|
| `behind_retirement` | Got it! You want to catch up on retirement. |
| `family_protection` | Got it! You want to protect your family. |
| `windfall` | Got it! You're managing new wealth. |
| `optimization` | Got it! You want to optimize your finances. |
| `plan_review` | Got it! You want a professional review. |

---

## Divider

Thin horizontal rule separating the confirmation from the question. Creates two visual zones: "we heard you" above, "now help us help you" below.

| Element | Spec |
|---------|------|
| Style | 1px solid, light grey (#E0E0E0) |
| Width | Full content width |
| Margin | 24px top and bottom |

---

## Zone 2: Question

Phase label + emotional headline + sub copy + options.

### Phase Label

```
LET'S UNDERSTAND YOU
```

Small caps, muted, above the headline. Same treatment as other steps.

### Emotional Headline

The headline addresses the hesitation before asking for the data. It reassures the user that their age is an advantage, not a liability. Personalized per motivation.

| `motivation_driver` | Headline |
|---------------------|----------|
| `behind_retirement` | Your age is your runway. And there's more of it than you think. |
| `family_protection` | Your age shapes the plan. And right now is the best time to build one. |
| `windfall` | Your age decides the strategy. And yours opens up the most options. |
| `optimization` | Your age unlocks the levers. And every year you act earlier compounds. |
| `plan_review` | Your age sets the priorities. And knowing them is half the work. |

### Headline Copy Treatment

- **Style:** Serif or display font (Forbes editorial), 28px
- **Color:** Dark (#1B2A4A)
- **Second sentence:** Can be a different color (Forbes blue #0066CC) for emphasis, similar to how Remedy uses blue for "good way"

### Sub Copy

One sentence below the headline explaining the practical reason. Personalized per motivation.

| `motivation_driver` | Sub copy |
|---------------------|----------|
| `behind_retirement` | Your age tells an advisor how much runway you have, and which strategies will close the gap fastest. |
| `family_protection` | Your age tells an advisor what type of coverage and estate planning makes the most sense right now. |
| `windfall` | Your age tells an advisor how to balance growing this money with protecting it. |
| `optimization` | Your age tells an advisor which tax and investment strategies will have the biggest impact. |
| `plan_review` | Your age tells an advisor which parts of your plan to stress-test first. |

### Sub Copy Treatment

- **Style:** Regular weight, 15px
- **Color:** Muted (#666666)

---

## Options

Full-width list rows with letter indicators. Single column, no grid.

| Letter | Label | Stores as |
|--------|-------|-----------|
| A | Under 30 | `under_30` |
| B | 30s | `thirties` |
| C | 40s | `forties` |
| D | 50s | `fifties` |
| E | 60s+ | `sixties` |

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

## Transition

- **In:** Crossfade from Step 1. sideContent image fades out, content area transitions to centered layout.
- **Out:** User taps age option, row highlights, after 400ms full page transition to Affirmation. This is the first "new page" in the funnel.

---

## Animation on Entry

1. Crossfade from Step 1 completes
2. ✅ icon + confirmation text fade in (200ms)
3. Divider fades in (100ms)
4. Phase label + headline fade in (200ms, 100ms delay)
5. Sub copy fades in (200ms, 100ms delay)
6. Option rows fade in staggered (100ms each)
7. Total: ~900ms after crossfade

The stagger creates a reading flow: confirm → reassure → explain → ask.

---

## What Gets Stored

```javascript
{
  motivation_driver: "behind_retirement",
  age_range: "fifties"
}
```
