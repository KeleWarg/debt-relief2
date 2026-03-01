# Step 10 — Advisor Relationship Preference

## Overview

| Property | Value |
|----------|-------|
| Screen name | `AdvisorRelationshipScreen` |
| Field | `relationship_preference` |
| Type | Single-select cards with recommendation |
| Auto-advance | No — triggers contact modal after selection |
| Phase label | YOUR ADVISOR MATCH |
| Progress | ~78% |
| Data available | Full profile + specialties + life situation + ZIP |
| Special feature | Recommended option + contact preference modal |

---

## Layout

Returns to YOUR ADVISOR MATCH section. One option is tagged RECOMMENDED.

```
┌──────────────────────────────────────────────┐
│  YOUR ADVISOR MATCH                           │
│  ██████████████████████████░░░               │
│                                               │
│  How would you like to work with              │
│  your advisor?                                │
│                                               │
│  Based on your profile, we'd recommend        │
│  starting with an initial consultation —      │
│  but this can change after your first call.   │
│                                               │
│  ┌──────────────────────────────────────┐    │
│  │  📞 Talk to an advisor              │    │
│  │  Schedule a call or get matched      │    │
│  │  for a consultation         RECOMMENDED │  │
│  └──────────────────────────────────────┘    │
│  ┌──────────────────────────────────────┐    │
│  │  💻 Online / virtual only            │    │
│  │  Video calls and digital tools       │    │
│  └──────────────────────────────────────┘    │
│  ┌──────────────────────────────────────┐    │
│  │  🏢 Meet in person                   │    │
│  │  Face-to-face at a local office      │    │
│  └──────────────────────────────────────┘    │
│  ┌──────────────────────────────────────┐    │
│  │  🤷 No preference                    │    │
│  │  Match me with the best advisor      │    │
│  │  regardless of format                │    │
│  └──────────────────────────────────────┘    │
│                                               │
│  [Motivation-specific reassurance]            │
│                                               │
└──────────────────────────────────────────────┘
```

---

## Headline

```
How would you like to work with your advisor?
```

## Sub Copy

```
Based on your profile, we'd recommend starting with an initial consultation — but this can change after your first call.
```

---

## Options

| Icon | Label | Description | Stores as |
|------|-------|-------------|-----------|
| 📞 | Talk to an advisor | Schedule a call or get matched for a consultation | `phone_consultation` |
| 💻 | Online / virtual only | Video calls and digital tools | `virtual` |
| 🏢 | Meet in person | Face-to-face at a local office | `in_person` |
| 🤷 | No preference | Match me with the best advisor regardless of format | `no_preference` |

Cards have icon + title + description. Larger than previous single-select cards.

---

## Recommended Tag

"Talk to an advisor" is always tagged RECOMMENDED. Phone consultations have the highest conversion to actual advisor relationships.

---

## Reassurance Line — Personalized (below options)

| `motivation_driver` | Reassurance |
|---------------------|-------------|
| `behind_retirement` | Catch-up planning works best with a dedicated advisor you can check in with regularly. |
| `family_protection` | Protection planning involves sensitive decisions — choose whatever format feels most comfortable for your family. |
| `windfall` | The first conversation about new wealth is important — pick whatever format lets you be the most open. |
| `optimization` | Optimization is hands-on — regular check-ins with your advisor keep the strategy current. |
| `plan_review` | A review works in any format — pick whatever fits your schedule. |

---

## Behavior — Contact Modal

After the user selects their preference, a **bottom sheet modal** slides up to collect contact information.

### Modal Layout

```
┌──────────────────────────────────────────────┐
│                                               │
│  Almost done — how should your                │
│  advisor reach you?                           │
│                                               │
│  📞 Phone (fastest way to connect)            │
│  ┌──────────────────────────────────┐        │
│  │  (___) ___-____                   │        │
│  └──────────────────────────────────┘        │
│                                               │
│  📧 Email                                     │
│  ┌──────────────────────────────────┐        │
│  │  your@email.com                   │ [pre-filled if saved] │
│  └──────────────────────────────────┘        │
│                                               │
│  By continuing, you agree to be contacted     │
│  by a financial advisor from our network      │
│  at the number and/or email you provide.      │
│  [Full TCPA consent language]                 │
│                                               │
│            [ Continue → ]                     │
│                                               │
│       [ Skip — I'll provide this later ]      │
│                                               │
└──────────────────────────────────────────────┘
```

### Modal Behavior

- **Phone input:** Standard US phone mask `(___) ___-____`, numeric only
- **Email input:** If user saved email on Screen A, it's pre-filled. If not, empty.
- **Both fields optional** — user can fill one, both, or neither
- **"Skip — I'll provide this later"** closes the modal and continues
- If at least one field is filled → Continue is enabled

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

### Skip Path

If the user skips:
- No phone or email captured at this point
- Steps 11 and 12 will ask for this information individually

If the user provides info:
- Corresponding later steps are **skipped**

---

## Conditional Flow After Modal

```
Modal: email + phone provided  →  Skip 11 + 12  →  Screen B
Modal: email only              →  Skip 11        →  Step 12 (name + phone)
Modal: phone only              →  Step 11 (email) →  Step 12 (name only)
Modal: skipped                 →  Step 11 (email) →  Step 12 (name + phone)
```

---

## What Gets Stored

```javascript
{
  // ...previous fields...
  relationship_preference: "phone_consultation",
  phone: "2125551234",        // if provided in modal
  email: "user@email.com",    // if provided in modal
  tcpa_consent: true,         // if Continue tapped with info
  tcpa_consent_timestamp: "2026-03-01T12:34:56Z"
}
```
