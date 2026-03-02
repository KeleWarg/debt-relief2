# Step 6 — Specialties

## Overview

| Property | Value |
|----------|-------|
| Screen name | `SpecialtiesScreen` |
| Field | `specialties` |
| Type | Two primary single-select options + secondary multi-select |
| Auto-advance | "Everything" and "Not sure" auto-advance; multi-select requires Continue |
| Phase label | YOUR ADVISOR MATCH |
| Progress | ~55% |
| Data available | `motivation_driver` + `age_range` + `income_range` + `savings_range` + `investment_objective` |
| Layout | Centered single-column with profile dropdown (see **profile-dropdown.md**) |
| Special feature | 2-3 options tagged RECOMMENDED in the multi-select |

---

## Layout

Centered single-column, same as Steps 2-5. A collapsible profile dropdown appears above the confirmation zone (see **profile-dropdown.md**). This is the first step where the dropdown is available. At this point it shows only Group 1 (financial profile: Goal, Age, Income, Savings, Objective). Group 2 fields appear as the user answers Steps 7-9.

```
YOUR ADVISOR MATCH
==================---

  Your Profile                            v

  [checkmark] Your growth horizon is set.
  Now let's match you with the right expertise.

  ------------------------------------

  You don't have to know exactly
  what you need. That's what the
  first conversation is for.

  What would you like help with?

  A  Everything
     Match me with a full-service advisor
  B  Not sure yet
     Help me figure it out

  -- Or select specific areas --

  [ ] Retirement planning         REC
  [ ] Tax strategy                REC
  [ ] Estate & legacy planning
  [ ] Investment management
  [ ] Catch-up strategies         REC
  [ ] Insurance & protection
  [ ] Education funding
  [ ] Debt management

  [Reassurance]

  You're not locked in. Your advisor
  will refine this with you.

             [ Continue -> ]
```

---

## Zone 1: Confirmation

Connects Screen A (growth horizon) to specialties selection. Uses the checkmark pattern established in Steps 2-5.

### Confirmation Variants

| `motivation_driver` | Confirmation |
|---------------------|--------------|
| `behind_retirement` | Your growth horizon is set. Now let's match you with the right expertise. |
| `family_protection` | Your growth horizon is set. Now let's match you with the right protection. |
| `windfall` | Your growth horizon is set. Now let's find the right expertise for your new wealth. |
| `optimization` | Your growth horizon is set. Now let's find the right optimization mix. |
| `plan_review` | Your growth horizon is set. Now let's make sure your reviewer covers everything. |

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
You don't have to know exactly what you need.
That's what the first conversation is for.
```

- **"You don't have to know exactly what you need."** -- Dark (#1B2A4A), serif/display font, 24px
- **"That's what the first conversation is for."** -- Forbes blue (#0066CC), same font and size

Addresses: "I'm not an expert, what if I pick wrong?"

### Instruction

```
What would you like help with?
```

| Element | Spec |
|---------|------|
| Style | Regular weight, 15px, muted (#666666) |
| Spacing | 8px below headline, 16px above options |

---

## Primary Options

Two larger cards with letter indicator + title + description. These are single-select quick exits.

| Letter | Label | Description | Stores as |
|--------|-------|-------------|-----------|
| A | Everything | Match me with a full-service advisor | `all` |
| B | Not sure yet | Help me figure it out | `not_sure` |

### Primary Card Spec

| Element | Spec |
|---------|------|
| Row height | 72px |
| Border | 1px solid #E8E8E8, 8px border radius |
| Letter indicator | Circle, 28px, light grey background, centered letter |
| Title | Medium weight, 16px, dark (#1B2A4A) |
| Description | Regular weight, 14px, muted (#999999) |
| Spacing | 12px between cards |
| Hover | Light blue background (#F0F7FF) |
| Selected | Forbes blue border (#0066CC), light blue fill |

### Primary Option Behavior

| Action | Result |
|--------|--------|
| Tap "Everything" | Blue border, auto-advance after 400ms |
| Tap "Not sure yet" | Blue border, auto-advance after 400ms |

- Stores `specialties: ["all"]` or `specialties: ["not_sure"]`
- Both functionally tell the matching engine: no specialty filter

---

## Section Divider

```
Or select specific areas
```

| Element | Spec |
|---------|------|
| Text | Regular weight, 13px, muted (#999999) |
| Lines | 1px solid #E0E0E0 on both sides of text |
| Spacing | 20px above and below |

---

## Secondary Options (Multi-Select)

Stacked full-width rows with checkboxes. 2-3 options tagged RECOMMENDED (not pre-checked, tags are guidance only).

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

### Multi-Select Row Spec

| Element | Spec |
|---------|------|
| Row height | 52px |
| Border | 1px solid #E8E8E8, 8px border radius |
| Checkbox | 20px, unchecked default, Forbes blue when checked |
| Label | Regular weight, 15px, dark (#1B2A4A) |
| RECOMMENDED badge | Same pill as Step 5: light blue (#E8F0FE), small caps, 11px, right-aligned |
| Spacing | 10px between rows |
| Hover | Light blue background (#F0F7FF) |
| Selected | Forbes blue border (#0066CC), light blue fill, checkbox filled |

### Interaction with Primary Options

- If the user checks any specific option, the two primary options deselect (mutually exclusive)
- If the user taps a primary option after checking specifics, the specifics clear
- Continue button appears once at least one specific is checked

---

## Recommended Tags

Same pill treatment as Step 5. Right-aligned within the row, subtle.

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

## Advisor Reassurance (Motivation-Specific)

Below the multi-select options. Explains why these specialties matter for their goal.

| `motivation_driver` | Reassurance |
|---------------------|-------------|
| `behind_retirement` | Most people catching up benefit from retirement planning, tax strategy, and catch-up expertise working together. |
| `family_protection` | Protection planning often involves insurance, estate documents, and education funding working together. |
| `windfall` | New wealth typically requires tax strategy, investment management, and asset protection as a starting point. |
| `optimization` | Optimization touches tax strategy, investment management, and fee reduction. Most people benefit from all three. |
| `plan_review` | A good review covers retirement readiness, tax strategy, and whatever else surfaces. Cast a wide net. |

| Element | Spec |
|---------|------|
| Style | Regular weight, 14px, muted (#666666) |
| Spacing | 16px above, 8px below |

## Static Reassurance

Below the motivation-specific line.

```
You're not locked in. Your advisor will refine this with you.
```

| Element | Spec |
|---------|------|
| Style | Regular weight, 13px, muted (#999999) |

---

## Continue CTA

```
Continue ->
```

Only visible when at least one specific option is checked. Hidden when primary options are available (they auto-advance).

Full-width button, Forbes blue (#0066CC), white text, same spec as other screens.

---

## Behavior Summary

| Action | Result |
|--------|--------|
| Tap "Everything" | Blue border, auto-advance after 400ms |
| Tap "Not sure yet" | Blue border, auto-advance after 400ms |
| Check any specific option | Primary options deselect, Continue appears |
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
  specialties_modified: false // true if user unchecked a RECOMMENDED option
}
```

---

## Profile Dropdown Update

After auto-advance or Continue, the "Specialties" field becomes available in the profile dropdown Group 2 on the next step.

---

## Compliance Notes

- RECOMMENDED tags are based on population-level best practices, not personal advice
- "Everything" and "Not sure" are functionally equivalent in the matching engine
- Christine should review whether specialty recommendations need a rationale line (like Step 5) or if the tag alone is sufficient
