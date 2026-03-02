'use client'

import * as React from 'react'
import { INCOME_OPTIONS } from '@/types/fa-funnel'
import type { IncomeRange, MotivationDriver } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

const BLUE = '#0066CC'

const INCOME_CONTENT: Record<MotivationDriver, {
  headline: React.ReactNode
  subCopy: string
}> = {
  behind_retirement: {
    headline: <>Now let{'\u2019'}s talk income. <span style={{ color: BLUE }}>Your income shapes your catch-up plan</span> and helps your advisor know which strategies fit.</>,
    subCopy: 'It helps your advisor understand which retirement strategies fit your situation and how aggressively to plan.',
  },
  family_protection: {
    headline: <>Now let{'\u2019'}s talk income. <span style={{ color: BLUE }}>Your income shapes your protection plan</span> and helps your advisor right-size your coverage.</>,
    subCopy: 'It helps your advisor right-size your coverage and build a protection plan that actually fits your household.',
  },
  windfall: {
    headline: <>Now let{'\u2019'}s talk income. <span style={{ color: BLUE }}>Your income shapes how your new wealth gets positioned</span> relative to what{'\u2019'}s already coming in.</>,
    subCopy: "It helps your advisor understand your baseline, so they can position your new wealth relative to what's coming in.",
  },
  optimization: {
    headline: <>Now let{'\u2019'}s talk income. <span style={{ color: BLUE }}>Your income is where tax optimization starts</span> and tells your advisor which levers to pull first.</>,
    subCopy: "It's where tax optimization starts. It tells your advisor which levers to pull first.",
  },
  plan_review: {
    headline: <>Now let{'\u2019'}s talk income. <span style={{ color: BLUE }}>Your income gives your advisor context</span> for a meaningful review of your plan.</>,
    subCopy: 'It gives your advisor context for stress-testing your plan against your actual financial picture.',
  },
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

  const content = motivationDriver ? INCOME_CONTENT[motivationDriver] : null

  return (
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">
        {/* Section label */}
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Building your financial profile
        </p>

        {/* Headline */}
        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          {content?.headline ?? <>Your income isn{'\u2019'}t a score. <span style={{ color: BLUE }}>It{'\u2019'}s a starting point.</span></>}
        </h1>

        {/* Sub-copy */}
        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          {content?.subCopy ?? "Estimate your total household income, including salary, spouse's income, rental income, investments, and any side income."}
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
      </div>
    </div>
  )
}

export default IncomeRangeScreen
