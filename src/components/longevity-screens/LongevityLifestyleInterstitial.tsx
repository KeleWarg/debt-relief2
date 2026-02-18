'use client'

import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import { Button } from '@/components/ui'
import {
  RECOMMENDED_PROTOCOLS,
  LONGEVITY_PROGRESS_SUBTITLES,
  LONGEVITY_PROGRESS_TIME_ESTIMATES,
  LONGEVITY_TOTAL_STEPS,
} from '@/types/longevity'

interface LongevityLifestyleInterstitialProps {
  onNext?: () => void
}

const CHART_YEARS = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']

/**
 * LongevityLifestyleInterstitial
 *
 * Full-page interstitial: "Longevity is a lifestyle"
 * Shows biological age chart, recommended protocols, dashboard badge, and CTA
 * over a full-page background image.
 */
export function LongevityLifestyleInterstitial({
  onNext,
}: LongevityLifestyleInterstitialProps) {
  const [showContent, setShowContent] = React.useState(false)
  const [showCards, setShowCards] = React.useState(false)
  const [showCta, setShowCta] = React.useState(false)

  React.useEffect(() => {
    const t0 = setTimeout(() => setShowContent(true), 100)
    const t1 = setTimeout(() => setShowCards(true), 600)
    const t2 = setTimeout(() => setShowCta(true), 1400)
    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      {/* Full-page background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white/80" />
        <img
          src="/images/longevity-lifestyle-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <ProgressIndicator
          currentStep={5}
          subtitles={LONGEVITY_PROGRESS_SUBTITLES}
          timeEstimates={LONGEVITY_PROGRESS_TIME_ESTIMATES}
          totalSteps={LONGEVITY_TOTAL_STEPS}
          unified
          transitionMs={1000}
        />

        <main className="flex-1 flex flex-col">
          <div className="w-full max-w-[550px] mx-auto px-4 sm:px-6 py-6 flex-1">
            {/* Headline + Subheading */}
            <div
              className={cn(
                'transition-all duration-700 ease-out mb-6',
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <h1 className="font-display text-[32px] leading-[40px] font-bold text-[#333333] mb-3">
                Longevity is a lifestyle
              </h1>
              <p className="text-lg font-medium leading-[26px] text-black">
                Focusing on a clear health goal increases your chance of success by 60%.
              </p>
            </div>

            {/* Hero image placeholder */}
            <div
              className={cn(
                'w-full rounded-lg overflow-hidden mb-6 transition-all duration-700 ease-out',
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <div className="w-full h-[280px] sm:h-[363px] bg-gradient-to-br from-[#c7d8f0] via-[#a8c5e2] to-[#8fb8d6] rounded-lg">
                <img
                  src="/images/longevity-lifestyle-hero.jpg"
                  alt="Longevity lifestyle"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
            </div>

            {/* Side-by-side cards: Bio Age + Recommended Protocols */}
            <div
              className={cn(
                'flex flex-col sm:flex-row gap-1.5 mb-6 transition-all duration-700 ease-out',
                showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              {/* Biological Age Card */}
              <div className="flex-1 bg-white rounded-[4px] shadow-[0_4px_8px_-1px_rgba(0,0,0,0.10),0_0_1px_rgba(0,0,0,0.05)] overflow-hidden p-3">
                <p className="text-xs font-bold text-black leading-[18px] mb-2">
                  Biological Age
                </p>
                <p className="text-xs font-normal text-black leading-[18px] mb-4">
                  42 years – 5 years younger than chronological age
                </p>
                {/* Mini chart visualization */}
                <div className="relative h-24 mb-2">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#25CD25]/40 to-[#25CD25]/0 border border-[#25CD25]/30 rounded" />
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
                    {CHART_YEARS.map((year) => (
                      <div key={year} className="flex flex-col items-center gap-1">
                        <div className="w-px h-12 bg-[#F1F1F1]" />
                        <span className="text-[5px] text-[#7D7D7D] font-medium">{year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Protocols Card */}
              <div className="flex-1 bg-white rounded-[4px] shadow-[0_4px_8px_-1px_rgba(0,0,0,0.10),0_0_1px_rgba(0,0,0,0.05)] overflow-hidden p-3">
                <p className="text-xs font-bold text-black leading-[18px] mb-4">
                  Recommended Protocols
                </p>
                <div className="space-y-3">
                  {RECOMMENDED_PROTOCOLS.map((protocol) => (
                    <div
                      key={protocol.name}
                      className="flex items-center justify-between px-3 py-2.5 bg-[#F3F5FB] rounded-[4px]"
                    >
                      <span className="text-xs font-bold uppercase leading-[22px] text-[#003186]">
                        {protocol.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-black" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dashboard badge */}
            <div
              className={cn(
                'w-full sm:max-w-[496px] mx-auto px-3 py-2.5 bg-[#9FBCC9] rounded-[4px] mb-6 transition-all duration-700 ease-out',
                showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <span className="text-white text-lg font-medium leading-[26px]">Dashboard</span>
            </div>

            {/* CTA */}
            <div
              className={cn(
                'transition-all duration-500 ease-out',
                showCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <Button fullWidth showTrailingIcon onClick={onNext}>
                Continue to get your personalized plan
              </Button>
            </div>
          </div>
        </main>

        <TrustBadges variant="longevity" />
        <Footer />
      </div>
    </div>
  )
}

export default LongevityLifestyleInterstitial
