# Cursor Prompt: Dynamic State Guidance on ZIP Step

## Context
We're updating the financial advisor matching funnel's ZIP code step. Currently, the supporting text below the zip input is static: "State tax rules can significantly impact how new wealth is positioned. Your ZIP helps us account for that."

We want to replace this with **state-specific advisor guidance** that dynamically updates after the user enters a valid zip and the state is resolved.

## Data File
A new file `src/data/stateAdvisorContext.ts` has been added with:
- `stateAdvisorContext` — a Record<string, StateAdvisorContext> with entries for all 50 states + DC
- `defaultAdvisorContext` — fallback for unknown/unresolved states
- `getAdvisorContext(stateAbbr)` — lookup helper

Each entry has a `guidance` string (the copy to display) and a `taxTag` string (for potential future use).

## Task
Update the ZIP step component to use dynamic state-specific guidance.

### Behavior

**Before zip is entered (or invalid):**
Show the default copy:
"State tax rules can significantly impact how new wealth is positioned. Your ZIP helps us account for that."

**After valid zip → state resolved (e.g., "✓ Delaware" badge appears):**
Replace the supporting text with that state's `guidance` value from `stateAdvisorContext`.

Example for Delaware (19709):
"Delaware has no sales tax and moderate income tax (2.2%–6.6%). Advisors here often focus on tax-efficient income strategies and cross-state planning."

### Animation
- When the state resolves and the guidance text swaps, use a subtle fade transition (200ms ease-in-out opacity + translateY 4px)
- Don't animate on initial page load — only on state change

### Implementation

```tsx
import { getAdvisorContext, defaultAdvisorContext } from '@/data/stateAdvisorContext';

// Inside the component, after state is resolved from zip:
const advisorContext = resolvedState
  ? getAdvisorContext(resolvedState)
  : defaultAdvisorContext;

// In the JSX, replace the static <p> with:
<p
  key={resolvedState || 'default'}
  className="text-sm text-gray-500 mt-2 animate-fade-in"
>
  {advisorContext.guidance}
</p>
```

### Animation class (add to globals.css if not present)
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 200ms ease-in-out;
}
```

## Acceptance Criteria
- [ ] Default copy shows when no state is resolved
- [ ] State-specific guidance replaces default after zip validation
- [ ] Copy updates if user changes their zip to a different state
- [ ] Transition animates smoothly (fade + slight slide up)
- [ ] All 50 states + DC have entries (no blank/undefined states)
- [ ] Fallback works for territories, APO, or edge-case zips

## Do Not
- Change the zip input field behavior or validation
- Modify the "✓ Delaware" state badge
- Change the headline or CTA button
- Add any cards, charts, or extra UI — this is copy-only
- Touch the progress bar or "Your Profile" accordion
