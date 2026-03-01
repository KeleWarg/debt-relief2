'use client'

import * as React from 'react'
import { FAProgressBar } from './FAProgressBar'
import { RadioGroup, RadioGridCard } from '@/components/ui/RadioCard'
import { FA_STEP_NUMBER } from '@/types/fa-funnel'

interface HomeOwnerScreenProps {
  initialValue?: boolean
  onBack?: () => void
  onSubmit?: (value: boolean) => void
}

export function HomeOwnerScreen({ initialValue, onBack, onSubmit }: HomeOwnerScreenProps) {
  const [selected, setSelected] = React.useState<string>(
    initialValue === undefined ? '' : initialValue ? 'yes' : 'no'
  )

  const handleSelect = (value: string) => {
    setSelected(value)
    setTimeout(() => onSubmit?.(value === 'yes'), 300)
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <FAProgressBar currentStep={FA_STEP_NUMBER.home} onBack={onBack} />
      <div className="animate-slide-up mt-8">
        <div className="max-w-content mx-auto text-center">
          <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 mb-3">
            Do you own your home?
          </h1>
        </div>
        <div className="max-w-content mx-auto">
          <RadioGroup
            value={selected}
            onValueChange={handleSelect}
            className="grid grid-cols-2 gap-3"
          >
            <RadioGridCard value="yes">Yes</RadioGridCard>
            <RadioGridCard value="no">No</RadioGridCard>
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default HomeOwnerScreen
