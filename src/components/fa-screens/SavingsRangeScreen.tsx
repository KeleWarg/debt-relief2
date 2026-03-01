'use client'

import * as React from 'react'
import { FAProgressBar } from './FAProgressBar'
import { SAVINGS_OPTIONS } from '@/types/fa-funnel'
import type { SavingsRange, MotivationDriver } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

const SAVINGS_CONFIRMATION: Record<MotivationDriver, string> = {
  behind_retirement: 'Your income is locked in. Now, how much have you saved?',
  family_protection: 'Your income is locked in. Now, how much have you set aside?',
  windfall: "Your income is locked in. Now let's look at what you've saved alongside it.",
  optimization: "Your income is locked in. Now let's see what you've accumulated.",
  plan_review: "Your income is locked in. Now let's add your savings to the picture.",
}

const SAVINGS_REASSURANCE: Record<MotivationDriver, string> = {
  behind_retirement: 'A rough estimate is fine. This helps your advisor understand the gap and how aggressively to plan.',
  family_protection: 'Your total assets shape the scope of protection planning your advisor will recommend.',
  windfall: 'This helps us find advisors experienced at your level of wealth. A ballpark is all we need.',
  optimization: 'Asset level determines which optimization strategies are available to you. A rough number works.',
  plan_review: 'This gives your advisor a sense of scale before they review your plan. Estimates are fine.',
}

interface SavingsRangeScreenProps {
  initialValue?: SavingsRange
  motivationDriver?: MotivationDriver
  onBack?: () => void
  onSubmit?: (value: SavingsRange) => void
}

export function SavingsRangeScreen({
  initialValue,
  motivationDriver,
  onBack,
  onSubmit,
}: SavingsRangeScreenProps) {
  const [selected, setSelected] = React.useState<string>(initialValue ?? '')

  const handleSelect = (value: string) => {
    setSelected(value)
    setTimeout(() => onSubmit?.(value as SavingsRange), 400)
  }

  const confirmation = motivationDriver ? SAVINGS_CONFIRMATION[motivationDriver] : undefined
  const reassurance = motivationDriver ? SAVINGS_REASSURANCE[motivationDriver] : undefined

  return (
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 py-8">
      <FAProgressBar stepName="savings" onBack={onBack} />
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
          {confirmation ?? "Now let's look at what you've built so far."}
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
          Whatever you&apos;ve saved, it&apos;s workable.{' '}
          <span style={{ color: '#0066CC' }}>That&apos;s what advisors do.</span>
        </h1>
        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          Estimate your total savings and assets, including cash, investments, retirement accounts, and home equity.
        </p>

        {/* Options */}
        <div className="w-full flex flex-col" style={{ gap: '12px' }}>
          {SAVINGS_OPTIONS.map((opt, i) => {
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
        {reassurance && (
          <div
            className="animate-fade-in-up w-full mt-4 rounded-lg"
            style={{ animationDelay: '1100ms', backgroundColor: '#F8F8FA', padding: '12px', borderRadius: '8px' }}
          >
            <p style={{ fontSize: '13px', color: '#999999' }}>
              {reassurance}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SavingsRangeScreen
