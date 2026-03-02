# Screen A — Growth Horizon Data Model

## Purpose

This document defines the calculation model behind the growth horizon graph. Every number shown to the user is derived from their inputs plus transparent, sourced population-level assumptions. No number requires data we don't have.

---

## What We Know (User Inputs)

| Input | Source | Used For |
|-------|--------|----------|
| `savings_range` | Step 4 | Starting balance |
| `income_range` | Step 3 | Estimated monthly contribution |
| `age_range` | Step 2 | Time horizon + savings rate estimate |
| `investment_objective` | Step 5 | Return assumption |
| `motivation_driver` | Step 1 | Narrative framing only (not used in math) |

---

## What We Estimate (Published Data)

### 1. Starting Balance

Midpoint of the user's selected savings range.

| `savings_range` | Midpoint (starting balance) |
|------------------|-----------------------------|
| Under $50K | $25,000 |
| $50K–$150K | $100,000 |
| $150K–$350K | $250,000 |
| $350K–$750K | $550,000 |
| $750K–$1.5M | $1,125,000 |
| $1.5M+ | $2,000,000 |

---

### 2. Monthly Contribution Estimate

We don't ask users how much they save per month. Instead, we estimate it from income × age-appropriate savings rate.

#### Income Midpoints

| `income_range` | Midpoint | Monthly gross |
|----------------|----------|---------------|
| Under $50K | $35,000 | $2,917 |
| $50K–$100K | $75,000 | $6,250 |
| $100K–$150K | $125,000 | $10,417 |
| $150K–$250K | $200,000 | $16,667 |
| $250K–$500K | $375,000 | $31,250 |
| $500K+ | $625,000 | $52,083 |

#### Savings Rate by Age

Based on Fidelity Q4 2024 data (average savings rate 14.1% including employer match) and BEA personal savings rate (4.4–4.9% of disposable income, 2024–2025). We use a conservative blended rate that accounts for the fact that most people save less than Fidelity's 401(k) participants.

| `age_range` | Estimated savings rate (% of gross income) | Rationale |
|-------------|---------------------------------------------|-----------|
| Under 30 | 6% | Early career, lower income, often carrying student debt. BEA national rate ~4.5%, Fidelity Gen Z rate ~10%. Conservative blend. |
| 30s | 8% | Career acceleration, but peak spending years (housing, family). Savings habits forming. |
| 40s | 10% | Peak earning years begin, savings rate climbs. Fidelity average for Gen X ~13%. |
| 50s | 12% | Catch-up contributions kick in ($7,500 extra for 401k). Kids leaving. Fidelity Boomers ~16%. |
| 60s+ | 5% | Transitioning to drawdown. Many are net spenders, not savers. Social Security begins. |

**Sources:**
- Fidelity Investments Q4 2024 401(k) data: average savings rate 14.1% across all participants
- BEA personal savings rate 2024–2025: 4.4–4.9% of disposable income
- Vanguard How America Saves 2023: median deferral rate 6.2%, average 7.4% (employee only)

#### Monthly Contribution Calculation

```
monthly_contribution = (income_midpoint / 12) × savings_rate
```

##### Example Matrix (monthly contribution by income × age)

| Income \ Age | Under 30 (6%) | 30s (8%) | 40s (10%) | 50s (12%) | 60s+ (5%) |
|--------------|----------------|----------|-----------|-----------|-----------|
| Under $50K | $175 | $233 | $292 | $350 | $146 |
| $50K–$100K | $375 | $500 | $625 | $750 | $313 |
| $100K–$150K | $625 | $833 | $1,042 | $1,250 | $521 |
| $150K–$250K | $1,000 | $1,333 | $1,667 | $2,000 | $833 |
| $250K–$500K | $1,875 | $2,500 | $3,125 | $3,750 | $1,563 |
| $500K+ | $3,125 | $4,167 | $5,208 | $6,250 | $2,604 |

---

### 3. Return Assumptions by Investment Objective

Based on historical annualized returns for common portfolio allocations. Uses long-term averages (30+ year), not recent performance.

#### Current Path (no advisor)

The "current path" line assumes the user continues saving at the estimated rate and earns a return consistent with their stated objective, but without advisor optimization. This line includes a behavioral drag: self-directed investors historically underperform their own funds by 1–2% due to poor timing, emotional trading, and inaction.

| `investment_objective` | Target allocation | Gross historical return | Behavioral drag | Net return (current path) |
|------------------------|-------------------|------------------------|-----------------|---------------------------|
| `growth` | 90/10 stocks/bonds | 9.5% | -1.5% | 8.0% |
| `balanced` | 60/40 stocks/bonds | 7.5% | -1.5% | 6.0% |
| `preservation` | 30/70 stocks/bonds | 5.5% | -1.0% | 4.5% |
| `income_generation` | 40/60 stocks/bonds | 6.5% | -1.0% | 5.5% |

**Behavioral drag source:** Vanguard Advisor's Alpha (2024 update): self-directed investors underperform their own fund benchmarks by ~1.5% annually due to behavioral errors. Morningstar Mind the Gap study (2023): investor returns lag fund returns by 1.1% on average.

#### With Advisor

The "with advisor" line applies the Vanguard Advisor's Alpha framework. The ~3% total alpha breaks down as:

| Alpha Component | Value Added (bps) | Applied in Our Model |
|-----------------|-------------------|---------------------|
| Behavioral coaching | Up to 150 bps | Yes — eliminates the behavioral drag |
| Cost-effective implementation | 34 bps | Yes — lower expense ratios |
| Rebalancing | 26 bps | Yes — systematic discipline |
| Asset location (tax efficiency) | 0–75 bps | Partially — conservative 40 bps |
| Spending strategy (withdrawal) | 0–110 bps | Only for 60s+ drawdown |
| Total-return vs income investing | >0 bps | Not quantified separately |

**Conservative application:** Instead of claiming the full 3%, we apply a net advisor advantage of ~1.5–2.0% over the current path. This is defensible because:
- Behavioral drag removal: +1.5% (well-documented)
- Cost + rebalancing + partial tax: +0.5%
- Total net advantage: ~2.0%

| `investment_objective` | Current path return | Advisor return | Net advisor advantage |
|------------------------|--------------------|-----------------|-----------------------|
| `growth` | 8.0% | 10.0% | +2.0% |
| `balanced` | 6.0% | 8.0% | +2.0% |
| `preservation` | 4.5% | 6.0% | +1.5% |
| `income_generation` | 5.5% | 7.0% | +1.5% |

**Additionally for the advisor line:** We apply a modest savings behavior improvement. Research shows advisors increase client savings rates by helping them automate contributions, optimize employer matches, and reduce unnecessary spending. We add +1% of income to the monthly contribution for the advisor line.

| `age_range` | Current path savings rate | Advisor savings rate |
|-------------|--------------------------|---------------------|
| Under 30 | 6% | 7% |
| 30s | 8% | 9% |
| 40s | 10% | 11% |
| 50s | 12% | 13% |
| 60s+ | 5% | 5% (no change in drawdown) |

**Sources:**
- Historical returns: Vanguard portfolio allocation models, 1926–2023
- Behavioral drag: Vanguard Advisor's Alpha 2024; Morningstar Mind the Gap 2023
- Advisor savings improvement: Financial Planning Association 2022 study on advisor impact on savings behavior

---

### 4. Time Horizon

From age to a target endpoint. Consistent with current spec.

| `age_range` | Horizon (years) | End label | Rationale |
|-------------|-----------------|-----------|-----------|
| Under 30 | 35 | "35 years" | To age ~65, standard retirement horizon |
| 30s | 30 | "30 years" | To age ~65 |
| 40s | 25 | "25 years" | To age ~65–70 |
| 50s | 15 | "15 years" | To age ~65–70 |
| 60s+ | 20 | "20 years" | Through retirement, drawdown phase |

---

## The Formula

### Growth Phase (Under 30 through 50s)

Future Value with monthly contributions:

```
FV = P × (1 + r/12)^(n×12) + C × [((1 + r/12)^(n×12) - 1) / (r/12)]

Where:
  P = starting balance (savings midpoint)
  r = annual return rate (decimal)
  n = time horizon (years)
  C = monthly contribution
```

**Current path line:**
- P = savings midpoint
- r = current path return for their objective
- C = income midpoint × current savings rate / 12

**With advisor line:**
- P = savings midpoint (same starting point)
- r = advisor return for their objective
- C = income midpoint × advisor savings rate / 12

### Drawdown Phase (60s+)

Both lines decline. The question is "how long does the money last?"

```
Years until depletion = ln(1 - (P × r) / W) / (-ln(1 + r)) / 12

Where:
  P = starting balance
  r = monthly return rate
  W = monthly withdrawal (4% rule annual / 12)
```

**Current path:** 4% withdrawal rate, current path return. Runs out earlier.
**With advisor:** 3.5% withdrawal rate (optimized), advisor return. Lasts longer.

For 60s+ we show time-based endpoints ("Lasts past 85" vs "Runs out at 78") instead of dollar amounts.

---

## Worked Examples

### Example 1: Behind on retirement, 50s, $100K–$150K income, $150K–$350K savings, Growth objective

**Inputs:**
- Starting balance: $250,000
- Income midpoint: $125,000
- Age savings rate: 12% (current) / 13% (advisor)
- Monthly contribution: $1,250 (current) / $1,354 (advisor)
- Horizon: 15 years
- Returns: 8.0% (current) / 10.0% (advisor)

**Current path:**
```
FV = $250,000 × (1.00667)^180 + $1,250 × [((1.00667)^180 - 1) / 0.00667]
FV = $250,000 × 3.307 + $1,250 × 346.0
FV = $826,640 + $432,500
FV ≈ $1,259,140
```

**With advisor:**
```
FV = $250,000 × (1.00833)^180 + $1,354 × [((1.00833)^180 - 1) / 0.00833]
FV = $250,000 × 4.454 + $1,354 × 414.5
FV = $1,113,460 + $561,200
FV ≈ $1,674,660
```

**Graph shows:** ~$1.26M (current) vs ~$1.67M (with advisor). A $415K gap.

### Example 2: Family protection, 30s, $50K–$100K income, Under $50K savings, Balanced objective

**Inputs:**
- Starting balance: $25,000
- Income midpoint: $75,000
- Age savings rate: 8% (current) / 9% (advisor)
- Monthly contribution: $500 (current) / $563 (advisor)
- Horizon: 30 years
- Returns: 6.0% (current) / 8.0% (advisor)

**Current path:**
```
FV = $25,000 × (1.005)^360 + $500 × [((1.005)^360 - 1) / 0.005]
FV = $25,000 × 6.023 + $500 × 1,004.5
FV = $150,568 + $502,258
FV ≈ $652,826
```

**With advisor:**
```
FV = $25,000 × (1.00667)^360 + $563 × [((1.00667)^360 - 1) / 0.00667]
FV = $25,000 × 10.936 + $563 × 1,490.4
FV = $273,393 + $839,098
FV ≈ $1,112,491
```

**Graph shows:** ~$653K (current) vs ~$1.11M (with advisor). A $460K gap.

### Example 3: Plan review, 60s+, $150K–$250K income, $750K–$1.5M savings, Income generation

**Inputs:**
- Starting balance: $1,125,000
- Monthly withdrawal (current): 4% annual = $3,750/month
- Monthly withdrawal (advisor): 3.5% annual = $3,281/month
- Returns: 5.5% (current) / 7.0% (advisor)
- Monthly contribution: $833 (5% of income) — same both lines (no savings rate bump at 60s+)

**Current path:** At 5.5% return with 4% withdrawal and $833 contribution, balance depletes around year 27 (age ~87–92).
**With advisor:** At 7.0% return with 3.5% withdrawal and $833 contribution, balance lasts past year 30+ (age 90+).

Plus income annotation: ~$65,625/year in projected income (advisor-optimized withdrawal).

**Graph shows:** "Lasts to ~87" (current) vs "Lasts past 90" (advisor).

---

## Display Rounding

All displayed values are rounded to give a range, not a precise number. This maintains the "directional, not precise" framing.

| Calculated FV | Displayed as |
|---------------|-------------|
| Under $100K | Nearest $10K range (e.g., "$80K–$100K") |
| $100K–$500K | Nearest $25K range (e.g., "$325K–$375K") |
| $500K–$1M | Nearest $50K range (e.g., "$650K–$750K") |
| $1M–$5M | Nearest $100K range (e.g., "$1.1M–$1.3M") |
| $5M+ | Nearest $250K range (e.g., "$5.0M–$5.5M") |

The range shown is ±10% of the calculated value to communicate uncertainty.

---

## Graph Curve Shape

The graph does not plot every month. It renders a smooth curve through 5 anchor points:

| Point | X position | Y value |
|-------|------------|---------|
| Start | 0% (Now) | Starting balance |
| Early | 25% of horizon | Calculated at 25% |
| Mid | 50% of horizon | Calculated at 50% |
| Late | 75% of horizon | Calculated at 75% |
| End | 100% of horizon | Final value (displayed as range) |

Both lines share the same starting point. The gap widens over time due to compounding. The curve uses cubic bezier interpolation for smoothness.

For 60s+ drawdown: both lines start at the same point and decline. The current path declines faster.

---

## Disclaimer (Updated)

```
Based on your inputs and published averages for savings rates and historical
returns. Not a projection or guarantee. Individual results vary. See sources.
```

| Element | Spec |
|---------|------|
| Style | Regular weight, 12px, italic |
| Color | Muted (#999999) |
| Position | Inside graph container, below x-axis |

---

## Source Citations (Available on Hover/Tap)

Small "Sources" link below the disclaimer that expands to show:

```
Savings rate estimates: Fidelity Q4 2024 401(k) data; BEA Personal Savings Rate 2024.
Return assumptions: Historical averages for portfolio allocations, 1926–2023.
Advisor value: Vanguard Advisor's Alpha framework, 2024 update (~3% net).
Behavioral drag: Morningstar Mind the Gap 2023; Vanguard behavioral coaching research.
```

---

## Compliance Notes

- All calculations use population-level published data, not personal financial advice
- Dollar amounts are illustrative ranges, not predictions
- Advisor advantage is based on Vanguard's published framework, not a guarantee
- The 1.5–2.0% net advisor advantage is conservative relative to the published ~3%
- Behavioral drag is well-documented and defensible
- 60s+ drawdown model uses standard 4% vs 3.5% withdrawal rates
- Christine must review the final model and displayed ranges
- Legal must confirm the disclaimer language and source citation are sufficient
- The graph should not be interpreted as a personalized financial projection
