# Step 8 — Homeownership

## Overview

| Property | Value |
|----------|-------|
| Screen name | `HomeownershipScreen` |
| Field | `homeownership` |
| Type | Single-select cards |
| Auto-advance | Yes |
| Phase label | YOUR LIFE SITUATION |
| Progress | ~65% |
| Data available | All profile + specialties + marital status |

---

## Layout

Same section as Step 7. Section context line no longer shows (it appeared on Step 7).

```
┌──────────────────────────────────────────────┐
│  YOUR LIFE SITUATION                          │
│  ██████████████████████░░░░░                 │
│                                               │
│  Do you own your home?                        │
│                                               │
│  [Personalized sub copy]                      │
│                                               │
│  [ Yes, I own         ]                      │
│  [ No, I rent          ]                      │
│  [ Other               ]                      │
│                                               │
└──────────────────────────────────────────────┘
```

---

## Headline

```
Do you own your home?
```

## Sub Copy — Personalized (5 variants)

| `motivation_driver` | Sub copy |
|---------------------|----------|
| `behind_retirement` | Home equity is often overlooked in catch-up planning — it can be a significant lever. |
| `family_protection` | Homeownership changes the scope of protection planning — mortgage coverage, property trusts, insurance. |
| `windfall` | Whether you own or rent affects how your advisor positions new wealth. |
| `optimization` | Mortgage interest, property tax deductions, and home equity lines — your advisor needs to know. |
| `plan_review` | Home equity is one of the first things an advisor looks at during a review. |

---

## Options

| Label | Stores as |
|-------|-----------|
| Yes, I own | `own` |
| No, I rent | `rent` |
| Other | `other` |

Stacked full-width cards. Simple three-option layout.

---

## Behavior

1. User taps option → card highlights
2. After 400ms → transitions to Step 9 (ZIP)

## What Gets Stored

```javascript
{
  // ...previous fields...
  homeownership: "own"
}
```
