'use client'

import * as React from 'react'
import { Button } from '@/components/ui/Button'
import type { MotivationDriver, RelationshipPreference, FAFunnelData } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

const BLUE = '#0066CC'

const EMAIL_CONTENT: Record<MotivationDriver, { headline: React.ReactNode; subCopy: string }> = {
  behind_retirement: {
    headline: <>We&rsquo;re almost ready to match you. <span style={{ color: BLUE }}>Where should we send your advisor details?</span></>,
    subCopy: 'Your catch-up specialist will reach out to walk through your strategy.',
  },
  family_protection: {
    headline: <>We&rsquo;re almost ready to match you. <span style={{ color: BLUE }}>Where should we send your advisor details?</span></>,
    subCopy: 'Your protection planning advisor will reach out to review your family\u2019s coverage.',
  },
  windfall: {
    headline: <>We&rsquo;re almost ready to match you. <span style={{ color: BLUE }}>Where should we send your advisor details?</span></>,
    subCopy: 'Your wealth management advisor will reach out to discuss positioning.',
  },
  optimization: {
    headline: <>We&rsquo;re almost ready to match you. <span style={{ color: BLUE }}>Where should we send your advisor details?</span></>,
    subCopy: 'Your optimization specialist will reach out to identify your biggest opportunities.',
  },
  plan_review: {
    headline: <>We&rsquo;re almost ready to match you. <span style={{ color: BLUE }}>Where should we send your advisor details?</span></>,
    subCopy: 'Your advisor will reach out to schedule your comprehensive review.',
  },
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

  const content = motivationDriver ? EMAIL_CONTENT[motivationDriver] : null

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
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">
        {/* Section label */}
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Finding your match
        </p>

        {/* Headline */}
        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          {content?.headline ?? (
            <>We&rsquo;re almost ready to match you. <span style={{ color: BLUE }}>Where should we send your advisor details?</span></>
          )}
        </h1>

        {/* Sub-copy */}
        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          {content?.subCopy ?? 'Enter your email to receive your match details.'}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="animate-fade-in-up mb-4" style={{ animationDelay: '500ms' }}>
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

          <p className="animate-fade-in-up mb-4" style={{ animationDelay: '500ms', fontSize: '13px', color: '#999999' }}>
            We&rsquo;ll send your match details and profile summary to this email.
          </p>

          {!hasTcpaConsent && (
            <p className="animate-fade-in-up mb-4" style={{ animationDelay: '500ms', fontSize: '12px', color: '#999999' }}>
              By continuing, you agree to be contacted by a financial advisor from our network at the email you provide.
            </p>
          )}

          <div className="animate-fade-in-up mb-6" style={{ animationDelay: '500ms' }}>
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

          <Button type="submit" fullWidth showTrailingIcon disabled={!email.trim()} className="animate-fade-in-up">
            Continue
          </Button>

          <div className="animate-fade-in-up flex items-center justify-center gap-1.5 mt-4" style={{ animationDelay: '500ms' }}>
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
