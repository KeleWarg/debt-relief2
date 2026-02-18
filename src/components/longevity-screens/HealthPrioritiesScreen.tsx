'use client'

import * as React from 'react'
import { Check, Star, Quote } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import { StickyButtonContainer, Button } from '@/components/ui'
import {
  HEALTH_PRIORITY_OPTIONS,
  LONGEVITY_PROGRESS_SUBTITLES,
  LONGEVITY_PROGRESS_TIME_ESTIMATES,
  LONGEVITY_TOTAL_STEPS,
  type HealthPriorityOption,
} from '@/types/longevity'

interface HealthPrioritiesScreenProps {
  initialValue?: HealthPriorityOption[]
  onBack?: () => void
  onSubmit?: (values: HealthPriorityOption[]) => void
}

/**
 * HealthPrioritiesScreen – Step 3 of the longevity funnel
 *
 * Matches live: "What are your top health priorities?"
 * - Checkbox-style multi-select in 2-col grid
 * - Subtitle: "SETTING YOUR PRIORITIES"
 * - Description: "Select all that apply."
 * - Continue button (disabled until selection)
 * - Info badge: "Preventative care and early screening can add up to 10 healthy years."
 * - Left sidebar: "Personalized Expert Guidance" with Katie Doyle credit
 * - Progress: 25%
 */
export function HealthPrioritiesScreen({
  initialValue = [],
  onBack,
  onSubmit,
}: HealthPrioritiesScreenProps) {
  const [selected, setSelected] = React.useState<HealthPriorityOption[]>(initialValue)

  const toggleOption = (value: HealthPriorityOption) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selected.length > 0) {
      onSubmit?.(selected)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header trustText="Trusted by 100k+ people" />

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

            {/* Left Column - Hero Image + Expert Guidance Overlay */}
            <div className="hidden lg:block animate-fade-in-up">
              <div className="relative rounded-lg overflow-hidden h-full min-h-[550px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4e4d9] via-[#b5d4c3] to-[#8fb8a6]" />
                <img
                  src="/longevity/Desktop/Background_longevity_3_desktop.jpg"
                  alt="Health priorities"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />

                {/* Dark glass overlay card at bottom */}
                <div className="absolute left-5 right-5 bottom-5 bg-black/50 backdrop-blur-[12px] rounded-lg p-6">
                  <p className="text-white text-lg font-bold leading-[26px] mb-1">Forbes</p>
                  <p className="text-white text-lg font-semibold leading-[26px] mb-3">
                    Personalized Expert Guidance
                  </p>
                  <p className="text-white/90 text-sm font-normal leading-[22px] mb-4">
                    Our team of experienced journalists and medical experts help you make simpler,
                    smarter and less stressful wellness decisions.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Quote className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold leading-5">Katie Doyle</p>
                      <p className="text-white/70 text-xs leading-4">Forbes Health SVP of Content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Frosted Glass Form */}
            <div className="animate-fade-in-up">
              <div className="bg-white/70 backdrop-blur-[12px] rounded-lg border border-[#ECEFF3] px-6 sm:px-10 py-8">
                <form id="priorities-form" onSubmit={handleSubmit}>
                  {/* Section subtitle */}
                  <p className="text-sm font-semibold uppercase text-[#2F4B96] leading-[22px] mb-4">
                    Setting your priorities
                  </p>

                  {/* Heading */}
                  <h2 className="font-display text-[32px] sm:text-[40px] leading-[40px] sm:leading-[54px] font-normal text-[#171717] mb-2">
                    What are your top health priorities?
                  </h2>

                  {/* Description */}
                  <p className="text-sm font-normal leading-5 text-[#171717] mb-6">
                    Select all that apply.
                  </p>

                  {/* Multi-select Grid - 2 per row with checkbox style */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {HEALTH_PRIORITY_OPTIONS.map((option) => {
                      const isSelected = selected.includes(option.value)
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => toggleOption(option.value)}
                          className={`
                            min-h-[56px] px-4 py-3 rounded-[4px] border
                            flex items-center gap-3 text-left transition-all duration-200
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2
                            ${
                              isSelected
                                ? 'border-primary-700 bg-primary-300'
                                : 'bg-white border-[#D7DCE5] hover:border-primary-700'
                            }
                          `}
                        >
                          {/* Checkbox indicator */}
                          <div className={`
                            w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-colors
                            ${isSelected ? 'bg-primary-700 border-primary-700' : 'border-[#D7DCE5] bg-white'}
                          `}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-sm font-medium leading-5 text-[#1E2125]">
                            {option.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Desktop CTA */}
                  <div className="hidden sm:block mb-6">
                    <Button type="submit" fullWidth showTrailingIcon disabled={selected.length === 0}>
                      Continue
                    </Button>
                  </div>

                  {/* Divider */}
                  <hr className="border-t border-[#EDEDED] mb-4" />

                  {/* Info badge */}
                  <div className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-[#FFB136] flex-shrink-0 mt-0.5" fill="#FFB136" />
                    <p className="text-sm text-[#333333] font-normal leading-5">
                      Preventative care and early screening can add up to 10 healthy years.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Hero Image (overlay baked in) */}
        <div className="lg:hidden px-4 sm:px-6 pb-6">
          <img
            src="/longevity/Mobile/Background_longevity_3_mobile.jpg"
            alt="Health priorities"
            className="w-full h-auto rounded-lg max-w-xl mx-auto"
          />
        </div>

        {/* Mobile Sticky CTA */}
        <StickyButtonContainer className="sm:hidden">
          <Button type="submit" form="priorities-form" fullWidth showTrailingIcon disabled={selected.length === 0}>
            Continue
          </Button>
        </StickyButtonContainer>
      </main>

      <TrustBadges variant="longevity" />
      <Footer />
    </div>
  )
}

export default HealthPrioritiesScreen
