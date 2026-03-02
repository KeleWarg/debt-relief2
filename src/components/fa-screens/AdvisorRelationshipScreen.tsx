'use client'

import * as React from 'react'
import { FAProgressBar } from './FAProgressBar'
import { ProfileDropdown } from './ProfileDropdown'
import { Button } from '@/components/ui/Button'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import type { MotivationDriver, RelationshipPreference, FAFunnelData } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D']

const RELATIONSHIP_OPTIONS: { value: RelationshipPreference; title: string; desc: string; recommended?: boolean }[] = [
  { value: 'phone_consultation', title: 'Talk to an advisor', desc: 'Schedule a call or get matched for a consultation', recommended: true },
  { value: 'virtual', title: 'Online / virtual only', desc: 'Video calls and digital tools' },
  { value: 'in_person', title: 'Meet in person', desc: 'Face-to-face at a local office' },
  { value: 'no_preference', title: 'No preference', desc: 'Match me with the best advisor regardless of format' },
]

function getConfirmation(motivation: MotivationDriver, stateName: string): string {
  const m: Record<MotivationDriver, string> = {
    behind_retirement: `Advisors confirmed in ${stateName}. Now let\u2019s set up how you\u2019ll connect with your catch-up specialist.`,
    family_protection: `Advisors confirmed in ${stateName}. Now let\u2019s set up how you\u2019ll connect with your protection advisor.`,
    windfall: `Advisors confirmed in ${stateName}. Now let\u2019s set up how you\u2019ll connect with your wealth advisor.`,
    optimization: `Advisors confirmed in ${stateName}. Now let\u2019s set up how you\u2019ll connect with your optimization specialist.`,
    plan_review: `Advisors confirmed in ${stateName}. Now let\u2019s set up how you\u2019ll connect with your reviewer.`,
  }
  return m[motivation]
}

const REASSURANCE: Record<MotivationDriver, string> = {
  behind_retirement: 'Catch-up planning works best with a dedicated advisor you can check in with regularly.',
  family_protection: 'Protection planning involves sensitive decisions. Choose whatever format feels most comfortable for your family.',
  windfall: 'The first conversation about new wealth is important. Pick whatever format lets you be the most open.',
  optimization: 'Optimization is hands-on. Regular check-ins with your advisor keep the strategy current.',
  plan_review: 'A review works in any format. Pick whatever fits your schedule.',
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
        className="relative bg-white w-full sm:max-w-[480px] rounded-t-2xl sm:rounded-2xl animate-slide-up"
        style={{ padding: '24px' }}
      >
        <h2 className="font-display mb-4" style={{ fontSize: '20px', fontWeight: 500, color: '#1B2A4A' }}>
          Almost done. How should your advisor reach you?
        </h2>

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
            By continuing, you agree to be contacted by a financial advisor from our network at the number
            and/or email you provide. You may receive calls, texts, or emails related to your advisor match.
            Consent is not required to use this service. Message and data rates may apply.
          </p>

          <Button type="submit" variant="primary" fullWidth showTrailingIcon disabled={!hasInput}>
            Continue
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

  const confirmation = motivationDriver && stateName
    ? getConfirmation(motivationDriver, stateName)
    : ''
  const reassurance = motivationDriver ? REASSURANCE[motivationDriver] : ''

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
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <FAProgressBar stepName="relationship" onBack={onBack} />

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
          You&rsquo;re in control of how this starts.{' '}
          <span style={{ color: '#0066CC' }}>Your advisor works on your terms.</span>
        </h1>

        <p
          className="animate-fade-in-up leading-relaxed mb-4"
          style={{ animationDelay: '400ms', fontSize: '15px', color: '#666666' }}
        >
          How would you like to work with your advisor?
        </p>

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
                    style={{ color: '#1B2A4A', backgroundColor: '#E8F0FE' }}
                  >
                    Recommended
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {reassurance && (
          <p className="animate-fade-in-up mt-4" style={{ animationDelay: '850ms', fontSize: '14px', color: '#666666' }}>
            {reassurance}
          </p>
        )}
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
