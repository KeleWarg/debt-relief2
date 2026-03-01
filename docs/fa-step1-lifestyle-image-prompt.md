# Forbes Advisor Lifestyle Mockup — Person + Floating Bubbles

## Primary Prompt

```
Editorial lifestyle photograph of a woman in her late 40s sitting at a clean modern kitchen table, holding an iPhone and looking at the screen with a calm, confident expression. She is wearing a casual but put-together outfit — soft knit sweater, minimal jewelry. Warm natural morning light from a window to the left. Shallow depth of field on the background.

Rising from the phone screen are 4-5 translucent floating UI bubble cards in white with soft rounded corners and subtle drop shadows, arranged in a gentle arc upward and outward. The bubbles contain clean sans-serif text:

- Bubble 1 (closest to phone): small chart icon + "Portfolio: On Track"
- Bubble 2: checkmark icon + "Tax Strategy: Optimized"  
- Bubble 3: shield icon + "Family Protection: Active"
- Bubble 4: trending-up icon + "Growth: +12.4% YTD"
- Bubble 5 (highest, slightly fading): star icon + "Advisor Match: 98%"

The bubbles should feel like they're gently floating upward from the phone, slightly overlapping, with a subtle glass-morphism effect (frosted white, 85% opacity). Each bubble is roughly the size of a credit card. They create a visual cascade rising from the device into the space around her.

Background is softly blurred — modern kitchen or living room, warm tones, plants visible. The overall mood is calm control — not excitement, not anxiety. She looks like someone who just checked on something important and feels good about what she saw.

Style: editorial photography meets UI design composite. Warm color grading, natural skin tones, no heavy filters. The floating bubbles should feel digitally composited but tastefully integrated — think Apple product marketing meets fintech editorial. 4K resolution.
```

## Alternate Prompt (more minimal bubbles)

```
Warm editorial photograph of a person in their 40s-50s sitting comfortably on a modern sofa, holding a smartphone and smiling slightly. Natural window light, shallow depth of field. From the phone, 3 minimal white rounded-rectangle cards float upward at slight angles, each with a small icon and one line of text — suggesting financial health metrics. The cards have frosted glass effect with soft shadows. Mood is calm, confident, in-control. Modern interior background, warm tones. Fintech lifestyle photography aesthetic. No brand logos. 4K.
```

## Alternate Prompt (man variant)

```
Editorial lifestyle photograph of a man in his early 50s at a modern home office desk, holding an iPhone with one hand and resting his chin on the other, looking pleased. Clean desk with a coffee cup and a plant. Warm afternoon light. From the phone screen, 4 translucent white UI cards with rounded corners float upward in a gentle cascade. Each card shows a small icon and a short financial metric — portfolio growth, tax savings, advisor match score, protection status. Cards have glass-morphism styling with soft drop shadows. The man looks like someone reviewing good news — calm satisfaction, not surprise. Editorial photography composite style, natural color grading, 4K.
```

## Design Notes

**Bubble content hierarchy (top to bottom, closest to farthest from phone):**

| Bubble | Icon | Text | Why |
|--------|------|------|-----|
| 1 (nearest) | 📊 mini chart | "Portfolio: On Track" | Core promise — your money is managed |
| 2 | ✓ checkmark | "Tax Strategy: Optimized" | Advisor-specific value — not just growth |
| 3 | 🛡 shield | "Family Protection: Active" | Speaks to family_protection motivation |
| 4 | 📈 trending up | "+12.4% YTD" | Tangible result, believable number |
| 5 (farthest, fading) | ⭐ star | "Advisor Match: 98%" | Ties directly to what the funnel delivers |

**Why this works on Step 1:**

The pure product mockup (Wealthsimple style) shows the dashboard. This shows a *person experiencing the dashboard*. The user doesn't just see the end state — they see someone *like them* in the end state. The floating bubbles bridge the gap between "person in real life" and "financial data" without requiring the user to imagine themselves in an app.

The cascade of bubbles also creates a visual metaphor: the answers are rising up, the picture is becoming clearer. That mirrors what's about to happen in the funnel — each question surfaces more clarity.

**What to watch for in generation:**

1. **The person should look real, not stock.** Natural pose, not staged. Looking at the phone or slightly past it — not directly at camera.
2. **Bubbles should feel composited, not generated.** If Whisk renders them as literal floating objects in 3D space, they'll look wrong. They should feel like a design overlay — flat cards with subtle shadow, sitting on the photographic layer.
3. **Don't overcrowd.** 3-4 bubbles is better than 6. Leave breathing room. The cascade should feel effortless, not busy.
4. **The phone screen should be visible but not hero.** The screen shows a hint of a dashboard (blue chart line, a number) but the bubbles are the focal point, not the screen itself.
5. **No Forbes branding anywhere.** Added in post.
6. **Warm, not cool.** The color grading should lean warm (morning light, amber tones) not clinical blue-white. Financial trust reads warm in lifestyle photography.

## Which One to Use Where

| Image | Best placement |
|-------|---------------|
| **Product mockup** (Wealthsimple style) | sideContent on Step 1 desktop — clean, focused, data-forward |
| **Lifestyle + bubbles** | Hero on Screen A or landing page — emotional, aspirational, human |

Consider using both: product mockup on Step 1 where the user is answering questions (data context), lifestyle + bubbles on Screen A where we're delivering the personalized insight (emotional context). Or A/B test them on Step 1 to see which drives higher engagement into Step 2.
