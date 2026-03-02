'use client'

import * as React from 'react'
import { FAProgressBar } from './FAProgressBar'
import { ProfileDropdown } from './ProfileDropdown'
import { Button } from '@/components/ui/Button'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import type { MotivationDriver, RelationshipPreference, FAFunnelData } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

function getConfirmation(
  preference: RelationshipPreference,
  motivation: MotivationDriver,
  stateName: string
): string {
  const matrix: Record<RelationshipPreference, Record<MotivationDriver, string>> = {
    phone_consultation: {
      behind_retirement: 'Phone consultation. Your catch-up specialist will call to walk through your strategy.',
      family_protection: 'Phone consultation. Your protection advisor will call to review your family\u2019s coverage.',
      windfall: 'Phone consultation. Your wealth advisor will call to discuss positioning.',
      optimization: 'Phone consultation. Your optimization specialist will call to identify your biggest opportunities.',
      plan_review: 'Phone consultation. Your advisor will call to schedule your comprehensive review.',
    },
    virtual: {
      behind_retirement: 'Virtual meetings. Your advisor will set up video calls to work through your catch-up plan.',
      family_protection: 'Virtual meetings. Your advisor will connect with you online to review your protection plan.',
      windfall: 'Virtual meetings. Your advisor will set up video calls to discuss your new wealth strategy.',
      optimization: 'Virtual meetings. Your advisor will connect with you online to review your optimization opportunities.',
      plan_review: 'Virtual meetings. Your advisor will set up video calls for your comprehensive review.',
    },
    in_person: {
      behind_retirement: `In person. We\u2019ll match you with a catch-up specialist you can meet face-to-face near ${stateName}.`,
      family_protection: `In person. We\u2019ll match you with a protection advisor you can meet face-to-face near ${stateName}.`,
      windfall: `In person. We\u2019ll match you with a wealth advisor you can meet face-to-face near ${stateName}.`,
      optimization: `In person. We\u2019ll match you with an optimization specialist near ${stateName}.`,
      plan_review: `In person. We\u2019ll match you with an advisor near ${stateName} for your face-to-face review.`,
    },
    no_preference: {
      behind_retirement: 'No preference on format. We\u2019ll match you with the best advisor for your situation.',
      family_protection: 'No preference on format. We\u2019ll match you with the best advisor for your situation.',
      windfall: 'No preference on format. We\u2019ll match you with the best advisor for your situation.',
      optimization: 'No preference on format. We\u2019ll match you with the best advisor for your situation.',
      plan_review: 'No preference on format. We\u2019ll match you with the best advisor for your situation.',
    },
  }
  return matrix[preference][motivation]
}

const ADVISOR_LINE: Record<MotivationDriver, string> = {
  behind_retirement: 'Your catch-up specialist will reach out to walk through your strategy.',
  family_protection: 'Your protection planning advisor will reach out to review your family\u2019s coverage.',
  windfall: 'Your wealth management advisor will reach out to discuss positioning.',
  optimization: 'Your optimization specialist will reach out to identify your biggest opportunities.',
  plan_review: 'Your advisor will reach out to schedule your comprehensive review.',
}

interface EmailWithReviewScreenProps {
  motivationDriver?: MotivationDriver
  relationshipPreference?: RelationshipPreference
  stateName?: string
  savedEmail?: string
  hasTcpaConsent?: boolean
  funnelData?: FAFunnelData
  onBack?: () => void
  onSubmit?: (email: string) => void
}

export function EmailWithReviewScreen({
  motivationDriver,
  relationshipPreference,
  stateName,
  savedEmail,
  hasTcpaConsent,
  funnelData,
  onBack,
  onSubmit,
}: EmailWithReviewScreenProps) {
  const [email, setEmail] = React.useState(savedEmail ?? '')
  const [error, setError] = React.useState('')

  const confirmation =
    relationshipPreference && motivationDriver && stateName
      ? getConfirmation(relationshipPreference, motivationDriver, stateName)
      : ''

  const advisorLine = motivationDriver ? ADVISOR_LINE[motivationDriver] : ''

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email')
      return
    }
    onSubmit?.(trimmed)
  }

  const confidenceItems = [
    'Your profile qualifies for a free consultation',
    `Advisors in ${stateName ?? 'your state'} are accepting new clients`,
    'Average first call is scheduled within 48 hours',
  ]

  return (
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 py-8">
      <FAProgressBar stepName="email" onBack={onBack} />

      <div className="flex flex-col items-start w-full mt-6">
        {confirmation && (
          <div className="animate-fade-in-up flex items-start gap-2 mb-4">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5">
              <circle cx="9" cy="9" r="9" fill="#0B6E4F" />
              <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p style={{ fontSize: '15px', color: '#1B2A4A' }}>{confirmation}</p>
          </div>
        )}

        {funnelData && <ProfileDropdown data={funnelData} className="animate-fade-in-up w-full mb-4" />}

        <div className="animate-fade-in-up w-full border-t my-4" style={{ animationDelay: '200ms', borderColor: '#E0E0E0' }} />

        <h1
          className="animate-fade-in-up font-display text-display sm:text-display-md lg:text-display-lg mb-2"
          style={{ animationDelay: '300ms', color: '#1B2A4A' }}
        >
          We&rsquo;re almost ready to match you.{' '}
          <span style={{ color: '#0066CC' }}>Where should we send your advisor details?</span>
        </h1>

        <form onSubmit={handleSubmit} className="w-full">
          {advisorLine && (
            <p className="animate-fade-in-up mb-4" style={{ animationDelay: '350ms', fontSize: '14px', color: '#666666' }}>
              {advisorLine}
            </p>
          )}

          <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              className={cn(
                'w-full bg-white outline-none transition-colors duration-150 border',
                error ? 'border-[#EB4015] focus:border-[#EB4015]' : 'border-[#E0E0E0] focus:border-[#0066CC]'
              )}
              style={{ height: '48px', borderRadius: '8px', padding: '0 16px', fontSize: '16px', color: '#1B2A4A' }}
            />
            {error && <p className="mt-2" style={{ fontSize: '14px', color: '#EB4015' }}>{error}</p>}
          </div>

          <p className="animate-fade-in-up mt-2" style={{ animationDelay: '400ms', fontSize: '13px', color: '#999999' }}>
            We&rsquo;ll send your match details and profile summary to this email.
          </p>

          {!hasTcpaConsent && (
            <p className="animate-fade-in-up mt-4" style={{ animationDelay: '450ms', fontSize: '12px', color: '#999999' }}>
              By continuing, you agree to be contacted by a financial advisor from our network at the email you provide.
            </p>
          )}

          <div className="animate-fade-in-up mt-4" style={{ animationDelay: '500ms' }}>
            {confidenceItems.map((text) => (
              <div key={text} className="flex items-center gap-2" style={{ height: '32px' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                  <circle cx="8" cy="8" r="8" fill="#0B6E4F" />
                  <path d="M5 8.5L7 10.5L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: '14px', color: '#1B2A4A' }}>{text}</span>
              </div>
            ))}
          </div>

          <div className="animate-fade-in-up mt-4" style={{ animationDelay: '550ms' }}>
            <StickyButtonContainer>
              <Button type="submit" fullWidth showTrailingIcon disabled={!email.trim()}>
                Continue
              </Button>
            </StickyButtonContainer>
          </div>

          <div className="animate-fade-in-up flex items-center justify-center gap-1.5 mt-3" style={{ animationDelay: '600ms' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="3" y="6" width="8" height="6" rx="1" stroke="#999999" strokeWidth="1.2" />
              <path d="M5 6V4a2 2 0 1 1 4 0v2" stroke="#999999" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: '12px', color: '#999999' }}>
              256-Bit Encrypted &nbsp;&bull;&nbsp; Never Sold or Shared
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmailWithReviewScreen
