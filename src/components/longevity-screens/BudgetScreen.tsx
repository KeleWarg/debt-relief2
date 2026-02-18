'use client'

import * as React from 'react'
import { DollarSign } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import {
  BUDGET_OPTIONS,
  LONGEVITY_PROGRESS_SUBTITLES,
  LONGEVITY_PROGRESS_TIME_ESTIMATES,
  LONGEVITY_TOTAL_STEPS,
  type BudgetOption,
} from '@/types/longevity'

interface BudgetScreenProps {
  initialValue?: BudgetOption
  onBack?: () => void
  onSubmit?: (value: BudgetOption) => void
}

/**
 * BudgetScreen – Step 7 of the longevity funnel
 *
 * Matches live: "What are you willing to invest in your health optimization plan?"
 * - 3 stacked vertical options (not 2-col grid), auto-advance
 * - Subtitle: "PLANNING WITHIN YOUR COMFORT ZONE"
 * - Description about sustainable plans
 * - Left sidebar: hero image + "Cost Awareness" overlay
 * - Progress: 58%
 */
export function BudgetScreen({
  initialValue,
  onBack,
  onSubmit,
}: BudgetScreenProps) {
  const [selected, setSelected] = React.useState<BudgetOption | undefined>(initialValue)

  const handleSelect = (value: BudgetOption) => {
    setSelected(value)
    setTimeout(() => onSubmit?.(value), 300)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header trustText="Trusted by 100k+ people" />

      <ProgressIndicator
        currentStep={7}
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

            {/* Left Column - Hero Image + Cost Awareness Overlay */}
            <div className="hidden lg:block animate-fade-in-up">
              <div className="relative rounded-lg overflow-hidden h-full min-h-[550px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c7e0d0] via-[#a2c9b1] to-[#7db398]" />
                <img
                  src="/longevity/Desktop/Background_longevity_7_desktop.jpg"
                  alt="Wellness investment"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />

                {/* Dark glass overlay card at bottom */}
                <div className="absolute left-5 right-5 bottom-5 bg-black/50 backdrop-blur-[12px] rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="w-6 h-6 text-white flex-shrink-0" />
                    <span className="text-white text-lg font-semibold leading-[26px]">Cost Awareness</span>
                  </div>
                  <p className="text-white text-sm font-normal leading-[22px]">
                    Treatment costs vary depending on diagnostics, therapies, and ongoing support.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Frosted Glass Form */}
            <div className="animate-fade-in-up">
              <div className="bg-white/70 backdrop-blur-[12px] rounded-lg border border-[#ECEFF3] px-6 sm:px-10 py-8">
                {/* Section subtitle */}
                <p className="text-sm font-semibold uppercase text-[#2F4B96] leading-[22px] mb-4">
                  Planning within your comfort zone
                </p>

                {/* Heading */}
                <h2 className="font-display text-[28px] sm:text-[36px] leading-[36px] sm:leading-[48px] font-normal text-[#171717] mb-2">
                  What are you willing to invest in your health optimization plan?
                </h2>

                {/* Description */}
                <p className="text-sm font-normal leading-5 text-[#171717] mb-8">
                  We&apos;ll recommend options that fit your lifestyle and budget, so your longevity plan
                  feels sustainable - not stressful.
                </p>

                {/* Budget Selection - Stacked vertically (matches live) */}
                <div className="flex flex-col gap-4">
                  {BUDGET_OPTIONS.map((option) => {
                    const isSelected = selected === option.value
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelect(option.value)}
                        className={`
                          min-h-[56px] px-6 py-4 rounded-[4px] border w-full
                          flex items-center justify-center text-center transition-all duration-200
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
            src="/longevity/Mobile/Background_longevity_7_mobile.jpg"
            alt="Wellness investment"
            className="w-full h-auto rounded-lg max-w-xl mx-auto"
          />
        </div>
      </main>

      <TrustBadges variant="longevity" />
      <Footer />
    </div>
  )
}

export default BudgetScreen
