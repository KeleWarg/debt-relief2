# Loader — Finding Your Match

## Overview

| Property | Value |
|----------|-------|
| Screen name | `LoaderMatchScreen` |
| Type | Processing interstitial — auto-advancing |
| Phase label | None |
| Progress | None (replaced by loader progress bar) |
| Triggered by | Completing Step 10 (advisor relationship preference) |
| Advances to | Step 11, Step 12, or Screen B (see conditional advance) |
| Duration | ~12 seconds total |
| User action | None — auto-advances |

---

## Purpose

One continuous screen, two phases. Phase 1 (carousel) sells the advisor network while "searching." Phase 2 (checklist) feels like the system is crunching their specific data. Together they build anticipation, deliver value, and make the email/phone ask that follows feel earned.

---

## Layout

Full-screen interstitial. No form elements, no back button, no funnel progress bar. Centered content on dark background.

```
┌──────────────────────────────────────────────────────────┐
│  Forbes ADVISOR                                          │
│                                                          │
│           Finding your advisors...                       │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  ██████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│                   PHASE 1: CAROUSEL                      │
│           [Rotating headline + image]                    │
│                                                          │
│                     then fades to                        │
│                                                          │
│                   PHASE 2: CHECKLIST                     │
│           [Sequential checkmarks]                        │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Top Line

Stays visible throughout both phases. Text changes at the phase transition.

### Phase 1:
```
Finding your advisors...
```

### Phase 2 (crossfades at transition):
```
Finalizing your match...
```

| Element | Spec |
|---------|------|
| Style | Regular weight, 14px, muted (#AAAAAA) |
| Layout | Centered above progress bar |
| Spacing | 24px below Forbes header |

---

## Progress Bar

Single continuous bar across both phases. Phase 1 fills to ~55%. Phase 2 fills from ~55% to 100%.

| Element | Spec |
|---------|------|
| Height | 4px |
| Background | Muted (#333333) |
| Fill | Forbes blue (#0066CC) |
| Border radius | 2px |
| Width | 80% of content width |
| Layout | Centered |
| Spacing | 12px below top line |

---

## Phase 1: Carousel (~7 seconds)

Three slides, each displayed for ~2.2 seconds. Crossfade transition (300ms). Each has a headline, sub-line, and image. Sells the advisor network — who these people are.

### Slide 1: Vetted Advisors

**Headline:**

- **"Top 5% of Advisors"** — Forbes gold/amber (#E8A317), serif/display font, 24px, bold
- **"In our network"** — White (#FFFFFF), same font, 24px

**Sub-line:**
```
Every advisor is a fee-only fiduciary with a CFP, CFA, or CPA.
```

| Element | Spec |
|---------|------|
| Style | Regular weight, 14px, muted (#AAAAAA) |
| Spacing | 8px below headline |

**Image:** Grid of 4 professional headshots (diverse, approachable financial advisors in business casual). 2x2 layout.

| Element | Spec |
|---------|------|
| Grid | 2x2, 8px gap |
| Image size | ~120px x 120px each |
| Border radius | 8px |
| Spacing | 24px below sub-line |

---

### Slide 2: Personalized Match

**Headline:**

- **"Matched to Your Goals"** — Forbes gold/amber (#E8A317), serif/display font, 24px, bold
- **"Not a random list"** — White (#FFFFFF), same font, 24px

**Sub-line:**
```
Our algorithm finds advisors who specialize in exactly what you need.
```

**Image:** Photo of a person reviewing a financial plan on a tablet or laptop. Warm, editorial feel.

| Element | Spec |
|---------|------|
| Size | ~280px wide, 16:9 aspect ratio |
| Border radius | 8px |
| Spacing | 24px below sub-line |

---

### Slide 3: Free & Confidential

**Headline:**

- **"100% Free Consultation"** — Forbes gold/amber (#E8A317), serif/display font, 24px, bold
- **"No obligation"** — White (#FFFFFF), same font, 24px

**Sub-line:**
```
Your first conversation is completely free. No pressure, no commitment.
```

**Image:** Photo of two people in a relaxed consultation setting (coffee shop, bright office). Warm, human.

| Element | Spec |
|---------|------|
| Size | ~280px wide, 16:9 aspect ratio |
| Border radius | 8px |
| Spacing | 24px below sub-line |

---

## Transition: Phase 1 → Phase 2 (~7s mark)

1. Slide 3 fades out (300ms)
2. Top line crossfades to "Finalizing your match..." (200ms)
3. Checklist begins appearing in the same content area (200ms delay)

Smooth, no flash or hard cut. Progress bar keeps filling without interruption.

---

## Phase 2: Checklist (~5 seconds)

Four items appear sequentially in the same space the carousel occupied. Each starts as active (spinner), transitions to complete (green checkmark). Feels like real computation.

### Items

| Order | Text | Delay before appearing | Duration before check |
|-------|------|----------------------|----------------------|
| 1 | Reviewing your financial profile... | 0ms | 1.0s |
| 2 | Matching advisor specializations... | 1.2s | 1.0s |
| 3 | Confirming availability in [State]... | 2.4s | 1.0s |
| 4 | Preparing your advisor details... | 3.6s | 0.8s |

`[State]` is the full state name from `derived_state`.

### States

**Pending:** Hidden. Items appear one at a time.

**Active:**

| Element | Spec |
|---------|------|
| Icon | Muted circle outline or subtle spinner, 16px, grey (#666666) |
| Text | Regular weight, 16px, muted (#AAAAAA) |

**Complete:**

| Element | Spec |
|---------|------|
| Icon | Green filled checkmark, 16px (#22C55E) |
| Text | Regular weight, 16px, white (#FFFFFF) |
| Transition | Spinner morphs to checkmark (200ms) |

### Checklist Layout

| Element | Spec |
|---------|------|
| Layout | Left-aligned, centered block |
| Row height | 40px |
| Icon-text gap | 12px |

---

## Full Animation Sequence

### Phase 1 (0s–7s)
1. Screen fades in (200ms)
2. "Finding your advisors..." and progress bar appear
3. Progress bar begins filling (0% → 55% over 7s)
4. Slide 1 fades in (300ms) — holds 2.2s
5. Slide 1 → Slide 2 crossfade (300ms) — holds 2.2s
6. Slide 2 → Slide 3 crossfade (300ms) — holds 2.2s

### Transition (7s–7.5s)
7. Slide 3 fades out (300ms)
8. Top line crossfades to "Finalizing your match..."

### Phase 2 (7.5s–12s)
9. Item 1 appears (active) — bar at 55%
10. 1.0s → Item 1 checks green — bar to 66%
11. Item 2 appears
12. 1.0s → Item 2 checks green — bar to 77%
13. Item 3 appears
14. 1.0s → Item 3 checks green — bar to 88%
15. Item 4 appears
16. 0.8s → Item 4 checks green — bar to 100%
17. 300ms pause
18. Auto-advance

**Total: ~12 seconds**

---

## Background

| Element | Spec |
|---------|------|
| Color | Forbes navy (#0A1628) |

Dark background for the full loader. Creates a distinct "processing" moment that separates it from the white form steps. Matches Remedy's dark blue loader aesthetic.

---

## Mobile

Same layout. Images scale down proportionally. Headlines may wrap. Progress bar stays at 80% width.

---

## Conditional Advance

| Condition | Advances to |
|-----------|-------------|
| Email and phone NOT yet captured | Step 11 (email) |
| Email captured in Step 10 modal, phone not | Step 12 (name + phone) |
| Phone captured in Step 10 modal, email not | Step 11 (email) |
| Both captured in Step 10 modal | Screen B (match result) |

---

## Compliance Notes

- "Top 5% of Advisors" — sourced from Zoe's published rejection rate (95% rejected). Christine must confirm this claim is usable.
- "Fee-only fiduciary" — factual description of Zoe's network requirements.
- "CFP, CFA, or CPA" — factual description of Zoe's certification requirements.
- "100% Free Consultation" — confirm with business team that first consultation is always free.
- No outcome claims. No savings projections. Describing the service only.

---

## Notes

- Not a real processing screen. The search is instantaneous. The loader delivers value and builds anticipation.
- Phase 1 sells the network (who). Phase 2 feels like computation (what we're doing with your data). Together they earn the email/phone ask.
- 12 seconds is the max. If testing shows drop-off, Phase 1 can trim to 2 slides (~5s carousel) for ~10s total.
- Item 3 in checklist uses their state name — proves the loader isn't generic.
- No skip button. Short enough not to frustrate, long enough to land the messages.
