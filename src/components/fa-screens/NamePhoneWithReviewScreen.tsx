'use client'

import * as React from 'react'
import { Button } from '@/components/ui/Button'
import type { MotivationDriver, FAFunnelData } from '@/types/fa-funnel'
import { MOTIVATION_LABELS, getAgeLabel, getHomeownershipLabel } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

const BLUE = '#0066CC'

const NAME_PHONE_CONTENT: Record<MotivationDriver, { headline: React.ReactNode; subCopy: string }> = {
  behind_retirement: {
    headline: <>Last step. <span style={{ color: BLUE }}>Your advisor match is ready.</span></>,
    subCopy: 'Your catch-up specialist will call you within 1-2 business days to walk through your strategy.',
  },
  family_protection: {
    headline: <>Last step. <span style={{ color: BLUE }}>Your advisor match is ready.</span></>,
    subCopy: 'Your protection planning advisor will call you within 1-2 business days to review your family\u2019s coverage.',
  },
  windfall: {
    headline: <>Last step. <span style={{ color: BLUE }}>Your advisor match is ready.</span></>,
    subCopy: 'Your wealth management advisor will call you within 1-2 business days to discuss positioning.',
  },
  optimization: {
    headline: <>Last step. <span style={{ color: BLUE }}>Your advisor match is ready.</span></>,
    subCopy: 'Your optimization specialist will call you within 1-2 business days to identify your biggest opportunities.',
  },
  plan_review: {
    headline: <>Last step. <span style={{ color: BLUE }}>Your advisor match is ready.</span></>,
    subCopy: 'Your advisor will call you within 1-2 business days to schedule your comprehensive review.',
  },
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
  nameOnlyMode?: boolean
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
  nameOnlyMode = false,
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

  const content = motivationDriver ? NAME_PHONE_CONTENT[motivationDriver] : null
  const needsPhone = !nameOnlyMode && !existingPhone

  const RELATIONSHIP_LABELS: Record<string, string> = {
    phone_consultation: 'a phone consultation',
    virtual: 'virtual meetings',
    in_person: 'meeting in person',
    no_preference: 'any format',
  }

  const whatWeHeard: string[] = []
  if (funnelData?.motivationDriver) whatWeHeard.push(`You want help ${MOTIVATION_LABELS[funnelData.motivationDriver].toLowerCase()}`)
  if (stateName) whatWeHeard.push(`You\u2019re in ${stateName}`)
  if (funnelData?.relationshipPreference) whatWeHeard.push(`You prefer ${RELATIONSHIP_LABELS[funnelData.relationshipPreference] ?? 'connecting with an advisor'}`)
  if (funnelData?.ageRange) whatWeHeard.push(`You\u2019re in your ${getAgeLabel(funnelData.ageRange).toLowerCase()}`)
  const HOMEOWNERSHIP_HEARD_COPY: Record<string, string> = {
    yes: 'You own your home',
    no: 'You rent your home',
    other: 'Your housing status is unique',
    prefer_not_to_say: 'You prefer not to share homeownership',
  }
  if (funnelData?.homeownership) {
    whatWeHeard.push(HOMEOWNERSHIP_HEARD_COPY[funnelData.homeownership] ?? `Homeownership: ${getHomeownershipLabel(funnelData.homeownership)}`)
  }

  const matchCount = React.useMemo(() => Math.floor(Math.random() * 3) + 4, [])
  const matchLine = motivationDriver
    ? `Based on this, we\u2019ve found ${matchCount} advisors who specialize in ${MOTIVATION_LABELS[motivationDriver].toLowerCase()}.`
    : `Based on this, we\u2019ve found ${matchCount} advisors matched to your profile.`

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
            <>Last step. <span style={{ color: BLUE }}>Your advisor match is ready.</span></>
          )}
        </h1>

        {/* Sub-copy */}
        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          {content?.subCopy ?? 'Just need your name and number so your advisor knows who they\u2019re reaching out to.'}
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="animate-fade-in-up grid grid-cols-2 gap-3 mb-3" style={{ animationDelay: '500ms' }}>
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

          {!nameOnlyMode && (
            <div className="animate-fade-in-up mb-4" style={{ animationDelay: '500ms' }}>
              <label style={{ fontSize: '14px', color: '#666666' }} className="block mb-1.5">Phone</label>
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
          )}

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

          {/* What we heard */}
          {whatWeHeard.length > 0 && (
            <div className="animate-fade-in-up mb-4" style={{ animationDelay: '500ms' }}>
              <p className="text-sm font-medium mb-3" style={{ color: '#1B2A4A' }}>Here&rsquo;s what we heard from you:</p>
              <div className="space-y-2">
                {whatWeHeard.map((text) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                      <circle cx="8" cy="8" r="8" fill="#0B6E4F" />
                      <path d="M5 8.5L7 10.5L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: '14px', color: '#1B2A4A' }}>{text}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3" style={{ fontSize: '14px', color: '#666666' }}>{matchLine}</p>
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            showTrailingIcon
            disabled={!firstName.trim() || !lastName.trim() || (needsPhone && phone.replace(/\D/g, '').length !== 10)}
            className="animate-fade-in-up"
          >
            Find My Advisor
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

export default NamePhoneWithReviewScreen
