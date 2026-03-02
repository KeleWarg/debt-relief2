'use client'

import * as React from 'react'
import { FAProgressBar } from './FAProgressBar'
import { Button } from '@/components/ui'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import type { MotivationDriver, AgeRange, SavingsRange, IncomeRange, FAFunnelData } from '@/types/fa-funnel'
import { ProfileDropdown } from './ProfileDropdown'
import { cn } from '@/lib/utils'

const CONFIRMATION: Record<MotivationDriver, string> = {
  behind_retirement: "Your growth horizon is set. Now let's match you with the right expertise.",
  family_protection: "Your growth horizon is set. Now let's match you with the right protection.",
  windfall: "Your growth horizon is set. Now let's find the right expertise for your new wealth.",
  optimization: "Your growth horizon is set. Now let's find the right optimization mix.",
  plan_review: "Your growth horizon is set. Now let's make sure your reviewer covers everything.",
}

const REASSURANCE: Record<MotivationDriver, string> = {
  behind_retirement: 'Most people catching up benefit from retirement planning, tax strategy, and catch-up expertise working together.',
  family_protection: 'Protection planning often involves insurance, estate documents, and education funding working together.',
  windfall: 'New wealth typically requires tax strategy, investment management, and asset protection as a starting point.',
  optimization: 'Optimization touches tax strategy, investment management, and fee reduction. Most people benefit from all three.',
  plan_review: 'A good review covers retirement readiness, tax strategy, and whatever else surfaces. Cast a wide net.',
}

const SPECIALTY_OPTIONS = [
  { value: 'retirement_planning', label: 'Retirement planning' },
  { value: 'tax_strategy', label: 'Tax strategy' },
  { value: 'estate_planning', label: 'Estate & legacy planning' },
  { value: 'investment_management', label: 'Investment management' },
  { value: 'catch_up', label: 'Catch-up strategies' },
  { value: 'insurance_protection', label: 'Insurance & protection' },
  { value: 'education_funding', label: 'Education funding' },
  { value: 'debt_management', label: 'Debt management' },
] as const

const REC_MATRIX: Record<MotivationDriver, Record<AgeRange, string[]>> = {
  behind_retirement: {
    under_30: ['retirement_planning', 'investment_management'],
    thirties: ['retirement_planning', 'tax_strategy'],
    forties: ['retirement_planning', 'tax_strategy', 'catch_up'],
    fifties: ['retirement_planning', 'tax_strategy', 'catch_up'],
    sixties: ['retirement_planning', 'tax_strategy', 'estate_planning'],
  },
  family_protection: {
    under_30: ['insurance_protection', 'retirement_planning'],
    thirties: ['insurance_protection', 'estate_planning'],
    forties: ['insurance_protection', 'estate_planning', 'education_funding'],
    fifties: ['estate_planning', 'insurance_protection', 'retirement_planning'],
    sixties: ['estate_planning', 'insurance_protection'],
  },
  windfall: {
    under_30: ['tax_strategy', 'investment_management'],
    thirties: ['tax_strategy', 'investment_management'],
    forties: ['tax_strategy', 'investment_management', 'estate_planning'],
    fifties: ['tax_strategy', 'investment_management', 'retirement_planning'],
    sixties: ['tax_strategy', 'estate_planning', 'retirement_planning'],
  },
  optimization: {
    under_30: ['tax_strategy', 'investment_management'],
    thirties: ['tax_strategy', 'investment_management'],
    forties: ['tax_strategy', 'investment_management', 'retirement_planning'],
    fifties: ['tax_strategy', 'catch_up', 'retirement_planning'],
    sixties: ['tax_strategy', 'retirement_planning', 'estate_planning'],
  },
  plan_review: {
    under_30: ['retirement_planning', 'investment_management'],
    thirties: ['retirement_planning', 'tax_strategy'],
    forties: ['retirement_planning', 'tax_strategy', 'investment_management'],
    fifties: ['retirement_planning', 'tax_strategy', 'catch_up'],
    sixties: ['retirement_planning', 'estate_planning', 'tax_strategy'],
  },
}

function getRecommended(
  motivation?: MotivationDriver, age?: AgeRange, savings?: SavingsRange, income?: IncomeRange
): Set<string> {
  if (!motivation || !age) return new Set()
  const recs = new Set(REC_MATRIX[motivation][age])
  if (savings === 'under_50k') recs.add('debt_management')
  if (savings === '750k_1.5m' || savings === '1.5m_plus') recs.add('estate_planning')
  if (income === '250k_500k' || income === '500k_plus') recs.add('tax_strategy')
  const arr = Array.from(recs)
  return new Set(arr.slice(0, 3))
}

interface SpecialtiesScreenProps {
  motivationDriver?: MotivationDriver
  ageRange?: AgeRange
  savingsRange?: SavingsRange
  incomeRange?: IncomeRange
  funnelData?: FAFunnelData
  onBack?: () => void
  onSubmit?: (specialties: string[]) => void
}

export function NewSpecialtiesScreen({
  motivationDriver, ageRange, savingsRange, incomeRange, funnelData, onBack, onSubmit,
}: SpecialtiesScreenProps) {
  const [primarySelection, setPrimarySelection] = React.useState<string | null>(null)
  const [checked, setChecked] = React.useState<Set<string>>(new Set())

  const recommended = getRecommended(motivationDriver, ageRange, savingsRange, incomeRange)
  const confirmation = motivationDriver ? CONFIRMATION[motivationDriver] : ''
  const reassurance = motivationDriver ? REASSURANCE[motivationDriver] : ''

  const handlePrimary = (value: string) => {
    setPrimarySelection(value)
    setChecked(new Set())
    setTimeout(() => onSubmit?.([value]), 400)
  }

  const handleToggle = (value: string) => {
    setPrimarySelection(null)
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return next
    })
  }

  const handleContinue = () => {
    onSubmit?.(Array.from(checked))
  }

  return (
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <FAProgressBar stepName="specialties" onBack={onBack} />

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

        {/* Zone 2: Headline + Options */}
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Your advisor match
        </p>
        <h1
          className="animate-fade-in-up font-display text-display sm:text-display-md lg:text-display-lg mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          You don&apos;t have to know exactly what you need.{' '}
          <span style={{ color: '#0066CC' }}>That&apos;s what the first conversation is for.</span>
        </h1>
        <p
          className="animate-fade-in-up leading-relaxed mb-6"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          What would you like help with?
        </p>

        {/* Primary options */}
        <div className="w-full flex flex-col animate-fade-in-up" style={{ gap: '12px', animationDelay: '500ms' }}>
          {[
            { value: 'all', letter: 'A', title: 'All of the above', desc: 'Match me with a full-service advisor' },
            { value: 'not_sure', letter: 'B', title: 'Not sure yet', desc: 'Help me figure it out' },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handlePrimary(opt.value)}
              className={cn(
                'flex items-center gap-3 w-full bg-white border rounded-lg text-left cursor-pointer transition-all duration-200',
                primarySelection === opt.value
                  ? 'border-[#0066CC] bg-[#F0F7FF] shadow-sm'
                  : 'border-[#E8E8E8] hover:bg-[#F0F7FF]'
              )}
              style={{ height: '72px', paddingLeft: '16px', paddingRight: '16px' }}
            >
              <div
                className={cn(
                  'flex items-center justify-center rounded-full flex-shrink-0 text-sm font-semibold transition-colors duration-200',
                  primarySelection === opt.value ? 'bg-[#0066CC] text-white' : 'bg-[#F2F2F2] text-neutral-500'
                )}
                style={{ width: '28px', height: '28px' }}
              >
                {opt.letter}
              </div>
              <div>
                <span className="block" style={{ fontSize: '16px', fontWeight: 500, color: '#1B2A4A' }}>{opt.title}</span>
                <span className="block" style={{ fontSize: '14px', color: '#999999' }}>{opt.desc}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Section divider */}
        <div
          className="animate-fade-in-up w-full flex items-center gap-3 my-5"
          style={{ animationDelay: '600ms' }}
        >
          <div className="flex-1 border-t" style={{ borderColor: '#E0E0E0' }} />
          <span style={{ fontSize: '13px', color: '#999999' }}>Or select specific areas</span>
          <div className="flex-1 border-t" style={{ borderColor: '#E0E0E0' }} />
        </div>

        {/* Multi-select options */}
        <div className="w-full flex flex-col animate-fade-in-up" style={{ gap: '10px', animationDelay: '600ms' }}>
          {SPECIALTY_OPTIONS.map((opt) => {
            const isChecked = checked.has(opt.value)
            const isRec = recommended.has(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleToggle(opt.value)}
                className={cn(
                  'flex items-center gap-3 w-full bg-white border rounded-lg text-left cursor-pointer transition-all duration-200',
                  isChecked
                    ? 'border-[#0066CC] bg-[#F0F7FF]'
                    : 'border-[#E8E8E8] hover:bg-[#F0F7FF]'
                )}
                style={{ height: '52px', paddingLeft: '16px', paddingRight: '16px' }}
              >
                <div
                  className={cn(
                    'flex items-center justify-center rounded flex-shrink-0 transition-colors duration-200',
                    isChecked ? 'bg-[#0066CC]' : 'border-2 border-[#D0D0D0]'
                  )}
                  style={{ width: '20px', height: '20px', borderRadius: '4px' }}
                >
                  {isChecked && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="flex-1" style={{ fontSize: '15px', color: '#1B2A4A' }}>{opt.label}</span>
                {isRec && (
                  <span
                    className="flex-shrink-0 text-[11px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                    style={{ color: '#1B2A4A', backgroundColor: '#E8F0FE' }}
                  >
                    Recommended
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Reassurance */}
        {reassurance && (
          <p className="animate-fade-in-up mt-4" style={{ animationDelay: '700ms', fontSize: '14px', color: '#666666' }}>
            {reassurance}
          </p>
        )}
        <p className="animate-fade-in-up mt-2" style={{ animationDelay: '700ms', fontSize: '13px', color: '#999999' }}>
          You&apos;re not locked in. Your advisor will refine this with you.
        </p>

        {/* Continue (only when specifics selected) */}
        {checked.size > 0 && (
          <div className="w-full mt-6">
            <StickyButtonContainer>
              <Button variant="primary" fullWidth showTrailingIcon onClick={handleContinue}>
                Continue
              </Button>
            </StickyButtonContainer>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewSpecialtiesScreen
