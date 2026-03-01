# FA Journey v4 — Sequence Summary

## Complete Flow

```
STEP 1  → Motivation             (sideContent image + strategy pills)
           ↓ crossfade
STEP 2  → Age                    (centered, no image)
           ↓ full page transition
        AFFIRMATION               (copy + benchmark card, no graph)
           ↓
─── YOUR FINANCIAL PROFILE ───────────────────────────────
STEP 3  → Income
STEP 4  → Savings                (recap: income)
STEP 5  → Objectives             (recap: income + savings, RECOMMENDED tag)
           ↓ full page transition
        SCREEN A                  (growth horizon graph + email save)
           ↓
─── YOUR ADVISOR MATCH ───────────────────────────────────
STEP 6  → Specialties            (multi-select, 2-3 pre-checked RECOMMENDED)
           ↓
─── YOUR LIFE SITUATION ──────────────────────────────────
STEP 7  → Marital status         (section intro: "advisors start here")
STEP 8  → Homeownership
STEP 9  → ZIP code
           ↓
─── YOUR ADVISOR MATCH ───────────────────────────────────
STEP 10 → Advisor relationship   (RECOMMENDED + contact modal w/ phone + email)
           ↓ conditional
STEP 11 → Email + profile review (SKIPPED if email captured on Step 10 modal)
STEP 12 → Name + Phone + review  (SKIPPED if phone captured on Step 10 modal)
           ↓
        SCREEN B                  (confirmation / match screen — TBD)
```

## Conditional PII Flow

```
Modal: email + phone provided  →  Skip 11 + 12  →  Screen B
Modal: email only              →  Skip 11        →  Step 12 (name + phone)  →  Screen B
Modal: phone only              →  Step 11 (email) →  Step 12 (name only)    →  Screen B
Modal: skipped                 →  Step 11 (email) →  Step 12 (name + phone) →  Screen B
```

## All Fields Collected

| Step | Field | Type | Options |
|------|-------|------|---------|
| 1 | `motivation_driver` | Single-select | 5 |
| 2 | `age_range` | Single-select | 5 |
| 3 | `income_range` | Single-select | 7 |
| 4 | `savings_range` | Single-select | 7 |
| 5 | `investment_objective` | Single-select | 4 (1 RECOMMENDED) |
| 6 | `specialties` | Multi-select | 9 (2-3 pre-checked) |
| 7 | `marital_status` | Single-select | 5 |
| 8 | `homeownership` | Single-select | 3 |
| 9 | `zip_code` | Text input | 5-digit |
| 10 | `relationship_preference` | Single-select | 4 (1 RECOMMENDED) |
| 10 modal | `phone` + `email` | Text inputs | Optional |
| 11 | `email` | Text input | Conditional |
| 12 | `first_name` + `last_name` + `phone` | Text inputs | Conditional |

## Analytics Fields (silent)

| Step | Field | Tracks |
|------|-------|--------|
| 5 | `followed_recommendation` | Did user pick the RECOMMENDED objective |
| 6 | `specialties_modified` | Did user change pre-checked specialties |
| Screen A | `saved_email` | Did user save email at checkpoint |
| 10 | `modal_completed` | Did user provide info in modal vs skip |

## Section Labels

| Section | Steps | Purpose |
|---------|-------|---------|
| LET'S UNDERSTAND YOU | 1, 2 | Motivation + demographics |
| YOUR FINANCIAL PROFILE | 3, 4, 5 | Money questions |
| YOUR ADVISOR MATCH | 6, 10, 11, 12 | Matching + contact |
| YOUR LIFE SITUATION | 7, 8, 9 | Situational context |

## Interstitial Screens

| Screen | After | Contains | Graph? |
|--------|-------|----------|--------|
| Affirmation | Step 2 | Headline + body + benchmark card | No |
| Screen A | Step 5 | Profile card + growth horizon graph + email save | Yes |
| Screen B | Step 12 | Confirmation / match — TBD | TBD |

## Individual Step Docs

| Document | Location |
|----------|----------|
| Step 1 — Motivation | `steps/step-1-motivation.md` |
| Step 2 — Age | `steps/step-2-age.md` |
| Affirmation Screen | `steps/affirmation-screen.md` |
| Step 3 — Income | `steps/step-3-income.md` |
| Step 4 — Savings | `steps/step-4-savings.md` |
| Step 5 — Objectives | `steps/step-5-objectives.md` |
| Screen A — Growth Horizon | `steps/screen-a-growth-horizon.md` |
| Step 6 — Specialties | `steps/step-6-specialties.md` |
| Step 7 — Marital Status | `steps/step-7-marital-status.md` |
| Step 8 — Homeownership | `steps/step-8-homeownership.md` |
| Step 9 — ZIP Code | `steps/step-9-zip.md` |
| Step 10 — Advisor Relationship | `steps/step-10-advisor-relationship.md` |
| Step 11 — Email + Review | `steps/step-11-email-review.md` |
| Step 12 — Name + Phone + Review | `steps/step-12-name-phone-review.md` |
| Screen B — Confirmation | TBD |
