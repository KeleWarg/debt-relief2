/**
 * Longevity Hub Funnel Data Types
 * 
 * Type definitions for the longevity/wellness lead gen funnel
 * Matches the live Forbes Health longevity journey exactly
 */

// Age range options (matches live: 6 options)
export type AgeRangeOption = '18-29' | '30-39' | '40-49' | '50-59' | '60-69' | '70+'

// Gender options
export type GenderOption = 'male' | 'female'

// Health priority goals (multi-select)
export type HealthPriorityOption =
  | 'life-expectancy'
  | 'lose-weight'
  | 'increase-energy'
  | 'detect-risks'
  | 'mental-health'
  | 'sexual-performance'
  | 'other'

// Treatment preference (single-select)
export type TreatmentPreferenceOption = 'in-person' | 'virtual' | 'hybrid'

// Travel willingness (single-select)
export type TravelWillingnessOption = 'local-only' | 'national' | 'international'

// Ongoing support preference (single-select)
export type SupportOption =
  | 'annual-checkup'
  | 'continuous-monitoring'
  | 'occasional-checkins'

// Budget tier (matches live: per month)
export type BudgetOption = 'under-250' | '250-500' | 'over-500'

// Family history conditions (multi-select)
export type FamilyHistoryOption =
  | 'heart-disease'
  | 'diabetes'
  | 'cancer'
  | 'alzheimers'
  | 'autoimmune'
  | 'no-history'
  | 'not-sure'

// Services of interest (multi-select)
export type ServiceOption =
  | 'biomarker-testing'
  | 'genetic-testing'
  | 'hormone-therapy'
  | 'iv-therapy'
  | 'stem-cell'
  | 'peptide-therapy'
  | 'other'
  | 'all-of-the-above'

// Full funnel data
export interface LongevityFunnelData {
  ageRange?: AgeRangeOption
  gender?: GenderOption
  healthPriorities?: HealthPriorityOption[]
  treatmentPreference?: TreatmentPreferenceOption
  travelWillingness?: TravelWillingnessOption
  support?: SupportOption
  budget?: BudgetOption
  familyHistory?: FamilyHistoryOption[]
  services?: ServiceOption[]
  firstName?: string
  lastName?: string
  phone?: string
  zipCode?: string
  email?: string
}

// --- Option arrays for UI rendering ---

export const AGE_RANGE_OPTIONS: { value: AgeRangeOption; label: string }[] = [
  { value: '18-29', label: '18-29' },
  { value: '30-39', label: '30-39' },
  { value: '40-49', label: '40-49' },
  { value: '50-59', label: '50-59' },
  { value: '60-69', label: '60-69' },
  { value: '70+', label: '70+' },
]

export const GENDER_OPTIONS: { value: GenderOption; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

export const HEALTH_PRIORITY_OPTIONS: { value: HealthPriorityOption; label: string }[] = [
  { value: 'life-expectancy', label: 'Increase my life expectancy' },
  { value: 'lose-weight', label: 'Lose weight' },
  { value: 'increase-energy', label: 'Increase energy' },
  { value: 'detect-risks', label: 'Detect potential health risks' },
  { value: 'mental-health', label: 'Improve my mental health' },
  { value: 'sexual-performance', label: 'Boost my sexual performance' },
  { value: 'other', label: 'Other' },
]

export const TREATMENT_PREFERENCE_OPTIONS: { value: TreatmentPreferenceOption; label: string }[] = [
  { value: 'in-person', label: 'In-person' },
  { value: 'virtual', label: 'Virtual' },
  { value: 'hybrid', label: 'Hybrid' },
]

export const TRAVEL_WILLINGNESS_OPTIONS: { value: TravelWillingnessOption; label: string }[] = [
  { value: 'local-only', label: 'Local only' },
  { value: 'national', label: 'National' },
  { value: 'international', label: 'International' },
]

export const SUPPORT_OPTIONS: { value: SupportOption; label: string }[] = [
  { value: 'annual-checkup', label: 'Annual check-up only' },
  { value: 'continuous-monitoring', label: 'Continuous monitoring and coaching' },
  { value: 'occasional-checkins', label: 'Occasional check-ins' },
]

export const BUDGET_OPTIONS: { value: BudgetOption; label: string }[] = [
  { value: 'under-250', label: 'Less than $250 per month' },
  { value: '250-500', label: '$250-$500 per month' },
  { value: 'over-500', label: '$500+ per month' },
]

export const FAMILY_HISTORY_OPTIONS: { value: FamilyHistoryOption; label: string }[] = [
  { value: 'heart-disease', label: 'Heart disease' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'cancer', label: 'Cancer' },
  { value: 'alzheimers', label: "Alzheimer's / Dementia" },
  { value: 'autoimmune', label: 'Autoimmune conditions' },
  { value: 'no-history', label: 'No significant history' },
  { value: 'not-sure', label: "I'm not sure" },
]

export const SERVICE_OPTIONS: { value: ServiceOption; label: string }[] = [
  { value: 'biomarker-testing', label: 'Biomarker testing' },
  { value: 'genetic-testing', label: 'Genetic testing' },
  { value: 'hormone-therapy', label: 'Hormone optimization' },
  { value: 'iv-therapy', label: 'IV therapy' },
  { value: 'stem-cell', label: 'Stem cell therapy' },
  { value: 'peptide-therapy', label: 'Peptide therapy' },
  { value: 'other', label: 'Other' },
  { value: 'all-of-the-above', label: 'All of the above' },
]

// --- Validation constants ---

export const LONGEVITY_VALIDATION = {
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    message: 'Please enter a valid name (letters only)',
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  phone: {
    pattern: /^\(\d{3}\) \d{3}-\d{4}$/,
    message: 'Please enter a valid phone number',
  },
  zipCode: {
    pattern: /^\d{5}$/,
    message: 'Please enter a valid 5-digit ZIP code',
  },
}

// --- Recommended protocols for interstitial ---

export const RECOMMENDED_PROTOCOLS = [
  {
    name: 'Comprehensive Biomarker Testing',
    description: 'Full-panel blood work to identify early signs of disease and optimize health markers.',
  },
  {
    name: 'Genetic Risk Assessment',
    description: 'DNA analysis to uncover hereditary health risks and personalize your prevention plan.',
  },
  {
    name: 'Personalized Longevity Plan',
    description: 'A tailored program based on your results, lifestyle, and health goals.',
  },
]

// --- Progress configuration ---
// Live flow: 7 question screens (results has no progress bar)
export const LONGEVITY_TOTAL_STEPS = 12

export const LONGEVITY_PROGRESS_SUBTITLES: Record<number, string> = {
  1: 'Step 1 of 7',
  2: 'Step 2 of 7',
  3: 'Step 3 of 7',
  4: 'Step 4 of 7',
  5: 'Step 5 of 7',
  6: 'Step 6 of 7',
  7: 'Step 7 of 7',
}

export const LONGEVITY_PROGRESS_TIME_ESTIMATES: Record<number, number> = {
  1: 10,
  2: 10,
  3: 15,
  4: 10,
  5: 10,
  6: 10,
  7: 10,
}

// --- Trust badge configuration ---

export const LONGEVITY_TRUST_BADGES = [
  { text: 'Forbes-Approved Clinics' },
  { text: 'Deep Diagnostic Expertise' },
  { text: 'Individualized Expert Consultations' },
]

// --- Featured provider ---

export const FEATURED_PROVIDER = {
  name: 'Superpower',
  tagline: 'Our Pick For You',
  matchText: 'Based upon your budget we have matched you with Superpower Biomarker Testing',
  nextSteps: [
    'Book your lab test',
    'Detect early signs of 1,000+ conditions',
    'All for only $17/month',
  ],
  ctaText: 'Join Superpower Today >',
  ctaUrl: '#',
}

// --- Helper functions ---

export function getHealthPriorityLabel(value: HealthPriorityOption): string {
  return HEALTH_PRIORITY_OPTIONS.find(o => o.value === value)?.label ?? value
}

export function getBudgetLabel(value: BudgetOption): string {
  return BUDGET_OPTIONS.find(o => o.value === value)?.label ?? value
}
