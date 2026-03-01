# Step 9 — ZIP Code

## Overview

| Property | Value |
|----------|-------|
| Screen name | `ZipCodeScreen` |
| Field | `zip_code` |
| Type | Text input (5-digit numeric) |
| Auto-advance | No — requires Continue (text input) |
| Phase label | YOUR LIFE SITUATION |
| Progress | ~70% |
| Data available | All profile + specialties + marital + homeownership |

---

## Layout

```
┌──────────────────────────────────────────────┐
│  YOUR LIFE SITUATION                          │
│  ████████████████████████░░░░                │
│                                               │
│  Where are you located?                       │
│                                               │
│  We'll use this to find the best advisors     │
│  near you — so meetings, calls, and           │
│  check-ins are convenient.                    │
│                                               │
│  ┌──────────────────────┐                    │
│  │  ZIP code             │                    │
│  └──────────────────────┘                    │
│                                               │
│  [Motivation-specific reassurance]            │
│                                               │
│            [ Continue → ]                     │
│                                               │
└──────────────────────────────────────────────┘
```

---

## Headline

```
Where are you located?
```

## Sub Copy

```
We'll use this to find the best advisors near you — so meetings, calls, and check-ins are convenient.
```

---

## Input

- Placeholder: `ZIP code`
- 5-digit numeric input
- Input mask: numbers only, max 5 characters
- Auto-focus on load (keyboard appears on mobile)
- Validate on Continue: must be valid US ZIP format

---

## Reassurance Line — Personalized (below input)

| `motivation_driver` | Reassurance |
|---------------------|-------------|
| `behind_retirement` | State-level tax rules also affect your catch-up strategy — your location helps us match smarter. |
| `family_protection` | Estate and insurance laws vary by state — your location ensures we match you with a licensed advisor. |
| `windfall` | State tax rules can significantly impact how new wealth is positioned. Your ZIP helps us account for that. |
| `optimization` | State-level tax rules affect your optimization strategy — your ZIP helps us find the right fit. |
| `plan_review` | This ensures your advisor is licensed in your state and easy to reach when you need them. |

---

## Behavior

1. Input auto-focused on load
2. User types ZIP
3. Continue enabled at 5 digits
4. Validates → transitions to Step 10 (Advisor Relationship)

## What Gets Stored

```javascript
{
  // ...previous fields...
  zip_code: "10001",
  derived_state: "NY" // looked up from ZIP, used for matching + state-specific content
}
```
