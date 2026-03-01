# Step 6 — Specialties

## Overview

| Property | Value |
|----------|-------|
| Screen name | `SpecialtiesScreen` |
| Field | `specialties` |
| Type | Two primary single-select options + secondary multi-select |
| Auto-advance | "Select all" and "Not sure" auto-advance; multi-select requires Continue |
| Phase label | YOUR ADVISOR MATCH |
| Progress | ~55% |
| Data available | `motivation_driver` + `age_range` + `income_range` + `savings_range` + `investment_objective` |
| Special feature | 2-3 options tagged RECOMMENDED in the multi-select |

---

## Layout

Two primary options at top. Individual specialties below, introduced by a divider line.

```
┌──────────────────────────────────────────────┐
│  YOUR ADVISOR MATCH                           │
│  ██████████████████░░░░░░░                   │
│                                               │
│  What would you like help with?               │
│                                               │
│  We'll match you with advisors who            │
│  specialize in what you need.                 │
│                                               │
│  ┌──────────────────────────────────────┐    │
│  │  ✅ All of the above                  │    │
│  │  Match me with a full-service advisor │    │
│  └──────────────────────────────────────┘    │
│  ┌──────────────────────────────────────┐    │
│  │  🤷 Not sure yet                      │    │
│  │  Help me figure it out                │    │
│  └──────────────────────────────────────┘    │
│                                               │
│  ── Or select any specifics that apply ─────  │
│                                               │
│  ┌──────────────────────────────────────┐    │
│  │  ☐ Retirement planning  RECOMMENDED  │    │
│  └──────────────────────────────────────┘    │
│  ┌──────────────────────────────────────┐    │
│  │  ☐ Tax strategy         RECOMMENDED  │    │
│  └──────────────────────────────────────┘    │
│  ┌──────────────────────────────────────┐    │
│  │  ☐ Estate & legacy planning          │    │
│  └──────────────────────────────────────┘    │
│  ┌──────────────────────────────────────┐    │
│  │  ☐ Investment management             │    │
│  └──────────────────────────────────────┘    │
│  ┌──────────────────────────────────────┐    │
│  │  ☐ Catch-up strategies  RECOMMENDED  │    │
│  └──────────────────────────────────────┘    │
│  ┌──────────────────────────────────────┐    │
│  │  ☐ Insurance & protection            │    │
│  └──────────────────────────────────────┘    │
│  ┌──────────────────────────────────────┐    │
│  │  ☐ Education funding                 │    │
│  └──────────────────────────────────────┘    │
│  ┌──────────────────────────────────────┐    │
│  │  ☐ Debt management                   │    │
│  └──────────────────────────────────────┘    │
│                                               │
│  [Motivation-specific reassurance]            │
│                                               │
│  You're not locked in — your advisor will     │
│  refine this with you.                        │
│                                               │
│               [ Continue → ]                  │
│                                               │
└──────────────────────────────────────────────┘
```

---

## Headline

```
What would you like help with?
```

## Sub Copy

```
We'll match you with advisors who specialize in what you need.
```

---

## Primary Options (top)

Two large cards with icon + title + description. These are single-select — tapping either one auto-advances.

| Icon | Label | Description | Stores as |
|------|-------|-------------|-----------|
| ✅ | All of the above | Match me with a full-service advisor | `all` |
| 🤷 | Not sure yet | Help me figure it out | `not_sure` |

### "All of the above" behavior
- Auto-advances after 400ms
- Stores `specialties: ["all"]`
- Functionally tells the matching engine: no specialty filter, match on everything

### "Not sure yet" behavior
- Auto-advances after 400ms
- Stores `specialties: ["not_sure"]`
- Same matching behavior as "all" — the advisor will assess

---

## Divider

```
── Or select any specifics that apply ──
```

Small muted text with horizontal rules. Signals that the section below is optional / for people who know what they want.

---

## Secondary Options (multi-select)

Stacked full-width cards with checkboxes. 2-3 options tagged RECOMMENDED but **not pre-checked** — tags are guidance only.

| Label | Stores as |
|-------|-----------|
| Retirement planning | `retirement_planning` |
| Tax strategy | `tax_strategy` |
| Estate & legacy planning | `estate_planning` |
| Investment management | `investment_management` |
| Catch-up strategies | `catch_up` |
| Insurance & protection | `insurance_protection` |
| Education funding | `education_funding` |
| Debt management | `debt_management` |

### Interaction with primary options

- If the user checks any specific option, the two primary options deselect (mutually exclusive)
- If the user taps a primary option after checking specifics, the specifics clear
- Continue button appears once at least one specific is checked

---

## Recommended Tags

Same pill treatment as Step 5 — right-aligned within the card, subtle.

### Recommendation Matrix

#### `behind_retirement`

| Age | Recommended specialties |
|-----|------------------------|
| Under 30 | Retirement planning, Investment management |
| 30s | Retirement planning, Tax strategy |
| 40s | Retirement planning, Tax strategy, Catch-up strategies |
| 50s | Retirement planning, Tax strategy, Catch-up strategies |
| 60s+ | Retirement planning, Tax strategy, Estate & legacy planning |

#### `family_protection`

| Age | Recommended specialties |
|-----|------------------------|
| Under 30 | Insurance & protection, Retirement planning |
| 30s | Insurance & protection, Estate & legacy planning |
| 40s | Insurance & protection, Estate & legacy planning, Education funding |
| 50s | Estate & legacy planning, Insurance & protection, Retirement planning |
| 60s+ | Estate & legacy planning, Insurance & protection |

#### `windfall`

| Age | Recommended specialties |
|-----|------------------------|
| Under 30 | Tax strategy, Investment management |
| 30s | Tax strategy, Investment management |
| 40s | Tax strategy, Investment management, Estate & legacy planning |
| 50s | Tax strategy, Investment management, Retirement planning |
| 60s+ | Tax strategy, Estate & legacy planning, Retirement planning |

#### `optimization`

| Age | Recommended specialties |
|-----|------------------------|
| Under 30 | Tax strategy, Investment management |
| 30s | Tax strategy, Investment management |
| 40s | Tax strategy, Investment management, Retirement planning |
| 50s | Tax strategy, Catch-up strategies, Retirement planning |
| 60s+ | Tax strategy, Retirement planning, Estate & legacy planning |

#### `plan_review`

| Age | Recommended specialties |
|-----|------------------------|
| Under 30 | Retirement planning, Investment management |
| 30s | Retirement planning, Tax strategy |
| 40s | Retirement planning, Tax strategy, Investment management |
| 50s | Retirement planning, Tax strategy, Catch-up strategies |
| 60s+ | Retirement planning, Estate & legacy planning, Tax strategy |

#### Savings Modifier

| Condition | Additional recommendation |
|-----------|--------------------------|
| `savings_range` = `under_50k` | Add Debt management |
| `savings_range` = `750k_1.5m` or `1.5m_plus` | Add Estate & legacy planning |

#### Income Modifier

| Condition | Additional recommendation |
|-----------|--------------------------|
| `income_range` = `250k_500k` or `500k_plus` | Add Tax strategy |

Cap at 3 RECOMMENDED tags max.

---

## Reassurance Line — Personalized (below multi-select options)

| `motivation_driver` | Reassurance |
|---------------------|-------------|
| `behind_retirement` | Most people catching up benefit from a combination of retirement planning, tax strategy, and catch-up expertise. |
| `family_protection` | Protection planning often involves insurance, estate documents, and education funding working together. |
| `windfall` | New wealth typically requires tax strategy, investment management, and asset protection as a starting point. |
| `optimization` | Optimization touches tax strategy, investment management, and fee reduction — most people benefit from all three. |
| `plan_review` | A good review covers retirement readiness, tax strategy, and whatever else surfaces — cast a wide net. |

## Static Reassurance (below motivation line)

```
You're not locked in — your advisor will refine this with you.
```

---

## Behavior Summary

| Action | Result |
|--------|--------|
| Tap "All of the above" | Auto-advance after 400ms |
| Tap "Not sure yet" | Auto-advance after 400ms |
| Check any specific option | Primary options deselect, Continue button appears |
| Tap primary after checking specifics | Specifics clear, auto-advance |
| Continue (with specifics checked) | Advance to Step 7 |

---

## What Gets Stored

```javascript
// If primary option selected:
{ specialties: ["all"] }
// or
{ specialties: ["not_sure"] }

// If specific options selected:
{
  specialties: ["retirement_planning", "tax_strategy", "catch_up"],
  specialties_modified: false // true if they unchecked a RECOMMENDED option
}
```
