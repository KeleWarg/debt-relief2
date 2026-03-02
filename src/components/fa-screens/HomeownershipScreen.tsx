'use client'

import * as React from 'react'
import type { MotivationDriver, MaritalStatus, FAFunnelData } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C']

const BLUE = '#0066CC'

const HOME_OPTIONS = [
  { value: 'own', label: 'Yes, I own' },
  { value: 'rent', label: 'No, I rent' },
  { value: 'other', label: 'Other' },
] as const

const HOME_CONTENT: Record<MotivationDriver, {
  headline: React.ReactNode
  subCopy: string
}> = {
  behind_retirement: {
    headline: <>Almost there (2/4).<br /><span style={{ color: BLUE }}>Home equity can be a significant lever</span> in your catch-up plan.</>,
    subCopy: 'Do you own your home?',
  },
  family_protection: {
    headline: <>Almost there (2/4).<br /><span style={{ color: BLUE }}>Homeownership changes the scope of protection</span> your advisor will recommend.</>,
    subCopy: 'Do you own your home?',
  },
  windfall: {
    headline: <>Almost there (2/4).<br /><span style={{ color: BLUE }}>Whether you own or rent affects how your advisor positions</span> your new wealth.</>,
    subCopy: 'Do you own your home?',
  },
  optimization: {
    headline: <>Almost there (2/4).<br /><span style={{ color: BLUE }}>Property opens up deduction strategies</span> your advisor can layer in.</>,
    subCopy: 'Do you own your home?',
  },
  plan_review: {
    headline: <>Almost there (2/4).<br /><span style={{ color: BLUE }}>Home equity is one of the first things</span> an advisor looks at during a review.</>,
    subCopy: 'Do you own your home?',
  },
}

interface HomeownershipScreenProps {
  initialValue?: string
  maritalStatus?: MaritalStatus
  motivationDriver?: MotivationDriver
  funnelData?: FAFunnelData
  onBack?: () => void
  onSubmit?: (value: string) => void
}

export function HomeownershipScreen({
  initialValue,
  maritalStatus,
  motivationDriver,
  funnelData,
  onBack,
  onSubmit,
}: HomeownershipScreenProps) {
  const [selected, setSelected] = React.useState<string>(initialValue ?? '')

  const handleSelect = (value: string) => {
    setSelected(value)
    setTimeout(() => onSubmit?.(value), 400)
  }

  const content = motivationDriver ? HOME_CONTENT[motivationDriver] : null

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
          {content?.headline ?? <>Almost there (2/4).<br /><span style={{ color: BLUE }}>It{'\u2019'}s about what your home unlocks in your plan.</span></>}
        </h1>

        {/* Sub-copy */}
        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          {content?.subCopy ?? 'Do you own your home?'}
        </p>

        {/* Options */}
        <div className="w-full grid grid-cols-2 gap-3">
          {HOME_OPTIONS.map((opt, i) => {
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

export default HomeownershipScreen
