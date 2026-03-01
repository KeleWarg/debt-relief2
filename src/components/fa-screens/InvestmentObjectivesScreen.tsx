'use client'

import * as React from 'react'
import { FAProgressBar } from './FAProgressBar'
import { RadioGroup, RadioCard } from '@/components/ui/RadioCard'
import { FA_STEP_NUMBER, OBJECTIVE_OPTIONS, OBJECTIVES_SUB_COPY } from '@/types/fa-funnel'
import type { InvestmentObjective, MotivationDriver } from '@/types/fa-funnel'

interface InvestmentObjectivesScreenProps {
  initialValue?: InvestmentObjective
  motivationDriver?: MotivationDriver
  onBack?: () => void
  onSubmit?: (value: InvestmentObjective) => void
}

export function InvestmentObjectivesScreen({
  initialValue,
  motivationDriver,
  onBack,
  onSubmit,
}: InvestmentObjectivesScreenProps) {
  const [selected, setSelected] = React.useState<string>(initialValue ?? '')

  const handleSelect = (value: string) => {
    setSelected(value)
    setTimeout(() => onSubmit?.(value as InvestmentObjective), 300)
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <FAProgressBar currentStep={FA_STEP_NUMBER.objectives} onBack={onBack} />
      <div className="animate-slide-up mt-8">
        <div className={`max-w-content mx-auto text-center ${motivationDriver ? '' : 'mb-8'}`}>
          <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 mb-3">
                Which best describes your investment objectives?
          </h1>
          {motivationDriver && (
            <p className="text-body text-neutral-500 mb-8">
              {OBJECTIVES_SUB_COPY[motivationDriver]}
            </p>
          )}
        </div>
        <div className="max-w-content mx-auto">
          <RadioGroup
            value={selected}
            onValueChange={handleSelect}
            className="flex flex-col gap-3"
          >
            {OBJECTIVE_OPTIONS.map((opt) => (
              <RadioCard key={opt.value} value={opt.value}>
                {opt.label}
              </RadioCard>
            ))}
          </RadioGroup>

          <p className="text-body-sm text-neutral-500 mt-6">
            There&apos;s no wrong answer — this helps us match you with advisors whose expertise fits your goals.
          </p>
        </div>
      </div>
    </div>
  )
}

export default InvestmentObjectivesScreen
