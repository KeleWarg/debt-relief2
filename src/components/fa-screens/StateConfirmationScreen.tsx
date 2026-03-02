'use client'

import * as React from 'react'
import { Button } from '@/components/ui'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import { USMap } from '@/components/ui/USMap'
import { FAProgressBar } from './FAProgressBar'
import type { MotivationDriver } from '@/types/fa-funnel'
import { getStateFinancialData } from '@/data/stateFinancialData'
import { cn } from '@/lib/utils'

function getMotivationStat(
  motivation: MotivationDriver,
  stateName: string,
  stateAbbr: string
): string {
  const data = getStateFinancialData(stateAbbr)

  switch (motivation) {
    case 'behind_retirement':
      return `The average retirement savings in ${stateName} is ${data.avgRetirementSavings}. Your advisor will help you plan from where you are.`
    case 'family_protection':
      return `${stateName} has specific estate and insurance regulations. Your advisor will be licensed to navigate them.`
    case 'windfall':
      return `${stateName}\u2019s tax landscape affects how new wealth should be positioned. Your advisor knows the local rules.`
    case 'optimization':
      if (!data.hasStateIncomeTax) {
        return `${stateName} has no state income tax. Your advisor will optimize around it.`
      }
      return `${stateName} has a ${data.topMarginalRate}% top marginal rate. Your advisor will optimize around it.`
    case 'plan_review':
      return `Your advisor will be licensed in ${stateName} and familiar with local tax and estate regulations.`
  }
}

interface StateConfirmationScreenProps {
  stateAbbr?: string
  stateName?: string
  motivationDriver?: MotivationDriver
  onBack?: () => void
  onNext?: () => void
}

export function StateConfirmationScreen({
  stateAbbr,
  stateName,
  motivationDriver,
  onBack,
  onNext,
}: StateConfirmationScreenProps) {
  const [stage, setStage] = React.useState(0)
  const submittedRef = React.useRef(false)

  React.useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 100),
      setTimeout(() => setStage(2), 600),
      setTimeout(() => setStage(3), 1200),
      setTimeout(() => setStage(4), 1800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const handleNext = () => {
    if (submittedRef.current) return
    submittedRef.current = true
    onNext?.()
  }

  const displayName = stateName ?? 'your state'
  const displayAbbr = stateAbbr ?? ''

  const statLine =
    motivationDriver && displayAbbr
      ? getMotivationStat(motivationDriver, displayName, displayAbbr)
      : `Your advisor will be licensed in ${displayName} and familiar with local regulations.`

  return (
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <FAProgressBar stepName="zipCode" onBack={onBack} />
      <div className="space-y-6 has-sticky-button mt-6">
        {/* Confirmed badge */}
        <div
          className={cn(
            'flex items-start gap-2 transition-opacity duration-200',
            stage >= 1 ? 'opacity-100' : 'opacity-0'
          )}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5">
            <circle cx="9" cy="9" r="9" fill="#0B6E4F" />
            <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ fontSize: '15px', color: '#1B2A4A' }}>
            Confirmed
          </p>
        </div>

        {/* Headline */}
        <h1
          className={cn(
            'font-display text-display sm:text-display-md lg:text-display-lg transition-opacity duration-200',
            stage >= 1 ? 'opacity-100' : 'opacity-0'
          )}
          style={{ color: '#1B2A4A' }}
        >
          We have licensed financial advisors available in{' '}
          <strong>{displayName}</strong>.
        </h1>

        {/* Sub copy */}
        <p
          className={cn(
            'transition-opacity duration-200',
            stage >= 1 ? 'opacity-100' : 'opacity-0'
          )}
          style={{ fontSize: '16px', color: '#666666' }}
        >
          You&rsquo;re in good company. Thousands in your state already use Forbes Advisor.
        </p>

        {/* State map */}
        <div
          className={cn(
            'transition-opacity duration-300',
            stage >= 2 ? 'opacity-100' : 'opacity-0'
          )}
        >
          <USMap
            selectedState={displayName}
            hoveredState={null}
            onStateSelect={() => {}}
            onStateHover={() => {}}
            className="w-full max-w-[560px]"
          />
        </div>

        {/* Motivation-specific stat */}
        <p
          className={cn(
            'transition-opacity duration-200',
            stage >= 3 ? 'opacity-100' : 'opacity-0'
          )}
          style={{ fontSize: '15px', color: '#1B2A4A' }}
        >
          {statLine}
        </p>

        {/* CTA */}
        <div
          className={cn(
            'transition-all duration-200 ease-out',
            stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          )}
        >
          <StickyButtonContainer>
            <Button variant="primary" fullWidth showTrailingIcon onClick={handleNext}>
              Next
            </Button>
          </StickyButtonContainer>
        </div>
      </div>
    </div>
  )
}

export default StateConfirmationScreen
