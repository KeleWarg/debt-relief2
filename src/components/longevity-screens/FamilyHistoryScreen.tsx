'use client'

import * as React from 'react'
import { Check, Heart } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import { StickyButtonContainer, Button } from '@/components/ui'
import {
  FAMILY_HISTORY_OPTIONS,
  LONGEVITY_PROGRESS_SUBTITLES,
  LONGEVITY_PROGRESS_TIME_ESTIMATES,
  LONGEVITY_TOTAL_STEPS,
  type FamilyHistoryOption,
} from '@/types/longevity'

const EXCLUSIVE_OPTIONS: FamilyHistoryOption[] = ['no-history', 'not-sure']

interface FamilyHistoryScreenProps {
  initialValue?: FamilyHistoryOption[]
  onBack?: () => void
  onSubmit?: (values: FamilyHistoryOption[]) => void
}

/**
 * FamilyHistoryScreen
 *
 * Screen 6 — "Your family's story matters, too"
 * Two-column layout: left = hero image with family history insight overlay,
 * right = frosted glass form panel with multi-select grid
 */
export function FamilyHistoryScreen({
  initialValue = [],
  onBack,
  onSubmit,
}: FamilyHistoryScreenProps) {
  const [selected, setSelected] = React.useState<FamilyHistoryOption[]>(initialValue)

  const toggleOption = (value: FamilyHistoryOption) => {
    setSelected((prev) => {
      const isExclusive = EXCLUSIVE_OPTIONS.includes(value)

      if (isExclusive) {
        if (prev.includes(value)) return []
        return [value]
      }

      const withoutExclusive = prev.filter((v) => !EXCLUSIVE_OPTIONS.includes(v))

      if (withoutExclusive.includes(value)) {
        return withoutExclusive.filter((v) => v !== value)
      }
      return [...withoutExclusive, value]
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selected.length > 0) {
      onSubmit?.(selected)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <ProgressIndicator
        currentStep={3}
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

            {/* Left Column - Hero Image + Family History Insight Overlay */}
            <div className="hidden lg:block animate-fade-in-up">
              <div className="relative rounded-lg overflow-hidden h-full min-h-[550px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e0d4c7] via-[#c9b8a8] to-[#b5a08a]" />
                <img
                  src="/images/longevity-family-hero.jpg"
                  alt="Family health"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />

                {/* Dark glass overlay card at bottom */}
                <div className="absolute left-5 right-5 bottom-5 bg-black/50 backdrop-blur-[12px] rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="w-6 h-6 text-white flex-shrink-0" />
                    <span className="text-white text-lg font-semibold leading-[26px]">Family History Insight</span>
                  </div>
                  <p className="text-white text-sm font-normal leading-[22px] mb-3">
                    Family history can reveal early risks and help shape a preventive care plan.
                  </p>
                  <p className="text-white/80 text-sm leading-[22px]">
                    <span className="font-semibold text-white">Family history and current medications</span> are key to
                    tailoring safe, effective longevity plans.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Frosted Glass Form */}
            <div className="animate-fade-in-up">
              <div className="bg-white/70 backdrop-blur-[12px] rounded-lg border border-[#ECEFF3] px-6 sm:px-10 py-8">
                <form id="family-form" onSubmit={handleSubmit}>
                  {/* Subtitle */}
                  <p className="text-sm font-semibold uppercase text-[#2F4B96] leading-[22px] mb-4">
                    Your family&apos;s story matters, too
                  </p>

                  {/* Heading */}
                  <h1 className="font-display text-[40px] leading-[54px] font-normal text-[#171717] mb-2">
                    Family history
                  </h1>

                  {/* Description */}
                  <p className="text-sm font-normal leading-5 text-[#171717] mb-8">
                    Please check any health conditions in your family. This helps us as we create a proactive
                    plan for your future health needs.
                  </p>

                  {/* Multi-select Grid - 2 per row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
                    {FAMILY_HISTORY_OPTIONS.map((option) => {
                      const isSelected = selected.includes(option.value)
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => toggleOption(option.value)}
                          aria-pressed={isSelected}
                          className={`
                            relative min-h-[64px] px-6 py-3 rounded-[4px] border
                            flex items-center justify-start text-left transition-all duration-200
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2
                            ${
                              isSelected
                                ? 'border-primary-700 bg-primary-300'
                                : 'bg-white border-[#D7DCE5] hover:border-primary-700'
                            }
                          `}
                        >
                          {isSelected && (
                            <span className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-primary-700 text-white">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                          <span className="text-base font-medium leading-6 text-[#1E2125]">
                            {option.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Info badge */}
                  <div className="bg-feedback-success/10 border border-feedback-success/20 rounded-lg px-4 py-3 mb-8">
                    <p className="text-sm text-feedback-success font-medium text-center">
                      Wellness lifestyles can add years to your life
                    </p>
                  </div>

                  {/* Desktop CTA */}
                  <div className="hidden sm:block">
                    <Button type="submit" fullWidth showTrailingIcon disabled={selected.length === 0}>
                      Continue
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky CTA */}
        <StickyButtonContainer className="sm:hidden">
          <Button type="submit" form="family-form" fullWidth showTrailingIcon disabled={selected.length === 0}>
            Continue
          </Button>
        </StickyButtonContainer>
      </main>

      <TrustBadges variant="longevity" />
      <Footer />
    </div>
  )
}

export default FamilyHistoryScreen
