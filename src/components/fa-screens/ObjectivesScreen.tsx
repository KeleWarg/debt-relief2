'use client'

import * as React from 'react'
import { FAProgressBar } from './FAProgressBar'
import { OBJECTIVE_OPTIONS } from '@/types/fa-funnel'
import type { InvestmentObjective, MotivationDriver, AgeRange, SavingsRange } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D']

const OBJ_CONFIRMATION: Record<MotivationDriver, string> = {
  behind_retirement: 'Your financial profile is taking shape. Last question: how do you want your money to work?',
  family_protection: 'Your financial profile is taking shape. Last question: how do you want your money to work?',
  windfall: 'Your financial profile is taking shape. Last question: how do you want your new wealth to work?',
  optimization: "Your financial profile is taking shape. Last question: what's the priority for your money?",
  plan_review: "Your financial profile is taking shape. Last question: what's the goal for your investments?",
}

const OBJ_REASSURANCE: Record<MotivationDriver, string> = {
  behind_retirement: 'This shapes how aggressively your advisor approaches your catch-up plan.',
  family_protection: 'This tells your advisor how to balance growth with the security your family needs.',
  windfall: "Different objectives suit different situations. Your advisor will tailor the approach to your new wealth.",
  optimization: "Your objective drives your advisor's strategy. They'll fine-tune it based on your full profile.",
  plan_review: "Not sure? That's okay. Your advisor can help refine this during your review.",
}

const RECOMMENDATION_MATRIX: Record<MotivationDriver, Record<AgeRange, InvestmentObjective>> = {
  behind_retirement: {
    under_30: 'growth', thirties: 'growth', forties: 'growth',
    fifties: 'balanced', sixties: 'income_generation',
  },
  family_protection: {
    under_30: 'growth', thirties: 'balanced', forties: 'balanced',
    fifties: 'preservation', sixties: 'preservation',
  },
  windfall: {
    under_30: 'growth', thirties: 'growth', forties: 'balanced',
    fifties: 'balanced', sixties: 'preservation',
  },
  optimization: {
    under_30: 'growth', thirties: 'growth', forties: 'growth',
    fifties: 'balanced', sixties: 'income_generation',
  },
  plan_review: {
    under_30: 'growth', thirties: 'growth', forties: 'balanced',
    fifties: 'balanced', sixties: 'income_generation',
  },
}

const RATIONALE_MATRIX: Record<MotivationDriver, Record<AgeRange, string>> = {
  behind_retirement: {
    under_30: 'With 30+ years ahead of you, growth-focused strategies have the most time to compound.',
    thirties: 'Your timeline still favors growth. Most advisors recommend building aggressively at this stage.',
    forties: 'With 20+ years to retirement, growth is still the strongest lever for closing the gap.',
    fifties: 'Your timeline is shorter, so most advisors recommend growing your money while protecting against big losses.',
    sixties: 'At this stage, most advisors focus on making your savings produce steady, reliable income.',
  },
  family_protection: {
    under_30: "Growing your wealth now builds the foundation your family's protection plan draws from.",
    thirties: 'With a growing household, most advisors recommend balancing both growth and security.',
    forties: 'At this stage, your family depends on stability. Most advisors balance growth with downside protection.',
    fifties: "Protection becomes the priority. Most advisors focus on preserving what you've built for your family.",
    sixties: 'At this stage, most advisors focus on preserving your legacy and ensuring a smooth transfer.',
  },
  windfall: {
    under_30: 'With decades ahead, your new wealth has the most room to grow through compounding.',
    thirties: 'Your timeline favors structured growth. Most advisors recommend putting new wealth to work early.',
    forties: 'With new wealth, most advisors recommend growing it while protecting against large losses.',
    fifties: 'Your new wealth can still grow, but most advisors add downside protection at this stage.',
    sixties: 'At this stage, most advisors focus on preserving your new wealth and positioning it for the long term.',
  },
  optimization: {
    under_30: 'Growth-focused strategies give your advisor the widest range of optimization levers at your age.',
    thirties: 'Your timeline still favors growth, which opens up the most optimization strategies.',
    forties: 'Most optimization strategies, like tax-loss harvesting and rebalancing, work best with a growth mandate.',
    fifties: 'At this stage, optimization shifts toward tax strategy and preservation. Balance captures both.',
    sixties: 'In drawdown, most advisors optimize around income efficiency, tax brackets, and withdrawal sequencing.',
  },
  plan_review: {
    under_30: 'With your timeline, most advisors start a review assuming growth as the default.',
    thirties: 'Your age still favors growth. Your advisor will stress-test this during the review.',
    forties: 'Mid-life reviews typically surface the need for more balance. Your advisor will confirm.',
    fifties: 'Closer to retirement, most reviews recommend shifting toward balance and stability.',
    sixties: 'At this stage, most reviews focus on whether your investments are producing enough income.',
  },
}

const SAVINGS_OVERRIDE_RATIONALE: Record<string, string> = {
  low_savings: 'Based on your savings level, most advisors recommend prioritizing growth to build a stronger foundation.',
  high_savings: 'With substantial savings at your age, most advisors recommend balancing growth with some protection.',
}

function getRecommended(
  motivation?: MotivationDriver,
  age?: AgeRange,
  savings?: SavingsRange
): { objective: InvestmentObjective; rationale: string } | null {
  if (!motivation || !age) return null
  if (savings === 'under_50k' && (age === 'fifties' || age === 'sixties')) {
    return { objective: 'growth', rationale: SAVINGS_OVERRIDE_RATIONALE.low_savings }
  }
  if (savings === '1.5m_plus' && (age === 'under_30' || age === 'thirties')) {
    return { objective: 'balanced', rationale: SAVINGS_OVERRIDE_RATIONALE.high_savings }
  }
  return { objective: RECOMMENDATION_MATRIX[motivation][age], rationale: RATIONALE_MATRIX[motivation][age] }
}

interface ObjectivesScreenProps {
  initialValue?: InvestmentObjective
  motivationDriver?: MotivationDriver
  ageRange?: AgeRange
  savingsRange?: SavingsRange
  onBack?: () => void
  onSubmit?: (value: InvestmentObjective, followedRecommendation: boolean) => void
}

export function ObjectivesScreen({
  initialValue,
  motivationDriver,
  ageRange,
  savingsRange,
  onBack,
  onSubmit,
}: ObjectivesScreenProps) {
  const [selected, setSelected] = React.useState<string>(initialValue ?? '')

  const recommended = getRecommended(motivationDriver, ageRange, savingsRange)

  const handleSelect = (value: string) => {
    setSelected(value)
    setTimeout(() => {
      onSubmit?.(value as InvestmentObjective, value === recommended?.objective)
    }, 400)
  }

  const confirmation = motivationDriver ? OBJ_CONFIRMATION[motivationDriver] : undefined
  const reassurance = motivationDriver ? OBJ_REASSURANCE[motivationDriver] : undefined

  return (
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <FAProgressBar stepName="objectives" onBack={onBack} />
      <div className="flex flex-col items-start w-full mt-6">
        {/* Zone 1: Confirmation */}
        <div className="animate-fade-in-up flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0B6E4F' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-sans text-lg font-bold" style={{ color: '#1B2A4A' }}>
            {confirmation ?? 'Good. One more question to complete your profile.'}
          </p>
        </div>

        {/* Divider */}
        <div
          className="animate-fade-in-up w-full border-t mb-6 mt-4"
          style={{ animationDelay: '300ms', borderColor: '#E0E0E0' }}
        />

        {/* Zone 2: Question */}
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Building your financial profile
        </p>
        <h1
          className="animate-fade-in-up font-display text-display sm:text-display-md lg:text-display-lg mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          You don&apos;t need the perfect strategy.{' '}
          <span style={{ color: '#0066CC' }}>Your advisor will refine it with you.</span>
        </h1>
        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          What best describes your investment goal?
        </p>

        {/* Options */}
        <div className="w-full flex flex-col" style={{ gap: '12px' }}>
          {OBJECTIVE_OPTIONS.map((opt, i) => {
            const isSelected = selected === opt.value
            const isRecommended = opt.value === recommended?.objective
            return (
              <div key={opt.value} className="animate-fade-in-up" style={{ animationDelay: `${500 + i * 100}ms` }}>
                <button
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    'flex items-center gap-3 w-full bg-white border rounded-lg text-left',
                    'cursor-pointer transition-all duration-200',
                    isSelected
                      ? 'border-[#0066CC] bg-[#F0F7FF] shadow-sm'
                      : 'border-[#E8E8E8] hover:bg-[#F0F7FF]'
                  )}
                  style={{ height: '56px', paddingLeft: '16px', paddingRight: '16px' }}
                >
                  <div
                    className={cn(
                      'flex items-center justify-center rounded-full flex-shrink-0 text-sm font-semibold transition-colors duration-200',
                      isSelected
                        ? 'bg-[#0066CC] text-white'
                        : 'bg-[#F2F2F2] text-neutral-500'
                    )}
                    style={{ width: '28px', height: '28px' }}
                  >
                    {LETTERS[i]}
                  </div>
                  <span className="flex-1" style={{ fontSize: '16px', color: '#1B2A4A' }}>
                    {opt.label}
                  </span>
                  {isRecommended && (
                    <span
                      className="flex-shrink-0 text-[11px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                      style={{ color: '#1B2A4A', backgroundColor: '#E8F0FE' }}
                    >
                      Recommended
                    </span>
                  )}
                </button>
                {isRecommended && recommended?.rationale && (
                  <p
                    className="mt-1"
                    style={{ fontSize: '13px', color: '#888888' }}
                  >
                    {recommended.rationale}
                  </p>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default ObjectivesScreen
