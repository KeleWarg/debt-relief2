# Step 12 — Name + Phone

> **Conditional:** This step is SKIPPED if the user already provided phone in the Step 10 modal.

## Overview

| Property | Value |
|----------|-------|
| Screen name | `NamePhoneScreen` |
| Fields | `first_name`, `last_name`, `phone` |
| Type | Text inputs |
| Auto-advance | No. Requires "Find My Advisor" |
| Phase label | FINDING YOUR MATCH |
| Progress | ~92% |
| Data available | Full profile |
| Layout | Centered single-column with profile dropdown (see **profile-dropdown.md**) |
| Preceded by | Step 11 (email) or Loader — Finding Your Match if Step 11 was skipped |
| Special feature | "What we heard" summary + match count alongside PII capture |
| Condition | Only shown if `phone` is null |

---

## Layout

Final step before Screen B. Confidence builders and security trust reinforce the value exchange. "Find My Advisor" is the only non-Continue CTA in the funnel.

```
FINDING YOUR MATCH
=================================--

  Your Profile                            v

  [checkmark] [Email confirmation]

  ------------------------------------

  Last step. Your advisor match
  is ready.

  Just need your name and number so your
  advisor knows who they're reaching out to.

  [Motivation-specific advisor line]

  +------------+  +------------+
  |  First name |  |  Last name  |
  +------------+  +------------+

  +------------------------+
  |  (___) ___-____        |
  +------------------------+

  [TCPA consent if not yet captured]

  Here's what we heard from you:

  [check] You want to catch up on retirement
  [check] You're in New York
  [check] You prefer a phone consultation
  [check] You're in your 50s
  [check] You own your home

  Based on this, we've found 5 advisors
  who specialize in retirement catch-up
  planning.

        [ Find My Advisor -> ]

  [lock] 256-Bit Encrypted • Never Sold or Shared
```

---

## Zone 1: Confirmation

Bridges from email (Step 11) to name + phone. If Step 11 was skipped, bridges from Step 10 modal.

### Confirmation (universal)

```
Email confirmed. One last thing and we'll find your match.
```

If email was pre-filled from Screen A and Step 11 was skipped:

```
Email on file. One last thing and we'll find your match.
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

## Zone 2: Headline + Review + Inputs

### Emotional Headline

```
Last step. Your advisor match is ready.
```

- **"Last step."** -- Dark (#1B2A4A), serif/display font, 24px
- **"Your advisor match is ready."** -- Forbes blue (#0066CC), same font and size

"Last step" closes the funnel. "Your advisor match is ready" puts the reward right there. Same framing as Remedy's "Your personalized plan is ready on the next page."

### Sub Copy

```
Just need your name and number so your advisor knows who they're reaching out to.
```

| Element | Spec |
|---------|------|
| Style | Regular weight, 15px, muted (#666666) |
| Spacing | 8px below headline, 16px above review card |

One sentence. Explains why. No friction.

---

## Motivation-Specific Advisor Line

Below the review card, above inputs. Adds the call expectation since this step captures phone.

| `motivation_driver` | Line |
|---------------------|------|
| `behind_retirement` | Your catch-up specialist will call you within 1-2 business days to walk through your strategy. |
| `family_protection` | Your protection planning advisor will call you within 1-2 business days to review your family's coverage. |
| `windfall` | Your wealth management advisor will call you within 1-2 business days to discuss positioning. |
| `optimization` | Your optimization specialist will call you within 1-2 business days to identify your biggest opportunities. |
| `plan_review` | Your advisor will call you within 1-2 business days to schedule your comprehensive review. |

| Element | Spec |
|---------|------|
| Style | Regular weight, 14px, muted (#666666) |
| Spacing | 16px above, 16px below |

---

## Inputs

### Name Fields (side by side)

| Field | Placeholder | Validation |
|-------|-------------|------------|
| First name | First name | Required, 1+ characters |
| Last name | Last name | Required, 1+ characters |

| Element | Spec |
|---------|------|
| Layout | Two columns, equal width, 12px gap |
| Height | 48px each |
| Border | 1px solid #E0E0E0, 8px border radius |
| Auto-focus | First name field on load |

### Phone Field

| Field | Placeholder | Validation |
|-------|-------------|------------|
| Phone | (___) ___-____ | Required, 10-digit US phone |

| Element | Spec |
|---------|------|
| Height | 48px |
| Border | 1px solid #E0E0E0, 8px border radius |
| Mask | US phone format, numeric only |
| Spacing | 12px below name fields |

### Conditional Phone Display

| Condition | Phone field |
|-----------|-------------|
| Phone not yet captured | Empty, required |
| Phone captured in Step 10 modal | Pre-filled, editable, not required |

If phone was captured in Step 10, this step only needs name. But the phone field still appears (pre-filled) so the user can verify.

---

## TCPA Consent

If TCPA was NOT captured in Step 10 modal:

```
By clicking "Find My Advisor," you agree to be contacted by a
financial advisor from our network at the number and email you've
provided. You may receive calls, texts, or emails related to your
advisor match. Consent is not required to use this service.
Message and data rates may apply. [Terms] [Privacy Policy]
```

If TCPA was already captured:

```
You've already agreed to be contacted. We'll share your profile
with your matched advisor.
```

| Element | Spec |
|---------|------|
| Style | Regular weight, 12px, muted (#999999) |
| Spacing | 16px above "What We Heard" section |

---

## What We Heard

Same pattern as Step 11. Reflects the user's answers back with match count. See Step 11 spec for the complete field mappings, bullet templates, and match line logic.

If the user already saw this on Step 11, it still appears here. Reinforces the value exchange at the final ask.

---

## CTA

```
Find My Advisor ->
```

The only non-"Continue" CTA in the funnel. Names the outcome.

| Element | Spec |
|---------|------|
| Style | Full-width, Forbes blue (#0066CC), white text, 16px medium weight |
| Height | 52px |
| Border radius | 8px |
| Spacing | 16px above |
| Enabled | When all required fields are valid |

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

## Conditional Paths

```
Step 10 modal provided phone + email
  -> This step is SKIPPED entirely
  -> User goes directly to Screen B

Step 10 modal provided email only
  -> This step shows (need name + phone)
  -> Email field not shown

Step 10 modal provided phone only
  -> Step 11 shows (need email)
  -> This step shows for name only (phone pre-filled, editable)

Step 10 modal skipped
  -> Step 11 shows (need email)
  -> This step shows (need name + phone)
```

---

## Behavior

1. Two-zone layout loads with confirmation
2. User enters name and phone
3. "What we heard" summary reflects their answers back with match count
4. Taps "Find My Advisor"
5. Validates all fields
6. Submits lead
7. Transitions to Screen B

---

## What Gets Stored

```javascript
{
  first_name: "Jane",
  last_name: "Smith",
  phone: "2125551234",
  tcpa_consent: true,
  tcpa_consent_timestamp: "2026-03-01T12:34:56Z"
}
```

---

## Compliance Notes

- TCPA consent must be captured before any phone number is used for outreach
- If phone was captured in Step 10 with TCPA, do not double-capture
- "Find My Advisor" constitutes the consent action if TCPA text is displayed
- Legal must approve final TCPA language
