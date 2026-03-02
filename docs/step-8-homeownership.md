# Step 8 — Homeownership

## Overview

| Property | Value |
|----------|-------|
| Screen name | `HomeownershipScreen` |
| Field | `homeownership` |
| Type | Single-select, auto-advance |
| Auto-advance | Yes, 400ms |
| Phase label | YOUR LIFE SITUATION |
| Progress | ~65% |
| Data available | All profile + specialties + marital status |
| Layout | Centered single-column with profile dropdown (see **profile-dropdown.md**) |

---

## Layout

Centered single-column. Profile dropdown above the confirmation zone now includes Specialties and Marital status in Group 2. Form uses marital_status x motivation confirmation to bridge meaningfully to the homeownership question.

```
YOUR LIFE SITUATION
======================---

  Your Profile                            v

  [checkmark] Married. Joint home equity
  can be one of the biggest catch-up
  tools available to couples.

  ------------------------------------

  It's not about the house.
  It's about what it unlocks
  in your plan.

  Do you own your home?

  A  Yes, I own
  B  No, I rent
  C  Other

  [Reassurance]
```

---

## Zone 1: Confirmation

Bridges from marital status (Step 7) to homeownership. Uses the marital_status value they just provided combined with their motivation to create a meaningful connection. This is the pattern: every confirmation reflects back what the user told us and connects it to why it matters.

### Confirmation Matrix (marital_status x motivation_driver)

Each confirmation bridges FROM the marital status answer TO why homeownership matters next, through the lens of their motivation.

#### Married

| `motivation_driver` | Confirmation |
|---------------------|--------------|
| `behind_retirement` | Married. Joint home equity can be one of the biggest catch-up tools available to couples. |
| `family_protection` | Married. If you own together, your advisor will need to know for mortgage protection and titling. |
| `windfall` | Married. Whether you own jointly affects how new wealth fits alongside existing property. |
| `optimization` | Married. Joint property ownership opens up deduction strategies your advisor can layer in. |
| `plan_review` | Married. Your advisor will want to see how property fits into the picture for both of you. |

#### Single

| `motivation_driver` | Confirmation |
|---------------------|--------------|
| `behind_retirement` | Single. If you own, that equity could be a meaningful part of your catch-up plan. |
| `family_protection` | Single. Whether you own affects how your advisor structures coverage for dependents. |
| `windfall` | Single. No co-owner simplifies things. Your advisor will want to know if property is in the mix. |
| `optimization` | Single. Property tax and mortgage interest are some of the biggest deduction levers for solo filers. |
| `plan_review` | Single. Your advisor will want to see whether property is part of the overall picture. |

#### Divorced

| `motivation_driver` | Confirmation |
|---------------------|--------------|
| `behind_retirement` | Divorced. If property was part of the settlement, it changes your catch-up math. |
| `family_protection` | Divorced. Whether you kept the home affects what your advisor needs to protect. |
| `windfall` | Divorced. Property from a settlement and new wealth need to be structured carefully together. |
| `optimization` | Divorced. If your housing situation changed, so did your deduction landscape. |
| `plan_review` | Divorced. Your housing situation may have changed. Your advisor will factor that in. |

#### Widowed

| `motivation_driver` | Confirmation |
|---------------------|--------------|
| `behind_retirement` | Widowed. If you inherited the home, that equity changes your catch-up options. |
| `family_protection` | Widowed. Whether the home transferred to you affects your protection plan going forward. |
| `windfall` | Widowed. Inherited property alongside new wealth needs careful structuring. |
| `optimization` | Widowed. Inherited property comes with a stepped-up basis your advisor can use. |
| `plan_review` | Widowed. Your advisor will want to know if the home is still part of your financial picture. |

#### Prefer Not to Say

Universal across all motivations:

```
No problem. Your advisor will cover the details in your first conversation.
```

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
It's not about the house.
It's about what it unlocks in your plan.
```

- **"It's not about the house."** -- Dark (#1B2A4A), serif/display font, 24px
- **"It's about what it unlocks in your plan."** -- Forbes blue (#0066CC), same font and size

Addresses: "I don't own and I feel behind" and "What does my house have to do with financial planning?" Reframes homeownership as a strategic input, not a judgment.

### Instruction

```
Do you own your home?
```

| Element | Spec |
|---------|------|
| Style | Regular weight, 15px, muted (#666666) |
| Spacing | 8px below headline, 16px above options |

---

## Options

Single-column list with letter indicators.

| Letter | Label | Stores as |
|--------|-------|-----------|
| A | Yes, I own | `own` |
| B | No, I rent | `rent` |
| C | Other | `other` |

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

Below the options. Explains why homeownership matters for their goal.

| `motivation_driver` | Reassurance |
|---------------------|-------------|
| `behind_retirement` | Home equity is often overlooked in catch-up planning. It can be a significant lever. |
| `family_protection` | Homeownership changes the scope of protection: mortgage coverage, property trusts, insurance. |
| `windfall` | Whether you own or rent affects how your advisor positions new wealth. |
| `optimization` | Mortgage interest, property tax deductions, home equity lines. Your advisor needs to know. |
| `plan_review` | Home equity is one of the first things an advisor looks at during a review. |

| Element | Spec |
|---------|------|
| Style | Regular weight, 14px, muted (#666666) |
| Spacing | 16px above |

---

## Behavior

1. Two-zone layout loads with marital_status x motivation confirmation
2. User taps option
3. Option highlights with blue border
4. After 400ms, auto-advances to Step 9
5. "Homeownership" field becomes available in profile dropdown Group 2

---

## What Gets Stored

```javascript
{
  homeownership: "own"
}
```

---

## Notes

- The confirmation matrix (20 variants + 1 universal) is the key feature. Each one reflects back what the user just told us, connects it to homeownership, and frames it through their motivation. This earns the next question.
- Three options only. "Other" covers ambiguity (living with family, in transition, etc.).
- The headline is shorter than Steps 2-5 but still addresses a real hesitation. Renters don't feel judged. Owners understand why it matters.
