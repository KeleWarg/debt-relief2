'use client'

import * as React from 'react'
import { HeartPulse } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import { Button } from '@/components/ui'
import {
  LONGEVITY_PROGRESS_SUBTITLES,
  LONGEVITY_PROGRESS_TIME_ESTIMATES,
  LONGEVITY_TOTAL_STEPS,
} from '@/types/longevity'

interface FamilyHistoryInterstitialProps {
  onNext?: () => void
}

/**
 * FamilyHistoryInterstitial
 *
 * Interstitial screen before Family History —
 * "Family history and current medications are key to tailoring safe,
 *  effective longevity plans"
 *
 * Animated content: headline, chart visualization, and CTA.
 */
export function FamilyHistoryInterstitial({ onNext }: FamilyHistoryInterstitialProps) {
  const [showHeadline, setShowHeadline] = React.useState(false)
  const [showChart, setShowChart] = React.useState(false)
  const [showButton, setShowButton] = React.useState(false)

  React.useEffect(() => {
    const t0 = setTimeout(() => setShowHeadline(true), 100)
    const t1 = setTimeout(() => setShowChart(true), 600)
    const t2 = setTimeout(() => setShowButton(true), 1400)

    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <ProgressIndicator
        currentStep={4}
        subtitles={LONGEVITY_PROGRESS_SUBTITLES}
        timeEstimates={LONGEVITY_PROGRESS_TIME_ESTIMATES}
        totalSteps={LONGEVITY_TOTAL_STEPS}
        unified
        transitionMs={1000}
      />

      <main className="flex-1 flex flex-col">
        <div className="w-full max-w-content mx-auto px-4 sm:px-6 py-8 flex-1 flex flex-col items-center justify-center">
          {/* Icon */}
          <div
            className={cn(
              'transition-all duration-700 ease-out',
              showHeadline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-primary-300 rounded-full mb-6">
              <HeartPulse className="w-8 h-8 text-primary-700" />
            </div>
          </div>

          {/* Headline */}
          <div
            className={cn(
              'transition-all duration-700 ease-out text-center max-w-lg',
              showHeadline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <h1 className="font-display text-2xl sm:text-3xl text-neutral-900 mb-3">
              Family history and current medications are key to tailoring safe, effective longevity plans
            </h1>
          </div>

          {/* Chart Visualization */}
          <div
            className={cn(
              'w-full max-w-sm mt-8 transition-all duration-700 ease-out',
              showChart ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-card">
              {/* Simulated Years Bar Chart */}
              <p className="text-body-sm font-semibold text-neutral-800 uppercase tracking-wide mb-4">
                Wellness lifestyles can add years to your life
              </p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-neutral-500">Average lifespan</span>
                    <span className="text-xs font-semibold text-neutral-800">78 years</span>
                  </div>
                  <div className="h-6 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full bg-neutral-400 rounded-full transition-all duration-1000 ease-out',
                        showChart ? 'w-[78%]' : 'w-0'
                      )}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-neutral-500">With preventive care</span>
                    <span className="text-xs font-semibold text-feedback-success">+10 years</span>
                  </div>
                  <div className="h-6 bg-green-50 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full bg-feedback-success/60 rounded-full transition-all duration-1200 ease-out',
                        showChart ? 'w-[88%]' : 'w-0'
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className={cn(
              'w-full max-w-sm mt-8 transition-all duration-500',
              showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <Button fullWidth showTrailingIcon onClick={onNext}>
              Continue
            </Button>
          </div>
        </div>
      </main>

      <TrustBadges variant="longevity" />
      <Footer />
    </div>
  )
}

export default FamilyHistoryInterstitial
