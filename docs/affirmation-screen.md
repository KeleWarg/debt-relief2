# Affirmation Screen

## Overview

| Property | Value |
|----------|-------|
| Screen name | `AffirmationScreen` |
| Type | Full interstitial, no data collected |
| Phase label | None (full-width centered) |
| Progress | ~20% |
| Triggered by | Completing Step 2 (age) |
| Transition | Full page transition, first "new page" in funnel |
| Data available | `motivation_driver` + `age_range` |
| Variants | 25 (5 motivations × 5 age ranges) |

---

## Layout

Headline + framing header + narrative + labeled bar chart + source + goal paragraph. Each bar is self-explanatory with its own label above and value below.

```
┌──────────────────────────────────────────────────────────┐
│  Forbes ADVISOR                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│       Here's what we see for people like you.            │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  [FRAMING HEADER]                                  │  │
│  │                                                    │  │
│  │  [Narrative, 1-2 sentences]                        │  │
│  │                                                    │  │
│  │    What people             What's                  │  │
│  │    typically have          needed                  │  │
│  │                                                    │  │
│  │                     ┌──────────┐                   │  │
│  │                     │          │                   │  │
│  │    ┌──────────┐     │          │                   │  │
│  │    │          │     │          │                   │  │
│  │    │          │     │          │                   │  │
│  │    └──────────┘     └──────────┘                   │  │
│  │     4× income       10–12× income                  │  │
│  │    ──────────────────────────────                  │  │
│  │                                                    │  │
│  │  [Source citation]                                 │  │
│  │                                                    │  │
│  │  ─────────────────────────────────────────         │  │
│  │                                                    │  │
│  │  ✓ Your goal: [motivation label]                   │  │
│  │                                                    │  │
│  │  [Goal paragraph]                                  │  │
│  │                                                    │  │
│  │  Next, we'll get a sense of your financials        │  │
│  │  to understand the best strategy for you.          │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│     100%                100K+              ~3 min         │
│     Free & confidential People matched     To complete   │
│                                                          │
│                  [ Continue → ]                           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Headline

```
Here's what we see for people like you.
```

Centered above the card. Frames the entire screen as a response to their inputs. Population-level ("people like you"), not personal.

### Headline Treatment

- **"Here's what we see for"** — Dark (#1B2A4A), serif/display font (Forbes editorial), 32px
- **"people like you."** — Forbes blue (#0066CC), same font and size
- Same accent color pattern established on Step 2, creating visual continuity
- The blue text warms the statement and draws the eye to the personal element

---

## Bar Chart Visual

### Bars

| Element | Spec |
|---------|------|
| Bar 1 (where people are) | Gold/amber (#E8B44B), shorter |
| Bar 2 (where they need to be) | Forbes blue (#0066CC), taller |
| Bar width | ~60px each |
| Bar spacing | ~40px gap |
| Border radius | 4px top corners only |
| Baseline | Dark line (#1B2A4A), 2px |

### Labels Above Bars

| Element | Spec |
|---------|------|
| Bar 1 label | Positioned directly above gold bar |
| Bar 2 label | Positioned directly above blue bar |
| Style | Regular weight, 13px, muted (#666666) |

### Values Below Bars

| Element | Spec |
|---------|------|
| Positioning | Centered below each bar |
| Style | Bold, 14px, dark (#1B2A4A), pill with light grey background (#F2F2F2) |

### Bar Label Text by Motivation

| `motivation_driver` | Above gold bar | Above blue bar |
|---------------------|---------------|---------------|
| `behind_retirement` | What people typically have | What's needed |
| `family_protection` | What people typically have | What's needed |
| `windfall` | Without a plan | With a plan |
| `optimization` | What people typically capture | What's available |
| `plan_review` | Gap-free plans | Plans with gaps |

---

## Framing Headers

| `motivation_driver` | Header |
|---------------------|--------|
| `behind_retirement` | RETIREMENT READINESS IN YOUR [age] |
| `family_protection` | FAMILY PROTECTION IN YOUR [age] |
| `windfall` | WINDFALL OUTCOMES AFTER 5 YEARS |
| `optimization` | FINANCIAL OPTIMIZATION IN YOUR [age] |
| `plan_review` | FINANCIAL PLAN HEALTH IN YOUR [age] |

---

## Goal Label Mapping

| `motivation_driver` | Card shows |
|---------------------|-----------|
| `behind_retirement` | ✓ Your goal: Catching up on retirement |
| `family_protection` | ✓ Your goal: Protecting your family |
| `windfall` | ✓ Your goal: Managing new wealth |
| `optimization` | ✓ Your goal: Optimizing your finances |
| `plan_review` | ✓ Your goal: Getting a professional review |

---

## Complete Variant Matrix

Each variant = framing header + narrative + labeled bar data + source + goal paragraph.

---

### `behind_retirement`

**Under 30:**

Header: RETIREMENT READINESS IN YOUR 20s

Narrative: `People focused on catching up on retirement in their 20s typically have about $20K saved. Advisors recommend at least $40K, or roughly 1× your salary, by this point.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | What people typically have | $20K | 50% |
| Blue | What's needed | $40K+ | 100% |

Source: Based on Federal Reserve data and Fidelity benchmarks for your age group

Goal paragraph: `Advisors help close this gap through automated savings strategies, employer match maximization, and low-cost index fund positioning. Your timeline is the single biggest asset they can work with.`

---

**30s:**

Header: RETIREMENT READINESS IN YOUR 30s

Narrative: `People focused on catching up on retirement in their 30s typically have about $45K saved. Advisors recommend at least $100K, or roughly 2× your salary, by 35.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | What people typically have | $45K | 45% |
| Blue | What's needed | $100K+ | 100% |

Source: Based on Federal Reserve data and Fidelity benchmarks for your age group

Goal paragraph: `Advisors help close this gap through aggressive contribution ramp-ups, tax-advantaged account structuring, and smart asset allocation. A 30-year runway gives them room to build a real plan.`

---

**40s:**

Header: RETIREMENT READINESS IN YOUR 40s

Narrative: `People focused on catching up on retirement in their 40s typically have about $100K saved. Advisors recommend at least $200K, or roughly 4× your salary, by 45.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | What people typically have | $100K | 50% |
| Blue | What's needed | $200K+ | 100% |

Source: Based on Federal Reserve data and Fidelity benchmarks for your age group

Goal paragraph: `Advisors help close this gap through maximized contributions, Roth conversions, and portfolio rebalancing. This is the decade where catch-up strategies have the most impact.`

---

**50s:**

Header: RETIREMENT READINESS IN YOUR 50s

Narrative: `People focused on catching up on retirement in their 50s typically have about $120K saved. Advisors recommend at least $350K, or roughly 7× your salary, by 55.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | What people typically have | $120K | 34% |
| Blue | What's needed | $350K+ | 100% |

Source: Based on Federal Reserve data and Fidelity benchmarks for your age group

Goal paragraph: `Advisors help close this gap through catch-up contributions, Roth conversions, and Social Security timing. The right strategy can close it fast.`

---

**60s+:**

Header: RETIREMENT READINESS IN YOUR 60s

Narrative: `People focused on retirement planning after 60 typically have about $165K saved. Advisors recommend at least $500K, or roughly 10× your salary, or a clear drawdown plan.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | What people typically have | $165K | 33% |
| Blue | What's needed | $500K+ | 100% |

Source: Based on Federal Reserve data and Fidelity benchmarks for your age group

Goal paragraph: `Advisors help at this stage through withdrawal sequencing, Social Security optimization, and Medicare planning. It's less about how much you saved and more about how strategically you use it.`

---

### `family_protection`

**Under 30:**

Header: FAMILY PROTECTION IN YOUR 20s

Narrative: `People focused on protecting their family in their 20s typically have about 3× their income in coverage. Advisors recommend 10× to fully protect the people who depend on you.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | What people typically have | 3× income | 30% |
| Blue | What's needed | 10× income | 100% |

Source: Based on LIMRA data and industry benchmarks for your age group

Goal paragraph: `Advisors help close this gap through term life insurance, emergency fund structuring, and basic estate documents. At your age, coverage costs a fraction of what it will later.`

---

**30s:**

Header: FAMILY PROTECTION IN YOUR 30s

Narrative: `People focused on protecting their family in their 30s typically have about 4× their income in coverage. Advisors recommend 10–12× to cover a growing household.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | What people typically have | 4× income | 36% |
| Blue | What's needed | 10–12× income | 100% |

Source: Based on LIMRA data and industry benchmarks for your age group

Goal paragraph: `Advisors help close this gap through coverage gap analysis, education funding strategies, and estate document structuring. Most people have at least one gap they don't know about.`

---

**40s:**

Header: FAMILY PROTECTION IN YOUR 40s

Narrative: `People focused on protecting their family in their 40s typically have about 5× their income in coverage. Advisors recommend 10–12× to cover mortgage, education, and income replacement.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | What people typically have | 5× income | 45% |
| Blue | What's needed | 10–12× income | 100% |

Source: Based on LIMRA data and industry benchmarks for your age group

Goal paragraph: `Advisors help close this gap through comprehensive coverage reviews, education planning, and estate document updates. At this stage you may be covering mortgage, education, income replacement, and aging parents all at once.`

---

**50s:**

Header: FAMILY PROTECTION IN YOUR 50s

Narrative: `People focused on protecting their family in their 50s typically have about 4× their income in coverage. Advisors recommend 8–10× as the focus shifts toward estate planning and asset transfer.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | What people typically have | 4× income | 44% |
| Blue | What's needed | 8–10× income | 100% |

Source: Based on LIMRA data and industry benchmarks for your age group

Goal paragraph: `Advisors help at this stage through estate planning, survivorship strategies, and long-term care positioning. Protection shifts from coverage to transfer, making sure what you've built goes exactly where you intend.`

---

**60s+:**

Header: FAMILY PROTECTION IN YOUR 60s

Narrative: `People focused on protecting their family after 60 typically have about 2× their income in coverage. Advisors recommend a comprehensive estate plan plus appropriate coverage to protect the legacy you've built.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | What people typically have | 2× income | 25% |
| Blue | What's needed | Estate plan + coverage | 100% |

Source: Based on LIMRA data and industry benchmarks for your age group

Goal paragraph: `Advisors help at this stage through wealth transfer structuring, legacy planning, and beneficiary audits. The focus is making sure your estate documents, asset titles, and designations all align with your wishes.`

---

### `windfall`

**Under 30:**

Header: WINDFALL OUTCOMES AFTER 5 YEARS

Narrative: `People managing new wealth in their 20s without a plan typically retain about 30% after 5 years. With professional guidance, that number jumps to roughly 85%.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | Without a plan | ~30% retained | 35% |
| Blue | With a plan | ~85% retained | 100% |

Source: Based on NEFE research on windfall outcomes

Goal paragraph: `Advisors help protect this wealth through tax-efficient positioning, growth-oriented allocation, and wealth structuring. At your age, the right positioning turns new money into generational wealth.`

---

**30s:**

Header: WINDFALL OUTCOMES AFTER 5 YEARS

Narrative: `People managing new wealth in their 30s without a plan typically retain about 30% after 5 years. With professional guidance, that number jumps to roughly 80%.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | Without a plan | ~30% retained | 37% |
| Blue | With a plan | ~80% retained | 100% |

Source: Based on NEFE research on windfall outcomes

Goal paragraph: `Advisors help protect this wealth through tax-efficient positioning, diversified growth strategies, and asset protection. A structured plan at your age can turn this into decades of compounding growth.`

---

**40s:**

Header: WINDFALL OUTCOMES AFTER 5 YEARS

Narrative: `People managing new wealth in their 40s without a plan typically retain about 35% after 5 years. With professional guidance, that number jumps to roughly 80%.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | Without a plan | ~35% retained | 44% |
| Blue | With a plan | ~80% retained | 100% |

Source: Based on NEFE research on windfall outcomes

Goal paragraph: `Advisors help protect this wealth through tax-efficient placement, retirement acceleration, and estate foundations. A windfall at your age can reshape your entire retirement timeline if it's positioned correctly in the first 12 months.`

---

**50s:**

Header: WINDFALL OUTCOMES AFTER 5 YEARS

Narrative: `People managing new wealth in their 50s without a plan typically retain about 40% after 5 years. With professional guidance, that number jumps to roughly 85%.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | Without a plan | ~40% retained | 47% |
| Blue | With a plan | ~85% retained | 100% |

Source: Based on NEFE research on windfall outcomes

Goal paragraph: `Advisors help protect this wealth through tax mitigation, retirement gap strategies, and preservation planning. The tax and positioning decisions in the first year are what make the difference.`

---

**60s+:**

Header: WINDFALL OUTCOMES AFTER 5 YEARS

Narrative: `People managing new wealth after 60 without a plan typically retain about 45% after 5 years. With professional guidance, that number jumps to roughly 90%.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | Without a plan | ~45% retained | 50% |
| Blue | With a plan | ~90% retained | 100% |

Source: Based on NEFE research on windfall outcomes

Goal paragraph: `Advisors help protect this wealth through tax-efficient transfer strategies, preservation-first positioning, and estate structuring. At this stage it's about making sure this wealth serves you and your family for the long term.`

---

### `optimization`

**Under 30:**

Header: FINANCIAL OPTIMIZATION IN YOUR 20s

Narrative: `People focused on optimizing their finances in their 20s typically capture about 60% of what's available to them. With professional guidance, that number rises to 90% or more.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | What people typically capture | ~60% | 67% |
| Blue | What's available | ~90%+ | 100% |

Source: Based on Vanguard and Morningstar research for your age group

Goal paragraph: `Advisors help close this gap through fee reduction, tax-advantaged account maximization, and smart asset location. The average household loses $2,000–$5,000 a year to suboptimal strategy, and at your age that compounds into six figures.`

---

**30s:**

Header: FINANCIAL OPTIMIZATION IN YOUR 30s

Narrative: `People focused on optimizing their finances in their 30s typically capture about 55% of what's available to them. With professional guidance, that number rises to 85% or more.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | What people typically capture | ~55% | 65% |
| Blue | What's available | ~85%+ | 100% |

Source: Based on Vanguard and Morningstar research for your age group

Goal paragraph: `Advisors help close this gap through tax-loss harvesting, account consolidation, and fee audits. Most people your age have 3–5 accounts with no coordinated strategy, and the average leakage is $3,000–$7,000 a year.`

---

**40s:**

Header: FINANCIAL OPTIMIZATION IN YOUR 40s

Narrative: `People focused on optimizing their finances in their 40s typically capture about 50% of what's available to them. With professional guidance, that number rises to 85% or more.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | What people typically capture | ~50% | 59% |
| Blue | What's available | ~85%+ | 100% |

Source: Based on Vanguard and Morningstar research for your age group

Goal paragraph: `Advisors help close this gap through tax strategy overhauls, portfolio rebalancing, and fee reduction. This is the decade where the optimization surface area peaks, and most households leave $5,000–$10,000 a year on the table.`

---

**50s:**

Header: FINANCIAL OPTIMIZATION IN YOUR 50s

Narrative: `People focused on optimizing their finances in their 50s typically capture about 45% of what's available to them. With professional guidance, that number rises to 85% or more.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | What people typically capture | ~45% | 53% |
| Blue | What's available | ~85%+ | 100% |

Source: Based on Vanguard and Morningstar research for your age group

Goal paragraph: `Advisors help close this gap through catch-up contribution maximization, Roth conversions, and tax-loss harvesting. This is the highest-stakes decade, where contributions, conversions, and Social Security timing all converge.`

---

**60s+:**

Header: FINANCIAL OPTIMIZATION IN YOUR 60s

Narrative: `People focused on optimizing their finances after 60 typically capture about 40% of what's available to them. With professional guidance, that number rises to 80% or more.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | What people typically capture | ~40% | 50% |
| Blue | What's available | ~80%+ | 100% |

Source: Based on Vanguard and Morningstar research for your age group

Goal paragraph: `Advisors help at this stage through withdrawal sequencing, RMD strategy, and tax-bracket management. The right execution on drawdown can save more over a 20-year retirement than the right investments ever did.`

---

### `plan_review`

**Under 30:**

Header: FINANCIAL PLAN HEALTH IN YOUR 20s

Narrative: `People getting a plan review in their 20s find that roughly 70% of plans have at least one gap. Only about 30% are fully aligned with where they should be.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | Gap-free plans | ~30% | 30% |
| Blue | Plans with gaps | ~70% | 100% |

Source: Based on CFP Board research for your age group

Goal paragraph: `Advisors help find these gaps through foundation assessments, account optimization, and goal alignment. Catching them now prevents them from compounding for decades.`

---

**30s:**

Header: FINANCIAL PLAN HEALTH IN YOUR 30s

Narrative: `People getting a plan review in their 30s find that roughly 65% of plans have at least one gap. Only about 35% are fully aligned.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | Gap-free plans | ~35% | 35% |
| Blue | Plans with gaps | ~65% | 100% |

Source: Based on CFP Board research for your age group

Goal paragraph: `Advisors help find these gaps through allocation reviews, beneficiary updates, and gap analysis. Your financial picture is complex enough that a review typically surfaces 2–3 blind spots worth real money.`

---

**40s:**

Header: FINANCIAL PLAN HEALTH IN YOUR 40s

Narrative: `People getting a plan review in their 40s find that roughly 60% of plans have at least one gap. Only about 40% are fully aligned.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | Gap-free plans | ~40% | 40% |
| Blue | Plans with gaps | ~60% | 100% |

Source: Based on CFP Board research for your age group

Goal paragraph: `Advisors help find these gaps through mid-life audits, rebalance assessments, and insurance reviews. Most people haven't updated beneficiaries, rebalanced, or reviewed insurance in 3+ years.`

---

**50s:**

Header: FINANCIAL PLAN HEALTH IN YOUR 50s

Narrative: `People getting a plan review in their 50s find that roughly 55% of plans have at least one gap. Only about 45% are fully aligned.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | Gap-free plans | ~45% | 45% |
| Blue | Plans with gaps | ~55% | 100% |

Source: Based on CFP Board research for your age group

Goal paragraph: `Advisors help find these gaps through pre-retirement readiness assessments, Social Security analysis, and tax projections. The margin for error narrows every year closer to retirement.`

---

**60s+:**

Header: FINANCIAL PLAN HEALTH IN YOUR 60s

Narrative: `People getting a plan review after 60 find that roughly 50% of plans have at least one gap, and the stakes are highest at this stage.`

| Bar | Label above | Value below | Height ratio |
|-----|-------------|-------------|-------------|
| Gold | Gap-free plans | ~50% | 50% |
| Blue | Plans with gaps | ~50% | 100% |

Source: Based on CFP Board research for your age group

Goal paragraph: `Advisors help find these gaps through retirement readiness checks, drawdown planning, and estate alignment. A review makes sure all the pieces fit this stage of life, not the last one.`

---

## Plan Review Visual Note

Plan review inverts the emotional direction. The taller blue bar is "plans with gaps" and the shorter gold bar is "gap-free." Labels above each bar make this immediately clear.

---

## Animation Sequence

1. Full page transition in
2. Headline fades in ("Here's what we see for people like you.")
3. Framing header appears
4. Narrative text fades in (200ms)
5. Bar labels appear above bar positions (200ms)
6. Gold bar grows upward (400ms, ease-out)
7. Pause (300ms)
8. Blue bar grows upward (500ms, ease-out), gap visible
9. Values fade in below bars (200ms)
10. Source text fades in (200ms)
11. Divider + goal section fades in (200ms)
12. Total: ~2.4 seconds

---

## Static Elements (all 25 variants)

### Trust Stats
```
100%                 100K+                ~3 min
Free & confidential  People matched       To complete
```

### CTA
```
Continue →
```

### Next Step Line (always the same, closes the card)
```
Next, we'll get a sense of your financials to understand the best strategy for you.
```

---

## Behavior

1. Headline frames the screen
2. Animation plays, labels appear first so user knows what's coming
3. Bars grow, gap is visible
4. User reads goal paragraph with strategies
5. Taps Continue, transitions to Step 3 (Income)

## What Gets Stored

Nothing, value delivery only.

---

## Compliance Notes

- All gap data uses population averages, not individual projections
- Source citations required on every variant
- Dollar amounts and percentages from published research (Fed SCF, LIMRA, NEFE, Vanguard, CFP Board)
- Narrative always references "people focused on [goal]," never assumes user's personal situation
- Strategies in goal paragraph describe categories, not specific advice
- Christine must review final data claims and source attributions
- Legal must confirm source citations are sufficient
