'use client'

import * as React from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import {
  TREATMENT_PREFERENCE_OPTIONS,
  LONGEVITY_PROGRESS_SUBTITLES,
  LONGEVITY_PROGRESS_TIME_ESTIMATES,
  LONGEVITY_TOTAL_STEPS,
  type TreatmentPreferenceOption,
} from '@/types/longevity'

interface TreatmentPreferenceScreenProps {
  initialValue?: TreatmentPreferenceOption
  onBack?: () => void
  onSubmit?: (value: TreatmentPreferenceOption) => void
}

/**
 * TreatmentPreferenceScreen – Step 4 of the longevity funnel
 *
 * Matches live: "What treatment would you prefer?"
 * - Options: In-person, Virtual, Hybrid (2-col grid, auto-advance)
 * - Subtitle: "HOW CAN WE BE THERE FOR YOU?"
 * - Progress: 33%
 */
export function TreatmentPreferenceScreen({
  initialValue,
  onBack,
  onSubmit,
}: TreatmentPreferenceScreenProps) {
  const [selected, setSelected] = React.useState<TreatmentPreferenceOption | undefined>(initialValue)

  const handleSelect = (value: TreatmentPreferenceOption) => {
    setSelected(value)
    setTimeout(() => onSubmit?.(value), 300)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header trustText="Trusted by 100k+ people" />

      <ProgressIndicator
        currentStep={4}
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#c7d8f0] via-[#a8c5e2] to-[#8fb8d6]" />
                <img
                  src="/longevity/Desktop/Background_longevity_4_desktop.jpg"
                  alt="Treatment options"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
            </div>

            {/* Right Column - Frosted Glass Form */}
            <div className="animate-fade-in-up">
              <div className="bg-white/70 backdrop-blur-[12px] rounded-lg border border-[#ECEFF3] px-6 sm:px-10 py-8">
                {/* Section subtitle */}
                <p className="text-sm font-semibold uppercase text-[#2F4B96] leading-[22px] mb-4">
                  How can we be there for you?
                </p>

                {/* Heading */}
                <h2 className="font-display text-[32px] sm:text-[40px] leading-[40px] sm:leading-[54px] font-normal text-[#171717] mb-8">
                  What treatment would you prefer?
                </h2>

                {/* Selection Grid - 2 per row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {TREATMENT_PREFERENCE_OPTIONS.map((option) => {
                    const isSelected = selected === option.value
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelect(option.value)}
                        className={`
                          h-16 px-6 py-3 rounded-[4px] border
                          flex items-center justify-start text-left transition-all duration-200
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2
                          ${
                            isSelected
                              ? 'border-primary-700 bg-primary-300'
                              : 'bg-white border-[#D7DCE5] hover:border-primary-700'
                          }
                        `}
                      >
                        <span className="text-base font-medium leading-6 text-[#1E2125]">
                          {option.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Hero Image */}
        <div className="lg:hidden px-4 sm:px-6 pb-6">
          <img
            src="/longevity/Mobile/Background_longevity_4_mobile.jpg"
            alt="Treatment options"
            className="w-full h-auto rounded-lg max-w-xl mx-auto"
          />
        </div>
      </main>

      <TrustBadges variant="longevity" />
      <Footer />
    </div>
  )
}

export default TreatmentPreferenceScreen
