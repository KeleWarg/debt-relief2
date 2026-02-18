'use client'

import * as React from 'react'
import { MapPin, Lock } from 'lucide-react'
import { FormLayout } from '@/components/layout/FormLayout'
import { StickyButtonContainer, Button, Input } from '@/components/ui'
import {
  LONGEVITY_VALIDATION,
  LONGEVITY_PROGRESS_SUBTITLES,
  LONGEVITY_PROGRESS_TIME_ESTIMATES,
  LONGEVITY_TOTAL_STEPS,
} from '@/types/longevity'

interface LongevityZipCodeScreenProps {
  initialValue?: string
  onBack?: () => void
  onSubmit?: (zipCode: string) => void
}

/**
 * LongevityZipCodeScreen
 *
 * Step 7 of the longevity funnel – "Enter your ZIP code"
 * Single zip code input with location helper and security messaging.
 */
export function LongevityZipCodeScreen({
  initialValue = '',
  onBack,
  onSubmit,
}: LongevityZipCodeScreenProps) {
  const [zipCode, setZipCode] = React.useState(initialValue)
  const [error, setError] = React.useState('')

  const isValid = LONGEVITY_VALIDATION.zipCode.pattern.test(zipCode)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 5)
    setZipCode(digits)
    if (error) setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) {
      setError(LONGEVITY_VALIDATION.zipCode.message)
      return
    }
    onSubmit?.(zipCode)
  }

  return (
    <FormLayout
      currentStep={7}
      onBack={onBack}
      progressSubtitles={LONGEVITY_PROGRESS_SUBTITLES}
      progressTimeEstimates={LONGEVITY_PROGRESS_TIME_ESTIMATES}
      totalSteps={LONGEVITY_TOTAL_STEPS}
      progressUnified
      trustBadgeVariant="longevity"
    >
      <form onSubmit={handleSubmit} className="animate-slide-up has-sticky-button">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <p className="text-sm font-semibold uppercase text-[#2F4B96] leading-[22px]">
              Get your personalized plan
            </p>
            <h1 className="font-display text-[40px] leading-[54px] font-normal text-[#171717]">
              Enter your ZIP code
            </h1>
            <p className="text-sm font-normal leading-5 text-[#171717] max-w-md mx-auto">
              By providing your zip we can match you with a local provider
            </p>
          </div>

          {/* Zip Code Input */}
          <div className="max-w-sm mx-auto space-y-3">
            <Input
              label="ZIP Code"
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder="e.g. 10001"
              value={zipCode}
              onChange={handleChange}
              error={error}
              autoComplete="postal-code"
            />

            {/* Use my current location */}
            <button
              type="button"
              className="flex items-center gap-2 text-primary-700 hover:text-primary-750 transition-colors text-sm font-medium"
              onClick={() => {}}
            >
              <MapPin className="w-4 h-4" />
              <span>Use my current location</span>
            </button>
          </div>

          {/* Security badge */}
          <div className="flex items-center justify-center gap-2 text-neutral-500">
            <Lock className="w-4 h-4" />
            <span className="text-body-sm">Secured by Forbes.com</span>
          </div>

          {/* CTA */}
          <StickyButtonContainer>
            <Button type="submit" fullWidth showTrailingIcon disabled={!isValid}>
              Continue
            </Button>
            <p className="text-caption text-neutral-500 text-center mt-3">
              We keep your info secure and only use it to personalize your journey
            </p>
          </StickyButtonContainer>
        </div>
      </form>
    </FormLayout>
  )
}

export default LongevityZipCodeScreen
