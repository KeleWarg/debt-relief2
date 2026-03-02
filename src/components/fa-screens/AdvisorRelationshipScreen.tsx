'use client'

import * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import type { MotivationDriver, RelationshipPreference, FAFunnelData } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

const BLUE = '#0066CC'

const LETTERS = ['A', 'B', 'C', 'D']

const RELATIONSHIP_OPTIONS: { value: RelationshipPreference; title: string; desc: string; recommended?: boolean }[] = [
  { value: 'phone_consultation', title: 'Talk to an advisor', desc: 'Schedule a call or get matched for a consultation', recommended: true },
  { value: 'virtual', title: 'Online / virtual only', desc: 'Video calls and digital tools' },
  { value: 'in_person', title: 'Meet in person', desc: 'Face-to-face at a local office' },
  { value: 'no_preference', title: 'No preference', desc: 'Match me with the best advisor regardless of format' },
]

function getRelationshipContent(stateName: string): Record<MotivationDriver, { headline: React.ReactNode; subCopy: string }> {
  return {
    behind_retirement: {
      headline: <>Advisors are available in {stateName}. <span style={{ color: BLUE }}>Now let&rsquo;s set up how you&rsquo;ll connect with your catch-up specialist.</span></>,
      subCopy: 'How would you like to work with your advisor?',
    },
    family_protection: {
      headline: <>Advisors are available in {stateName}. <span style={{ color: BLUE }}>Now let&rsquo;s set up how you&rsquo;ll connect with your protection advisor.</span></>,
      subCopy: 'How would you like to work with your advisor?',
    },
    windfall: {
      headline: <>Advisors are available in {stateName}. <span style={{ color: BLUE }}>Now let&rsquo;s set up how you&rsquo;ll connect with your wealth advisor.</span></>,
      subCopy: 'How would you like to work with your advisor?',
    },
    optimization: {
      headline: <>Advisors are available in {stateName}. <span style={{ color: BLUE }}>Now let&rsquo;s set up how you&rsquo;ll connect with your optimization specialist.</span></>,
      subCopy: 'How would you like to work with your advisor?',
    },
    plan_review: {
      headline: <>Advisors are available in {stateName}. <span style={{ color: BLUE }}>Now let&rsquo;s set up how you&rsquo;ll connect with your reviewer.</span></>,
      subCopy: 'How would you like to work with your advisor?',
    },
  }
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits.length ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

interface ContactModalProps {
  savedEmail?: string
  onSubmit: (data: { phone?: string; email?: string; tcpaConsent: boolean }) => void
  onSkip: () => void
}

function ContactModal({ savedEmail, onSubmit, onSkip }: ContactModalProps) {
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState(savedEmail ?? '')

  const hasInput = phone.replace(/\D/g, '').length > 0 || email.trim().length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanPhone = phone.replace(/\D/g, '')
    onSubmit({
      phone: cleanPhone.length === 10 ? cleanPhone : undefined,
      email: email.trim() || undefined,
      tcpaConsent: true,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onSkip} />
      <div
        className="relative bg-white w-full sm:max-w-[800px] rounded-t-2xl sm:rounded-2xl animate-slide-up overflow-hidden"
        style={{ padding: '24px' }}
      >
        <button
          type="button"
          onClick={onSkip}
          className="absolute top-4 right-4 flex items-center justify-center"
          style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F0F0F0' }}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="#666666" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <h2 className="font-display mb-4 sm:mb-5 pr-10" style={{ fontSize: '32px', fontWeight: 500, color: '#1B2A4A', lineHeight: 1.2 }}>
          Almost done. How should your advisor reach you?
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-6">
          <div className="relative flex-shrink-0 w-full sm:w-[240px] h-[140px] sm:h-[280px] rounded-lg overflow-hidden bg-neutral-100">
            <Image
              src="/icon-people.png"
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="sm:flex-1 min-w-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label style={{ fontSize: '14px', color: '#666666' }} className="block mb-1.5">
                  Phone (fastest way to connect)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="(___) ___-____"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className="w-full bg-white outline-none border focus:border-[#0066CC]"
                  style={{ height: '48px', borderColor: '#E0E0E0', borderRadius: '8px', padding: '0 16px', fontSize: '16px', color: '#1B2A4A' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '14px', color: '#666666' }} className="block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white outline-none border focus:border-[#0066CC]"
                  style={{ height: '48px', borderColor: '#E0E0E0', borderRadius: '8px', padding: '0 16px', fontSize: '16px', color: '#1B2A4A' }}
                />
              </div>

              <p style={{ fontSize: '12px', color: '#999999' }}>
                By clicking Agree and Continue, I provide my electronic signature and agree to receive marketing
                texts, calls, and emails using automated technology and/or artificial or prerecorded voice messages,
                even if my telephone number is currently listed on a federal, state, internal, or corporate
                Do-Not-Call list, from Forbes Advisor and Partners, and parties calling on their behalf. I understand
                that my consent is not required as a condition of purchase. I also agree to your{' '}
                <a href="#" style={{ color: 'rgba(0, 102, 204, 1)' }}>Privacy Statement</a> and{' '}
                <a href="#" style={{ color: 'rgba(0, 102, 204, 1)' }}>Terms and Conditions</a>.
              </p>

              <Button type="submit" variant="primary" fullWidth showTrailingIcon disabled={!hasInput}>
                Agree and Continue
              </Button>
            </form>

            <button
              type="button"
              onClick={onSkip}
              className="mt-3 w-full text-center py-2"
              style={{ fontSize: '14px', color: '#666666' }}
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface AdvisorRelationshipScreenProps {
  motivationDriver?: MotivationDriver
  stateName?: string
  savedEmail?: string
  funnelData?: FAFunnelData
  onBack?: () => void
  onSubmit?: (data: {
    preference: RelationshipPreference
    phone?: string
    email?: string
    tcpaConsent?: boolean
  }) => void
}

export function AdvisorRelationshipScreen({
  motivationDriver,
  stateName,
  savedEmail,
  funnelData,
  onBack,
  onSubmit,
}: AdvisorRelationshipScreenProps) {
  const [selected, setSelected] = React.useState<RelationshipPreference | null>(null)
  const [showModal, setShowModal] = React.useState(false)

  const content = motivationDriver && stateName
    ? getRelationshipContent(stateName)[motivationDriver]
    : null

  const handleSelect = (value: RelationshipPreference) => {
    setSelected(value)
    setTimeout(() => setShowModal(true), 300)
  }

  const handleModalSubmit = (data: { phone?: string; email?: string; tcpaConsent: boolean }) => {
    setShowModal(false)
    onSubmit?.({
      preference: selected!,
      phone: data.phone,
      email: data.email,
      tcpaConsent: data.tcpaConsent,
    })
  }

  const handleModalSkip = () => {
    setShowModal(false)
    onSubmit?.({ preference: selected! })
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
            <>Advisors are available in your area. <span style={{ color: BLUE }}>Now let&rsquo;s set up how you&rsquo;ll connect with your advisor.</span></>
          )}
        </h1>

        {/* Sub-copy */}
        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          {content?.subCopy ?? 'How would you like to work with your advisor?'}
        </p>

        {/* Options */}
        <div className="w-full flex flex-col" style={{ gap: '12px' }}>
          {RELATIONSHIP_OPTIONS.map((opt, i) => {
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
                style={{ animationDelay: `${450 + i * 100}ms`, height: '72px', paddingLeft: '16px', paddingRight: '16px' }}
              >
                <div
                  className={cn(
                    'flex items-center justify-center rounded-full flex-shrink-0 text-sm font-semibold transition-colors duration-200',
                    isSelected ? 'bg-[#0066CC] text-white' : 'bg-[#F2F2F2] text-neutral-500'
                  )}
                  style={{ width: '28px', height: '28px' }}
                >
                  {LETTERS[i]}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block" style={{ fontSize: '16px', fontWeight: 500, color: '#1B2A4A' }}>{opt.title}</span>
                  <span className="block" style={{ fontSize: '14px', color: '#999999' }}>{opt.desc}</span>
                </div>
                {opt.recommended && (
                  <span
                    className="flex-shrink-0 text-[11px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                    style={{ color: '#1B2A4A', backgroundColor: '#F3C060' }}
                  >
                    Recommended
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {showModal && (
        <ContactModal
          savedEmail={savedEmail}
          onSubmit={handleModalSubmit}
          onSkip={handleModalSkip}
        />
      )}
    </div>
  )
}

export default AdvisorRelationshipScreen
