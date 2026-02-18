'use client'

import * as React from 'react'
import { Check, Stethoscope } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import { StickyButtonContainer, Button } from '@/components/ui'
import {
  SERVICE_OPTIONS,
  LONGEVITY_PROGRESS_SUBTITLES,
  LONGEVITY_PROGRESS_TIME_ESTIMATES,
  LONGEVITY_TOTAL_STEPS,
  type ServiceOption,
} from '@/types/longevity'

interface ServicesScreenProps {
  initialValue?: ServiceOption[]
  onBack?: () => void
  onSubmit?: (values: ServiceOption[]) => void
}

const ALL_INDIVIDUAL_OPTIONS: ServiceOption[] = SERVICE_OPTIONS
  .map((o) => o.value)
  .filter((v) => v !== 'all-of-the-above')

/**
 * ServicesScreen
 *
 * Step 4 of the longevity funnel – "What service(s) are you interested in?"
 * Two-column layout: hero image sidebar + frosted glass form panel.
 */
export function ServicesScreen({
  initialValue = [],
  onBack,
  onSubmit,
}: ServicesScreenProps) {
  const [selected, setSelected] = React.useState<ServiceOption[]>(initialValue)

  const toggleOption = (value: ServiceOption) => {
    setSelected((prev) => {
      if (value === 'all-of-the-above') {
        if (prev.includes('all-of-the-above')) return []
        return SERVICE_OPTIONS.map((o) => o.value)
      }

      const isCurrentlySelected = prev.includes(value)
      let next: ServiceOption[]

      if (isCurrentlySelected) {
        next = prev.filter((v) => v !== value && v !== 'all-of-the-above')
      } else {
        next = [...prev, value]
        const allIndividualSelected = ALL_INDIVIDUAL_OPTIONS.every((opt) => next.includes(opt))
        if (allIndividualSelected && !next.includes('all-of-the-above')) {
          next.push('all-of-the-above')
        }
      }

      return next
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

            {/* Left Column - Hero Image + Overlay */}
            <div className="hidden lg:block animate-fade-in-up">
              <div className="relative rounded-lg overflow-hidden h-full min-h-[550px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c7d8f0] via-[#a8c5e2] to-[#8fb8d6]" />
                <img
                  src="/images/longevity-services-hero.jpg"
                  alt="Health services"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />

                {/* Dark glass overlay card */}
                <div className="absolute left-5 right-5 bottom-5 bg-black/50 backdrop-blur-[12px] rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Stethoscope className="w-5 h-5 text-white" />
                    <p className="text-white text-lg font-semibold leading-[26px]">
                      Comprehensive Care
                    </p>
                  </div>
                  <p className="text-white text-sm font-normal leading-[22px]">
                    From full-body MRI scans to genetic testing, our partner clinics offer
                    cutting-edge diagnostics and personalized treatment plans.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Frosted Glass Form */}
            <div className="animate-fade-in-up">
              <div className="bg-white/70 backdrop-blur-[12px] rounded-lg border border-[#ECEFF3] px-6 sm:px-10 py-8">
                <form id="services-form" onSubmit={handleSubmit}>
                  {/* Subtitle */}
                  <p className="text-sm font-semibold uppercase text-[#2F4B96] leading-[22px] mb-4">
                    Live your best 100 years
                  </p>

                  {/* Heading */}
                  <h1 className="font-display text-[40px] leading-[54px] font-normal text-[#171717] mb-2">
                    What service(s) are you interested in?
                  </h1>

                  {/* Description */}
                  <p className="text-sm font-normal leading-5 text-[#171717] mb-8">
                    From diagnostics to lifestyle coaching, select the areas you&apos;d like us to explore
                    for your health journey.
                  </p>

                  {/* Multi-select Grid - 2 per row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                    {SERVICE_OPTIONS.map((option) => {
                      const isSelected = selected.includes(option.value)
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => toggleOption(option.value)}
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
          <Button type="submit" form="services-form" fullWidth showTrailingIcon disabled={selected.length === 0}>
            Continue
          </Button>
        </StickyButtonContainer>
      </main>

      <TrustBadges variant="longevity" />
      <Footer />
    </div>
  )
}

export default ServicesScreen
