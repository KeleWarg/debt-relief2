'use client'

import * as React from 'react'
import { FAProgressBar } from './FAProgressBar'
import { RadioGroup, RadioGridCard } from '@/components/ui/RadioCard'
import { FA_STEP_NUMBER, MARITAL_OPTIONS } from '@/types/fa-funnel'
import type { MaritalStatus } from '@/types/fa-funnel'

interface MaritalStatusScreenProps {
  initialValue?: MaritalStatus
  onBack?: () => void
  onSubmit?: (value: MaritalStatus) => void
}

export function MaritalStatusScreen({ initialValue, onBack, onSubmit }: MaritalStatusScreenProps) {
  const [selected, setSelected] = React.useState<string>(initialValue ?? '')

  const handleSelect = (value: string) => {
    setSelected(value)
    setTimeout(() => onSubmit?.(value as MaritalStatus), 300)
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <FAProgressBar currentStep={FA_STEP_NUMBER.married} onBack={onBack} />
      <div className="animate-slide-up mt-8">
        <div className="max-w-content mx-auto text-center">
          <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 mb-3">
            Are you married?
          </h1>
          <p className="text-body text-neutral-500 mb-8">
            This helps us understand your planning needs — couples and individuals benefit from different advisory approaches.
          </p>
        </div>
        <div className="max-w-content mx-auto">
          <RadioGroup
            value={selected}
            onValueChange={handleSelect}
            className="grid grid-cols-2 gap-3"
          >
            {MARITAL_OPTIONS.map((opt) => (
              <RadioGridCard key={opt.value} value={opt.value}>
                {opt.label}
              </RadioGridCard>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default MaritalStatusScreen
