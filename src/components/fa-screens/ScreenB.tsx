'use client'

import * as React from 'react'
import { CheckCircle2, Shield, Lock, Check } from 'lucide-react'
import { FAProgressBar } from './FAProgressBar'
import { Button, Input, Checkbox } from '@/components/ui'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import { formatPhoneNumber } from '@/lib/utils'
import { FA_STEP_NUMBER } from '@/types/fa-funnel'
import type {
  FAFunnelData,
  ContactPreference,
  MotivationDriver,
  InvestmentObjective,
} from '@/types/fa-funnel'

function getDeepInsight(funnelData: FAFunnelData): string {
  const m = funnelData.motivationDriver
  if (m === 'behind_retirement')
    return "Based on your full profile — your income range, age, and life situation — a catch-up strategy has several strong levers available. The gap between where you are and where you want to be is real — but it's also more closable than it feels. The right advisor focuses on coordinating all of these pieces, not just one of them."
  if (m === 'family_protection')
    return "For a household at your income level, protection planning isn't just about insurance — it's about coordinating estate documents, beneficiary designations, survivorship strategies, and making sure the full financial picture is covered. Most families have at least one critical gap. An advisor finds them before they matter."
  if (m === 'windfall')
    return "The decisions you make in the first 12 months after receiving new wealth are the most consequential. Professional guidance during this window is the strongest predictor of whether that wealth grows or erodes. An advisor experienced in windfall management knows the right sequence: tax positioning first, guardrails second, long-term structure third."
  if (m === 'optimization')
    return "At your income and asset level, the optimization opportunity is substantial. Without the right structure, you're likely leaving five figures annually in avoidable taxes and missed opportunities. An advisor focused on high-income optimization can identify exactly where the biggest gains are hiding."
  if (m === 'plan_review')
    return "Based on your full profile — your income range, asset level, and life situation — there are specific areas an advisor would want to examine: whether your accounts are structured for tax efficiency, whether your beneficiary designations are current, and whether your investment allocation matches your stated objectives."
  return "Based on your profile, there are meaningful opportunities an advisor could help you identify and act on."
}

function generateInsight(
  motivation?: MotivationDriver,
  objective?: InvestmentObjective,
  specialties?: string[]
): string {
  const specialtySet = new Set(specialties ?? [])

  if (motivation === 'behind_retirement') {
    if (objective === 'protecting') {
      return 'a retirement catch-up specialist who can help you build a realistic plan'
    }
    return 'a growth-focused advisor experienced in accelerated retirement planning'
  }

  if (motivation === 'family_protection') {
    if (specialtySet.has('Estate planning')) {
      return 'an estate and insurance planning advisor focused on family protection'
    }
    return 'an advisor experienced in comprehensive family financial protection'
  }

  if (motivation === 'windfall') {
    return 'an advisor experienced in sudden wealth management and long-term positioning'
  }

  if (motivation === 'optimization') {
    if (specialtySet.has('Tax planning')) {
      return 'a tax-aware advisor focused on maximizing what you keep'
    }
    return 'an advisor focused on optimizing your investment returns and tax efficiency'
  }

  if (motivation === 'plan_review') {
    return 'a fiduciary advisor who can audit your current plan and identify gaps'
  }

  return 'an advisor matched to your specific needs'
}

export interface ScreenBProps {
  funnelData: FAFunnelData
  onBack?: () => void
  onNext?: () => void
  onSaveEmail?: (email: string) => void
  onContactPreference?: (pref: ContactPreference, phone?: string) => void
}

export function ScreenB({
  funnelData,
  onBack,
  onNext,
  onSaveEmail,
  onContactPreference,
}: ScreenBProps) {
  const [visible, setVisible] = React.useState(false)
  const [showContactForm, setShowContactForm] = React.useState(false)
  const [showSaveForm, setShowSaveForm] = React.useState(false)
  const [saveEmail, setSaveEmail] = React.useState('')
  const [saveError, setSaveError] = React.useState<string | null>(null)
  const [contactPref, setContactPref] = React.useState<ContactPreference>('email_only')
  const [phone, setPhone] = React.useState('')
  const [consent, setConsent] = React.useState(false)
  const [contactError, setContactError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  const hasSavedEmail = Boolean(funnelData.savedEmail)
  const insight = generateInsight(
    funnelData.motivationDriver,
    funnelData.investmentObjective,
    funnelData.specialties
  )
  const deepInsight = getDeepInsight(funnelData)

  const handleSaveProgress = () => {
    const trimmed = saveEmail.trim()
    if (!trimmed) {
      setSaveError('Please enter your email')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) {
      setSaveError('Please enter a valid email')
      return
    }
    setSaveError(null)
    onSaveEmail?.(trimmed)
    setShowSaveForm(false)
    setSaveEmail('')
  }

  const handleContactContinue = () => {
    setContactError(null)
    if (contactPref === 'phone') {
      const formatted = formatPhoneNumber(phone)
      const digits = formatted.replace(/\D/g, '')
      if (digits.length !== 10) {
        setContactError('Please enter a valid 10-digit phone number')
        return
      }
      if (!consent) {
        setContactError('Please agree to continue')
        return
      }
      onContactPreference?.('phone', formatted)
    } else {
      if (!consent) {
        setContactError('Please agree to continue')
        return
      }
      onContactPreference?.('email_only')
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <FAProgressBar currentStep={FA_STEP_NUMBER.screenB} onBack={onBack} />
          <div
            className={`animate-slide-up has-sticky-button mt-8 space-y-6 text-center transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="max-w-content mx-auto">
              {/* Lottie-style icon: CheckCircle2 in success circle */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-feedback-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-feedback-success" />
                </div>
              </div>

              {/* Qualification Message (green) */}
              <div className="inline-flex items-center gap-2 bg-feedback-success/10 rounded-lg px-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-feedback-success flex-shrink-0" />
                <p className="text-sm font-medium text-feedback-success">
                  ✓ Great news — your profile qualifies for personalized advisor matching.
                </p>
              </div>

              {/* Display headline */}
              <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900">
                Here&apos;s what a financial advisor would see.
              </h1>

              {/* Deep personalization card */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6 text-left">
                <p className="text-body text-neutral-800">{deepInsight}</p>
              </div>

              {/* Generated advisor match insight */}
              <p className="text-body text-neutral-800">
                Based on what you&apos;ve told us, you&apos;d work best with {insight}.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-4 text-neutral-500">
                <span className="text-xs flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  Profile saved
                </span>
                <span className="text-xs flex items-center gap-1.5">
                  <Lock className="w-4 h-4" />
                  Encrypted & secure
                </span>
                <span className="text-xs flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  Almost there
                </span>
              </div>

              {/* Contact preference or save progress */}
              {hasSavedEmail ? (
                <div className="space-y-4 text-left">
                  <p className="text-body text-neutral-800">
                    We have your email from earlier. Want your matched advisors to reach out directly?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="primary"
                      onClick={() => setShowContactForm(true)}
                      className="flex-1"
                    >
                      Yes, reach out to me
                    </Button>
                    <Button variant="secondary" onClick={onNext} className="flex-1">
                      I&apos;ll review matches first
                    </Button>
                  </div>

                  {showContactForm && (
                    <div className="bg-neutral-50 rounded-lg p-4 space-y-4 animate-slide-up text-left">
                      <div className="space-y-3">
                        <p className="text-body-sm font-medium text-neutral-800">How would you like to be contacted?</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="contactPref"
                              checked={contactPref === 'email_only'}
                              onChange={() => setContactPref('email_only')}
                              className="text-primary-700"
                            />
                            <span className="text-body-sm text-neutral-800">Email is fine</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="contactPref"
                              checked={contactPref === 'phone'}
                              onChange={() => setContactPref('phone')}
                              className="text-primary-700"
                            />
                            <span className="text-body-sm text-neutral-800">I&apos;d prefer a phone call</span>
                          </label>
                        </div>
                      </div>

                      {contactPref === 'phone' && (
                        <Input
                          label="Phone number"
                          type="tel"
                          placeholder="(555) 555-5555"
                          value={phone}
                          onChange={(e) => {
                            setPhone(formatPhoneNumber(e.target.value))
                            setContactError(null)
                          }}
                          error={contactError ?? undefined}
                        />
                      )}

                      <Checkbox
                        checked={consent}
                        onCheckedChange={(c) => {
                          setConsent(c === true)
                          setContactError(null)
                        }}
                        label={
                          <>
                            I agree to be contacted by matched advisors and understand the{' '}
                            <a href="#" className="underline">privacy policy</a> and{' '}
                            <a href="#" className="underline">terms of service</a>.
                          </>
                        }
                      />

                      <Button variant="primary" fullWidth onClick={handleContactContinue}>
                        Continue
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setShowSaveForm((v) => !v)}
                    className="text-body-sm text-primary-700 hover:text-primary-750 hover:underline transition-colors"
                  >
                    Want to finish later? Save your progress →
                  </button>

                  {showSaveForm && (
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto text-left animate-slide-up">
                      <Input
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={saveEmail}
                        onChange={(e) => {
                          setSaveEmail(e.target.value)
                          setSaveError(null)
                        }}
                        error={saveError ?? undefined}
                        className="flex-1"
                      />
                      <Button
                        variant="secondary"
                        onClick={handleSaveProgress}
                        className="sm:self-end"
                      >
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Primary CTA */}
              <StickyButtonContainer>
                <Button fullWidth showTrailingIcon onClick={onNext}>
                  Continue — We&apos;re Almost Done →
                </Button>
              </StickyButtonContainer>
            </div>
          </div>
    </div>
  )
}

export default ScreenB
