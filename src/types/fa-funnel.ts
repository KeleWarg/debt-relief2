export type MotivationDriver =
  | 'behind_retirement'
  | 'family_protection'
  | 'windfall'
  | 'optimization'
  | 'plan_review'

export type AgeRange = 'under_30' | 'thirties' | 'forties' | 'fifties' | 'sixties'

export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed' | 'prefer_not_to_say'

export type Homeownership = 'own' | 'rent' | 'other'

export type InvestmentObjective =
  | 'growth'
  | 'preservation'
  | 'income_generation'
  | 'balanced'

export type IncomeRange =
  | 'under_50k'
  | '50k_100k'
  | '100k_150k'
  | '150k_250k'
  | '250k_500k'
  | '500k_plus'
  | 'prefer_not_to_say'

export type SavingsRange =
  | 'under_50k'
  | '50k_150k'
  | '150k_350k'
  | '350k_750k'
  | '750k_1.5m'
  | '1.5m_plus'

export type TotalAssetsRange =
  | 'under_100k'
  | '100k_500k'
  | '500k_1m'
  | '1m_5m'
  | '5m_plus'
  | 'not_sure'

export type RelationshipPreference = 'phone_consultation' | 'virtual' | 'in_person' | 'no_preference'

export type ContactPreference = 'email_only' | 'phone'

export interface FAFunnelData {
  motivationDriver?: MotivationDriver
  ageRange?: AgeRange
  incomeRange?: IncomeRange
  savingsRange?: SavingsRange
  investmentObjective?: InvestmentObjective
  specialties?: string[]
  maritalStatus?: MaritalStatus
  homeownership?: Homeownership
  totalAssets?: TotalAssetsRange
  assetBreakdown?: {
    cash?: TotalAssetsRange
    investments?: TotalAssetsRange
    retirement?: TotalAssetsRange
    realEstate?: TotalAssetsRange
  }
  advisorRelationship?: string[]
  relationshipPreference?: RelationshipPreference
  tcpaConsentTimestamp?: string
  zipCode?: string
  city?: string
  state?: string
  savedEmail?: string
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
  phoneConsent?: boolean
  tcpaConsent?: boolean
  contactPreference?: ContactPreference
}

// ---------------------------------------------------------------------------
// Step sequence
// ---------------------------------------------------------------------------

export type FAStep =
  | 'motivation'
  | 'affirmation'
  | 'income'
  | 'screenA'
  | 'objectives'
  | 'specialties'
  | 'reinforcement'
  | 'married'
  | 'home'
  | 'assets'
  | 'screenB'
  | 'relationship'
  | 'screenC'
  | 'zipCode'
  | 'email'
  | 'namePhone'
  | 'loading'
  | 'handoff'

export const FA_STEP_ORDER: FAStep[] = [
  'motivation',
  'affirmation',
  'income',
  'screenA',
  'objectives',
  'specialties',
  'reinforcement',
  'married',
  'home',
  'assets',
  'screenB',
  'relationship',
  'screenC',
  'zipCode',
  'email',
  'namePhone',
  'loading',
  'handoff',
]

export const FA_NON_INPUT_STEPS: FAStep[] = [
  'affirmation',
  'screenA',
  'reinforcement',
  'screenB',
  'screenC',
  'loading',
  'handoff',
]

// ---------------------------------------------------------------------------
// Progress (step numbers for segmented ProgressIndicator, 1-12 input steps)
// ---------------------------------------------------------------------------

export const FA_STEP_NUMBER: Record<FAStep, number> = {
  motivation: 1,
  affirmation: 3,
  income: 3,
  screenA: 3,
  objectives: 4,
  specialties: 5,
  reinforcement: 5,
  married: 6,
  home: 7,
  assets: 8,
  screenB: 8,
  relationship: 9,
  screenC: 9,
  zipCode: 10,
  email: 11,
  namePhone: 12,
  loading: 12,
  handoff: 12,
}

export const FA_TOTAL_STEPS = 12

/** Internal step number for the age phase within the combined motivation screen */
export const FA_AGE_PHASE_STEP = 2

export const FA_SUBTITLES: Record<number, string> = {
  1: "What's driving you?",
  2: 'How old are you?',
  3: 'Your household income',
  4: 'Your investment objectives',
  5: 'Advisor specialties',
  6: 'Are you married?',
  7: 'Do you own your home?',
  8: 'Your investable assets',
  9: 'Your preferred relationship',
  10: 'Where are you located?',
  11: 'Your email',
  12: 'Your name and phone',
}

export const FA_TIME_ESTIMATES: Record<number, number> = {
  1: 10,
  2: 5,
  3: 10,
  4: 10,
  5: 15,
  6: 5,
  7: 5,
  8: 15,
  9: 15,
  10: 10,
  11: 10,
  12: 20,
}

// ---------------------------------------------------------------------------
// Section labels (v4)
// ---------------------------------------------------------------------------

export const FA_SECTION_LABELS: Record<FAStep, string> = {
  motivation: 'YOU',
  affirmation: 'YOU',
  income: 'YOU',
  screenA: 'YOU',
  objectives: 'YOUR GOALS',
  specialties: 'YOUR GOALS',
  reinforcement: 'YOUR GOALS',
  married: 'YOUR SITUATION',
  home: 'YOUR SITUATION',
  assets: 'YOUR SITUATION',
  screenB: 'YOUR SITUATION',
  relationship: 'YOUR MATCH',
  screenC: 'YOUR MATCH',
  zipCode: 'YOUR MATCH',
  email: 'YOUR MATCH',
  namePhone: 'YOUR MATCH',
  loading: 'YOUR MATCH',
  handoff: 'YOUR MATCH',
}

// ---------------------------------------------------------------------------
// Option arrays
// ---------------------------------------------------------------------------

export const MOTIVATION_OPTIONS = [
  { value: 'behind_retirement', label: "I'm worried I'm behind on retirement savings" },
  { value: 'family_protection', label: 'I want to make sure my family is protected' },
  { value: 'windfall', label: "I've come into money and need guidance" },
  { value: 'optimization', label: 'I want to stop leaving money on the table' },
  { value: 'plan_review', label: 'I want professional 2nd opinion to review my plan' },
] as const

export const AGE_OPTIONS = [
  { value: 'under_30', label: 'Under 30' },
  { value: 'thirties', label: '30s' },
  { value: 'forties', label: '40s' },
  { value: 'fifties', label: '50s' },
  { value: 'sixties', label: '60s+' },
] as const

export const INCOME_OPTIONS = [
  { value: 'under_50k', label: 'Under $50K' },
  { value: '50k_100k', label: '$50K–$100K' },
  { value: '100k_150k', label: '$100K–$150K' },
  { value: '150k_250k', label: '$150K–$250K' },
  { value: '250k_500k', label: '$250K–$500K' },
  { value: '500k_plus', label: '$500K+' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
] as const

export const OBJECTIVE_OPTIONS = [
  { value: 'growth', label: 'Grow my wealth long-term' },
  { value: 'preservation', label: 'Protect what I have' },
  { value: 'income_generation', label: 'Generate income' },
  { value: 'balanced', label: 'Balance growth and safety' },
] as const

export const SPECIALTY_OPTIONS = [
  'Retirement planning',
  'Tax planning',
  'Estate planning',
  'Investment management',
  'Insurance',
  'Education planning',
  'Debt management',
  'Small business',
  "I don't know",
] as const

export const RELATIONSHIP_OPTIONS = [
  { value: 'online_1k', label: 'Online advisor (starting from $1K in savings)' },
  { value: 'dedicated_25k', label: 'Dedicated advisor ($25K+ in savings)' },
  { value: 'dedicated_50k', label: 'Dedicated advisor ($50K+ in savings)' },
  { value: 'in_person_100k', label: 'In-person advisor ($100K+ in savings)' },
  { value: 'not_sure', label: "I'm not sure yet" },
] as const

export const MARITAL_OPTIONS = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
] as const

export const HOMEOWNERSHIP_OPTIONS = [
  { value: 'own', label: 'Yes, I own' },
  { value: 'rent', label: 'No, I rent' },
  { value: 'other', label: 'Other' },
] as const

export const SAVINGS_OPTIONS = [
  { value: 'under_50k', label: 'Under $50K' },
  { value: '50k_150k', label: '$50K–$150K' },
  { value: '150k_350k', label: '$150K–$350K' },
  { value: '350k_750k', label: '$350K–$750K' },
  { value: '750k_1.5m', label: '$750K–$1.5M' },
  { value: '1.5m_plus', label: '$1.5M+' },
] as const

export const ASSETS_OPTIONS = [
  { value: 'under_100k', label: 'Under $100K' },
  { value: '100k_500k', label: '$100K – $500K' },
  { value: '500k_1m', label: '$500K – $1M' },
  { value: '1m_5m', label: '$1M – $5M' },
  { value: '5m_plus', label: '$5M+' },
  { value: 'not_sure', label: 'Not sure' },
] as const

// ---------------------------------------------------------------------------
// Label helpers
// ---------------------------------------------------------------------------

export const MOTIVATION_LABELS: Record<MotivationDriver, string> = {
  behind_retirement: 'Catching up on retirement',
  family_protection: 'Protecting your family',
  windfall: 'Managing new wealth',
  optimization: 'Optimizing your finances',
  plan_review: 'Getting a professional review',
}

export const AFFIRMATION_COPY: Record<MotivationDriver, string> = {
  behind_retirement: "You're not alone — and you're taking the right step. Let's find you the right help.",
  family_protection: "That's one of the most important reasons people work with an advisor. Let's make sure you're covered.",
  windfall: "Smart move — getting guidance early is the single best thing you can do. Let's find the right fit.",
  optimization: "Good instinct — most people leave more on the table than they realize. Let's find someone who can help.",
  plan_review: "That's a great reason to be here. Even strong plans benefit from a second pair of eyes.",
}

export const AFFIRMATION_CONTENT: Record<MotivationDriver, Record<AgeRange, { headline: string; body: string }>> = {
  behind_retirement: {
    under_30: {
      headline: "Feeling behind on retirement in your 20s is more common than you'd think — and your timeline is the single biggest asset an advisor can work with.",
      body: '',
    },
    thirties: {
      headline: "Catching up on retirement in your 30s is completely doable — a 30-year runway gives an advisor room to build an aggressive, structured plan.",
      body: '',
    },
    forties: {
      headline: "Worrying about retirement in your 40s means you still have 20+ years to close the gap — and an advisor who specializes in catch-up planning can make every year count.",
      body: '',
    },
    fifties: {
      headline: "Catching up on retirement in your 50s is when the biggest levers unlock — catch-up contributions, Social Security timing, and tax repositioning all converge in this window.",
      body: '',
    },
    sixties: {
      headline: "Retirement planning after 60 isn't about how much you saved — it's about how strategically you use what you have. The right advisor can add years to your money.",
      body: '',
    },
  },
  family_protection: {
    under_30: {
      headline: "Wanting to protect your family this early puts you ahead of most people — and the cost of coverage at your age is a fraction of what it'll be later.",
      body: '',
    },
    thirties: {
      headline: "With a growing family in your 30s, the gap between what you have and what they'd need is usually bigger than people realize — an advisor can map every gap and close them.",
      body: '',
    },
    forties: {
      headline: "Protecting your family in your 40s means covering more ground — mortgage, education, income replacement, aging parents. An advisor builds a plan that accounts for all of it.",
      body: '',
    },
    fifties: {
      headline: "Family protection in your 50s shifts from coverage to transfer — making sure what you've built goes where you intend, with as little friction as possible.",
      body: '',
    },
    sixties: {
      headline: "Protecting your family at this stage means getting your legacy structure right — estate documents, wealth transfer, and making sure nothing is left to chance.",
      body: '',
    },
  },
  windfall: {
    under_30: {
      headline: "Coming into money in your 20s is rare — and the decisions you make in the next 12 months will compound for 30+ years. An advisor keeps those early moves right.",
      body: '',
    },
    thirties: {
      headline: "Managing new wealth in your 30s means balancing long-term growth with real life — housing, family, career moves. An advisor structures that balance from day one.",
      body: '',
    },
    forties: {
      headline: "New wealth in your 40s can reshape your entire retirement timeline and tax picture — but only if it's positioned correctly in the first year. That's what an advisor does.",
      body: '',
    },
    fifties: {
      headline: "A windfall in your 50s can close your retirement gap, fund legacy goals, or both — the tax and positioning decisions in the first year are what make the difference.",
      body: '',
    },
    sixties: {
      headline: "New wealth after 60 is about preservation and structure — tax efficiency, estate planning, and making sure it serves you and your family for the long term.",
      body: '',
    },
  },
  optimization: {
    under_30: {
      headline: "Wanting to stop leaving money on the table in your 20s is rare — and every dollar you capture now compounds for decades. An advisor finds the levers you can't see yet.",
      body: '',
    },
    thirties: {
      headline: "If you feel like money is slipping through the cracks, it probably is — most people in their 30s have 3-5 accounts with no coordinated strategy. An advisor connects the pieces.",
      body: '',
    },
    forties: {
      headline: "In your 40s, the places money leaks multiply — retirement contributions, tax strategy, mortgage positioning, investment fees. An advisor audits all of it and finds what you're missing.",
      body: '',
    },
    fifties: {
      headline: "Optimizing in your 50s is the highest-stakes decade — catch-up contributions, Roth conversions, and Social Security timing all converge. An advisor who specializes here can find tens of thousands.",
      body: '',
    },
    sixties: {
      headline: "Optimization after 60 shifts to withdrawal sequencing, tax-bracket management, and RMD strategy — the right execution can save more than the right investments ever did.",
      body: '',
    },
  },
  plan_review: {
    under_30: {
      headline: "Getting a professional review in your 20s catches gaps before they compound — most people your age discover at least one thing they're missing entirely.",
      body: '',
    },
    thirties: {
      headline: "Wanting a second opinion in your 30s is smart — your financial picture is getting complex, and a review typically surfaces 2-3 blind spots worth real money.",
      body: '',
    },
    forties: {
      headline: "By your 40s, you've made dozens of financial decisions — some great, some worth revisiting. A professional review looks at all of them together and finds what time buried.",
      body: '',
    },
    fifties: {
      headline: "A plan review in your 50s isn't a nice-to-have — the margin for error narrows every year, and most people at this stage discover at least one significant gap.",
      body: '',
    },
    sixties: {
      headline: "Retirement changes everything about how your plan should work — withdrawal order, tax strategy, Social Security, estate alignment. A review makes sure all the pieces fit this stage, not the last one.",
      body: '',
    },
  },
}

const AFFIRMATION_FALLBACK_AGE: AgeRange = 'forties'

export function getAffirmationContent(
  motivation?: MotivationDriver,
  age?: AgeRange
): { headline: string; body: string } {
  if (!motivation) return { headline: '', body: '' }
  const ageKey = age ?? AFFIRMATION_FALLBACK_AGE
  return AFFIRMATION_CONTENT[motivation][ageKey]
}

export const INCOME_SUB_COPY: Record<MotivationDriver, string> = {
  behind_retirement: 'This helps us find advisors who specialize in catch-up planning for your income level.',
  family_protection: 'Income shapes the level of protection your family needs — and the advisor tier that fits.',
  windfall: 'Even with new wealth, your regular income affects tax strategy and planning approach.',
  optimization: "Income is where tax optimization starts — it tells your advisor where to look first.",
  plan_review: "This gives your advisor context for a meaningful review. We share the range, not an exact number.",
}

export const OBJECTIVES_SUB_COPY: Record<MotivationDriver, string> = {
  behind_retirement: 'This shapes how aggressively your advisor approaches your catch-up plan. No wrong answer.',
  family_protection: 'This tells your advisor how to balance growth with the security your family needs.',
  windfall: "Different objectives suit different situations — choose what feels right for your new wealth.",
  optimization: "Your objective drives your advisor's strategy. Pick the one that best fits your goals.",
  plan_review: "Not sure? That's fine — your advisor can help refine this during your review.",
}

export const ASSETS_SUB_COPY: Record<MotivationDriver, string> = {
  behind_retirement: 'A rough estimate is fine — this helps us match you with advisors who specialize in your asset range.',
  family_protection: 'Your total assets shape the scope of protection planning your advisor will recommend.',
  windfall: "This helps us find advisors experienced at your level of wealth. A ballpark is all we need.",
  optimization: 'Asset level determines which optimization strategies are available to you. A rough number works.',
  plan_review: "This gives your advisor a sense of scale before they review your plan. Estimates are fine.",
}

export const EMAIL_SUB_COPY: Record<MotivationDriver, string> = {
  behind_retirement: "Your catch-up plan matches are ready — we just need an email to send them to you.",
  family_protection: "We've matched you with advisors who specialize in family protection. Where should we send them?",
  windfall: "Your matches include advisors experienced in managing new wealth. Where should we send them?",
  optimization: "We've found advisors focused on the tax and growth strategies you're looking for.",
  plan_review: 'Your advisor matches are ready for review. Enter your email to see them.',
}

export const NAME_PHONE_SUB_COPY: Record<MotivationDriver, string> = {
  behind_retirement: 'Last step. Your advisor will reach out to discuss a catch-up plan tailored to your situation.',
  family_protection: 'Last step. Your advisor will connect to discuss a protection plan for your family.',
  windfall: 'Last step. Your advisor will reach out to help you make the most of your new wealth.',
  optimization: 'Last step. Your advisor will connect to identify the biggest opportunities in your financial picture.',
  plan_review: 'Last step. Your advisor will reach out to schedule a comprehensive review of your current plan.',
}

export const REINFORCEMENT_COPY: Record<MotivationDriver, string> = {
  behind_retirement: 'People who work with a financial advisor accumulate 2.7\u00d7 more retirement wealth over 20 years. At your income level, targeted catch-up strategies can close the gap faster than most people expect.',
  family_protection: "Only 33% of U.S. households have adequate coverage in place. An advisor doesn't just sell policies — they build a coordinated plan that covers the gaps you might not see.",
  windfall: "70% of sudden wealth recipients see significant erosion within 5 years without professional guidance. The first 12 months matter most — and you're starting in the right place.",
  optimization: "At your income level, households typically leave $2,500–$5,000/year in avoidable taxes on the table. A tax-aware advisor usually recovers their fee in year one.",
  plan_review: '73% of people who get a professional review discover at least one significant gap in their plan. Even a single session can surface insights worth thousands over a decade.',
}

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

export function getAgeLabel(value?: AgeRange): string {
  return AGE_OPTIONS.find((o) => o.value === value)?.label ?? ''
}

export function getMaritalLabel(value?: MaritalStatus): string {
  return MARITAL_OPTIONS.find((o) => o.value === value)?.label ?? ''
}

export function getHomeownershipLabel(value?: Homeownership): string {
  return HOMEOWNERSHIP_OPTIONS.find((o) => o.value === value)?.label ?? ''
}

export function getObjectiveLabel(value?: InvestmentObjective): string {
  return OBJECTIVE_OPTIONS.find((o) => o.value === value)?.label ?? ''
}

export function getIncomeLabel(value?: IncomeRange): string {
  return INCOME_OPTIONS.find((o) => o.value === value)?.label ?? ''
}

export function getAssetsLabel(value?: TotalAssetsRange): string {
  return ASSETS_OPTIONS.find((o) => o.value === value)?.label ?? ''
}

export function getRelationshipLabels(values?: string[]): string {
  if (!values?.length) return ''
  return values
    .map((v) => RELATIONSHIP_OPTIONS.find((o) => o.value === v)?.label ?? v)
    .join(', ')
}
