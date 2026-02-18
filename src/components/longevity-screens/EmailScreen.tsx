'use client'

import * as React from 'react'
import { Lock } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import { Button } from '@/components/ui'
import {
  LONGEVITY_PROGRESS_SUBTITLES,
  LONGEVITY_PROGRESS_TIME_ESTIMATES,
  LONGEVITY_TOTAL_STEPS,
} from '@/types/longevity'

interface EmailScreenProps {
  initialValue?: string
  onBack?: () => void
  onSubmit?: (email: string) => void
}

/**
 * EmailScreen – Step 9 of the longevity funnel (higher budget path)
 *
 * Matches live: "Where should we send your results?"
 * - Subtitle: "GET YOUR PERSONALIZED PLAN"
 * - Email input with validation
 * - "Secured by Forbes.com" badge
 * - Terms and Privacy links
 * - Progress: 75%
 */
export function EmailScreen({
  initialValue = '',
  onBack,
  onSubmit,
}: EmailScreenProps) {
  const [email, setEmail] = React.useState(initialValue)

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      onSubmit?.(email)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header trustText="Trusted by 100k+ people" />

      <ProgressIndicator
        currentStep={9}
        onBack={onBack}
        subtitles={LONGEVITY_PROGRESS_SUBTITLES}
        timeEstimates={LONGEVITY_PROGRESS_TIME_ESTIMATES}
        totalSteps={LONGEVITY_TOTAL_STEPS}
        unified
        transitionMs={1000}
      />

      <main className="flex-1 flex flex-col">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-4 sm:py-8 pb-24 sm:pb-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 lg:gap-20 items-stretch">

            {/* Left Column - Hero Image */}
            <div className="hidden lg:block animate-fade-in-up">
              <div className="relative rounded-lg overflow-hidden h-full min-h-[550px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e8d5c4] via-[#d4b89e] to-[#c09a78]" />
                <img
                  src="/longevity/Desktop/Background_longevity_7_desktop.jpg"
                  alt="Get your plan"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
            </div>

            {/* Right Column - Frosted Glass Form */}
            <div className="animate-fade-in-up">
              <div className="bg-white/70 backdrop-blur-[12px] rounded-lg border border-[#ECEFF3] px-6 sm:px-10 py-8">
                <form onSubmit={handleSubmit}>
                  {/* Section subtitle */}
                  <p className="text-sm font-semibold uppercase text-[#2F4B96] leading-[22px] mb-4">
                    Get your personalized plan
                  </p>

                  {/* Heading */}
                  <h2 className="font-display text-[32px] sm:text-[40px] leading-[40px] sm:leading-[54px] font-normal text-[#171717] mb-2">
                    Where should we send your results?
                  </h2>

                  {/* Description */}
                  <p className="text-sm font-normal leading-5 text-[#171717] mb-6">
                    We&apos;ll send you personalized recommendations, resources and updates - always keeping
                    your information private and secure.
                  </p>

                  {/* Email Input */}
                  <div className="mb-2">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-14 px-4 rounded-[4px] border border-[#D7DCE5] bg-white text-base text-[#171717] placeholder:text-[#6A6A6A] focus:outline-none focus:ring-2 focus:ring-[#007AC8] focus:border-transparent transition-colors"
                    />
                  </div>

                  {/* Secured badge */}
                  <div className="flex items-center gap-1.5 mb-6">
                    <Lock className="w-3.5 h-3.5 text-[#0C7663]" />
                    <span className="text-sm text-[#0C7663] font-medium">Secured by Forbes.com</span>
                  </div>

                  {/* CTA */}
                  <Button type="submit" fullWidth showTrailingIcon disabled={!isValid}>
                    Continue
                  </Button>

                  {/* Legal */}
                  <p className="text-xs text-[#6A6A6A] text-center mt-4">
                    <a href="https://www.forbes.com/terms-and-conditions/" className="underline hover:text-[#007AC8]" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
                    {' '}and{' '}
                    <a href="https://www.forbes.com/advisor/privacy-policy/" className="underline hover:text-[#007AC8]" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    {' '}apply.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <TrustBadges variant="longevity" />
      <Footer />
    </div>
  )
}

export default EmailScreen
