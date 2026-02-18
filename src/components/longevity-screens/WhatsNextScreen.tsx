'use client'

import * as React from 'react'
import { Mail, Phone, Heart, ArrowLeft } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'

interface WhatsNextScreenProps {
  firstName?: string
  email?: string
  onBack?: () => void
}

const NEXT_STEPS = [
  {
    number: 1,
    title: 'Receiving your personalized updates via email',
    icon: Mail,
  },
  {
    number: 2,
    title: 'Expect a call from an advisor',
    icon: Phone,
  },
  {
    number: 3,
    title: 'Support directly from our health experts',
    icon: Heart,
  },
] as const

const MATCH_STEPS = [
  'Answer the phone to secure your exclusive offer',
  'Advisor sets up your information to the provider you have selected',
  'Get detailed information from a US-based team',
] as const

/**
 * WhatsNextScreen
 *
 * Terminal screen showing next steps after completing the longevity funnel.
 * Displays numbered steps with icons and matching process details.
 */
export function WhatsNextScreen({
  firstName,
  onBack,
}: WhatsNextScreenProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Back button */}
      {onBack && (
        <div className="w-full bg-white sticky top-12 z-40">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-neutral-900 hover:text-primary-700 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-5" />
              <span className="text-sm font-normal leading-5">Back</span>
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col">
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 flex-1">
          <div className="animate-slide-up space-y-10">
            {/* Headline */}
            <div className="text-center space-y-3">
              <p className="text-body text-neutral-500">
                We hope you&apos;re as excited as we are
                {firstName ? `, ${firstName}` : ''}
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-neutral-900">
                Here&apos;s what to expect as you wrap up
              </h1>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
              {NEXT_STEPS.map((step) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.number}
                    className="flex items-start gap-4 p-4 border border-neutral-200 rounded-lg"
                  >
                    {/* Number circle */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-300 flex items-center justify-center">
                      <span className="text-primary-700 font-semibold text-sm">
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex items-center gap-3 min-h-[40px]">
                      <p className="text-body text-neutral-800 font-medium">
                        {step.title}
                      </p>
                    </div>

                    {/* Icon */}
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10">
                      <Icon className="w-5 h-5 text-primary-700" />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* How You Will Be Matched */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 text-center">
                How you will be matched
              </h3>

              <div className="space-y-0">
                {MATCH_STEPS.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 py-4">
                    {/* Step indicator with connecting line */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-feedback-success/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-feedback-success font-semibold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      {index < MATCH_STEPS.length - 1 && (
                        <div className="w-px h-6 bg-neutral-200 mt-2" />
                      )}
                    </div>

                    {/* Text */}
                    <p className="text-body-sm text-neutral-800 pt-1">
                      {step}
                    </p>
                  </div>
                ))}
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

export default WhatsNextScreen
