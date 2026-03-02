'use client'

import * as React from 'react'
import { FAProgressBar } from './FAProgressBar'
import type { MotivationDriver, FAFunnelData } from '@/types/fa-funnel'
import { ProfileDropdown } from './ProfileDropdown'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

const MARITAL_OPTIONS = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
] as const

const CONFIRMATION: Record<MotivationDriver, string> = {
  behind_retirement: 'Your advisor match is taking shape. A few quick details to round out the picture.',
  family_protection: 'Your advisor match is taking shape. A few quick details about your situation.',
  windfall: 'Your advisor match is taking shape. A few quick details to round out the picture.',
  optimization: 'Your advisor match is taking shape. A few quick details to fine-tune your match.',
  plan_review: 'Your advisor match is taking shape. A few quick details to round out the picture.',
}

const REASSURANCE: Record<MotivationDriver, string> = {
  behind_retirement: 'Filing status is one of the biggest levers in retirement catch-up planning.',
  family_protection: 'This helps scope the protection plan: spousal coverage, survivorship, beneficiaries.',
  windfall: 'Marital status affects how new wealth is titled, taxed, and protected.',
  optimization: 'Filing status is one of the biggest levers in tax optimization.',
  plan_review: 'Your advisor will want to know this upfront. It affects nearly every part of a financial plan.',
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

  const confirmation = motivationDriver ? CONFIRMATION[motivationDriver] : ''
  const reassurance = motivationDriver ? REASSURANCE[motivationDriver] : ''

  return (
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <FAProgressBar stepName="married" onBack={onBack} />

      <div className="flex flex-col items-start w-full mt-6">
        {/* Zone 1: Confirmation */}
        <div className="animate-fade-in-up flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0B6E4F' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-sans text-lg font-bold" style={{ color: '#1B2A4A' }}>
            {confirmation}
          </p>
        </div>

        {funnelData && <ProfileDropdown data={funnelData} className="animate-fade-in-up w-full mt-4 mb-4" />}

        {/* Divider */}
        <div
          className="animate-fade-in-up w-full border-t mb-6 mt-0"
          style={{ animationDelay: '300ms', borderColor: '#E0E0E0' }}
        />

        {/* Zone 2: Question */}
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Your life situation
        </p>
        <h1
          className="animate-fade-in-up font-display text-display sm:text-display-md lg:text-display-lg mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          These next few questions are quick.{' '}
          <span style={{ color: '#0066CC' }}>They help your advisor start the conversation in the right place.</span>
        </h1>
        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          What is your marital status?
        </p>

        {/* Options */}
        <div className="w-full flex flex-col" style={{ gap: '10px' }}>
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

        {/* Reassurance */}
        {reassurance && (
          <p className="animate-fade-in-up mt-4" style={{ animationDelay: '1000ms', fontSize: '14px', color: '#666666' }}>
            {reassurance}
          </p>
        )}
      </div>
    </div>
  )
}

export default MaritalScreen
