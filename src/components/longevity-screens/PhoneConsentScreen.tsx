'use client'

import * as React from 'react'
import { Lock } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import { StickyButtonContainer, Button, Input } from '@/components/ui'
import {
  LONGEVITY_VALIDATION,
  LONGEVITY_PROGRESS_SUBTITLES,
  LONGEVITY_PROGRESS_TIME_ESTIMATES,
  LONGEVITY_TOTAL_STEPS,
} from '@/types/longevity'

interface PhoneConsentScreenProps {
  initialFirstName?: string
  initialLastName?: string
  initialPhone?: string
  onBack?: () => void
  onSubmit?: (data: { firstName: string; lastName: string; phone: string }) => void
}

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length === 0) return ''
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

/**
 * PhoneConsentScreen
 *
 * Step 8 of the longevity funnel – name + phone + legal consent.
 * Collects first name, last name, and phone number with full legal text.
 */
export function PhoneConsentScreen({
  initialFirstName = '',
  initialLastName = '',
  initialPhone = '',
  onBack,
  onSubmit,
}: PhoneConsentScreenProps) {
  const [firstName, setFirstName] = React.useState(initialFirstName)
  const [lastName, setLastName] = React.useState(initialLastName)
  const [phone, setPhone] = React.useState(
    initialPhone ? formatPhoneNumber(initialPhone) : ''
  )

  const [errors, setErrors] = React.useState<{
    firstName?: string
    lastName?: string
    phone?: string
  }>({})

  const isValid =
    firstName.length >= LONGEVITY_VALIDATION.name.minLength &&
    lastName.length >= LONGEVITY_VALIDATION.name.minLength &&
    LONGEVITY_VALIDATION.phone.pattern.test(phone)

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhone(formatted)
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }))
  }

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
    if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }))
  }

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
    if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: typeof errors = {}

    if (firstName.length < LONGEVITY_VALIDATION.name.minLength) {
      newErrors.firstName = `First name must be at least ${LONGEVITY_VALIDATION.name.minLength} characters`
    }
    if (lastName.length < LONGEVITY_VALIDATION.name.minLength) {
      newErrors.lastName = `Last name must be at least ${LONGEVITY_VALIDATION.name.minLength} characters`
    }
    if (!LONGEVITY_VALIDATION.phone.pattern.test(phone)) {
      newErrors.phone = LONGEVITY_VALIDATION.phone.message
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit?.({ firstName, lastName, phone })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <ProgressIndicator
        currentStep={8}
        onBack={onBack}
        subtitles={LONGEVITY_PROGRESS_SUBTITLES}
        timeEstimates={LONGEVITY_PROGRESS_TIME_ESTIMATES}
        totalSteps={LONGEVITY_TOTAL_STEPS}
        unified
        transitionMs={1000}
      />

      <main className="flex-1 flex flex-col">
        <div className="w-full max-w-content mx-auto px-4 sm:px-6 py-8 flex-1">
          <form onSubmit={handleSubmit} className="animate-slide-up has-sticky-button">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <p className="text-sm font-semibold uppercase text-[#2F4B96] leading-[22px]">
                  One last thing
                </p>
                <h1 className="font-display text-[40px] leading-[54px] font-normal text-[#171717]">
                  We&apos;d love to know your name and the best number to reach you
                </h1>
                <p className="text-sm font-normal leading-5 text-[#171717] max-w-md mx-auto">
                  We&apos;ll use your name to personalize and your phone for
                  updates&mdash;secure and private
                </p>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                <Input
                  label="First name"
                  placeholder="First name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  error={errors.firstName}
                  autoComplete="given-name"
                />
                <Input
                  label="Last name"
                  placeholder="Last name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  error={errors.lastName}
                  autoComplete="family-name"
                />
              </div>

              {/* Phone Field */}
              <div className="max-w-lg mx-auto">
                <Input
                  label="Phone number"
                  type="tel"
                  placeholder="(555) 555-5555"
                  value={phone}
                  onChange={handlePhoneChange}
                  error={errors.phone}
                  autoComplete="tel"
                />
              </div>

              {/* Security badge */}
              <div className="flex items-center justify-center gap-2 text-neutral-500">
                <Lock className="w-4 h-4" />
                <span className="text-body-sm">Secured by Forbes.com</span>
              </div>

              {/* Legal Consent */}
              <div className="max-w-lg mx-auto border border-neutral-200 rounded-lg p-4">
                <p className="text-caption text-neutral-500 leading-relaxed">
                  By clicking Agree and Continue, I provide my electronic signature
                  and agree to receive marketing texts, calls, and emails using
                  automated technology and/or artificial or prerecorded voice
                  messages, even if my telephone number is currently listed on a
                  federal, state, internal, or corporate Do-Not-Call list, from
                  Forbes Advisor and Partners, and parties calling on their behalf. I
                  understand that my consent is not required as a condition of
                  purchase. I also agree to your{' '}
                  <a
                    href="#"
                    className="text-primary-700 hover:text-primary-750 underline"
                  >
                    Privacy Statement
                  </a>{' '}
                  and{' '}
                  <a
                    href="#"
                    className="text-primary-700 hover:text-primary-750 underline"
                  >
                    Terms and Conditions
                  </a>
                  .
                </p>
              </div>

              {/* CTA */}
              <StickyButtonContainer>
                <Button type="submit" fullWidth showTrailingIcon disabled={!isValid}>
                  Agree and continue
                </Button>
              </StickyButtonContainer>
            </div>
          </form>
        </div>
      </main>

      <TrustBadges variant="longevity" />
      <Footer />
    </div>
  )
}

export default PhoneConsentScreen
