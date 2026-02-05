'use client'

import * as React from 'react'
import { Calendar, Lightbulb } from 'lucide-react'
import { FormLayout } from '@/components/layout/FormLayout'
import { StickyButtonContainer, Button, RadioGroup, RadioListItem } from '@/components/ui'
import { 
  MOVE_DATE_OPTIONS, 
  HOME_SIZE_OPTIONS,
  MOVING_PROGRESS_SUBTITLES,
  MOVING_PROGRESS_TIME_ESTIMATES,
  MOVING_TOTAL_STEPS,
  type MoveDateOption, 
  type HomeSizeOption 
} from '@/types/moving'

interface MoveDateScreenProps {
  initialValue?: MoveDateOption
  homeSize: HomeSizeOption
  onBack?: () => void
  onSubmit?: (value: MoveDateOption) => void
}

/**
 * MoveDateScreen
 * 
 * Step 3 of 5 - "When are you planning to move?"
 * Vertical selection list with savings tags
 */
export function MoveDateScreen({ 
  initialValue,
  homeSize,
  onBack, 
  onSubmit 
}: MoveDateScreenProps) {
  const [selected, setSelected] = React.useState<MoveDateOption | undefined>(initialValue)
  
  // Get price range for current home size
  const sizeOption = HOME_SIZE_OPTIONS.find(o => o.value === homeSize)
  const priceRange = sizeOption?.priceRange ?? { low: 600, high: 1200 }
  
  // Calculate savings for selected date option
  const selectedDateOption = MOVE_DATE_OPTIONS.find(o => o.value === selected)
  const savingsPercent = selectedDateOption?.savingsPercent
  const savingsRange = savingsPercent ? {
    low: Math.round(priceRange.low * savingsPercent),
    high: Math.round(priceRange.high * savingsPercent),
  } : null
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selected) {
      onSubmit?.(selected)
    }
  }
  
  return (
    <FormLayout 
      currentStep={4} 
      onBack={onBack}
      progressSubtitles={MOVING_PROGRESS_SUBTITLES}
      progressTimeEstimates={MOVING_PROGRESS_TIME_ESTIMATES}
      totalSteps={MOVING_TOTAL_STEPS}
    >
      <form onSubmit={handleSubmit} className="animate-slide-up has-sticky-button">
        <div className="space-y-6">
          {/* Step indicator */}
          <div className="text-center">
            <span className="text-body-sm text-neutral-500">Step 4 of 5</span>
          </div>
          
          {/* Headline */}
          <div className="text-center space-y-2">
            <h1 className="font-display text-2xl sm:text-3xl text-neutral-900">
              When are you planning to move?
            </h1>
            <p className="text-body-sm text-neutral-500">
              Book ahead and save — movers offer discounts for flexibility.
            </p>
          </div>
          
          {/* Selection List */}
          <RadioGroup 
            value={selected} 
            onValueChange={(value) => setSelected(value as MoveDateOption)}
            className="max-w-md mx-auto"
          >
            {MOVE_DATE_OPTIONS.map((option) => (
              <RadioListItem
                key={option.value}
                value={option.value}
                icon={<Calendar className="w-4 h-4" />}
                tag={option.tag}
                tagVariant={option.savingsPercent ? 'success' : 'default'}
              >
                {option.label}
              </RadioListItem>
            ))}
          </RadioGroup>
          
          {/* Dynamic Savings Callout */}
          {savingsRange && savingsRange.low > 0 && (
            <div className="bg-feedback-success/10 border border-feedback-success/20 rounded-lg p-3 text-center max-w-md mx-auto animate-fade-in">
              <p className="text-sm text-feedback-success font-medium">
                Estimated savings: ${savingsRange.low.toLocaleString()}–${savingsRange.high.toLocaleString()}
              </p>
            </div>
          )}
          
          {/* Pro Tip Card */}
          <div className="bg-secondary-300 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-body-sm font-semibold text-neutral-800">Pro tip:</p>
                <p className="text-body-sm text-neutral-600">
                  Mid-week moves (Tue–Thu) are typically 15% cheaper than weekends.
                </p>
              </div>
            </div>
          </div>
          
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
          </StickyButtonContainer>
        </div>
      </form>
    </FormLayout>
  )
}

export default MoveDateScreen
