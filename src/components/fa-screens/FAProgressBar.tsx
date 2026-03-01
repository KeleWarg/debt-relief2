'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const QUESTION_STEPS = [
  'motivation', 'age', 'income', 'savings', 'objectives', 'specialties',
  'married', 'home', 'assets', 'relationship', 'zipCode', 'email', 'namePhone',
] as const

const SECTION_LABELS: Record<string, string> = {
  motivation: "Let's understand you",
  age: "Let's understand you",
  income: 'Building your financial profile',
  savings: 'Building your financial profile',
  objectives: 'Your Goals & Preferences',
  specialties: 'Your Goals & Preferences',
  married: 'Your Financial Situation',
  home: 'Your Financial Situation',
  assets: 'Your Financial Situation',
  relationship: 'Finding Your Match',
  zipCode: 'Finding Your Match',
  email: 'Finding Your Match',
  namePhone: 'Finding Your Match',
}

/**
 * Returns overall progress (0–100) for a given question step name.
 */
export function faProgressPercent(stepName: string): number {
  const idx = QUESTION_STEPS.indexOf(stepName as typeof QUESTION_STEPS[number])
  if (idx === -1) return 0
  return Math.round(((idx + 1) / QUESTION_STEPS.length) * 100)
}

/**
 * Returns the section label for a given step name.
 */
export function faSectionLabel(stepName: string): string {
  return SECTION_LABELS[stepName] ?? ''
}

interface FAProgressBarProps {
  stepName: string
  onBack?: () => void
  className?: string
}

/**
 * Renders the section label (+ optional back button) below the header.
 */
export function FAProgressBar({ stepName, onBack, className }: FAProgressBarProps) {
  const label = SECTION_LABELS[stepName] ?? ''
  const progress = faProgressPercent(stepName)

  return (
    <div className={cn('w-full py-3', className)}>
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 hover:bg-neutral-200 transition-colors"
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <div className="flex-1 h-[6px] bg-[#E0E0E6] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1A1A2E] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default FAProgressBar
