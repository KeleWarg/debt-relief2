# Recommended Approach Tags — By Motivation

> After the user selects their motivation on Step 1, the sideContent image area displays a "RECOMMENDED APPROACH" label with 3-4 pill tags previewing what their advisor plan will focus on. Tags animate in after selection, reinforcing that the funnel is already responding to their input.

---

## `behind_retirement`
**"I'm worried I'm behind on retirement"**

```
RECOMMENDED APPROACH

[ 📈 Catch-Up Strategy ]  [ 🛡 Tax-Advantaged Accounts ]  [ ⏱ Social Security Timing ]
```

---

## `family_protection`
**"I want to make sure my family is protected"**

```
RECOMMENDED APPROACH

[ 🛡 Protection Planning ]  [ 📋 Estate Strategy ]  [ 👨‍👩‍👧 Beneficiary Review ]
```

---

## `windfall`
**"I've come into money and need guidance"**

```
RECOMMENDED APPROACH

[ 💰 Wealth Positioning ]  [ 📊 Tax Strategy ]  [ 🔒 Asset Protection ]
```

---

## `optimization`
**"I want to stop leaving money on the table"**

```
RECOMMENDED APPROACH

[ 📊 Tax Optimization ]  [ 🔄 Portfolio Rebalance ]  [ 💵 Fee Reduction ]
```

---

## `plan_review`
**"I just want a professional to review my plan"**

```
RECOMMENDED APPROACH

[ 🔍 Comprehensive Review ]  [ ⚖️ Risk Assessment ]  [ 📋 Gap Analysis ]
```

---

## Interaction Behavior

1. User lands on Step 1 — sideContent shows the lifestyle image with NO tags
2. User selects a motivation — tags animate in (fade + slide up, 300ms stagger) overlaid on the image, near the bottom, above the Forbes trust bar
3. User changes selection — old tags fade out, new tags fade in
4. Step 1 → Step 2 crossfade transition — tags persist through the transition since they're part of the sideContent frame that stays static

## Visual Treatment

- Tags sit in a semi-transparent dark overlay bar at the bottom of the image, above the existing Forbes trust stats
- Or: tags float on the image itself with frosted glass pill styling (white bg, 80% opacity, subtle blur backdrop)
- Label "RECOMMENDED APPROACH" in 11px uppercase tracking-wide, muted grey
- Pills: 13px, medium weight, rounded full, subtle border, icon + text
- Max 3 tags per motivation — keeps it scannable, doesn't overwhelm
- No tag should exceed ~20 characters including icon

## Why This Works

The tags do three things simultaneously:

1. **Immediate feedback** — the funnel reacted to what I said. It's not a static form.
2. **Value preview** — I can see what I'm going to get before I commit further. "Tax-Advantaged Accounts" and "Social Security Timing" sound like things I actually need.
3. **Specificity builds trust** — generic funnels say "we'll help you." This one says "here's how." The user hasn't even given their age yet and the system is already showing them a plan shape.

## Implementation

```javascript
const APPROACH_TAGS = {
  behind_retirement: [
    { icon: "📈", label: "Catch-Up Strategy" },
    { icon: "🛡", label: "Tax-Advantaged Accounts" },
    { icon: "⏱", label: "Social Security Timing" },
  ],
  family_protection: [
    { icon: "🛡", label: "Protection Planning" },
    { icon: "📋", label: "Estate Strategy" },
    { icon: "👨‍👩‍👧", label: "Beneficiary Review" },
  ],
  windfall: [
    { icon: "💰", label: "Wealth Positioning" },
    { icon: "📊", label: "Tax Strategy" },
    { icon: "🔒", label: "Asset Protection" },
  ],
  optimization: [
    { icon: "📊", label: "Tax Optimization" },
    { icon: "🔄", label: "Portfolio Rebalance" },
    { icon: "💵", label: "Fee Reduction" },
  ],
  plan_review: [
    { icon: "🔍", label: "Comprehensive Review" },
    { icon: "⚖️", label: "Risk Assessment" },
    { icon: "📋", label: "Gap Analysis" },
  ],
};
```

## Compliance Note

These tags describe *process and approach*, not outcomes. "Catch-Up Strategy" describes what the advisor will do, not what the result will be. This keeps us on the right side of Christine's guidance — we're explaining the service, not promising results.
