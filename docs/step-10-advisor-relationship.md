# Step 10 — Advisor Relationship Preference

## Overview

| Property | Value |
|----------|-------|
| Screen name | `AdvisorRelationshipScreen` |
| Field | `relationship_preference` |
| Type | Single-select cards with recommendation |
| Auto-advance | No. Triggers contact modal after selection |
| Phase label | FINAL DETAILS |
| Progress | ~78% |
| Data available | Full profile + specialties + life situation + ZIP |
| Layout | Centered single-column with profile dropdown (see **profile-dropdown.md**) |
| Special feature | Recommended option + contact preference modal |

---

## Layout

New section label (FINAL DETAILS). Profile dropdown fully populated. Confirmation bridges from the complete life situation section. Two-zone on the right.

```
FINAL DETAILS
==========================---

  Your Profile                            v

  [checkmark] [ZIP-specific confirmation]

  ------------------------------------

  You're in control of how this starts.
  Your advisor works on your terms.

  How would you like to work with
  your advisor?

  A  Talk to an advisor            REC
     Schedule a call or get matched
     for a consultation
  B  Online / virtual only
     Video calls and digital tools
  C  Meet in person
     Face-to-face at a local office
  D  No preference
     Match me with the best advisor
     regardless of format

  [Reassurance]
```

---

## Zone 1: Confirmation

Bridges from Step 9 (ZIP + state confirmation) to advisor relationship. The state was just confirmed visually, so this leans forward into the match.

### Confirmation Variants

| `motivation_driver` | Confirmation |
|---------------------|--------------|
| `behind_retirement` | Advisors confirmed in [State]. Now let's set up how you'll connect with your catch-up specialist. |
| `family_protection` | Advisors confirmed in [State]. Now let's set up how you'll connect with your protection advisor. |
| `windfall` | Advisors confirmed in [State]. Now let's set up how you'll connect with your wealth advisor. |
| `optimization` | Advisors confirmed in [State]. Now let's set up how you'll connect with your optimization specialist. |
| `plan_review` | Advisors confirmed in [State]. Now let's set up how you'll connect with your reviewer. |

`[State]` is the full state name derived from `zip_code`.

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
You're in control of how this starts.
Your advisor works on your terms.
```

- **"You're in control of how this starts."** -- Dark (#1B2A4A), serif/display font, 24px
- **"Your advisor works on your terms."** -- Forbes blue (#0066CC), same font and size

Addresses: "Am I going to get cold-called?" and "Will I be pressured?" Reframes the relationship as user-directed.

### Instruction

```
How would you like to work with your advisor?
```

| Element | Spec |
|---------|------|
| Style | Regular weight, 15px, muted (#666666) |
| Spacing | 8px below headline, 16px above options |

---

## Options

Letter indicators, no emojis. Larger cards with title + description. "Talk to an advisor" tagged RECOMMENDED.

| Letter | Label | Description | Stores as | Tag |
|--------|-------|-------------|-----------|-----|
| A | Talk to an advisor | Schedule a call or get matched for a consultation | `phone_consultation` | RECOMMENDED |
| B | Online / virtual only | Video calls and digital tools | `virtual` | |
| C | Meet in person | Face-to-face at a local office | `in_person` | |
| D | No preference | Match me with the best advisor regardless of format | `no_preference` | |

### Option Card Spec

| Element | Spec |
|---------|------|
| Row height | 72px |
| Border | 1px solid #E8E8E8, 8px border radius |
| Letter indicator | Circle, 28px, light grey background, centered letter |
| Title | Medium weight, 16px, dark (#1B2A4A) |
| Description | Regular weight, 14px, muted (#999999) |
| RECOMMENDED badge | Same pill as Steps 5-6: light blue (#E8F0FE), small caps, 11px, right-aligned |
| Spacing | 12px between cards |
| Hover | Light blue background (#F0F7FF) |
| Selected | Forbes blue border (#0066CC), light blue fill |

---

## Recommended Tag

"Talk to an advisor" is always tagged RECOMMENDED. Phone consultations have the highest conversion to actual advisor relationships.

---

## Advisor Reassurance (Motivation-Specific)

Below the options.

| `motivation_driver` | Reassurance |
|---------------------|-------------|
| `behind_retirement` | Catch-up planning works best with a dedicated advisor you can check in with regularly. |
| `family_protection` | Protection planning involves sensitive decisions. Choose whatever format feels most comfortable for your family. |
| `windfall` | The first conversation about new wealth is important. Pick whatever format lets you be the most open. |
| `optimization` | Optimization is hands-on. Regular check-ins with your advisor keep the strategy current. |
| `plan_review` | A review works in any format. Pick whatever fits your schedule. |

| Element | Spec |
|---------|------|
| Style | Regular weight, 14px, muted (#666666) |
| Spacing | 16px above |

---

## Behavior — Contact Modal

After the user selects their preference, a bottom sheet modal slides up to collect contact information.

### Modal Layout

```
  Almost done. How should your
  advisor reach you?

  Phone (fastest way to connect)
  +------------------------+
  |  (___) ___-____        |
  +------------------------+

  Email
  +------------------------+
  |  your@email.com        |  [pre-filled if saved]
  +------------------------+

  [TCPA consent language]

           [ Continue -> ]

      [ Skip for now ]
```

### Modal Spec

| Element | Spec |
|---------|------|
| Background | White |
| Border radius | 16px top corners |
| Animation | Slides up from bottom, 300ms ease-out |
| Overlay | Semi-transparent dark (#00000040) behind modal |
| Max width | 480px, centered |
| Padding | 24px |

### Modal Headline

```
Almost done. How should your advisor reach you?
```

| Element | Spec |
|---------|------|
| Style | Medium weight, 20px, dark (#1B2A4A) |

### Phone Input

| Element | Spec |
|---------|------|
| Label | "Phone (fastest way to connect)", 14px, muted |
| Placeholder | (___) ___-____ |
| Mask | US phone format, numeric only |
| Height | 48px |

### Email Input

| Element | Spec |
|---------|------|
| Label | "Email", 14px, muted |
| Placeholder | your@email.com |
| Pre-fill | If user saved email on Screen A, pre-filled and editable |
| Height | 48px |

### Pre-fill Logic

| Condition | Email field |
|-----------|-------------|
| User saved email on Screen A | Pre-filled, editable |
| User did NOT save on Screen A | Empty, with placeholder |

### TCPA Consent

```
By continuing, you agree to be contacted by a financial advisor
from our network at the number and/or email you provide. You may
receive calls, texts, or emails related to your advisor match.
Consent is not required to use this service. Message and data
rates may apply. [Terms] [Privacy Policy]
```

Legal must review and approve final language.

| Element | Spec |
|---------|------|
| Style | Regular weight, 12px, muted (#999999) |
| Spacing | 16px above CTA |

### Modal CTAs

**Continue** -- Full-width, Forbes blue, white text. Enabled when at least one field is filled.

**Skip for now** -- Text link below CTA. 14px, muted (#666666). Closes modal and continues.

### Skip Path

If the user skips:
- No phone or email captured at this point
- Steps 11 and 12 will ask for this information individually

If the user provides info:
- Corresponding later steps are skipped

---

## Conditional Flow After Modal

```
Modal: email + phone provided  ->  Skip 11 + 12  ->  Screen B
Modal: email only              ->  Skip 11        ->  Step 12 (name + phone)
Modal: phone only              ->  Step 11 (email) ->  Step 12 (name only)
Modal: skipped                 ->  Step 11 (email) ->  Step 12 (name + phone)
```

---

## What Gets Stored

```javascript
{
  relationship_preference: "phone_consultation",
  phone: "2125551234",        // if provided in modal
  email: "user@email.com",    // if provided in modal
  tcpa_consent: true,         // if Continue tapped with info
  tcpa_consent_timestamp: "2026-03-01T12:34:56Z"
}
```

---

## Notes

- Emojis stripped. Letter indicators A-D match the rest of the system.
- The emotional headline preempts the biggest fear at this point: "Am I signing up to be harassed?"
- Contact modal is the early capture opportunity. If they fill both fields, the funnel jumps straight to Screen B. If they skip, Steps 11-12 catch what's missing.
- Em dashes removed from all copy.
