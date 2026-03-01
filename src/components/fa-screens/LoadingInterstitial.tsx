'use client'

import * as React from 'react'
import { CheckCircle2, Lock } from 'lucide-react'

const PARTNER_LOGOS = [
  { src: '/logo-fetch.svg', alt: 'Partner A' },
  { src: '/logo-embrace.svg', alt: 'Partner B' },
  { src: '/forbes-advisor-logo.svg', alt: 'Partner C' },
  { src: '/logo-fetch.svg', alt: 'Partner D' },
  { src: '/logo-embrace.svg', alt: 'Partner E' },
]

const STEPS = [
  'Analyzing your preferences...',
  'Checking advisor availability in your area...',
  'Comparing qualifications and specialties...',
  'Selecting your top matches...',
]

interface LoadingInterstitialProps {
  onNext?: () => void
}

export function LoadingInterstitial({ onNext }: LoadingInterstitialProps) {
  const [current, setCurrent] = React.useState(0)
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrent((prev) => (prev >= STEPS.length - 1 ? prev : prev + 1))
    }, 1200)

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2))
    }, 100)

    const autoAdvance = setTimeout(() => {
      onNext?.()
    }, 5500)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
      clearTimeout(autoAdvance)
    }
  }, [onNext])

  return (
    <div className="max-w-lg w-full text-center py-12 px-4">
          <div className="w-16 h-16 mx-auto flex items-center justify-center bg-primary-300 rounded-full mb-4">
            <Lock className="w-8 h-8 text-primary-700" />
          </div>

          <h2 className="font-display text-xl font-bold text-neutral-900">
            Finding your best match...
          </h2>
          <p className="text-sm text-neutral-500 mt-2 mb-6">
            We&apos;re comparing advisor profiles to find the best fit based on everything you&apos;ve shared.
          </p>

          {/* Partner Logo Carousel */}
          <div className="relative overflow-hidden mb-6">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex animate-scroll w-max">
              {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
                <div key={i} className="flex-shrink-0 px-6 flex items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo.src} alt={logo.alt} className="h-7 w-auto object-contain grayscale opacity-60" />
                </div>
              ))}
            </div>
          </div>

          {/* Animated Checklist */}
          <div className="space-y-3 inline-flex flex-col items-start mb-6">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                {i < current ? (
                  <CheckCircle2 className="w-5 h-5 text-feedback-success fill-feedback-success" />
                ) : i === current ? (
                  <div className="w-5 h-5 rounded-full border-2 border-primary-700 border-t-transparent animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-neutral-200" />
                )}
                <span className={`text-sm ${i > current ? 'text-neutral-400' : 'text-neutral-800'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xs mx-auto mb-6">
            <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-feedback-success rounded-full transition-all duration-100"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-neutral-500 text-center mt-2">{Math.min(progress, 100)}% complete</p>
          </div>

          {/* Trust Indicators */}
          <p className="text-xs text-neutral-500">
            Secure & Private · No credit impact · Trusted by 100K+ people
          </p>
        </div>
  )
}

export default LoadingInterstitial
