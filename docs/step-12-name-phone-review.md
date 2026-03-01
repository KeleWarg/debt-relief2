# Step 12 — Name + Phone + Financial Profile Review

> **Conditional:** This step is SKIPPED if the user already provided phone in the Step 10 modal.

## Overview

| Property | Value |
|----------|-------|
| Screen name | `NamePhoneWithReviewScreen` |
| Fields | `first_name`, `last_name`, `phone` |
| Type | Text inputs |
| Auto-advance | No — requires "Find My Advisor" |
| Phase label | YOUR ADVISOR MATCH |
| Progress | ~92% |
| Data available | Full profile |
| Special feature | Financial profile review with recommended strategies alongside PII capture |
| Condition | Only shown if `phone` is null |

---

## Layout

Financial profile review card alongside PII capture.

```
┌──────────────────────────────────────────────────────────┐
│  YOUR ADVISOR MATCH                                      │
│  █████████████████████████████████░                      │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  YOUR FINANCIAL PROFILE REVIEW                     │  │
│  │                                                    │  │
│  │  🎯 Goal          Catching up on retirement        │  │
│  │  🎂 Age           50s                              │  │
│  │  💼 Income        $100K–$150K                      │  │
│  │  💰 Savings       $150K–$350K                      │  │
│  │  📊 Objective     Long-term growth                 │  │
│  │  👤 Status        Married                          │  │
│  │  🏠 Home          Homeowner                        │  │
│  │  📍 Location      New York                         │  │
│  │                                                    │  │
│  │  ─────────────────────────────────────────         │  │
│  │                                                    │  │
│  │  RECOMMENDED STRATEGIES                            │  │
│  │                                                    │  │
│  │  [ Catch-Up Contributions ]                        │  │
│  │  Maximize your 401(k) to $30,500/year              │  │
│  │  including catch-up provisions.                    │  │
│  │                                                    │  │
│  │  [ Roth Conversion Window ]                        │  │
│  │  Evaluate converting pre-tax funds before          │  │
│  │  RMDs begin — timing matters.                      │  │
│  │                                                    │  │
│  │  [ Tax-Loss Harvesting ]                           │  │
│  │  Offset gains with strategic losses —              │  │
│  │  especially effective in taxable accounts.         │  │
│  │                                                    │  │
│  │  Your matched advisor will walk through these      │  │
│  │  with you during your first conversation.          │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  Last step — your advisor needs to know                  │
│  who they're meeting with.                               │
│                                                          │
│  [Motivation-specific advisor line]                      │
│                                                          │
│  ┌────────────────────┐ ┌────────────────────┐          │
│  │  First name         │ │  Last name          │          │
│  └────────────────────┘ └────────────────────┘          │
│                                                          │
│  ┌────────────────────────────────────┐                  │
│  │  📞 (___) ___-____                 │                  │
│  └────────────────────────────────────┘                  │
│                                                          │
│  [TCPA consent language if not yet captured]              │
│                                                          │
│              [ Find My Advisor → ]                       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Headline

```
Last step — your advisor needs to know who they're meeting with.
```

---

## Motivation-Specific Advisor Line (above inputs)

| `motivation_driver` | Line |
|---------------------|------|
| `behind_retirement` | Your catch-up specialist will call you within 1-2 business days to walk through your strategy. |
| `family_protection` | Your protection planning advisor will call you within 1-2 business days to review your family's coverage. |
| `windfall` | Your wealth management advisor will call you within 1-2 business days to discuss positioning. |
| `optimization` | Your optimization specialist will call you within 1-2 business days to identify your biggest opportunities. |
| `plan_review` | Your advisor will call you within 1-2 business days to schedule your comprehensive review. |

Same role-naming as Step 11, but adds the "call you within 1-2 business days" expectation since this step captures phone.

---

## Financial Profile Review Card

Identical content to Step 11's review card — same profile summary, same recommended strategies, same closing line. See Step 11 spec for the complete strategy matrix.

---

## Inputs

### Name Fields (side by side)

| Field | Placeholder | Validation |
|-------|-------------|------------|
| First name | `First name` | Required, 1+ characters |
| Last name | `Last name` | Required, 1+ characters |

### Phone Field

| Field | Placeholder | Validation |
|-------|-------------|------------|
| Phone | `(___) ___-____` | Required, 10-digit US phone |

- Standard US phone mask
- Numeric only
- Auto-focus on first name field on load

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

---

## CTA

```
Find My Advisor →
```

The only non-"Continue" button in the funnel. Names the outcome.

---

## Conditional Paths

```
Step 10 modal provided phone + email
  → This step is SKIPPED entirely
  → User goes directly to Screen B

Step 10 modal provided email only
  → This step shows (need name + phone)
  → Email field not shown

Step 10 modal provided phone only
  → Step 11 shows (need email)
  → This step shows for name only (phone pre-filled, editable)

Step 10 modal skipped
  → Step 11 shows (need email)
  → This step shows (need name + phone)
```

---

## Behavior

1. Financial profile review card visible — full data + strategies
2. User enters name and phone
3. Taps "Find My Advisor"
4. Validates all fields
5. Submits lead → transitions to Screen B

## What Gets Stored

```javascript
{
  // ...all previous fields...
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
- Strategy recommendations describe categories, not specific advice
- Dollar amounts in strategy descriptions are general knowledge (IRS limits, etc.)
