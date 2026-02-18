'use client'

import * as React from 'react'
import { Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button } from '@/components/ui'
import {
  LONGEVITY_PROGRESS_SUBTITLES,
  LONGEVITY_PROGRESS_TIME_ESTIMATES,
  LONGEVITY_TOTAL_STEPS,
} from '@/types/longevity'

interface CostAwarenessInterstitialProps {
  onNext?: () => void
}

/**
 * CostAwarenessInterstitial
 *
 * Screen 7 — Animated comparison of reactive vs preventive care costs
 * No auto-advance — user clicks "Continue"
 */
export function CostAwarenessInterstitial({ onNext }: CostAwarenessInterstitialProps) {
  const [showReactive, setShowReactive] = React.useState(false)
  const [showPreventive, setShowPreventive] = React.useState(false)
  const [showButton, setShowButton] = React.useState(false)

  React.useEffect(() => {
    const reactiveTimer = setTimeout(() => setShowReactive(true), 300)
    const preventiveTimer = setTimeout(() => setShowPreventive(true), 1300)
    const buttonTimer = setTimeout(() => setShowButton(true), 2300)

    return () => {
      clearTimeout(reactiveTimer)
      clearTimeout(preventiveTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  return (
    <FormLayout
      currentStep={4}
      showProgress={false}
      progressSubtitles={LONGEVITY_PROGRESS_SUBTITLES}
      progressTimeEstimates={LONGEVITY_PROGRESS_TIME_ESTIMATES}
      totalSteps={LONGEVITY_TOTAL_STEPS}
      trustBadgeVariant="longevity"
    >
      <div className="flex flex-col items-center py-8 animate-slide-up">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto flex items-center justify-center bg-primary-300 rounded-full">
          <Shield className="w-8 h-8 text-primary-700" />
        </div>

        {/* Headline */}
        <h1 className="font-display text-2xl sm:text-3xl text-neutral-900 text-center mt-6 max-w-md mx-auto">
          Preventive care can save your life, and it can save you thousands in health care expenses
        </h1>

        {/* Bar Chart Comparison */}
        <div className="w-full max-w-md mx-auto mt-10 space-y-6">
          {/* Reactive Care Bar */}
          <div
            className={cn(
              'transition-all duration-700 ease-out',
              showReactive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-800">Reactive Care</span>
              <span className="text-sm font-bold text-feedback-error">$25,000/year</span>
            </div>
            <div className="bg-red-100 border border-red-300 rounded-lg h-12 overflow-hidden">
              <div
                className={cn(
                  'h-full bg-red-200 rounded-lg transition-all duration-1000 ease-out',
                  showReactive ? 'w-full' : 'w-0'
                )}
              />
            </div>
          </div>

          {/* Preventive Care Bar */}
          <div
            className={cn(
              'transition-all duration-700 ease-out',
              showPreventive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-800">Preventive Care</span>
              <span className="text-sm font-bold text-feedback-success">$5,000/year</span>
            </div>
            <div className="bg-green-100 border border-green-300 rounded-lg h-12 overflow-hidden">
              <div
                className={cn(
                  'h-full bg-green-200 rounded-lg transition-all duration-1000 ease-out',
                  showPreventive ? 'w-[20%]' : 'w-0'
                )}
              />
            </div>
          </div>

          {/* Savings callout */}
          <div
            className={cn(
              'text-center transition-all duration-500',
              showPreventive ? 'opacity-100' : 'opacity-0'
            )}
          >
            <p className="text-body-sm text-neutral-500">
              That&apos;s a potential savings of{' '}
              <span className="font-semibold text-feedback-success">$20,000/year</span>
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          className={cn(
            'w-full max-w-md mx-auto mt-8 transition-all duration-500',
            showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <Button fullWidth showTrailingIcon onClick={onNext}>
            Continue
          </Button>
        </div>
      </div>
    </FormLayout>
  )
}

export default CostAwarenessInterstitial
