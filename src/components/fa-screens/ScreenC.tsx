'use client'

import * as React from 'react'
import { CheckCircle2, Star } from 'lucide-react'
import { FAProgressBar } from './FAProgressBar'
import { Button } from '@/components/ui'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import {
  FA_STEP_NUMBER,
  MOTIVATION_LABELS,
  getAgeLabel,
  getIncomeLabel,
  getObjectiveLabel,
  getMaritalLabel,
  getAssetsLabel,
} from '@/types/fa-funnel'
import type { FAFunnelData, MotivationDriver, InvestmentObjective } from '@/types/fa-funnel'

function generateInsight(
  motivation?: MotivationDriver,
  objective?: InvestmentObjective,
  specialties?: string[]
): string {
  const specialtySet = new Set(specialties ?? [])

  if (motivation === 'behind_retirement') {
    if (objective === 'protecting') {
      return 'a retirement catch-up specialist who can help you build a realistic plan'
    }
    return 'a growth-focused advisor experienced in accelerated retirement planning'
  }

  if (motivation === 'family_protection') {
    if (specialtySet.has('Estate planning')) {
      return 'an estate and insurance planning advisor focused on family protection'
    }
    return 'an advisor experienced in comprehensive family financial protection'
  }

  if (motivation === 'windfall') {
    return 'an advisor experienced in sudden wealth management and long-term positioning'
  }

  if (motivation === 'optimization') {
    if (specialtySet.has('Tax planning')) {
      return 'a tax-aware advisor focused on maximizing what you keep'
    }
    return 'an advisor focused on optimizing your investment returns and tax efficiency'
  }

  if (motivation === 'plan_review') {
    return 'a fiduciary advisor who can audit your current plan and identify gaps'
  }

  return 'an advisor matched to your specific needs'
}

const BLURRED_ADVISORS = [
  { rating: 4.9 },
  { rating: 4.8 },
  { rating: 4.7 },
]

export interface ScreenCProps {
  funnelData: FAFunnelData
  onBack?: () => void
  onNext?: () => void
}

export function ScreenC({ funnelData, onBack, onNext }: ScreenCProps) {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  const motivationLabel = funnelData.motivationDriver
    ? MOTIVATION_LABELS[funnelData.motivationDriver]
    : ''
  const advisorType = generateInsight(
    funnelData.motivationDriver,
    funnelData.investmentObjective,
    funnelData.specialties
  )

  const profileSections = [
    {
      title: 'You',
      rows: [
        { label: 'What\'s driving you', value: motivationLabel },
        { label: 'Age range', value: getAgeLabel(funnelData.ageRange) },
        { label: 'Income', value: getIncomeLabel(funnelData.incomeRange) },
      ],
    },
    {
      title: 'Your Goals',
      rows: [
        { label: 'Objectives', value: getObjectiveLabel(funnelData.investmentObjective) },
        { label: 'Specialties', value: funnelData.specialties?.join(', ') ?? '' },
      ],
    },
    {
      title: 'Your Situation',
      rows: [
        { label: 'Marital status', value: getMaritalLabel(funnelData.maritalStatus) },
        { label: 'Homeowner', value: funnelData.homeownership === 'own' ? 'Yes' : funnelData.homeownership === 'rent' ? 'No' : funnelData.homeownership ? 'Other' : '' },
        { label: 'Assets', value: getAssetsLabel(funnelData.totalAssets) },
      ],
    },
    {
      title: 'Your Match',
      rows: [{ label: 'Advisor type', value: advisorType }],
    },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <FAProgressBar currentStep={FA_STEP_NUMBER.screenC} onBack={onBack} />
          <div
            className={`animate-slide-up has-sticky-button mt-8 space-y-6 text-center transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="max-w-content mx-auto">
              {/* Display headline */}
              <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900">
                Your advisor match profile is complete.
              </h1>

              {/* Full profile card */}
              <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden text-left">
                {profileSections.map((section) => (
                  <div key={section.title}>
                    <div className="px-4 py-2 bg-neutral-50 border-b border-neutral-200">
                      <p className="text-xs font-medium text-neutral-500">{section.title}</p>
                    </div>
                    <div className="divide-y divide-neutral-200">
                      {section.rows
                        .filter((r) => r.value)
                        .map((row) => (
                          <div key={row.label} className="flex justify-between items-start px-4 py-3 gap-4">
                            <span className="text-sm text-neutral-500 flex-shrink-0">{row.label}</span>
                            <span className="text-sm font-semibold text-neutral-900 text-right">{row.value}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
                <div className="px-4 py-3 bg-feedback-success/5 border-t border-neutral-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-feedback-success" />
                    <span className="text-sm text-neutral-800">Matches multiple advisor profiles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-feedback-success" />
                    <span className="text-sm text-neutral-800">
                      Strong fit for {motivationLabel ? motivationLabel.toLowerCase() : 'your goals'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-feedback-success" />
                    <span className="text-sm text-neutral-800">Advisors available nationwide</span>
                  </div>
                </div>
              </div>

              {/* Blurred Advisor Preview */}
              <div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {BLURRED_ADVISORS.map((advisor, i) => (
                    <div
                      key={i}
                      className={`relative bg-white border border-neutral-200 rounded-lg p-4 ${i === 2 ? 'hidden lg:block' : ''}`}
                    >
                      <div className="filter blur-[6px] select-none pointer-events-none">
                        <div className="w-10 h-10 rounded-full bg-neutral-200 mb-2" />
                        <div className="h-4 bg-neutral-200 rounded w-3/4 mb-1" />
                        <div className="h-3 bg-neutral-100 rounded w-1/2 mb-2" />
                        <div className="h-3 bg-neutral-100 rounded w-full" />
                      </div>
                      <div className="absolute top-4 right-4 flex items-center gap-1">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, s) => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${s < Math.floor(advisor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-200'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-medium text-neutral-800">{advisor.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-neutral-500 mt-3">
                  🔒 Enter your ZIP to see advisors near you
                </p>
              </div>

              {/* Body copy */}
              <p className="text-body text-neutral-600">
                We just need your location and contact details to finalize your matches.
              </p>

              {/* Trust Stats Row (4-col with dividers) */}
              <div className="flex justify-center items-center gap-6">
                {[
                  { value: '100K+', label: 'People matched' },
                  { value: 'Top-rated', label: 'Advisors' },
                  { value: 'No cost', label: 'To you' },
                  { value: 'Secure', label: '& private' },
                ].map((stat, i) => (
                  <React.Fragment key={stat.label}>
                    {i > 0 && <div className="h-8 w-px bg-neutral-200" />}
                    <div className="text-center">
                      <p className="text-lg font-bold text-neutral-900">{stat.value}</p>
                      <p className="text-xs text-neutral-500">{stat.label}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <StickyButtonContainer>
                <Button fullWidth showTrailingIcon onClick={onNext}>
                  Find My Advisor →
                </Button>
              </StickyButtonContainer>
            </div>
          </div>
    </div>
  )
}

export default ScreenC
