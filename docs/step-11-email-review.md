# Step 11 — Email

> **Conditional:** This step is SKIPPED if the user already provided email in the Step 10 modal.

## Overview

| Property | Value |
|----------|-------|
| Screen name | `EmailScreen` |
| Field | `email` |
| Type | Text input (email) |
| Auto-advance | No. Requires Continue |
| Phase label | FINAL DETAILS |
| Progress | ~85% |
| Data available | Full profile |
| Layout | Centered single-column with profile dropdown (see **profile-dropdown.md**) |
| Special feature | Confidence builders + security trust alongside email capture |
| Condition | Only shown if `email` is null |

---

## Layout

Profile data lives in the dropdown. Confidence builders and security trust sit between the email input and CTA.

```
FINAL DETAILS
==============================--

  Your Profile                            v

  [checkmark] [Relationship confirmation]

  ------------------------------------

  We're almost ready to match you.
  Where should we send your
  advisor details?

  [Motivation-specific advisor line]

  +------------------------+
  |  your@email.com        |
  +------------------------+

  We'll send your match details and
  profile summary to this email.

  [check] Your profile qualifies for a
          free consultation
  [check] Advisors in New York are
          accepting new clients
  [check] Average first call is scheduled
          within 48 hours

           [ Continue -> ]

  [lock] 256-Bit Encrypted • Never Sold or Shared
```

---

## Zone 1: Confirmation

Bridges from Step 10 (advisor relationship) to email capture.

### Confirmation Variants (relationship_preference x motivation_driver)

#### Phone consultation

| `motivation_driver` | Confirmation |
|---------------------|--------------|
| `behind_retirement` | Phone consultation. Your catch-up specialist will call to walk through your strategy. |
| `family_protection` | Phone consultation. Your protection advisor will call to review your family's coverage. |
| `windfall` | Phone consultation. Your wealth advisor will call to discuss positioning. |
| `optimization` | Phone consultation. Your optimization specialist will call to identify your biggest opportunities. |
| `plan_review` | Phone consultation. Your advisor will call to schedule your comprehensive review. |

#### Virtual

| `motivation_driver` | Confirmation |
|---------------------|--------------|
| `behind_retirement` | Virtual meetings. Your advisor will set up video calls to work through your catch-up plan. |
| `family_protection` | Virtual meetings. Your advisor will connect with you online to review your protection plan. |
| `windfall` | Virtual meetings. Your advisor will set up video calls to discuss your new wealth strategy. |
| `optimization` | Virtual meetings. Your advisor will connect with you online to review your optimization opportunities. |
| `plan_review` | Virtual meetings. Your advisor will set up video calls for your comprehensive review. |

#### In person

| `motivation_driver` | Confirmation |
|---------------------|--------------|
| `behind_retirement` | In person. We'll match you with a catch-up specialist you can meet face-to-face near [State]. |
| `family_protection` | In person. We'll match you with a protection advisor you can meet face-to-face near [State]. |
| `windfall` | In person. We'll match you with a wealth advisor you can meet face-to-face near [State]. |
| `optimization` | In person. We'll match you with an optimization specialist near [State]. |
| `plan_review` | In person. We'll match you with an advisor near [State] for your face-to-face review. |

#### No preference

Universal across all motivations:

```
No preference on format. We'll match you with the best advisor for your situation.
```

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

## Zone 2: Headline + Review + Email

### Emotional Headline

```
We're almost ready to match you.
Where should we send your advisor details?
```

- **"We're almost ready to match you."** -- Dark (#1B2A4A), serif/display font, 24px
- **"Where should we send your advisor details?"** -- Forbes blue (#0066CC), same font and size

Direct ask. The reward (advisor details) is the reason to give the email.

---

## Motivation-Specific Advisor Line

Below the headline.

| `motivation_driver` | Line |
|---------------------|------|
| `behind_retirement` | Your catch-up specialist will reach out to walk through your strategy. |
| `family_protection` | Your protection planning advisor will reach out to review your family's coverage. |
| `windfall` | Your wealth management advisor will reach out to discuss positioning. |
| `optimization` | Your optimization specialist will reach out to identify your biggest opportunities. |
| `plan_review` | Your advisor will reach out to schedule your comprehensive review. |

| Element | Spec |
|---------|------|
| Style | Regular weight, 14px, muted (#666666) |
| Spacing | 8px below headline, 16px above input |

---

## Email Input

| Element | Spec |
|---------|------|
| Placeholder | your@email.com |
| Pre-fill | If user saved email on Screen A, pre-filled and editable |
| Height | 48px |
| Border | 1px solid #E0E0E0, 8px border radius |
| Validation | Standard email format |

### Sub Copy

```
We'll send your match details and profile summary to this email.
```

| Element | Spec |
|---------|------|
| Style | Regular weight, 13px, muted (#999999) |
| Spacing | 8px below input |

---

## Consent

If TCPA wasn't captured on Step 10 modal:

```
By continuing, you agree to be contacted by a financial advisor
from our network at the email you provide. [Terms] [Privacy Policy]
```

If TCPA was already captured:

No additional consent needed. Sub copy above is sufficient.

---

## Confidence Builders

Above the CTA. Green checkmarks.

```
[check] Your profile qualifies for a free consultation
[check] Advisors in [State] are accepting new clients
[check] Average first call is scheduled within 48 hours
```

`[State]` is the full state name from `derived_state`.

| Element | Spec |
|---------|------|
| Icon | Green checkmark, 16px |
| Text | Regular weight, 14px, dark (#1B2A4A) |
| Row height | 32px |
| Spacing | 16px above, 16px below |

---

## Continue CTA

```
Continue ->
```

Full-width, Forbes blue, white text. Enabled when email is valid.

### Security Trust Indicator

Below the CTA.

```
[lock] 256-Bit Encrypted  •  Never Sold or Shared
```

| Element | Spec |
|---------|------|
| Icon | Lock icon, 14px, muted (#999999) |
| Text | Regular weight, 12px, muted (#999999) |
| Layout | Centered, inline |
| Spacing | 12px above |

---

## Behavior

1. Two-zone layout loads with relationship x motivation confirmation
2. User enters email (or confirms pre-filled)
3. Confidence builders visible above CTA
4. Taps Continue
5. Advances to Step 12 (if phone not yet provided) or Screen B (if all data collected)

---

## What Gets Stored

```javascript
{
  email: "user@email.com"
}
```

---

## Notes

- Profile data lives in the dropdown, not a review card. The dropdown is available on every step from Step 6 onward.
- Confidence builders do the heavy lifting that the review card used to do. Three green checkmarks build trust right before the CTA.
- Security trust indicator below CTA addresses PII hesitation.
