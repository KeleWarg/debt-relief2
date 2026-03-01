# Forbes Advisor Dashboard Mockup — Image Gen Prompt

## Primary Prompt

```
Clean, modern fintech UI mockup on a soft muted sage green background. Center composition features a white iPhone 15 Pro showing a "My Financial Plan" dashboard screen. The phone screen displays: a professional woman's profile photo (40s-50s, warm smile), "Your Portfolio" header, a balance of "$487,500" in large bold sans-serif type, a subtle upward-trending line chart in dark navy blue, and below that an "Accounts" section showing two accounts with dollar amounts.

Floating to the right of the phone: a white rounded-corner card showing "Growth This Year" with "+$34,200" in green text, and below it line items "Advisor Savings: +$4,800" and "Tax Optimization: +$2,100" in smaller text.

Floating to the lower-left of the phone: a white rounded-corner card showing a "Savings" account with a bank icon connected by a subtle arrow to a "Retirement (IRA)" account below it, suggesting account consolidation.

Style: minimal, editorial, fintech product photography aesthetic. Soft drop shadows on floating cards. No gradients. Clean sans-serif typography (similar to Inter or SF Pro). White cards on sage/mint background. Professional but approachable. No logos or brand marks. Ultra clean whitespace. 4K resolution, sharp detail on UI elements.
```

## Alternate Prompt (simpler, less prescriptive)

```
Minimalist fintech app mockup, iPhone 15 Pro on muted sage green background. Screen shows a personal finance dashboard with portfolio balance, upward growth chart, and account list. Two white floating UI cards break out from the phone — one showing yearly earnings breakdown, another showing connected bank accounts flowing into a retirement account. Clean sans-serif typography, soft shadows, editorial product photography style. No brand logos. Modern, trustworthy, aspirational. 4K.
```

## Notes for Design Team

**What to adjust after generation:**

1. **Numbers matter.** If the AI generates random figures, replace them with:
   - Main balance: $385,000–$500,000 range (attainable, not intimidating)
   - Growth: +$28,000–$40,000/year (believable with advisor)
   - Advisor-specific line items: "Advisor Savings" and "Tax Optimization" — these are the differentiators vs. Wealthsimple's generic interest/dividend breakdown
   - Do NOT show $1M+ — alienates the "behind on retirement" cohort

2. **The profile photo** should feel like a real person, not a stock model. 40s–50s woman or man, professional but warm. This is the user seeing themselves, not the advisor.

3. **Color palette alignment:**
   - Background: sage/mint (#E8EDEA or similar — NOT Forbes blue)
   - Chart line: dark navy (#1B2A4A)
   - Positive numbers: green (#2D8C4E)
   - Card backgrounds: white
   - Text: near-black (#1A1A1A)
   - This should feel calm and trustworthy, not flashy

4. **The "connected accounts" card** is key. It visually tells the story: scattered accounts → consolidated under advisor management. Keep the arrow/flow visual between Savings → IRA.

5. **Typography** should be clean sans-serif throughout. If Whisk generates serif or decorative type, flag for redesign.

6. **NO Forbes branding in the generated image.** The brand mark gets added in post — we don't want AI generating approximations of the Forbes logo.

7. **Aspect ratio:** Generate at 16:9 or 3:2 for the sideContent slot. The phone should be center-right, floating cards to the left and upper-right, leaving breathing room.

## What This Image Does on Step 1

The user reads "What's driving you to find an advisor right now?" and sees:
- An organized financial life (dashboard)
- Visible growth (chart + green numbers)
- Advisor-specific value (tax savings, advisor savings line items)
- Everything connected (accounts consolidated)

It's not selling a product — it's showing the end state. "This is what it looks like when your finances are handled."
