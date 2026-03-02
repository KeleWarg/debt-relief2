'use client'

import * as React from 'react'
import { ProfileDropdown } from './ProfileDropdown'
import { Button } from '@/components/ui/Button'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import type { MotivationDriver, Homeownership, FAFunnelData } from '@/types/fa-funnel'
import { getStateFromZip } from '@/lib/zip-lookup'
import { getAdvisorContext } from '@/data/stateAdvisorContext'
import { cn } from '@/lib/utils'

const CONFIRMATION: Record<string, Record<MotivationDriver, string>> = {
  own: {
    behind_retirement: 'You own. Your advisor can factor home equity into the catch-up math from day one.',
    family_protection: 'You own. That means mortgage protection, property trusts, and insurance are all in play.',
    windfall: 'You own. Your advisor will position new wealth alongside existing property.',
    optimization: 'You own. Mortgage interest and property tax deductions are already working for you.',
    plan_review: 'You own. Your advisor will include home equity in the full picture.',
  },
  rent: {
    behind_retirement: 'You rent. That frees up more cash flow for catch-up contributions. Your advisor will use that.',
    family_protection: 'You rent. Your advisor can focus protection around income and dependents without mortgage complexity.',
    windfall: 'You rent. Your advisor can focus entirely on positioning your new wealth.',
    optimization: 'You rent. Your advisor will look at where your money is working hardest without a mortgage in the mix.',
    plan_review: 'You rent. That simplifies part of the review. Your advisor will focus on where your assets are.',
  },
  other: {
    behind_retirement: 'Noted. Your advisor will sort out the housing picture in your first conversation.',
    family_protection: 'Noted. Your advisor will sort out the housing picture in your first conversation.',
    windfall: 'Noted. Your advisor will sort out the housing picture in your first conversation.',
    optimization: 'Noted. Your advisor will sort out the housing picture in your first conversation.',
    plan_review: 'Noted. Your advisor will sort out the housing picture in your first conversation.',
  },
}

const REASSURANCE: Record<MotivationDriver, string> = {
  behind_retirement: 'State tax rules affect your catch-up strategy. Your location helps us match smarter.',
  family_protection: 'Estate and insurance laws vary by state. Your location ensures we match you with a licensed advisor.',
  windfall: 'State tax rules can significantly impact how new wealth is positioned. Your ZIP helps us account for that.',
  optimization: 'State tax rules affect your optimization strategy. Your ZIP helps us find the right fit.',
  plan_review: 'This ensures your advisor is licensed in your state and easy to reach when you need them.',
}

function ZipStateBadge({ zip }: { zip: string }) {
  const state = React.useMemo(() => getStateFromZip(zip), [zip])
  const isComplete = zip.length === 5

  if (zip.length < 3) return null

  if (isComplete && !state) {
    return (
      <span
        className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
        style={{ color: '#EB4015', backgroundColor: '#FEF2F0' }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5.5" stroke="currentColor" />
          <path d="M6 3.5V6.5M6 8V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        Invalid
      </span>
    )
  }

  if (!state) return null

  if (!isComplete) {
    return (
      <span
        className="text-xs font-medium px-2.5 py-1 rounded-full"
        style={{ color: '#666666', backgroundColor: '#F2F2F2' }}
      >
        {state.name}
      </span>
    )
  }

  return (
    <span
      className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
      style={{ color: '#0B6E4F', backgroundColor: '#ECFDF5' }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3.5 7.5L5.5 9.5L10.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {state.name}
    </span>
  )
}

interface ZipCodeScreenProps {
  initialValue?: string
  homeownership?: Homeownership
  motivationDriver?: MotivationDriver
  funnelData?: FAFunnelData
  onBack?: () => void
  onSubmit?: (zip: string, derivedState?: string) => void
}

export function ZipCodeScreen({
  initialValue,
  homeownership,
  motivationDriver,
  funnelData,
  onBack,
  onSubmit,
}: ZipCodeScreenProps) {
  const [zip, setZip] = React.useState(initialValue ?? '')
  const [error, setError] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const resolvedState = React.useMemo(() => getStateFromZip(zip), [zip])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5)
    setZip(value)
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^\d{5}$/.test(zip)) {
      setError('Please enter a valid ZIP code')
      return
    }
    const state = getStateFromZip(zip)
    if (!state) {
      setError('Please enter a valid ZIP code')
      return
    }
    onSubmit?.(zip, state.abbr)
  }

  const confirmation =
    homeownership && motivationDriver
      ? CONFIRMATION[homeownership]?.[motivationDriver] ?? ''
      : ''

  const defaultReassurance = motivationDriver ? REASSURANCE[motivationDriver] : ''
  const isStateResolved = zip.length === 5 && resolvedState !== null
  const advisorContext = isStateResolved ? getAdvisorContext(resolvedState!.abbr) : null
  const guidanceText = advisorContext ? advisorContext.guidance : defaultReassurance
  const guidanceKey = isStateResolved ? resolvedState!.abbr : 'default'

  return (
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">
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

        {/* Zone 2: Headline + Input */}
        <h1
          className="animate-fade-in-up font-display text-display sm:text-display-md lg:text-display-lg mb-4"
          style={{ animationDelay: '300ms', color: '#1B2A4A' }}
        >
          Let&rsquo;s check advisor availability{' '}
          <span style={{ color: '#0066CC' }}>in your area.</span>
        </h1>

        {/* Input */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="animate-fade-in-up relative" style={{ animationDelay: '400ms' }}>
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              placeholder="ZIP code"
              value={zip}
              onChange={handleChange}
              maxLength={5}
              className={cn(
                'w-full bg-white outline-none transition-colors duration-150',
                error
                  ? 'border-[#EB4015] focus:border-[#EB4015]'
                  : 'border-[#E0E0E0] focus:border-[#0066CC]'
              )}
              style={{
                height: '48px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '8px',
                padding: '0 16px',
                paddingRight: resolvedState || (zip.length === 5) ? '140px' : '16px',
                fontSize: '16px',
                color: '#1B2A4A',
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
              <ZipStateBadge zip={zip} />
            </div>
            {error && (
              <p className="mt-2" style={{ fontSize: '14px', color: '#EB4015' }}>
                {error}
              </p>
            )}
          </div>

          {/* Dynamic guidance — state-specific when resolved, motivation-based default otherwise */}
          {guidanceText && (
            <p
              key={guidanceKey}
              className={cn('mt-4', isStateResolved ? 'animate-fade-in' : 'animate-fade-in-up')}
              style={{ animationDelay: isStateResolved ? '0ms' : '500ms', fontSize: '14px', color: '#666666' }}
            >
              {guidanceText}
            </p>
          )}

          {/* Continue */}
          <div className="animate-fade-in-up mt-6" style={{ animationDelay: '500ms' }}>
            <StickyButtonContainer>
              <Button type="submit" fullWidth showTrailingIcon disabled={zip.length !== 5}>
                Continue
              </Button>
            </StickyButtonContainer>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ZipCodeScreen
