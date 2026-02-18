'use client'

import * as React from 'react'
import { CheckCircle, Star } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { FEATURED_PROVIDER } from '@/types/longevity'

interface LongevityResultsScreenProps {
  budget?: string
}

/**
 * LongevityResultsScreen – Final screen of the longevity funnel
 *
 * Matches live: "Congratulations! We have matched you with your personalized Longevity provider"
 * - Single column, centered, light background
 * - Provider card with logo, match info, next steps
 * - CTA button to join the provider
 * - No progress bar, no sidebar
 */
export function LongevityResultsScreen({ budget }: LongevityResultsScreenProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3F5FB]">
      <Header trustText="Trusted by 100k+ people" />

      <main className="flex-1 flex flex-col items-center justify-start py-8 sm:py-12 px-4">
        <div className="w-full max-w-[680px] mx-auto">
          {/* Congratulations heading */}
          <div className="mb-8">
            <p className="text-[#007AC8] text-lg font-medium mb-2">
              Congratulations!
            </p>
            <h1 className="font-display text-[28px] sm:text-[36px] leading-[36px] sm:leading-[44px] font-normal text-[#171717]">
              We have matched you with your personalized Longevity provider
            </h1>
          </div>

          {/* Provider Card */}
          <div className="bg-white rounded-lg border border-[#EDEDED] shadow-sm overflow-hidden">
            {/* Card header */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECF1FF] text-[#007AC8] text-xs font-semibold mb-3">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {FEATURED_PROVIDER.tagline}
                  </span>
                  <h2 className="text-2xl font-semibold text-[#171717]">
                    {FEATURED_PROVIDER.name}
                  </h2>
                </div>
                {/* Provider logo placeholder */}
                <div className="text-[#171717] text-lg font-light tracking-wide">
                  superpower
                </div>
              </div>

              <hr className="border-t border-[#EDEDED]" />
            </div>

            {/* Match info */}
            <div className="px-6 pb-4">
              <div className="flex items-start gap-3 mb-4">
                <Star className="w-5 h-5 text-[#FFB136] flex-shrink-0 mt-0.5" fill="#FFB136" />
                <p className="text-sm font-semibold text-[#171717] leading-5">
                  {FEATURED_PROVIDER.matchText}
                </p>
              </div>

              <hr className="border-t border-[#EDEDED] mb-4" />

              {/* Next steps */}
              <p className="text-sm font-medium text-[#171717] mb-3">
                &ldquo;What happens next:&rdquo;
              </p>
              <ul className="space-y-2 mb-4">
                {FEATURED_PROVIDER.nextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#333333]">
                    <span className="text-[#333333] mt-1">•</span>
                    {step}
                  </li>
                ))}
              </ul>

              <p className="text-sm font-semibold text-[#171717] mb-4">
                Click below to get started.
              </p>

              <hr className="border-t border-[#EDEDED] mb-6" />

              {/* CTA Button */}
              <a
                href={FEATURED_PROVIDER.ctaUrl}
                className="block w-full text-center py-4 px-6 rounded-[4px] bg-[#007AC8] hover:bg-[#1E72A8] active:bg-[#0B5F95] text-white text-lg font-semibold leading-[26px] transition-colors duration-200"
              >
                {FEATURED_PROVIDER.ctaText}
              </a>
            </div>
          </div>
        </div>
      </main>

      <TrustBadges variant="longevity" />
      <Footer />
    </div>
  )
}

export default LongevityResultsScreen
