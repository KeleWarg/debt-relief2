'use client'

import * as React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

interface DebtAmountScreenProps {
  initialValue?: number
  onBack?: () => void
  onSubmit?: (value: number) => void
}

const MIN_DEBT = 5000
const MAX_DEBT = 100000
const STEP = 1000
const QUALIFICATION_THRESHOLD = 7500

const TICK_MARKS = [5000, 25000, 50000, 75000, 100000]

/**
 * DebtAmountScreen
 * 
 * Step 3 of the funnel - "How much debt do you have?"
 * Shows a slider with animated counter and qualification messaging
 * 
 * @example
 * <DebtAmountScreen 
 *   initialValue={15000}
 *   onBack={handleBack}
 *   onSubmit={(value) => router.push('/income')}
 * />
 */
export function DebtAmountScreen({ 
  initialValue = 25000, 
  onBack, 
  onSubmit 
}: DebtAmountScreenProps) {
  const [debtAmount, setDebtAmount] = React.useState(initialValue)
  const sliderRef = React.useRef<HTMLInputElement>(null)
  
  // Check if amount qualifies for most programs
  const qualifiesForMostPrograms = debtAmount >= QUALIFICATION_THRESHOLD
  
  // Update CSS variable for track fill
  React.useEffect(() => {
    if (sliderRef.current) {
      const progress = ((debtAmount - MIN_DEBT) / (MAX_DEBT - MIN_DEBT)) * 100
      sliderRef.current.style.setProperty('--progress', `${progress}%`)
    }
  }, [debtAmount])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(debtAmount)
  }
  
  return (
    <FormLayout 
      currentStep={3} 
      onBack={onBack}
    >
      <form onSubmit={handleSubmit} className="animate-slide-up has-sticky-button">
        <div className="space-y-8 text-center">
          {/* Headline */}
          <div>
            <h1 className="font-display text-display md:text-display-md lg:text-display-lg text-neutral-900">
              How much debt do you have?
            </h1>
            <p className="text-body text-neutral-500 mt-2">
              Drag to estimate your total debt
            </p>
          </div>

          {/* Big animated number - hero element */}
          <div className="py-6">
            <AnimatedCounter 
              value={debtAmount} 
              prefix="$" 
              className="font-display text-5xl md:text-6xl font-bold text-neutral-900"
              duration={300}
            />
            {/* Qualification messaging */}
            <div className="mt-3">
              {qualifiesForMostPrograms ? (
                <p className="text-feedback-success font-medium text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  This amount qualifies for most relief programs
                </p>
              ) : (
                <p className="text-neutral-500 font-medium text-center">
                  Some programs may be available — let&apos;s check your options.
                </p>
              )}
              <p className="text-sm text-neutral-500 text-center mt-1">
                Most programs work with balances from $7,500 to $100,000+
              </p>
            </div>
          </div>

          {/* Slider with tick marks */}
          <div className="space-y-3 px-2">
            {/* Tick marks */}
            <div className="relative h-2 mb-4">
              {TICK_MARKS.map((tick) => {
                const position = ((tick - MIN_DEBT) / (MAX_DEBT - MIN_DEBT)) * 100
                return (
                  <div 
                    key={tick}
                    className="absolute top-0 w-0.5 h-2 bg-neutral-300 -translate-x-1/2"
                    style={{ left: `${position}%` }}
                  />
                )
              })}
            </div>
            
            {/* Range slider */}
            <input
              ref={sliderRef}
              type="range"
              min={MIN_DEBT}
              max={MAX_DEBT}
              step={STEP}
              value={debtAmount}
              onChange={(e) => setDebtAmount(Number(e.target.value))}
              className="debt-slider w-full"
              aria-label="Debt amount"
            />
            
            {/* Scale labels */}
            <div className="flex justify-between text-body-sm text-neutral-500 pt-1">
              <span>$5K</span>
              <span>$25K</span>
              <span>$50K</span>
              <span>$75K</span>
              <span>$100K+</span>
            </div>
          </div>

          {/* Submit Button - Sticky on mobile */}
          <StickyButtonContainer>
            <Button type="submit" fullWidth showTrailingIcon>
              Continue
            </Button>
          </StickyButtonContainer>
        </div>
      </form>
    </FormLayout>
  )
}

export default DebtAmountScreen
