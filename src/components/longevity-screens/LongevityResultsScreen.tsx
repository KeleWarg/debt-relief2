'use client'

import * as React from 'react'
import Image from 'next/image'
import { CheckCircle, Clock } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { FEATURED_PROVIDER } from '@/types/longevity'

interface LongevityResultsScreenProps {
  budget?: string
}

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
            <div className="px-6 pt-6 pb-0">
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECF1FF] text-[#007AC8] text-xs font-semibold mb-4">
                <CheckCircle className="w-3.5 h-3.5" />
                {FEATURED_PROVIDER.tagline}
              </span>

              {/* Provider name + Logo row */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-[#171717]">
                  {FEATURED_PROVIDER.name}
                </h2>
                <Image
                  src="/longevity/cenegenics-logo.png"
                  alt={FEATURED_PROVIDER.name}
                  width={140}
                  height={28}
                  className="object-contain"
                />
              </div>

              <hr className="border-t border-[#EDEDED]" />
            </div>

            {/* Description + Next steps */}
            <div className="px-6 py-5">
              <p className="text-sm text-[#333333] leading-6 mb-5">
                Since 1997 <span className="font-semibold">{FEATURED_PROVIDER.name}</span>{' '}
                {FEATURED_PROVIDER.description.replace(
                  `Since 1997 ${FEATURED_PROVIDER.name} `,
                  ''
                )}
              </p>

              <p className="text-sm font-semibold text-[#171717] mb-3">
                What happens next:
              </p>
              <ul className="space-y-2 mb-6">
                {FEATURED_PROVIDER.nextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#333333] leading-5">
                    <span className="mt-0.5 shrink-0">&#8226;</span>
                    {step}
                  </li>
                ))}
              </ul>

              <hr className="border-t border-[#EDEDED] mb-5" />

              {/* Next Step callout */}
              <div className="flex items-center gap-3 mb-6">
                <p className="text-sm font-semibold text-[#171717]">Next Step</p>
                <div className="flex items-center gap-1.5 text-[#007AC8]">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {FEATURED_PROVIDER.nextStepCallout}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={FEATURED_PROVIDER.ctaUrl}
                className="block w-full text-center py-4 px-4 sm:px-6 rounded-[4px] bg-[#007AC8] hover:bg-[#1E72A8] active:bg-[#0B5F95] text-white text-base sm:text-lg font-semibold leading-snug transition-colors duration-200"
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
