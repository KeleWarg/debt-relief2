'use client'

import * as React from 'react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, Input, StickyButtonContainer } from '@/components/ui'
import {
  LONGEVITY_VALIDATION,
  LONGEVITY_PROGRESS_SUBTITLES,
  LONGEVITY_PROGRESS_TIME_ESTIMATES,
  LONGEVITY_TOTAL_STEPS,
} from '@/types/longevity'

interface FirstNameScreenProps {
  initialValue?: string
  onBack?: () => void
  onSubmit?: (firstName: string) => void
}

/**
 * FirstNameScreen
 *
 * Screen 10 - Collects user's first name for personalized longevity plan.
 * Superheader "GET YOUR PERSONALIZED PLAN", headline "What is your First Name?"
 */
export function FirstNameScreen({
  initialValue = '',
  onBack,
  onSubmit,
}: FirstNameScreenProps) {
  const [firstName, setFirstName] = React.useState(initialValue)

  const isValid = firstName.trim().length >= LONGEVITY_VALIDATION.name.minLength

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      onSubmit?.(firstName.trim())
    }
  }

  return (
    <FormLayout
      currentStep={6}
      onBack={onBack}
      progressSubtitles={LONGEVITY_PROGRESS_SUBTITLES}
      progressTimeEstimates={LONGEVITY_PROGRESS_TIME_ESTIMATES}
      totalSteps={LONGEVITY_TOTAL_STEPS}
      progressUnified
      trustBadgeVariant="longevity"
    >
      <form onSubmit={handleSubmit} className="animate-slide-up has-sticky-button">
        {/* Superheader */}
        <p className="text-sm font-semibold uppercase text-[#2F4B96] leading-[22px] text-center mb-4">
          GET YOUR PERSONALIZED PLAN
        </p>

        {/* Headline */}
        <h1 className="font-display text-[40px] leading-[54px] font-normal text-[#171717] text-center mb-8">
          What is your First Name?
        </h1>

        {/* Input */}
        <div className="max-w-md mx-auto mb-8">
          <Input
            label="First name"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            autoFocus
          />
        </div>

        {/* CTA */}
        <StickyButtonContainer>
          <Button
            type="submit"
            fullWidth
            showTrailingIcon
            disabled={!isValid}
          >
            Continue
          </Button>
        </StickyButtonContainer>
      </form>
    </FormLayout>
  )
}

export default FirstNameScreen
