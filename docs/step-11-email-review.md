# Step 11 — Email + Financial Profile Review

> **Conditional:** This step is SKIPPED if the user already provided email in the Step 10 modal.

## Overview

| Property | Value |
|----------|-------|
| Screen name | `EmailWithReviewScreen` |
| Field | `email` |
| Type | Text input (email) |
| Auto-advance | No — requires Continue |
| Phase label | YOUR ADVISOR MATCH |
| Progress | ~85% |
| Data available | Full profile |
| Special feature | Financial profile review with recommended strategies alongside email capture |
| Condition | Only shown if `email` is null |

---

## Layout

Financial profile review card alongside email capture.

```
┌──────────────────────────────────────────────────────────┐
│  YOUR ADVISOR MATCH                                      │
│  ██████████████████████████████░░                        │
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
│  We're almost ready to match you.                        │
│  Where should we send your advisor details?              │
│                                                          │
│  [Motivation-specific advisor line]                      │
│                                                          │
│  ┌────────────────────────────────────┐                  │
│  │  📧 your@email.com                 │ [pre-filled if saved] │
│  └────────────────────────────────────┘                  │
│                                                          │
│  We'll send your match details and profile               │
│  summary to this email.                                  │
│                                                          │
│                  [ Continue → ]                           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Headline

```
We're almost ready to match you.
Where should we send your advisor details?
```

---

## Motivation-Specific Advisor Line (above email input)

| `motivation_driver` | Line |
|---------------------|------|
| `behind_retirement` | Your catch-up specialist will reach out to walk through your strategy. |
| `family_protection` | Your protection planning advisor will reach out to review your family's coverage. |
| `windfall` | Your wealth management advisor will reach out to discuss positioning. |
| `optimization` | Your optimization specialist will reach out to identify your biggest opportunities. |
| `plan_review` | Your advisor will reach out to schedule your comprehensive review. |

These name the advisor's role in terms of the user's motivation. "Your catch-up specialist" is more specific and reassuring than "your advisor."

---

## Sub Copy (below email input)

```
We'll send your match details and profile summary to this email.
```

---

## Financial Profile Review Card

### Profile Section

All collected data in a clean summary:

| Icon | Field | Value |
|------|-------|-------|
| 🎯 | Goal | [motivation label] |
| 🎂 | Age | [age range] |
| 💼 | Income | [income range] |
| 💰 | Savings | [savings range] |
| 📊 | Objective | [objective label] |
| 👤 | Status | [marital status] |
| 🏠 | Home | Homeowner / Renter |
| 📍 | Location | [State derived from ZIP] |

### Recommended Strategies Section

Three strategy recommendations keyed to `motivation_driver` × `age_range`. Each has a pill tag and one-line description.

#### Strategy Matrix

**`behind_retirement`**

| Age | Strategy 1 | Strategy 2 | Strategy 3 |
|-----|-----------|-----------|-----------|
| Under 30 | Automated Savings | Index Fund Strategy | Employer Match Max |
| 30s | Contribution Ramp-Up | Asset Allocation | Tax-Advantaged Accounts |
| 40s | Max Contributions | Roth Conversion | Portfolio Rebalance |
| 50s | Catch-Up Contributions | Roth Conversion Window | Tax-Loss Harvesting |
| 60s+ | Social Security Timing | Withdrawal Strategy | Medicare Planning |

**`family_protection`**

| Age | Strategy 1 | Strategy 2 | Strategy 3 |
|-----|-----------|-----------|-----------|
| Under 30 | Term Life Insurance | Emergency Fund Build | Will & Basic Trust |
| 30s | Coverage Gap Analysis | Education Funding | Estate Documents |
| 40s | Coverage Gap Analysis | Education Funding Strategy | Estate Document Review |
| 50s | Estate Planning | Survivorship Strategy | Long-Term Care |
| 60s+ | Wealth Transfer | Legacy Structure | Beneficiary Audit |

**`windfall`**

| Age | Strategy 1 | Strategy 2 | Strategy 3 |
|-----|-----------|-----------|-----------|
| Under 30 | Tax-Efficient Positioning | Growth Allocation | Wealth Structure |
| 30s | Tax-Efficient Positioning | Diversified Growth | Asset Protection |
| 40s | Tax-Efficient Placement | Retirement Acceleration | Estate Foundation |
| 50s | Tax Mitigation | Retirement Gap Close | Preservation Strategy |
| 60s+ | Tax-Efficient Transfer | Preservation First | Estate Structure |

**`optimization`**

| Age | Strategy 1 | Strategy 2 | Strategy 3 |
|-----|-----------|-----------|-----------|
| Under 30 | Fee Reduction | Tax-Advantaged Max | Asset Location |
| 30s | Tax-Loss Harvesting | Account Consolidation | Fee Audit |
| 40s | Tax Strategy Overhaul | Portfolio Rebalance | Fee Reduction Audit |
| 50s | Catch-Up Max | Roth Conversion | Tax-Loss Harvesting |
| 60s+ | Withdrawal Sequencing | RMD Strategy | Tax-Bracket Management |

**`plan_review`**

| Age | Strategy 1 | Strategy 2 | Strategy 3 |
|-----|-----------|-----------|-----------|
| Under 30 | Foundation Review | Account Optimization | Goal Alignment |
| 30s | Allocation Review | Beneficiary Update | Gap Analysis |
| 40s | Mid-Life Audit | Rebalance Assessment | Insurance Review |
| 50s | Pre-Retirement Readiness | Social Security Analysis | Tax Projection |
| 60s+ | Retirement Readiness | Drawdown Planning | Estate Alignment |

Each strategy gets a pill tag + one-line plain-language description.

### Closing Line

```
Your matched advisor will walk through these with you during your first conversation.
```

---

## Email Input

- Pre-filled if user saved email on Screen A
- Standard email validation
- Placeholder: `your@email.com`

---

## Consent

If TCPA wasn't captured on Step 10 modal:

```
By continuing, you agree to be contacted by a financial advisor
from our network at the email you provide. [Terms] [Privacy Policy]
```

If TCPA was already captured:

```
We'll send your match details and profile summary to this email.
```

---

## Behavior

1. Financial profile review card visible — all data + strategies
2. User enters email (or confirms pre-filled)
3. Taps Continue → transitions to Step 12 (if phone not yet provided) or Screen B (if all data collected)

## What Gets Stored

```javascript
{
  // ...previous fields...
  email: "user@email.com"
}
```
