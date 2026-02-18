'use client'

import * as React from 'react'
import { Lock, CheckCircle2 } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import { Button, Input, StickyButtonContainer } from '@/components/ui'
import {
  LONGEVITY_VALIDATION,
  LONGEVITY_PROGRESS_SUBTITLES,
  LONGEVITY_PROGRESS_TIME_ESTIMATES,
  LONGEVITY_TOTAL_STEPS,
} from '@/types/longevity'

interface LongevityEmailScreenProps {
  initialValue?: string
  onBack?: () => void
  onSubmit?: (email: string) => void
}

/**
 * LongevityEmailScreen
 *
 * Screen 12 - Email capture for the longevity funnel.
 * Custom layout (Header, ProgressIndicator, main, TrustBadges, Footer)
 * similar to the EstimateAndEmailScreen pattern from the moving funnel.
 */
export function LongevityEmailScreen({
  initialValue = '',
  onBack,
  onSubmit,
}: LongevityEmailScreenProps) {
  const [email, setEmail] = React.useState(initialValue)
  const [error, setError] = React.useState<string | null>(null)

  const isValid = LONGEVITY_VALIDATION.email.pattern.test(email)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!LONGEVITY_VALIDATION.email.pattern.test(email)) {
      setError(LONGEVITY_VALIDATION.email.message)
      return
    }

    onSubmit?.(email)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />

      {/* Progress Indicator */}
      <ProgressIndicator
        currentStep={7}
        onBack={onBack}
        subtitles={LONGEVITY_PROGRESS_SUBTITLES}
        timeEstimates={LONGEVITY_PROGRESS_TIME_ESTIMATES}
        totalSteps={LONGEVITY_TOTAL_STEPS}
        unified
        transitionMs={1000}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="w-full max-w-content mx-auto px-4 sm:px-6 py-8 flex-1">
          <form
            id="longevity-email-form"
            onSubmit={handleSubmit}
            className="animate-slide-up has-sticky-button"
          >
            {/* Superheader */}
            <p className="text-sm font-semibold uppercase text-[#2F4B96] leading-[22px] text-center mb-4">
              Get your personalized plan
            </p>

            {/* Headline */}
            <h1 className="font-display text-[40px] leading-[54px] font-normal text-[#171717] text-center mb-3">
              Where should we send your results?
            </h1>

            {/* Description */}
            <p className="text-sm font-normal leading-5 text-[#171717] text-center max-w-md mx-auto mb-8">
              We&apos;ll send you personalized recommendations, resources and
              updates&mdash;always keeping your information private and secure
            </p>

            {/* Email Input */}
            <div className="max-w-md mx-auto mb-6">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                error={error ?? undefined}
                autoComplete="email"
                autoFocus
              />

              {/* Trust signals below input */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-feedback-success flex-shrink-0" />
                  <span className="text-xs text-neutral-500">
                    Secured by Forbes.com
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-feedback-success flex-shrink-0" />
                  <span className="text-xs text-neutral-500">
                    100% free, no spam
                  </span>
                </div>
              </div>
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

              {/* Privacy line */}
              <p className="text-caption text-neutral-500 text-center mt-3">
                We keep your info secure and only use it to personalize your
                journey
              </p>
            </StickyButtonContainer>
          </form>
        </div>
      </main>

      {/* Trust Badges */}
      <TrustBadges variant="longevity" />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default LongevityEmailScreen
