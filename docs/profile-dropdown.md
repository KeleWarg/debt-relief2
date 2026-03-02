# Profile Dropdown — Inline Expandable (Steps 6–12)

## Overview

Starting at Step 6, a collapsible profile summary appears above the headline on every step. It sits between the progress bar and the confirmation zone. Collapsed by default, it expands in-place when tapped to reveal everything the user has provided so far.

The profile is available, not visible. The user's job is to answer the question in front of them. The profile is there when they want to check it, not competing for attention while they work.

---

## When It Appears

| Step | Profile dropdown |
|------|-----------------|
| Step 1 | Not present |
| Steps 2–5 | Not present |
| Affirmation | Not present (profile shown inline on Screen A) |
| Screen A | Not present (profile shown inline) |
| Steps 6–12 | Present, collapsed by default |
| Screen B | TBD |

---

## Collapsed State

A single row below the progress bar, above the confirmation zone.

```
YOUR ADVISOR MATCH
==================---

  Your Profile                            v

  [checkmark] Your growth horizon is set...

  ------------------------------------

  Headline...
```

### Collapsed Spec

| Element | Spec |
|---------|------|
| Height | 40px |
| Background | Transparent (same as page background) |
| Border | 1px solid #E8E8E8, 8px border radius |
| Label | "Your Profile", medium weight, 14px, dark (#1B2A4A) |
| Chevron | Down arrow, 12px, muted (#999999), right-aligned |
| Padding | 12px horizontal |
| Spacing | 16px below progress bar, 16px above confirmation zone |
| Tap target | Full row |
| Cursor | Pointer |

---

## Expanded State

Expands in-place. Content below (confirmation zone, headline, options) shifts down smoothly (200ms ease-out). No overlay, no modal.

```
YOUR ADVISOR MATCH
==================---

  Your Profile                            ^

  Goal            Catching up on retirement
  Age             50s
  Income          $100K-$150K
  Savings         $150K-$350K
  Objective       Long-term growth
  ------------------------------------------
  Specialties     Retirement, Tax, Catch-up
  Marital status  Married
  Homeownership   Owns
  ZIP             10001

  [checkmark] Your growth horizon is set...

  ------------------------------------

  Headline...
```

### Expanded Spec

| Element | Spec |
|---------|------|
| Background | Light grey (#F8F8FA), 8px border radius |
| Border | 1px solid #E8E8E8 |
| Padding | 16px |
| Chevron | Up arrow, 12px, muted (#999999) |
| Animation | Height expands with 200ms ease-out, content below shifts down |
| Tap to close | Chevron row or tapping outside the dropdown |

---

## Profile Content

Two groups separated by a light divider, same as the old panel spec.

### Group 1: Financial Profile (always present from Step 6)

| Label | Value source | Example |
|-------|-------------|---------|
| Goal | `motivation_driver` mapped label | Catching up on retirement |
| Age | `age_range` | 50s |
| Income | `income_range` | $100K-$150K |
| Savings | `savings_range` | $150K-$350K |
| Objective | `investment_objective` mapped label | Long-term growth |

### Divider

| Element | Spec |
|---------|------|
| Style | 1px solid #E0E0E0 |
| Margin | 12px top and bottom |

### Group 2: Matching Details (grows as user answers)

| Label | Value source | Appears at | Example |
|-------|-------------|------------|---------|
| Specialties | `specialties` mapped labels | Step 7 onward | Retirement, Tax, Catch-up |
| Marital status | `marital_status` mapped label | Step 8 onward | Married |
| Homeownership | `homeownership` mapped label | Step 9 onward | Owns |
| ZIP | `zip_code` | Step 10 onward | 10001 |

Fields in Group 2 only appear once answered. No placeholders, no "pending" state. If the user expands at Step 7, they see Group 1 + Specialties. At Step 9, they see Group 1 + Specialties + Marital status + Homeownership.

---

## Field Spec

| Element | Spec |
|---------|------|
| Layout | Two-column within the dropdown: label left, value right |
| Label | Regular weight, 13px, muted (#999999) |
| Value | Medium weight, 14px, dark (#1B2A4A) |
| Row height | 28px |
| Alignment | Label left-aligned, value right-aligned |

---

## Label Mappings

### Goal (motivation_driver)

| Value | Displays as |
|-------|-------------|
| `behind_retirement` | Catching up on retirement |
| `family_protection` | Protecting your family |
| `windfall` | Managing new wealth |
| `optimization` | Optimizing your finances |
| `plan_review` | Getting a professional review |

### Objective (investment_objective)

| Value | Displays as |
|-------|-------------|
| `growth` | Long-term growth |
| `preservation` | Wealth preservation |
| `income_generation` | Income generation |
| `balanced` | Balanced growth and safety |

### Specialties

| Value | Displays as |
|-------|-------------|
| `all` | Full-service advisor |
| `not_sure` | Advisor will assess |
| Array of values | Comma-separated short labels |

Short labels for comma display:

| Stored value | Short label |
|-------------|-------------|
| `retirement_planning` | Retirement |
| `tax_strategy` | Tax |
| `estate_planning` | Estate |
| `investment_management` | Investments |
| `catch_up` | Catch-up |
| `insurance_protection` | Insurance |
| `education_funding` | Education |
| `debt_management` | Debt |

### Marital Status

| Value | Displays as |
|-------|-------------|
| `single` | Single |
| `married` | Married |
| `divorced` | Divorced |
| `widowed` | Widowed |
| `prefer_not_to_say` | Not specified |

### Homeownership

| Value | Displays as |
|-------|-------------|
| `own` | Owns |
| `rent` | Rents |
| `other` | Other |

---

## Mobile Treatment

Same behavior on mobile. Dropdown is full-width, same collapsed/expanded pattern. No separate treatment needed since it's already a single-column element.

---

## Behavior Notes

- Collapsed by default on every step. Does not persist expanded state across steps.
- If the user expands, answers the question, and auto-advances, the dropdown resets to collapsed on the next step.
- Read-only. No editing from here. To change an answer, the user uses the back button.
- The dropdown is purely informational. It's for users who want to verify "did it capture everything?" or remind themselves what they said. Most users will never tap it.
- No trust stats in the dropdown. Those live below the options in the reassurance area.

---

## Layout Implications

- Steps 6-12 remain centered single-column. No split layout shift.
- The layout is consistent from Step 2 through Step 12: centered form, same width, same visual rhythm.
- Step 1 is the only split layout in the entire funnel.
