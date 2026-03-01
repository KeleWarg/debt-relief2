# Step 5 — Investment Objectives

## Overview

| Property | Value |
|----------|-------|
| Screen name | `InvestmentObjectivesScreen` |
| Field | `investment_objective` |
| Type | Single-select list (full-width rows with letter indicators) |
| Auto-advance | Yes |
| Phase label | BUILDING YOUR FINANCIAL PROFILE |
| Progress | ~45% |
| Data available | `motivation_driver` + `age_range` + `income_range` + `savings_range` |
| Special feature | One option gets a "RECOMMENDED" tag based on profile |

---

## Layout

Centered single-column. Two distinct zones separated by a divider: confirmation zone (connects savings to objectives through motivation) and question zone (emotional headline + sub copy + options with RECOMMENDED tag + advisor reassurance). Same pattern as Steps 2–4.

```
┌──────────────────────────────────────────┐
│  ← ████████████████░░░░░░░░░            │
│                                           │
│  ✅                                       │
│  [Motivation confirmation — bridges       │
│   savings to investment goal]             │
│                                           │
│  ──────────────────────────────           │
│                                           │
│  BUILDING YOUR FINANCIAL PROFILE          │
│                                           │
│  You don't need the perfect strategy.     │
│  Your advisor will refine it with you.    │
│                                           │
│  What best describes your                 │
│  investment goal?                         │
│                                           │
│   A  Grow my wealth long-term  RECOMMENDED│
│      Based on your age and timeline,      │
│      growth gives you the most runway.    │
│   B  Protect what I have                  │
│   C  Generate income                      │
│   D  Balance growth and safety            │
│                                           │
│   [Motivation-specific advisor            │
│    reassurance]                            │
│                                           │
└──────────────────────────────────────────┘
```

---

## Zone 1: Confirmation

Green checkmark + motivation-specific line that bridges from savings (what they just shared) to investment goal (what's next).

| Element | Spec |
|---------|------|
| Icon | ✅ Filled circle, white checkmark, Forbes teal (#0B6E4F) |
| Size | 32px |
| Positioning | Left-aligned, above confirmation text |
| Confirmation text | Bold, 18px, dark (#1B2A4A) |

### Confirmation Copy

| `motivation_driver` | Confirmation |
|---------------------|-------------|
| `behind_retirement` | Your financial profile is taking shape. Last question: how do you want your money to work? |
| `family_protection` | Your financial profile is taking shape. Last question: how do you want your money to work? |
| `windfall` | Your financial profile is taking shape. Last question: how do you want your new wealth to work? |
| `optimization` | Your financial profile is taking shape. Last question: what's the priority for your money? |
| `plan_review` | Your financial profile is taking shape. Last question: what's the goal for your investments? |

---

## Divider

| Element | Spec |
|---------|------|
| Style | 1px solid, light grey (#E0E0E0) |
| Width | Full content width |
| Margin | 24px top and bottom |

---

## Zone 2: Question

Phase label + emotional headline + sub copy (the actual question) + options with RECOMMENDED + advisor reassurance.

### Phase Label

```
BUILDING YOUR FINANCIAL PROFILE
```

Same phase label as Steps 3–4. Last step in this section.

### Emotional Headline

Universal for all motivations. Addresses the core hesitation: "What if I pick the wrong one?" Names "strategy" to clearly signal this question is about approach, not another number.

```
You don't need the perfect strategy. Your advisor will refine it with you.
```

### Headline Treatment

- **"You don't need the perfect strategy."** — Dark (#1B2A4A), serif/display font (Forbes editorial), 28px
- **"Your advisor will refine it with you."** — Forbes blue (#0066CC), same font and size
- Same accent color pattern as Steps 2–4

### Sub Copy

The actual question. Positioned below the headline.

```
What best describes your investment goal?
```

### Sub Copy Treatment

- **Style:** Regular weight, 15px
- **Color:** Muted (#666666)

---

## Options

Full-width list rows with letter indicators. One option receives a RECOMMENDED badge based on profile logic.

| Letter | Label | Stores as |
|--------|-------|-----------|
| A | Grow my wealth long-term | `growth` |
| B | Protect what I have | `preservation` |
| C | Generate income | `income_generation` |
| D | Balance growth and safety | `balanced` |

### Option Row Spec

| Element | Spec |
|---------|------|
| Row height | 56px |
| Border | 1px solid #E8E8E8, 8px border radius |
| Letter indicator | Circle, 28px, light grey background, centered letter |
| Label | Regular weight, 16px, dark (#1B2A4A) |
| Spacing | 12px between rows |
| Hover | Light blue background (#F0F7FF) |
| Selected | Forbes blue border (#0066CC), light blue fill |

---

## Recommended Tag

One option receives a "RECOMMENDED" badge. The badge is a small pill aligned to the right side of the row. Subtle, not pushy. The user can select any option.

### Badge Spec

| Element | Spec |
|---------|------|
| Text | RECOMMENDED |
| Style | Small caps, 11px, Forbes navy (#1B2A4A) |
| Background | Light blue tint (#E8F0FE), 4px border radius, 6px horizontal padding |
| Position | Right-aligned within the row |
| Animation | Present on load, no animation |

### Rationale Line Spec

One sentence displayed directly below the recommended row explaining why it's recommended. Reads as an inline tooltip, not a separate section.

| Element | Spec |
|---------|------|
| Position | Directly below the recommended option row, indented to align with label text |
| Style | Regular weight, 13px, italic |
| Color | Muted (#888888) |
| Spacing | 4px below the recommended row, 12px before the next option row |
| Max width | Same as option row content area |

```
┌──────────────────────────────────────────────────┐
│  A  Grow my wealth long-term        RECOMMENDED  │
└──────────────────────────────────────────────────┘
     Your timeline still favors growth. Most
     advisors recommend building aggressively
     at this stage.

┌──────────────────────────────────────────────────┐
│  B  Protect what I have                          │
└──────────────────────────────────────────────────┘
```

### Recommendation Logic

The recommended objective is determined by `motivation_driver` × `age_range`, with `savings_range` as a modifier for edge cases.

#### Primary Matrix (motivation × age)

Each combo includes a user-facing rationale line displayed directly below the recommended row.

**`behind_retirement`**

| Age | Recommended | Rationale (internal) | User-facing rationale |
|-----|-------------|-----------|----------------------|
| Under 30 | Grow my wealth long-term | Long runway, growth maximizes compounding | With 30+ years ahead of you, growth-focused strategies have the most time to compound. |
| 30s | Grow my wealth long-term | Still 30+ years, growth is the priority | Your timeline still favors growth. Most advisors recommend building aggressively at this stage. |
| 40s | Grow my wealth long-term | 20+ year horizon still favors growth | With 20+ years to retirement, growth is still the strongest lever for closing the gap. |
| 50s | Balance growth and safety | Shorter runway, need growth but can't afford major drawdown | Your timeline is shorter, so most advisors recommend growing your money while protecting against big losses. |
| 60s+ | Generate income | Drawdown phase, income generation is primary need | At this stage, most advisors focus on making your savings produce steady, reliable income. |

**`family_protection`**

| Age | Recommended | Rationale (internal) | User-facing rationale |
|-----|-------------|-----------|----------------------|
| Under 30 | Grow my wealth long-term | Build the base that protection strategies draw from | Growing your wealth now builds the foundation your family's protection plan draws from. |
| 30s | Balance growth and safety | Growing family needs both growth and security | With a growing household, most advisors recommend balancing both growth and security. |
| 40s | Balance growth and safety | Peak protection needs, can't take outsized risk | At this stage, your family depends on stability. Most advisors balance growth with downside protection. |
| 50s | Protect what I have | Preservation aligns with protection mindset | Protection becomes the priority. Most advisors focus on preserving what you've built for your family. |
| 60s+ | Protect what I have | Legacy preservation is the priority | At this stage, most advisors focus on preserving your legacy and ensuring a smooth transfer. |

**`windfall`**

| Age | Recommended | Rationale (internal) | User-facing rationale |
|-----|-------------|-----------|----------------------|
| Under 30 | Grow my wealth long-term | Decades to compound new wealth | With decades ahead, your new wealth has the most room to grow through compounding. |
| 30s | Grow my wealth long-term | Long horizon, structured growth | Your timeline favors structured growth. Most advisors recommend putting new wealth to work early. |
| 40s | Balance growth and safety | Windfall preservation + growth balance | With new wealth, most advisors recommend growing it while protecting against large losses. |
| 50s | Balance growth and safety | Protect the windfall while growing it | Your new wealth can still grow, but most advisors add downside protection at this stage. |
| 60s+ | Protect what I have | Preservation first at this stage | At this stage, most advisors focus on preserving your new wealth and positioning it for the long term. |

**`optimization`**

| Age | Recommended | Rationale (internal) | User-facing rationale |
|-----|-------------|-----------|----------------------|
| Under 30 | Grow my wealth long-term | Optimization + growth = maximum compounding | Growth-focused strategies give your advisor the widest range of optimization levers at your age. |
| 30s | Grow my wealth long-term | Still growth-focused | Your timeline still favors growth, which opens up the most optimization strategies. |
| 40s | Grow my wealth long-term | Optimization strategies work best with growth mandate | Most optimization strategies, like tax-loss harvesting and rebalancing, work best with a growth mandate. |
| 50s | Balance growth and safety | Optimization shifts to tax + preservation strategies | At this stage, optimization shifts toward tax strategy and preservation. Balance captures both. |
| 60s+ | Generate income | Optimization in drawdown = income efficiency | In drawdown, most advisors optimize around income efficiency, tax brackets, and withdrawal sequencing. |

**`plan_review`**

| Age | Recommended | Rationale (internal) | User-facing rationale |
|-----|-------------|-----------|----------------------|
| Under 30 | Grow my wealth long-term | Default growth for young review-seekers | With your timeline, most advisors start a review assuming growth as the default. |
| 30s | Grow my wealth long-term | Still growth-appropriate | Your age still favors growth. Your advisor will stress-test this during the review. |
| 40s | Balance growth and safety | Mid-life review usually reveals need for balance | Mid-life reviews typically surface the need for more balance. Your advisor will confirm. |
| 50s | Balance growth and safety | Pre-retirement review leans toward stability | Closer to retirement, most reviews recommend shifting toward balance and stability. |
| 60s+ | Generate income | Post-retirement review prioritizes income | At this stage, most reviews focus on whether your investments are producing enough income. |

#### Savings Range Modifier

Very high or very low savings override the default. Each override has its own user-facing rationale.

| Condition | Override | User-facing rationale |
|-----------|----------|----------------------|
| `savings_range` = `under_50k` AND `age_range` = `fifties` or `sixties` | → Grow my wealth long-term | Based on your savings level, most advisors recommend prioritizing growth to build a stronger foundation. |
| `savings_range` = `1.5m_plus` AND `age_range` = `under_30` or `thirties` | → Balance growth and safety | With substantial savings at your age, most advisors recommend balancing growth with some protection. |

#### Implementation

```javascript
function getRecommendedObjective(motivation, age, savings) {
  // Check savings override first
  if (savings === 'under_50k' && ['fifties', 'sixties'].includes(age)) {
    return 'growth';
  }
  if (savings === '1.5m_plus' && ['under_30', 'thirties'].includes(age)) {
    return 'balanced';
  }
  // Fall back to primary matrix
  return RECOMMENDATION_MATRIX[motivation][age];
}
```

---

## Advisor Reassurance (below options)

Motivation-specific line that contextualizes the investment goal for their situation.

| `motivation_driver` | Reassurance |
|---------------------|-------------|
| `behind_retirement` | This shapes how aggressively your advisor approaches your catch-up plan. |
| `family_protection` | This tells your advisor how to balance growth with the security your family needs. |
| `windfall` | Different objectives suit different situations. Your advisor will tailor the approach to your new wealth. |
| `optimization` | Your objective drives your advisor's strategy. They'll fine-tune it based on your full profile. |
| `plan_review` | Not sure? That's okay. Your advisor can help refine this during your review. |

| Element | Spec |
|---------|------|
| Style | Regular weight, 13px |
| Color | Muted (#999999) |
| Background | Light grey card (#F8F8FA), 8px border radius, 12px padding |

---

## Transition

- **In:** Crossfade from Step 4.
- **Out:** User taps objective, row highlights, after 400ms full page transition to Screen A (Growth Horizon). This is the second "new page" transition in the funnel.

---

## Animation on Entry

1. Crossfade from Step 4 completes
2. ✅ icon + confirmation text fade in (200ms)
3. Divider fades in (100ms)
4. Phase label + headline fade in (200ms, 100ms delay)
5. Sub copy (question) fades in (200ms, 100ms delay)
6. Option rows fade in staggered (100ms each), RECOMMENDED badge visible immediately
7. Advisor reassurance fades in (200ms)
8. Total: ~1.0s after crossfade

---

## What Gets Stored

```javascript
{
  motivation_driver: "behind_retirement",
  age_range: "fifties",
  income_range: "100k_150k",
  savings_range: "150k_350k",
  investment_objective: "growth",
  followed_recommendation: true
}
```

Note: `followed_recommendation` is tracked for analytics but never shown to the user or advisor.

---

## Notes

- Recap card removed. The confirmation zone bridges from savings to objectives without needing a separate data display.
- The RECOMMENDED tag is guidance, not a gate. Users can select any option.
- This is the last step in the BUILDING YOUR FINANCIAL PROFILE section. After this, a full page transition takes the user to Screen A (Growth Horizon), which is the second interstitial.
- Christine should confirm the recommendation logic and user-facing rationale lines are compliant. All lines use "most advisors recommend" framing (population-level), not personal advice.
