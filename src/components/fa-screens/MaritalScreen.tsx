'use client'

import * as React from 'react'
import type { MotivationDriver, FAFunnelData } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

const BLUE = '#0066CC'

const MARITAL_OPTIONS = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
] as const

const MARITAL_CONTENT: Record<MotivationDriver, {
  headline: React.ReactNode
  subCopy: string
}> = {
  behind_retirement: {
    headline: <>These next few questions are quick (1/4).<br /><span style={{ color: BLUE }}>They help your advisor start the conversation</span> in the right place.</>,
    subCopy: 'What is your marital status?',
  },
  family_protection: {
    headline: <>These next few questions are quick (1/4).<br /><span style={{ color: BLUE }}>They help your advisor scope the protection plan</span> for your family.</>,
    subCopy: 'What is your marital status?',
  },
  windfall: {
    headline: <>These next few questions are quick (1/4).<br /><span style={{ color: BLUE }}>They help your advisor position your new wealth</span> the right way.</>,
    subCopy: 'What is your marital status?',
  },
  optimization: {
    headline: <>These next few questions are quick (1/4).<br /><span style={{ color: BLUE }}>They help your advisor fine-tune your optimization</span> strategy.</>,
    subCopy: 'What is your marital status?',
  },
  plan_review: {
    headline: <>These next few questions are quick (1/4).<br /><span style={{ color: BLUE }}>They help your advisor start the review</span> in the right place.</>,
    subCopy: 'What is your marital status?',
  },
}

interface MaritalScreenProps {
  initialValue?: string
  motivationDriver?: MotivationDriver
  funnelData?: FAFunnelData
  onBack?: () => void
  onSubmit?: (value: string) => void
}

export function MaritalScreen({
  initialValue,
  motivationDriver,
  funnelData,
  onBack,
  onSubmit,
}: MaritalScreenProps) {
  const [selected, setSelected] = React.useState<string>(initialValue ?? '')

  const handleSelect = (value: string) => {
    setSelected(value)
    setTimeout(() => onSubmit?.(value), 400)
  }

  const content = motivationDriver ? MARITAL_CONTENT[motivationDriver] : null

  return (
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">
        {/* Section label */}
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Your life situation
        </p>

        {/* Headline */}
        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          {content?.headline ?? <>These next few questions are quick. <span style={{ color: BLUE }}>They help your advisor start the conversation in the right place.</span></>}
        </h1>

        {/* Sub-copy */}
        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          {content?.subCopy ?? 'What is your marital status?'}
        </p>

        {/* Options */}
        <div className="w-full grid grid-cols-2 gap-3">
          {MARITAL_OPTIONS.map((opt, i) => {
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
                style={{ animationDelay: `${500 + i * 100}ms`, height: '52px', paddingLeft: '16px', paddingRight: '16px' }}
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

export default MaritalScreen
