'use client'

import * as React from 'react'
import type { FAFunnelData } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

const GOAL_LABELS: Record<string, string> = {
  behind_retirement: 'Catching up on retirement',
  family_protection: 'Protecting your family',
  windfall: 'Managing new wealth',
  optimization: 'Optimizing your finances',
  plan_review: 'Getting a professional review',
}

const OBJECTIVE_LABELS: Record<string, string> = {
  growth: 'Long-term growth',
  preservation: 'Wealth preservation',
  income_generation: 'Income generation',
  balanced: 'Balanced growth and safety',
}

const AGE_LABELS: Record<string, string> = {
  under_30: 'Under 30',
  thirties: '30s',
  forties: '40s',
  fifties: '50s',
  sixties: '60s+',
}

const INCOME_LABELS: Record<string, string> = {
  under_50k: 'Under $50K',
  '50k_100k': '$50K\u2013$100K',
  '100k_150k': '$100K\u2013$150K',
  '150k_250k': '$150K\u2013$250K',
  '250k_500k': '$250K\u2013$500K',
  '500k_plus': '$500K+',
  prefer_not_to_say: 'Prefer not to say',
}

const SAVINGS_LABELS: Record<string, string> = {
  under_50k: 'Under $50K',
  '50k_150k': '$50K\u2013$150K',
  '150k_350k': '$150K\u2013$350K',
  '350k_750k': '$350K\u2013$750K',
  '750k_1.5m': '$750K\u2013$1.5M',
  '1.5m_plus': '$1.5M+',
}

const SPECIALTY_SHORT: Record<string, string> = {
  retirement_planning: 'Retirement',
  tax_strategy: 'Tax',
  estate_planning: 'Estate',
  investment_management: 'Investments',
  catch_up: 'Catch-up',
  insurance_protection: 'Insurance',
  education_funding: 'Education',
  debt_management: 'Debt',
  all: 'Full-service advisor',
  not_sure: 'Advisor will assess',
}

const MARITAL_LABELS: Record<string, string> = {
  single: 'Single',
  married: 'Married',
  divorced: 'Divorced',
  widowed: 'Widowed',
  prefer_not_to_say: 'Not specified',
}

const HOMEOWNERSHIP_LABELS: Record<string, string> = {
  own: 'Owns',
  rent: 'Rents',
  other: 'Other',
}

function formatSpecialties(specialties?: string[]): string {
  if (!specialties?.length) return ''
  if (specialties.length === 1 && (specialties[0] === 'all' || specialties[0] === 'not_sure')) {
    return SPECIALTY_SHORT[specialties[0]] ?? ''
  }
  return specialties.map((s) => SPECIALTY_SHORT[s] ?? s).join(', ')
}

interface ProfileDropdownProps {
  data: FAFunnelData
  className?: string
}

export function ProfileDropdown({ data, className }: ProfileDropdownProps) {
  const [open, setOpen] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement>(null)

  const group1: { label: string; value: string }[] = [
    { label: 'Goal', value: data.motivationDriver ? GOAL_LABELS[data.motivationDriver] ?? '' : '' },
    { label: 'Age', value: data.ageRange ? AGE_LABELS[data.ageRange] ?? '' : '' },
    { label: 'Income', value: data.incomeRange ? INCOME_LABELS[data.incomeRange] ?? '' : '' },
    { label: 'Savings', value: data.savingsRange ? SAVINGS_LABELS[data.savingsRange] ?? '' : '' },
    { label: 'Objective', value: data.investmentObjective ? OBJECTIVE_LABELS[data.investmentObjective] ?? '' : '' },
  ].filter((r) => r.value)

  const group2: { label: string; value: string }[] = []
  const specialtiesValue = formatSpecialties(data.specialties)
  if (specialtiesValue) group2.push({ label: 'Specialties', value: specialtiesValue })
  if (data.maritalStatus) group2.push({ label: 'Marital status', value: MARITAL_LABELS[data.maritalStatus] ?? '' })
  if (data.homeownership) group2.push({ label: 'Homeownership', value: HOMEOWNERSHIP_LABELS[data.homeownership] ?? '' })
  if (data.zipCode) group2.push({ label: 'ZIP', value: data.zipCode })

  return (
    <div className={cn('w-full', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'w-full flex items-center justify-between cursor-pointer transition-colors duration-150',
          open
            ? 'rounded-t-lg border border-b-0'
            : 'rounded-lg border'
        )}
        style={{
          height: '40px',
          padding: '0 12px',
          borderColor: '#E8E8E8',
          backgroundColor: open ? '#F8F8FA' : 'transparent',
        }}
      >
        <span style={{ fontSize: '14px', fontWeight: 500, color: '#1B2A4A' }}>
          Your Profile
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className="overflow-hidden transition-all duration-200 ease-out"
        style={{ maxHeight: open ? `${contentRef.current?.scrollHeight ?? 400}px` : '0px' }}
      >
        <div
          ref={contentRef}
          className="border border-t-0 rounded-b-lg"
          style={{ backgroundColor: '#F8F8FA', borderColor: '#E8E8E8', padding: '0 16px 16px' }}
        >
          {/* Group 1: Financial Profile */}
          <div className="flex flex-col" style={{ gap: '0' }}>
            {group1.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between"
                style={{ height: '28px' }}
              >
                <span style={{ fontSize: '13px', color: '#999999' }}>{row.label}</span>
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#1B2A4A' }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Divider between groups */}
          {group2.length > 0 && (
            <div className="border-t" style={{ borderColor: '#E0E0E0', margin: '12px 0' }} />
          )}

          {/* Group 2: Matching Details (grows as user answers) */}
          {group2.length > 0 && (
            <div className="flex flex-col" style={{ gap: '0' }}>
              {group2.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between"
                  style={{ height: '28px' }}
                >
                  <span style={{ fontSize: '13px', color: '#999999' }}>{row.label}</span>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#1B2A4A' }}>{row.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileDropdown
