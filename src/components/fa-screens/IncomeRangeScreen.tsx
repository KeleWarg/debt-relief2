'use client'

import * as React from 'react'
import { FAProgressBar } from './FAProgressBar'
import { INCOME_OPTIONS } from '@/types/fa-funnel'
import type { IncomeRange, MotivationDriver } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

const INCOME_CONFIRMATION: Record<MotivationDriver, string> = {
  behind_retirement: "Catching up on retirement starts with knowing what you're working with.",
  family_protection: "Protecting your family starts with knowing what you're working with.",
  windfall: "Positioning new wealth starts with knowing what you're working with.",
  optimization: "Optimizing your finances starts with knowing what you're working with.",
  plan_review: "A meaningful plan review starts with knowing what you're working with.",
}

const INCOME_SUB_COPY: Record<MotivationDriver, string> = {
  behind_retirement: 'It helps your advisor understand which retirement strategies fit your situation and how aggressively to plan.',
  family_protection: 'It helps your advisor right-size your coverage and build a protection plan that actually fits your household.',
  windfall: "It helps your advisor understand your baseline, so they can position your new wealth relative to what's coming in.",
  optimization: "It's where tax optimization starts. It tells your advisor which levers to pull first.",
  plan_review: 'It gives your advisor context for stress-testing your plan against your actual financial picture.',
}

interface IncomeRangeScreenProps {
  initialValue?: IncomeRange
  motivationDriver?: MotivationDriver
  onBack?: () => void
  onSubmit?: (value: IncomeRange) => void
}

export function IncomeRangeScreen({
  initialValue,
  motivationDriver,
  onBack,
  onSubmit,
}: IncomeRangeScreenProps) {
  const [selected, setSelected] = React.useState<string>(initialValue ?? '')

  const handleSelect = (value: string) => {
    setSelected(value)
    setTimeout(() => onSubmit?.(value as IncomeRange), 400)
  }

  const subCopy = motivationDriver ? INCOME_SUB_COPY[motivationDriver] : undefined
  const confirmation = motivationDriver ? INCOME_CONFIRMATION[motivationDriver] : undefined

  return (
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 py-8">
      <FAProgressBar stepName="income" onBack={onBack} />
      <div className="flex flex-col items-start w-full mt-6">
        {/* Zone 1: Confirmation */}
        <div className="animate-fade-in-up mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0B6E4F' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <p
          className="animate-fade-in-up font-sans text-lg font-bold mb-2"
          style={{ animationDelay: '200ms', color: '#1B2A4A' }}
        >
          {confirmation ?? "Got it! We'll factor that into your match."}
        </p>

        {/* Divider */}
        <div
          className="animate-fade-in-up w-full border-t mb-6 mt-4"
          style={{ animationDelay: '300ms', borderColor: '#E0E0E0' }}
        />

        {/* Zone 2: Question */}
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Building your financial profile
        </p>
        <h1
          className="animate-fade-in-up font-display text-display sm:text-display-md lg:text-display-lg mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          Your income isn&apos;t a score.{' '}
          <span style={{ color: '#0066CC' }}>It&apos;s a starting point.</span>
        </h1>
        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          Estimate your total household income, including salary, spouse&apos;s income, rental income, investments, and any side income.
        </p>

        {/* Options */}
        <div className="w-full flex flex-col" style={{ gap: '12px' }}>
          {INCOME_OPTIONS.filter((opt) => opt.value !== 'prefer_not_to_say').map((opt, i) => {
            const isSelected = selected === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  'animate-fade-in-up flex items-center gap-3 w-full bg-white border rounded-lg text-left',
                  'cursor-pointer transition-all duration-200',
                  isSelected
                    ? 'border-[#0066CC] bg-[#F0F7FF] shadow-sm'
                    : 'border-[#E8E8E8] hover:bg-[#F0F7FF]'
                )}
                style={{ animationDelay: `${500 + i * 100}ms`, height: '56px', paddingLeft: '16px', paddingRight: '16px' }}
              >
                <div
                  className={cn(
                    'flex items-center justify-center rounded-full flex-shrink-0 text-sm font-semibold transition-colors duration-200',
                    isSelected
                      ? 'bg-[#0066CC] text-white'
                      : 'bg-[#F2F2F2] text-neutral-500'
                  )}
                  style={{ width: '28px', height: '28px' }}
                >
                  {LETTERS[i]}
                </div>
                <span style={{ fontSize: '16px', color: '#1B2A4A' }}>
                  {opt.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Advisor reassurance */}
        {subCopy && (
          <div
            className="animate-fade-in-up w-full mt-4 rounded-lg"
            style={{ animationDelay: '1100ms', backgroundColor: '#F8F8FA', padding: '12px', borderRadius: '8px' }}
          >
            <p style={{ fontSize: '13px', color: '#999999' }}>
              {subCopy}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default IncomeRangeScreen
