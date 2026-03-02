# Step 9 — ZIP Code

## Overview

| Property | Value |
|----------|-------|
| Screen name | `ZipCodeScreen` |
| Field | `zip_code` |
| Type | Text input (5-digit numeric) |
| Auto-advance | No. Requires Continue |
| Phase label | YOUR LIFE SITUATION |
| Progress | ~70% |
| Data available | All profile + specialties + marital + homeownership |
| Layout | Centered single-column with profile dropdown (see **profile-dropdown.md**) |

---

## Layout

Last of the three quick questions (7-8-9). Fast. Homeownership x motivation confirmation bridges forward. Headline frames ZIP as checking availability, not collecting data.

```
YOUR LIFE SITUATION
========================----

  Your Profile                            v

  [checkmark] You own. Your advisor can
  factor home equity into the catch-up
  math from day one.

  ------------------------------------

  Let's check advisor availability
  in your area.

  +------------------------+
  |  ZIP code              |
  +------------------------+

  [Reassurance]

           [ Continue -> ]
```

---

## Zone 1: Confirmation

Bridges from homeownership (Step 8) to location through motivation.

### Confirmation Matrix (homeownership x motivation_driver)

#### Owns

| `motivation_driver` | Confirmation |
|---------------------|--------------|
| `behind_retirement` | You own. Your advisor can factor home equity into the catch-up math from day one. |
| `family_protection` | You own. That means mortgage protection, property trusts, and insurance are all in play. |
| `windfall` | You own. Your advisor will position new wealth alongside existing property. |
| `optimization` | You own. Mortgage interest and property tax deductions are already working for you. |
| `plan_review` | You own. Your advisor will include home equity in the full picture. |

#### Rents

| `motivation_driver` | Confirmation |
|---------------------|--------------|
| `behind_retirement` | You rent. That frees up more cash flow for catch-up contributions. Your advisor will use that. |
| `family_protection` | You rent. Your advisor can focus protection around income and dependents without mortgage complexity. |
| `windfall` | You rent. Your advisor can focus entirely on positioning your new wealth. |
| `optimization` | You rent. Your advisor will look at where your money is working hardest without a mortgage in the mix. |
| `plan_review` | You rent. That simplifies part of the review. Your advisor will focus on where your assets are. |

#### Other

Universal across all motivations:

```
Noted. Your advisor will sort out the housing picture in your first conversation.
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

## Zone 2: Headline + Input

### Headline

```
Let's check advisor availability in your area.
```

- **"Let's check advisor availability"** -- Dark (#1B2A4A), serif/display font, 24px
- **"in your area."** -- Forbes blue (#0066CC), same font and size

Frames ZIP as unlocking access, not filling a form field. Same framing as Remedy's "Let's do a quick check on GLP-1 availability in your neighborhood."

---

## Input

| Element | Spec |
|---------|------|
| Placeholder | "ZIP code" |
| Type | Numeric, 5-digit max |
| Input mask | Numbers only, max 5 characters |
| Height | 48px |
| Border | 1px solid #E0E0E0, 8px border radius |
| Auto-focus | Yes. Keyboard appears on mobile on load |
| Validation | Must be valid US ZIP format. Validated on Continue |
| Error state | Red border, "Please enter a valid ZIP code" below input |
| Spacing | 16px below headline |

---

## Advisor Reassurance (Motivation-Specific)

Below the input.

| `motivation_driver` | Reassurance |
|---------------------|-------------|
| `behind_retirement` | State tax rules affect your catch-up strategy. Your location helps us match smarter. |
| `family_protection` | Estate and insurance laws vary by state. Your location ensures we match you with a licensed advisor. |
| `windfall` | State tax rules can significantly impact how new wealth is positioned. Your ZIP helps us account for that. |
| `optimization` | State tax rules affect your optimization strategy. Your ZIP helps us find the right fit. |
| `plan_review` | This ensures your advisor is licensed in your state and easy to reach when you need them. |

| Element | Spec |
|---------|------|
| Style | Regular weight, 14px, muted (#666666) |
| Spacing | 16px above |

---

## Continue CTA

```
Continue ->
```

Enabled when input has 5 digits. Full-width button, Forbes blue (#0066CC), white text.

---

## Behavior

1. Two-zone layout loads with homeownership x motivation confirmation
2. Input auto-focused, keyboard appears on mobile
3. User types ZIP
4. Continue enabled at 5 digits
5. Validates on tap. If valid, transitions to State Confirmation screen
6. If invalid, shows error state
7. "ZIP" field becomes available in profile dropdown Group 2

---

## What Gets Stored

```javascript
{
  zip_code: "10001",
  derived_state: "NY"
}
```

---

## Notes

- Last of the three-question speed sequence (Steps 7-9). Keeps the same fast rhythm.
- "Let's check advisor availability" is borrowed from Remedy's framing. It positions the input as a check, not a data collection step. The user is unlocking something.
- The state confirmation screen that follows is the payoff. Same pattern as Step 1 -> Affirmation, Steps 2-5 -> Screen A.
