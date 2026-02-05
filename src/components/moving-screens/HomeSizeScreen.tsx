'use client'

import * as React from 'react'
import { Home, Building2, Check, Shield } from 'lucide-react'
import { FormLayout } from '@/components/layout/FormLayout'
import { StickyButtonContainer, Button, RadioGroup, RadioGridCard } from '@/components/ui'
import { HOME_SIZE_OPTIONS, MOVING_PROGRESS_SUBTITLES, MOVING_PROGRESS_TIME_ESTIMATES, MOVING_TOTAL_STEPS, type HomeSizeOption } from '@/types/moving'

interface HomeSizeScreenProps {
  initialValue?: HomeSizeOption
  onBack?: () => void
  onSubmit?: (value: HomeSizeOption) => void
}

const SIZE_ICONS: Record<HomeSizeOption, React.ReactNode> = {
  'studio': <Home className="w-5 h-5" />,
  '1-bedroom': <Home className="w-5 h-5" />,
  '2-bedroom': <Home className="w-5 h-5" />,
  '3-bedroom': <Home className="w-5 h-5" />,
  '4+-bedroom': <Home className="w-5 h-5" />,
  'office': <Building2 className="w-5 h-5" />,
}

/**
 * HomeSizeScreen
 * 
 * Step 2 of 5 - "How much are you moving?"
 * Grid selection for home size with dynamic price hint
 */
export function HomeSizeScreen({ 
  initialValue,
  onBack, 
  onSubmit 
}: HomeSizeScreenProps) {
  const [selected, setSelected] = React.useState<HomeSizeOption | undefined>(initialValue)
  
  // Get price range for selected size
  const selectedOption = HOME_SIZE_OPTIONS.find(o => o.value === selected)
  const priceRange = selectedOption?.priceRange
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selected) {
      onSubmit?.(selected)
    }
  }
  
  return (
    <FormLayout 
      currentStep={2} 
      onBack={onBack}
      progressSubtitles={MOVING_PROGRESS_SUBTITLES}
      progressTimeEstimates={MOVING_PROGRESS_TIME_ESTIMATES}
      totalSteps={MOVING_TOTAL_STEPS}
    >
      <form onSubmit={handleSubmit} className="animate-slide-up has-sticky-button">
        <div className="space-y-6">
          {/* Step indicator */}
          <div className="text-center">
            <span className="text-body-sm text-neutral-500">Step 2 of 5</span>
          </div>
          
          {/* Headline */}
          <div className="text-center space-y-2">
            <h1 className="font-display text-2xl sm:text-3xl text-neutral-900">
              How much are you moving?
            </h1>
            <p className="text-body-sm text-neutral-500">
              This helps movers give you the most accurate quote.
            </p>
          </div>
          
          {/* Selection Grid */}
          <RadioGroup 
            value={selected} 
            onValueChange={(value) => setSelected(value as HomeSizeOption)}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto"
          >
            {HOME_SIZE_OPTIONS.map((option) => (
              <RadioGridCard
                key={option.value}
                value={option.value}
                icon={SIZE_ICONS[option.value]}
              >
                {option.label}
              </RadioGridCard>
            ))}
          </RadioGroup>
          
          {/* Dynamic Price Hint */}
          {priceRange && (
            <div className="bg-secondary-300 rounded-lg p-3 text-center max-w-lg mx-auto animate-fade-in">
              <p className="text-sm text-neutral-800">
                Typical cost: <span className="font-semibold">${priceRange.low.toLocaleString()}–${priceRange.high.toLocaleString()}</span>
              </p>
              <p className="text-xs text-neutral-600 mt-1">
                We&apos;ll find you the best rate
              </p>
            </div>
          )}
          
          {/* CTA */}
          <StickyButtonContainer>
            <Button 
              type="submit" 
              fullWidth 
              showTrailingIcon
              disabled={!selected}
            >
              Continue
            </Button>
            
            {/* Footer badges */}
            <div className="flex justify-center items-center gap-4 text-body-sm text-neutral-500 mt-3">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Risk free
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-feedback-success" />
                No obligation
              </span>
            </div>
          </StickyButtonContainer>
        </div>
      </form>
    </FormLayout>
  )
}

export default HomeSizeScreen
