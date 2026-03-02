'use client'

import * as React from 'react'
import { Sparkles } from 'lucide-react'
import { FAProgressBar } from './FAProgressBar'
import { Button, Input } from '@/components/ui'
import { FA_STEP_NUMBER } from '@/types/fa-funnel'
import type {
  FAFunnelData,
  MotivationDriver,
  AgeRange,
  IncomeRange,
} from '@/types/fa-funnel'

function getInsight(
  motivation?: MotivationDriver,
  age?: AgeRange,
  income?: IncomeRange
): string {
  // behind_retirement templates
  if (motivation === 'behind_retirement') {
    if (
      (age === 'fifties' || age === 'sixties') &&
      (income === '100k_150k' || income === '150k_250k')
    )
      return "At your income level, most people in their 50s have saved roughly 1–2× their annual income for retirement. That sounds behind — but the catch-up window between now and 65 is when the most impactful moves happen: maximized contributions, tax-advantaged conversions, and portfolio repositioning. The right advisor can map out exactly which levers to pull."
    if (
      (age === 'fifties' || age === 'sixties') &&
      (income === '250k_500k' ||
        income === '500k_plus')
    )
      return "Higher income creates a higher retirement target — which is why even high earners feel behind. The good news: your income bracket unlocks strategies that aren't available at lower levels — backdoor Roth conversions, deferred compensation, and equity optimization. An advisor who understands these tools can significantly accelerate your timeline."
    if (age === 'forties' && (income === '100k_150k' || income === '150k_250k'))
      return "Feeling behind in your 40s is more common than people admit — but a 20-year runway is genuinely powerful. At your income level, consistent maximization of tax-advantaged accounts alone can produce significant results. Add in the right investment allocation and a professional catch-up strategy, and the math changes faster than most people expect."
    if (
      age === 'forties' &&
      (income === 'under_50k' || income === '50k_100k')
    )
      return "Your income bracket makes every dollar of contribution count more — employer matches, tax credits, and IRA strategies can effectively multiply your savings rate. An advisor who specializes in this range focuses on maximizing what's available to you, not upselling what isn't."
    if (age === 'under_30' || age === 'thirties')
      return "Starting this conversation in your 30s puts you ahead of most people your age. Time is your single biggest asset — even modest course corrections now compound dramatically over three decades. The right advisor helps you set up systems that work while you're not thinking about them."
    if (age === 'sixties')
      return "Being further along doesn't mean it's too late. Advisors who specialize in near-retirement and in-retirement planning focus on optimization: withdrawal sequencing, tax-efficient drawdown, Social Security timing, and making sure your money outlasts your needs."
    return "Most people in your situation have more options than they realize. A financial advisor's job is to see the full picture and identify the moves that have the biggest impact on your timeline."
  }

  // family_protection templates
  if (motivation === 'family_protection') {
    if (
      income === '100k_150k' ||
      income === '150k_250k' ||
      income === '250k_500k' ||
      income === '500k_plus'
    )
      return "For a household at your income level, protection planning isn't just about insurance — it's about coordinating estate documents, beneficiary designations, survivorship strategies, and making sure both partners understand the full financial picture. Most families have at least one critical gap. An advisor finds them before they matter."
    if (income === 'under_50k' || income === '50k_100k')
      return "Protection planning is even more important at lower income levels — the margin for error is smaller, so the safety net matters more. Advisors who work in this space focus on getting the essentials in place efficiently, not selling expensive products."
    return "Family protection is one of the most personal areas of financial planning. The right advisor doesn't just sell policies — they build a coordinated plan that adapts as your family's needs change."
  }

  // windfall
  if (motivation === 'windfall')
    return "The decisions you make in the first 12 months after receiving new wealth are the most consequential. Research consistently shows that professional guidance during this window is the strongest predictor of whether that wealth grows or erodes. The priorities: tax positioning first, emotional decision-making guardrails second, long-term structure third. An advisor experienced in windfall management knows this sequence."

  // optimization
  if (motivation === 'optimization') {
    if (
      income === '250k_500k' ||
      income === '500k_plus'
    )
      return "Higher income means more optimization surface area — and more at stake when it's missed. The strategies that matter at your level go beyond basic tax planning: asset location across account types, charitable giving vehicles, qualified opportunity zones, and income timing. An advisor focused on optimization at this bracket can identify six-figure improvements over a planning horizon."
    if (income === '100k_150k' || income === '150k_250k')
      return "At your income level, the average household gives up $2,500–$5,000/year in avoidable taxes through suboptimal account structure, missed harvest opportunities, and inefficient asset location. Over a decade, that's $25K–$50K before compounding. A tax-aware advisor typically recovers their own fee in year one."
    return "Optimization at your income level focuses on different levers: maximizing employer matches, capturing all available tax credits, positioning contributions in the right account types, and avoiding fee drag on smaller balances. The right advisor knows which moves have outsized impact when every dollar counts."
  }

  // plan_review
  if (motivation === 'plan_review')
    return "Getting a professional review of your financial plan is one of the highest-return actions you can take at any stage. 73% of people who do discover at least one significant gap — a misallocated account, an outdated beneficiary, a tax strategy they hadn't considered. Even a single session can surface insights that compound for years."

  return "Most people in your situation have more options than they realize. A financial advisor can help you see the full picture and identify the moves with the biggest impact."
}

export interface ScreenAProps {
  funnelData: FAFunnelData
  onBack?: () => void
  onNext?: () => void
  onSaveEmail?: (email: string) => void
}

export function ScreenA({
  funnelData,
  onBack,
  onNext,
  onSaveEmail,
}: ScreenAProps) {
  const [visible, setVisible] = React.useState(false)
  const [showSaveForm, setShowSaveForm] = React.useState(false)
  const [saveEmail, setSaveEmail] = React.useState('')
  const [saveError, setSaveError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  const insight = getInsight(
    funnelData.motivationDriver,
    funnelData.ageRange,
    funnelData.incomeRange
  )

  const handleSaveProgress = () => {
    const trimmed = saveEmail.trim()
    if (!trimmed) {
      setSaveError('Please enter your email')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) {
      setSaveError('Please enter a valid email')
      return
    }
    setSaveError(null)
    onSaveEmail?.(trimmed)
    setShowSaveForm(false)
    setSaveEmail('')
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <FAProgressBar stepName="objectives" onBack={onBack} />
          <div
            className={`animate-slide-up has-sticky-button mt-8 space-y-6 text-center transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="max-w-content mx-auto">
              {/* Lottie-style icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary-300 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary-700" />
                </div>
              </div>

              {/* Display headline */}
              <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 mb-3">
                Here&apos;s what we see.
              </h1>

              {/* Personalized insight card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6 text-left">
                <p className="text-body text-neutral-800">{insight}</p>
              </div>

              {/* Body copy */}
              <p className="text-body text-neutral-600">
                Next, we&apos;ll ask about your goals and preferences — what kind of
                help you&apos;re looking for, and a few details about your situation.
                Then we&apos;ll match you.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center items-center gap-4 text-neutral-500">
                <span className="text-xs">✓ Profile started</span>
                <span className="text-xs">✓ Secure & private</span>
                <span className="text-xs">✓ Takes about 2 minutes</span>
              </div>

              {/* Primary CTA */}
              <Button
                variant="primary"
                fullWidth
                showTrailingIcon
                onClick={onNext}
              >
                Continue to Your Goals →
              </Button>

              {/* Secondary link: Save progress */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setShowSaveForm((v) => !v)}
                  className="text-body-sm text-primary-700 hover:text-primary-750 hover:underline transition-colors"
                >
                  Want to finish later? Save your progress →
                </button>

                {showSaveForm && (
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto text-left animate-slide-up">
                    <Input
                      label="Email"
                      type="email"
                      placeholder="you@example.com"
                      value={saveEmail}
                      onChange={(e) => {
                        setSaveEmail(e.target.value)
                        setSaveError(null)
                      }}
                      error={saveError ?? undefined}
                      className="flex-1"
                    />
                    <Button
                      variant="secondary"
                      onClick={handleSaveProgress}
                      className="sm:self-end"
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
    </div>
  )
}

export default ScreenA
