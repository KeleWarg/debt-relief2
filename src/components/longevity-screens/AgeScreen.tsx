'use client'

import * as React from 'react'
import { Lightbulb } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import {
  AGE_RANGE_OPTIONS,
  LONGEVITY_PROGRESS_SUBTITLES,
  LONGEVITY_PROGRESS_TIME_ESTIMATES,
  LONGEVITY_TOTAL_STEPS,
  type AgeRangeOption,
} from '@/types/longevity'

interface AgeScreenProps {
  initialValue?: AgeRangeOption
  onBack?: () => void
  onSubmit?: (value: AgeRangeOption) => void
}

/**
 * AgeScreen – Step 1 of the longevity funnel
 *
 * Matches the live Forbes Health journey:
 * - Dual heading: big "Find The Right Longevity Clinic For You" + sub "What is your age?"
 * - 6 age ranges in 2-col grid, auto-advance on select
 * - Left sidebar: hero image + "Fun fact" overlay
 * - Progress: 10%
 */
export function AgeScreen({ initialValue, onSubmit }: AgeScreenProps) {
  const [selected, setSelected] = React.useState<AgeRangeOption | undefined>(initialValue)

  const handleSelect = (value: AgeRangeOption) => {
    setSelected(value)
    setTimeout(() => onSubmit?.(value), 300)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header trustText="Trusted by 100k+ people" />

      <ProgressIndicator
        currentStep={1}
        subtitles={LONGEVITY_PROGRESS_SUBTITLES}
        timeEstimates={LONGEVITY_PROGRESS_TIME_ESTIMATES}
        totalSteps={LONGEVITY_TOTAL_STEPS}
        unified
        transitionMs={1000}
      />

      <main className="flex-1 flex flex-col">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-4 sm:py-8 pb-24 sm:pb-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 lg:gap-20 items-stretch">

            {/* Left Column - Hero Image + Fun Fact Overlay */}
            <div className="hidden lg:block animate-fade-in-up">
              <div className="relative rounded-lg overflow-hidden h-full min-h-[550px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c7d8f0] via-[#a8c5e2] to-[#8fb8d6]" />
                <img
                  src="/longevity/Desktop/Background_longevity_1_desktop.jpg"
                  alt="Healthy lifestyle"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />

                {/* Dark glass overlay card at bottom */}
                <div className="absolute left-5 right-5 bottom-5 bg-black/50 backdrop-blur-[12px] rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Lightbulb className="w-6 h-6 text-white flex-shrink-0" />
                    <span className="text-white text-lg font-semibold leading-[26px]">Fun fact</span>
                  </div>
                  <p className="text-white text-sm font-normal leading-[22px]">
                    According to the World Health Organization, 60% of related factors to individual
                    health and quality of life are correlated to lifestyle.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Frosted Glass Form */}
            <div className="animate-fade-in-up">
              <div className="bg-white/70 backdrop-blur-[12px] rounded-lg border border-[#ECEFF3] px-6 sm:px-10 py-8">
                {/* Section subtitle */}
                <p className="text-sm font-semibold uppercase text-[#2F4B96] leading-[22px] mb-4">
                  Let&apos;s start with the basics
                </p>

                {/* Main heading */}
                <h2 className="font-display text-[32px] sm:text-[40px] leading-[40px] sm:leading-[54px] font-normal text-[#171717] mb-4">
                  Find The Right Longevity Clinic For You
                </h2>

                {/* Divider */}
                <hr className="border-t border-[#EDEDED] mb-6" />

                {/* Sub-heading (question) */}
                <h3 className="text-xl sm:text-2xl font-semibold text-[#171717] mb-2">
                  What is your age?
                </h3>

                {/* Description */}
                <p className="text-sm font-normal leading-5 text-[#171717] mb-8">
                  Your age range helps us to personalize your recommendations, as your health and
                  longevity needs may change over time.
                </p>

                {/* Age Selection Grid - 2 per row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {AGE_RANGE_OPTIONS.map((option) => {
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

        {/* Mobile Hero Image (overlay baked in) */}
        <div className="lg:hidden px-4 sm:px-6 pb-6">
          <img
            src="/longevity/Mobile/Background_longevity_1_mobile.jpg"
            alt="Healthy lifestyle"
            className="w-full h-auto rounded-lg max-w-xl mx-auto"
          />
        </div>
      </main>

      <TrustBadges variant="longevity" />
      <Footer />
    </div>
  )
}

export default AgeScreen
