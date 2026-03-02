'use client'

import * as React from 'react'
import { FAProgressBar } from './FAProgressBar'
import type { MotivationDriver, MaritalStatus, FAFunnelData } from '@/types/fa-funnel'
import { ProfileDropdown } from './ProfileDropdown'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C']

const HOME_OPTIONS = [
  { value: 'own', label: 'Yes, I own' },
  { value: 'rent', label: 'No, I rent' },
  { value: 'other', label: 'Other' },
] as const

const CONFIRMATION: Record<MaritalStatus, Record<MotivationDriver, string>> = {
  married: {
    behind_retirement: 'Married. Joint home equity can be one of the biggest catch-up tools available to couples.',
    family_protection: 'Married. If you own together, your advisor will need to know for mortgage protection and titling.',
    windfall: 'Married. Whether you own jointly affects how new wealth fits alongside existing property.',
    optimization: 'Married. Joint property ownership opens up deduction strategies your advisor can layer in.',
    plan_review: 'Married. Your advisor will want to see how property fits into the picture for both of you.',
  },
  single: {
    behind_retirement: 'Single. If you own, that equity could be a meaningful part of your catch-up plan.',
    family_protection: 'Single. Whether you own affects how your advisor structures coverage for dependents.',
    windfall: 'Single. No co-owner simplifies things. Your advisor will want to know if property is in the mix.',
    optimization: 'Single. Property tax and mortgage interest are some of the biggest deduction levers for solo filers.',
    plan_review: 'Single. Your advisor will want to see whether property is part of the overall picture.',
  },
  divorced: {
    behind_retirement: 'Divorced. If property was part of the settlement, it changes your catch-up math.',
    family_protection: 'Divorced. Whether you kept the home affects what your advisor needs to protect.',
    windfall: 'Divorced. Property from a settlement and new wealth need to be structured carefully together.',
    optimization: 'Divorced. If your housing situation changed, so did your deduction landscape.',
    plan_review: 'Divorced. Your housing situation may have changed. Your advisor will factor that in.',
  },
  widowed: {
    behind_retirement: 'Widowed. If you inherited the home, that equity changes your catch-up options.',
    family_protection: 'Widowed. Whether the home transferred to you affects your protection plan going forward.',
    windfall: 'Widowed. Inherited property alongside new wealth needs careful structuring.',
    optimization: 'Widowed. Inherited property comes with a stepped-up basis your advisor can use.',
    plan_review: 'Widowed. Your advisor will want to know if the home is still part of your financial picture.',
  },
  prefer_not_to_say: {
    behind_retirement: 'No problem. Your advisor will cover the details in your first conversation.',
    family_protection: 'No problem. Your advisor will cover the details in your first conversation.',
    windfall: 'No problem. Your advisor will cover the details in your first conversation.',
    optimization: 'No problem. Your advisor will cover the details in your first conversation.',
    plan_review: 'No problem. Your advisor will cover the details in your first conversation.',
  },
}

const REASSURANCE: Record<MotivationDriver, string> = {
  behind_retirement: 'Home equity is often overlooked in catch-up planning. It can be a significant lever.',
  family_protection: 'Homeownership changes the scope of protection: mortgage coverage, property trusts, insurance.',
  windfall: 'Whether you own or rent affects how your advisor positions new wealth.',
  optimization: 'Mortgage interest, property tax deductions, home equity lines. Your advisor needs to know.',
  plan_review: 'Home equity is one of the first things an advisor looks at during a review.',
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

  const confirmation =
    maritalStatus && motivationDriver
      ? CONFIRMATION[maritalStatus][motivationDriver]
      : ''

  const reassurance = motivationDriver ? REASSURANCE[motivationDriver] : ''

  return (
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <FAProgressBar stepName="home" onBack={onBack} />

      <div className="flex flex-col items-start w-full mt-6">
        {/* Zone 1: Confirmation */}
        {confirmation && (
          <div className="animate-fade-in-up flex items-start gap-2 mb-4">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5">
              <circle cx="9" cy="9" r="9" fill="#0B6E4F" />
              <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p style={{ fontSize: '15px', color: '#1B2A4A' }}>
              {confirmation}
            </p>
          </div>
        )}

        {funnelData && <ProfileDropdown data={funnelData} className="animate-fade-in-up w-full mb-4" />}

        {/* Divider */}
        <div
          className="animate-fade-in-up w-full border-t my-4"
          style={{ animationDelay: '200ms', borderColor: '#E0E0E0' }}
        />

        {/* Zone 2: Headline + Options */}
        <h1
          className="animate-fade-in-up font-display text-display sm:text-display-md lg:text-display-lg mb-2"
          style={{ animationDelay: '300ms', color: '#1B2A4A' }}
        >
          It&rsquo;s not about the house.{' '}
          <span style={{ color: '#0066CC' }}>
            It&rsquo;s about what it unlocks in your plan.
          </span>
        </h1>

        {/* Instruction */}
        <p
          className="animate-fade-in-up leading-relaxed mb-4"
          style={{ animationDelay: '400ms', fontSize: '15px', color: '#666666' }}
        >
          Do you own your home?
        </p>

        {/* Options */}
        <div className="w-full flex flex-col" style={{ gap: '10px' }}>
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
                style={{ animationDelay: `${450 + i * 100}ms`, height: '52px', paddingLeft: '16px', paddingRight: '16px' }}
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
          <p
            className="animate-fade-in-up mt-4"
            style={{ animationDelay: '750ms', fontSize: '14px', color: '#666666' }}
          >
            {reassurance}
          </p>
        )}
      </div>
    </div>
  )
}

export default HomeownershipScreen
