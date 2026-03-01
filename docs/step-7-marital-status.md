# Step 7 — Marital Status

## Overview

| Property | Value |
|----------|-------|
| Screen name | `MaritalStatusScreen` |
| Field | `marital_status` |
| Type | Single-select cards |
| Auto-advance | Yes |
| Phase label | YOUR LIFE SITUATION |
| Progress | ~60% |
| Data available | All profile + specialties |

---

## Layout

New section label introduces the life situation block. Context line explains why these questions matter.

```
┌──────────────────────────────────────────────┐
│  YOUR LIFE SITUATION                          │
│  ████████████████████░░░░░░                  │
│                                               │
│  Advisors typically start by understanding    │
│  your life situation — it shapes everything   │
│  from tax strategy to protection planning.    │
│                                               │
│  What is your marital status?                 │
│                                               │
│  [Personalized sub copy]                      │
│                                               │
│  [ Single       ]   [ Married       ]        │
│  [ Divorced     ]   [ Widowed       ]        │
│           [ Prefer not to say ]               │
│                                               │
└──────────────────────────────────────────────┘
```

---

## Section Context (above headline)

```
Advisors typically start by understanding your life situation — it shapes everything from tax strategy to protection planning.
```

This line appears once on Step 7 and carries through Steps 8-9 as part of the same section. It justifies three quick questions in a row.

---

## Headline

```
What is your marital status?
```

## Sub Copy — Personalized (5 variants)

| `motivation_driver` | Sub copy |
|---------------------|----------|
| `behind_retirement` | Filing status is one of the biggest levers in retirement catch-up planning. |
| `family_protection` | This determines the scope of protection planning — spousal coverage, survivorship, beneficiaries. |
| `windfall` | Marital status affects how new wealth is titled, taxed, and protected. |
| `optimization` | Filing status is one of the biggest levers in tax optimization. |
| `plan_review` | Your advisor will want to know this upfront — it affects nearly every part of a financial plan. |

---

## Options

| Label | Stores as |
|-------|-----------|
| Single | `single` |
| Married | `married` |
| Divorced | `divorced` |
| Widowed | `widowed` |
| Prefer not to say | `prefer_not_to_say` |

2-column grid, "Prefer not to say" centered on bottom row.

---

## Behavior

1. Section context line visible at top (first time in this section)
2. User taps marital status → card highlights
3. After 400ms → transitions to Step 8 (Homeownership)

## What Gets Stored

```javascript
{
  // ...previous fields...
  marital_status: "married"
}
```
