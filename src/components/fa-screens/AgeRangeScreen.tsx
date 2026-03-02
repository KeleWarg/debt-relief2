'use client'

import * as React from 'react'
import { RadioGroup, RadioCard } from '@/components/ui/RadioCard'
import { FAProgressBar } from './FAProgressBar'
import { FA_AGE_PHASE_STEP, AGE_OPTIONS } from '@/types/fa-funnel'
import type { AgeRange } from '@/types/fa-funnel'

interface AgeRangeScreenProps {
  initialValue?: AgeRange
  onBack?: () => void
  onSubmit?: (value: AgeRange) => void
}

export function AgeRangeScreen({ initialValue, onBack, onSubmit }: AgeRangeScreenProps) {
  const [selected, setSelected] = React.useState<string>(initialValue ?? '')
  const submittedRef = React.useRef(false)

  const handleSelect = (value: string) => {
    if (submittedRef.current) return
    setSelected(value)
    submittedRef.current = true
    setTimeout(() => onSubmit?.(value as AgeRange), 400)
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <FAProgressBar currentStep={FA_AGE_PHASE_STEP} onBack={onBack} />

      <div className="animate-slide-up mt-8">
        <div className="max-w-content mx-auto text-center">
          <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 mb-3">
            How old are you?
          </h1>
          <p className="text-body text-neutral-500 mb-8">
            Great start. Your age helps us tailor the right strategy and advisor match for you.
          </p>
        </div>

        <div className="max-w-content mx-auto">
          <RadioGroup value={selected} onValueChange={handleSelect}>
            {AGE_OPTIONS.map((opt) => (
              <RadioCard key={opt.value} value={opt.value}>
                {opt.label}
              </RadioCard>
            ))}
          </RadioGroup>

          <p className="text-body-sm text-neutral-400 text-center mt-6">
            Your age just tells us your stage of life &mdash; it helps us match the right planning
            approach, nothing more.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AgeRangeScreen
