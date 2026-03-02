# Step 7 — Marital Status

## Overview

| Property | Value |
|----------|-------|
| Screen name | `MaritalStatusScreen` |
| Field | `marital_status` |
| Type | Single-select, auto-advance |
| Auto-advance | Yes, 400ms |
| Phase label | YOUR LIFE SITUATION |
| Progress | ~60% |
| Data available | All profile + specialties |
| Layout | Centered single-column with profile dropdown (see **profile-dropdown.md**) |

---

## Layout

Centered single-column. Profile dropdown above the confirmation zone now includes Specialties in Group 2. This step opens a new section (YOUR LIFE SITUATION) and sets expectations for a quick three-question sequence (Steps 7-9).

```
YOUR LIFE SITUATION
====================----

  Your Profile                            v

  [checkmark] Your advisor match is
  taking shape. A few quick details
  to round out the picture.

  ------------------------------------

  These next few questions are quick.
  They help your advisor start the
  conversation in the right place.

  What is your marital status?

  A  Single
  B  Married
  C  Divorced
  D  Widowed
  E  Prefer not to say

  [Reassurance]
```

---

## Zone 1: Confirmation

Bridges from Step 6 (specialties) into the life situation section.

### Confirmation Variants

| `motivation_driver` | Confirmation |
|---------------------|--------------|
| `behind_retirement` | Your advisor match is taking shape. A few quick details to round out the picture. |
| `family_protection` | Your advisor match is taking shape. A few quick details about your situation. |
| `windfall` | Your advisor match is taking shape. A few quick details to round out the picture. |
| `optimization` | Your advisor match is taking shape. A few quick details to fine-tune your match. |
| `plan_review` | Your advisor match is taking shape. A few quick details to round out the picture. |

### Confirmation Spec

| Element | Spec |
|---------|------|
| Icon | Green checkmark, 18px |
| Text | Regular weight, 15px, dark (#1B2A4A) |
| Spacing | 16px below confirmation, before divider |

---

## Divider

| Element | Spec |
|---------|------|
| Style | 1px solid, light grey (#E0E0E0) |
| Width | Full content width |
| Margin | 16px top and bottom |

---

## Zone 2: Headline + Options

### Emotional Headline

```
These next few questions are quick.
They help your advisor start the conversation in the right place.
```

- **"These next few questions are quick."** -- Dark (#1B2A4A), serif/display font, 24px
- **"They help your advisor start the conversation in the right place."** -- Forbes blue (#0066CC), same font and size

Addresses: "Why are you asking personal stuff?" and sets pacing expectations for Steps 7-9 as a group.

### Instruction

```
What is your marital status?
```

| Element | Spec |
|---------|------|
| Style | Regular weight, 15px, muted (#666666) |
| Spacing | 8px below headline, 16px above options |

---

## Options

Single-column list with letter indicators, matching the visual system from Steps 2-5.

| Letter | Label | Stores as |
|--------|-------|-----------|
| A | Single | `single` |
| B | Married | `married` |
| C | Divorced | `divorced` |
| D | Widowed | `widowed` |
| E | Prefer not to say | `prefer_not_to_say` |

### Option Row Spec

| Element | Spec |
|---------|------|
| Row height | 52px |
| Border | 1px solid #E8E8E8, 8px border radius |
| Letter indicator | Circle, 28px, light grey background, centered letter |
| Label | Regular weight, 16px, dark (#1B2A4A) |
| Spacing | 10px between rows |
| Hover | Light blue background (#F0F7FF) |
| Selected | Forbes blue border (#0066CC), light blue fill |

---

## Advisor Reassurance (Motivation-Specific)

Below the options. Explains why marital status matters for their specific goal.

| `motivation_driver` | Reassurance |
|---------------------|-------------|
| `behind_retirement` | Filing status is one of the biggest levers in retirement catch-up planning. |
| `family_protection` | This helps scope the protection plan: spousal coverage, survivorship, beneficiaries. |
| `windfall` | Marital status affects how new wealth is titled, taxed, and protected. |
| `optimization` | Filing status is one of the biggest levers in tax optimization. |
| `plan_review` | Your advisor will want to know this upfront. It affects nearly every part of a financial plan. |

| Element | Spec |
|---------|------|
| Style | Regular weight, 14px, muted (#666666) |
| Spacing | 16px above |

---

## Behavior

1. Two-zone layout loads with confirmation + headline
2. User taps marital status option
3. Option highlights with blue border
4. After 400ms, auto-advances to Step 8
5. "Marital status" field becomes available in profile dropdown Group 2

---

## What Gets Stored

```javascript
{
  marital_status: "married"
}
```

---

## Notes

- This headline sets expectations for Steps 7-9 as a group. Steps 8 and 9 don't need their own "these are quick" framing since the user already knows.
- Single-column replaces the 2-column grid from the old spec. Consistent with all other steps.
- "Prefer not to say" kept as an option. No penalty in matching.
- Profile dropdown above the headline grows with each step. Most users will never tap it, but it's there for anyone who wants to verify what they've provided.
