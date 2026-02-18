'use client'

import * as React from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import {
  LONGEVITY_PROGRESS_SUBTITLES,
  LONGEVITY_PROGRESS_TIME_ESTIMATES,
  LONGEVITY_TOTAL_STEPS,
  type GenderOption,
} from '@/types/longevity'

interface GenderScreenProps {
  initialValue?: GenderOption
  onBack?: () => void
  onSubmit?: (value: GenderOption) => void
}

/** Male symbol SVG icon */
function MaleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="19" r="7.5" stroke="currentColor" strokeWidth="2" />
      <line x1="18.5" y1="13.5" x2="26" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="21" y1="6" x2="26" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="6" x2="26" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Female symbol SVG icon */
function FemaleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="12" r="7.5" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="19.5" x2="16" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="24" x2="20" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/**
 * GenderScreen – Step 2 of the longevity funnel
 *
 * Matches live: "What's your gender?" with male/female icons
 * Auto-advance, progress 17%
 */
export function GenderScreen({ initialValue, onBack, onSubmit }: GenderScreenProps) {
  const [selected, setSelected] = React.useState<GenderOption | undefined>(initialValue)

  const handleSelect = (value: GenderOption) => {
    setSelected(value)
    setTimeout(() => onSubmit?.(value), 300)
  }

  const genderCards: { value: GenderOption; label: string; Icon: React.FC<{ className?: string }> }[] = [
    { value: 'male', label: 'Male', Icon: MaleIcon },
    { value: 'female', label: 'Female', Icon: FemaleIcon },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header trustText="Trusted by 100k+ people" />

      <ProgressIndicator
        currentStep={2}
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
                  src="/longevity/Desktop/Background_longevity_2_desktop.jpg"
                  alt="Healthy lifestyle"
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
                  Let&apos;s start with the basics
                </p>

                {/* Heading */}
                <h2 className="font-display text-[32px] sm:text-[40px] leading-[40px] sm:leading-[54px] font-normal text-[#171717] mb-2">
                  What&apos;s your gender?
                </h2>

                {/* Description */}
                <p className="text-sm font-normal leading-5 text-[#171717] mb-8">
                  Your age and gender help us personalize recommendations, since health and longevity
                  needs change across life stages.
                </p>

                {/* Gender Selection - 2 cards side by side */}
                <div className="grid grid-cols-2 gap-5">
                  {genderCards.map(({ value, label, Icon }) => {
                    const isSelected = selected === value
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleSelect(value)}
                        className={`
                          h-16 px-6 py-3 rounded-[4px] border
                          flex items-center gap-3 justify-start text-left transition-all duration-200
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2
                          ${
                            isSelected
                              ? 'border-primary-700 bg-primary-300'
                              : 'bg-white border-[#D7DCE5] hover:border-primary-700'
                          }
                        `}
                      >
                        <Icon className="w-7 h-7 text-[#1E2125]" />
                        <span className="text-base font-medium leading-6 text-[#1E2125]">
                          {label}
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
            src="/longevity/Mobile/Background_longevity_2_mobile.jpg"
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

export default GenderScreen
