'use client'

import * as React from 'react'
import { ProfileDropdown } from './ProfileDropdown'
import { Button } from '@/components/ui/Button'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import type { MotivationDriver, FAFunnelData } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

const ADVISOR_LINE: Record<MotivationDriver, string> = {
  behind_retirement: 'Your catch-up specialist will call you within 1-2 business days to walk through your strategy.',
  family_protection: 'Your protection planning advisor will call you within 1-2 business days to review your family\u2019s coverage.',
  windfall: 'Your wealth management advisor will call you within 1-2 business days to discuss positioning.',
  optimization: 'Your optimization specialist will call you within 1-2 business days to identify your biggest opportunities.',
  plan_review: 'Your advisor will call you within 1-2 business days to schedule your comprehensive review.',
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits.length ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

interface NamePhoneWithReviewScreenProps {
  motivationDriver?: MotivationDriver
  existingPhone?: string
  hasTcpaConsent?: boolean
  hasEmailFromPrevious?: boolean
  stateName?: string
  funnelData?: FAFunnelData
  onBack?: () => void
  onSubmit?: (data: { firstName: string; lastName: string; phone: string; tcpaConsent: boolean }) => void
}

export function NamePhoneWithReviewScreen({
  motivationDriver,
  existingPhone,
  hasTcpaConsent,
  hasEmailFromPrevious,
  stateName,
  funnelData,
  onBack,
  onSubmit,
}: NamePhoneWithReviewScreenProps) {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [phone, setPhone] = React.useState(existingPhone ? formatPhone(existingPhone) : '')
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const firstNameRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    firstNameRef.current?.focus()
  }, [])

  const confirmationText = hasEmailFromPrevious === false
    ? 'Email on file. One last thing and we\u2019ll find your match.'
    : 'Email confirmed. One last thing and we\u2019ll find your match.'

  const advisorLine = motivationDriver ? ADVISOR_LINE[motivationDriver] : ''
  const needsPhone = !existingPhone

  const confidenceItems = [
    'Your profile qualifies for a free consultation',
    `Advisors in ${stateName ?? 'your state'} are accepting new clients`,
    'Average first call is scheduled within 48 hours',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!firstName.trim()) newErrors.firstName = 'Required'
    if (!lastName.trim()) newErrors.lastName = 'Required'
    const cleanPhone = phone.replace(/\D/g, '')
    if (needsPhone && cleanPhone.length !== 10) newErrors.phone = 'Please enter a valid 10-digit phone number'
    if (Object.keys(newErrors).length) { setErrors(newErrors); return }

    onSubmit?.({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: cleanPhone || existingPhone || '',
      tcpaConsent: true,
    })
  }

  return (
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="flex flex-col items-start w-full mt-6">
        <div className="animate-fade-in-up flex items-start gap-2 mb-4">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5">
            <circle cx="9" cy="9" r="9" fill="#0B6E4F" />
            <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ fontSize: '15px', color: '#1B2A4A' }}>{confirmationText}</p>
        </div>

        {funnelData && <ProfileDropdown data={funnelData} className="animate-fade-in-up w-full mb-4" />}

        <div className="animate-fade-in-up w-full border-t my-4" style={{ animationDelay: '200ms', borderColor: '#E0E0E0' }} />

        <h1
          className="animate-fade-in-up font-display text-display sm:text-display-md lg:text-display-lg mb-2"
          style={{ animationDelay: '300ms', color: '#1B2A4A' }}
        >
          Last step.{' '}
          <span style={{ color: '#0066CC' }}>Your advisor match is ready.</span>
        </h1>

        <p
          className="animate-fade-in-up mb-4"
          style={{ animationDelay: '350ms', fontSize: '15px', color: '#666666' }}
        >
          Just need your name and number so your advisor knows who they&rsquo;re reaching out to.
        </p>

        {advisorLine && (
          <p className="animate-fade-in-up mb-4" style={{ animationDelay: '400ms', fontSize: '14px', color: '#666666' }}>
            {advisorLine}
          </p>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="animate-fade-in-up grid grid-cols-2 gap-3 mb-3" style={{ animationDelay: '450ms' }}>
            <div>
              <input
                ref={firstNameRef}
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value); setErrors((p) => ({ ...p, firstName: '' })) }}
                className={cn(
                  'w-full bg-white outline-none border transition-colors duration-150',
                  errors.firstName ? 'border-[#EB4015]' : 'border-[#E0E0E0] focus:border-[#0066CC]'
                )}
                style={{ height: '48px', borderRadius: '8px', padding: '0 16px', fontSize: '16px', color: '#1B2A4A' }}
              />
              {errors.firstName && <p className="mt-1" style={{ fontSize: '13px', color: '#EB4015' }}>{errors.firstName}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => { setLastName(e.target.value); setErrors((p) => ({ ...p, lastName: '' })) }}
                className={cn(
                  'w-full bg-white outline-none border transition-colors duration-150',
                  errors.lastName ? 'border-[#EB4015]' : 'border-[#E0E0E0] focus:border-[#0066CC]'
                )}
                style={{ height: '48px', borderRadius: '8px', padding: '0 16px', fontSize: '16px', color: '#1B2A4A' }}
              />
              {errors.lastName && <p className="mt-1" style={{ fontSize: '13px', color: '#EB4015' }}>{errors.lastName}</p>}
            </div>
          </div>

          <div className="animate-fade-in-up mb-4" style={{ animationDelay: '500ms' }}>
            <input
              type="text"
              inputMode="numeric"
              placeholder="(___) ___-____"
              value={phone}
              onChange={(e) => { setPhone(formatPhone(e.target.value)); setErrors((p) => ({ ...p, phone: '' })) }}
              className={cn(
                'w-full bg-white outline-none border transition-colors duration-150',
                errors.phone ? 'border-[#EB4015]' : 'border-[#E0E0E0] focus:border-[#0066CC]'
              )}
              style={{ height: '48px', borderRadius: '8px', padding: '0 16px', fontSize: '16px', color: '#1B2A4A' }}
            />
            {errors.phone && <p className="mt-1" style={{ fontSize: '13px', color: '#EB4015' }}>{errors.phone}</p>}
          </div>

          {!hasTcpaConsent ? (
            <p className="animate-fade-in-up mb-4" style={{ animationDelay: '550ms', fontSize: '12px', color: '#999999' }}>
              By clicking &ldquo;Find My Advisor,&rdquo; you agree to be contacted by a financial advisor from
              our network at the number and email you&rsquo;ve provided. You may receive calls, texts, or emails
              related to your advisor match. Consent is not required to use this service. Message and data rates may apply.
            </p>
          ) : (
            <p className="animate-fade-in-up mb-4" style={{ animationDelay: '550ms', fontSize: '12px', color: '#999999' }}>
              You&rsquo;ve already agreed to be contacted. We&rsquo;ll share your profile with your matched advisor.
            </p>
          )}

          <div className="animate-fade-in-up mt-4" style={{ animationDelay: '600ms' }}>
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

          <div className="animate-fade-in-up mt-4" style={{ animationDelay: '650ms' }}>
            <StickyButtonContainer>
              <Button
                type="submit"
                fullWidth
                showTrailingIcon
                disabled={!firstName.trim() || !lastName.trim() || (needsPhone && phone.replace(/\D/g, '').length !== 10)}
              >
                Find My Advisor
              </Button>
            </StickyButtonContainer>
          </div>

          <div className="animate-fade-in-up flex items-center justify-center gap-1.5 mt-3" style={{ animationDelay: '700ms' }}>
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

export default NamePhoneWithReviewScreen
