'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const ALL_STEPS = [
  'motivation', 'age', 'affirmation', 'income', 'savings', 'objectives',
  'growthHorizon', 'specialties', 'married', 'home', 'zipCode',
  'relationship', 'growthHorizon2', 'email', 'namePhone',
] as const

const SECTION_LABELS: Record<string, string> = {
  motivation: "Let's understand you",
  age: "Let's understand you",
  affirmation: 'Building your financial profile',
  income: 'Building your financial profile',
  savings: 'Building your financial profile',
  objectives: 'Building your financial profile',
  growthHorizon: 'Your Goals & Preferences',
  specialties: 'Your Goals & Preferences',
  married: 'Your life situation',
  home: 'Your life situation',
  zipCode: 'Finding Your Match',
  relationship: 'Finding Your Match',
  growthHorizon2: 'Finding Your Match',
  email: 'Finding Your Match',
  namePhone: 'Finding Your Match',
}

const FAST_PHASE_COUNT = 7
const FAST_PHASE_TARGET = 75

/**
 * Returns overall progress (0–100). First 7 steps cover 0–75% in big jumps,
 * remaining steps cover 75–100% in smaller increments.
 */
export function faProgressPercent(stepName: string): number {
  const idx = ALL_STEPS.indexOf(stepName as typeof ALL_STEPS[number])
  if (idx === -1) return 0
  const step = idx + 1
  if (step <= FAST_PHASE_COUNT) {
    return Math.round((step / FAST_PHASE_COUNT) * FAST_PHASE_TARGET)
  }
  const remaining = ALL_STEPS.length - FAST_PHASE_COUNT
  const stepsIntoSlow = step - FAST_PHASE_COUNT
  return Math.round(FAST_PHASE_TARGET + (stepsIntoSlow / remaining) * (100 - FAST_PHASE_TARGET))
}

/**
 * Returns the section label for a given step name.
 */
export function faSectionLabel(stepName: string): string {
  return SECTION_LABELS[stepName] ?? ''
}

const LOADER_TICK_MS = 50

interface FAProgressBarProps {
  stepName: string
  onBack?: () => void
  dark?: boolean
  className?: string
  /** When set with dark, shows a filling loader for this duration (ms) then calls onLoaderComplete. */
  loaderDuration?: number
  onLoaderComplete?: () => void
}

export function FAProgressBar({ stepName, onBack, dark, className, loaderDuration = 10000, onLoaderComplete }: FAProgressBarProps) {
  const progress = faProgressPercent(stepName)
  const [loaderProgress, setLoaderProgress] = React.useState(0)
  const showLoader = Boolean(dark && loaderDuration && onLoaderComplete)

  React.useEffect(() => {
    if (!showLoader) return
    setLoaderProgress(0)
    const increment = (LOADER_TICK_MS / loaderDuration) * 100
    const interval = setInterval(() => {
      setLoaderProgress((p) => {
        const next = Math.min(100, p + increment)
        if (next >= 100) {
          clearInterval(interval)
          onLoaderComplete?.()
        }
        return next
      })
    }, LOADER_TICK_MS)
    return () => clearInterval(interval)
  }, [showLoader, loaderDuration, onLoaderComplete])

  if (showLoader) {
    return (
      <div className={cn('w-full py-3', className)}>
        <div className="flex items-center gap-3">
          <div
            className="flex-1 h-[6px] rounded-full overflow-hidden"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-[50ms] ease-linear"
              style={{
                width: `${loaderProgress}%`,
                backgroundColor: '#FFB934',
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('w-full py-3', className)}>
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className={cn(
              'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors',
              dark
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
            )}
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <div
          className="flex-1 h-[6px] rounded-full overflow-hidden"
          style={{ backgroundColor: dark ? 'rgba(255,255,255,0.2)' : '#E0E0E6' }}
        >
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor: dark ? '#FFB934' : '#1A1A2E',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default FAProgressBar
