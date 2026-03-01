'use client'

import * as React from 'react'
import { Shield, Check, ChevronDown, CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FAProgressBar } from './FAProgressBar'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import { Checkbox } from '@/components/ui/Checkbox'
import { formatPhoneNumber } from '@/lib/utils'
import {
  FA_STEP_NUMBER,
  MOTIVATION_LABELS,
  getAgeLabel,
  getObjectiveLabel,
  getIncomeLabel,
  getAssetsLabel,
  NAME_PHONE_SUB_COPY,
} from '@/types/fa-funnel'
import type { FAFunnelData, MotivationDriver } from '@/types/fa-funnel'

const namePhoneSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').regex(/^[a-zA-Z\s'-]+$/, 'Letters only'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').regex(/^[a-zA-Z\s'-]+$/, 'Letters only'),
  phone: z.string().optional(),
})

type NamePhoneForm = z.infer<typeof namePhoneSchema>

function ContextCard({ funnelData }: { funnelData: FAFunnelData }) {
  const motivationLabel = funnelData.motivationDriver
    ? MOTIVATION_LABELS[funnelData.motivationDriver]
    : ''

  const rows = [
    { label: 'Your priority', value: motivationLabel },
    { label: 'Age range', value: getAgeLabel(funnelData.ageRange) },
    { label: 'Objectives', value: getObjectiveLabel(funnelData.investmentObjective) },
    { label: 'Income range', value: getIncomeLabel(funnelData.incomeRange) },
    { label: 'Total assets', value: getAssetsLabel(funnelData.totalAssets) },
  ].filter((r) => r.value)

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-200">
      <p className="text-xs uppercase tracking-wide text-neutral-500 mb-4">Based on what you told us</p>

      <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-200 mb-4">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between items-center px-4 py-2.5">
            <span className="text-xs text-neutral-500">{row.label}</span>
            <span className="text-xs font-semibold text-neutral-900">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-primary-300/50 rounded-lg p-3 mb-4">
        <p className="text-primary-700 text-sm font-medium flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" />
          Matches multiple advisor profiles
        </p>
        <p className="text-xs text-neutral-600 mt-0.5">Your profile is a strong fit for advisor matching.</p>
      </div>

      <div className="flex flex-wrap gap-3 text-neutral-500">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          <span className="text-xs">Secure & Private</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5" />
          <span className="text-xs">No credit impact</span>
        </div>
      </div>
    </div>
  )
}

interface NamePhoneScreenProps {
  initialFirstName?: string
  initialLastName?: string
  initialPhone?: string
  funnelData: FAFunnelData
  hasTcpaConsent?: boolean
  hasPhone?: boolean
  onBack?: () => void
  onSubmit?: (data: {
    firstName: string
    lastName: string
    phone?: string
    phoneConsent: boolean
  }) => void
}

export function NamePhoneScreen({
  initialFirstName,
  initialLastName,
  initialPhone,
  funnelData,
  hasTcpaConsent = false,
  hasPhone = false,
  onBack,
  onSubmit,
}: NamePhoneScreenProps) {
  const [consent, setConsent] = React.useState(false)
  const [termsExpanded, setTermsExpanded] = React.useState(false)

  const motivationDriver = funnelData.motivationDriver ?? 'plan_review'
  const subCopy = NAME_PHONE_SUB_COPY[motivationDriver as MotivationDriver]

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NamePhoneForm>({
    resolver: zodResolver(namePhoneSchema),
    defaultValues: {
      firstName: initialFirstName ?? '',
      lastName: initialLastName ?? '',
      phone: initialPhone ?? '',
    },
  })

  const phoneValue = watch('phone')

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setValue('phone', formatted)
  }

  const onFormSubmit = (data: NamePhoneForm) => {
    onSubmit?.({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone || undefined,
      phoneConsent: hasTcpaConsent ? true : consent,
    })
  }

  // Mode a: hasTcpaConsent && hasPhone → Name only
  const showPhone = !hasTcpaConsent || !hasPhone
  // Mode c only: Legal Consent Block
  const showLegalConsent = !hasTcpaConsent

  const headline =
    hasTcpaConsent && hasPhone
      ? "Last step — what's your name?"
      : hasTcpaConsent && !hasPhone
        ? "What's your name? Add your number if you'd like a call."
        : "What's your name and phone number?"

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 flex items-center">
          <FAProgressBar currentStep={FA_STEP_NUMBER.namePhone} onBack={onBack} />
          <div className="animate-slide-up has-sticky-button mt-8">
            <div className="max-w-content mx-auto text-center">
              <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 mb-3">
                {headline}
              </h1>
              <p className="text-body text-neutral-500 mb-6">
                {subCopy}
              </p>
            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <ContextCard funnelData={funnelData} />

              <div>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <Input
                      label="First name"
                      placeholder="First name"
                      error={errors.firstName?.message}
                      {...register('firstName')}
                    />
                    <Input
                      label="Last name"
                      placeholder="Last name"
                      error={errors.lastName?.message}
                      {...register('lastName')}
                    />
                  </div>

                  {showPhone && (
                    <>
                      <p className="text-body-sm text-neutral-500 mb-2">
                        Advisors typically connect by phone for a brief introductory call.
                      </p>
                      <div className="mb-6">
                        <Input
                          label={hasTcpaConsent && !hasPhone ? 'Phone (optional)' : 'Phone'}
                          type="tel"
                          placeholder="(555) 555-5555"
                          value={phoneValue ?? ''}
                          onChange={handlePhoneChange}
                          error={errors.phone?.message}
                        />
                      </div>
                    </>
                  )}

                  {!showPhone && <div className="mb-6" />}

                  {showLegalConsent && (
                    <div className="bg-neutral-100 rounded-xl p-4 mb-6">
                      <Checkbox
                        checked={consent}
                        onCheckedChange={(v) => setConsent(v === true)}
                        label={
                          <span className="text-sm text-neutral-800">
                            By continuing, you agree to be contacted by Forbes Advisor and partner advisors.{' '}
                            <button
                              type="button"
                              onClick={() => setTermsExpanded(!termsExpanded)}
                              className="text-primary-700 underline inline-flex items-center gap-0.5"
                            >
                              View full terms
                              <ChevronDown className={`w-3 h-3 transition-transform ${termsExpanded ? 'rotate-180' : ''}`} />
                            </button>
                          </span>
                        }
                      />
                      {termsExpanded && (
                        <div className="mt-3 pt-3 border-t border-neutral-200">
                          <p className="text-xs text-neutral-500 leading-relaxed">
                            By clicking &quot;See My Matches&quot; I provide my electronic signature and agree to
                            receive marketing texts, calls, and emails using automated technology and/or
                            artificial or prerecorded voice messages, even if my telephone number is currently
                            listed on a federal, state, internal, or corporate Do-Not-Call list, from Forbes
                            Advisor and Partners, and parties calling on their behalf. I understand that my
                            consent is not required as a condition of purchase. I also agree to your{' '}
                            <a href="#" className="text-primary-700 underline">Privacy Statement</a> and{' '}
                            <a href="#" className="text-primary-700 underline">Terms and Conditions</a>.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <StickyButtonContainer>
                    <Button
                      type="submit"
                      fullWidth
                      showTrailingIcon
                      disabled={showLegalConsent ? !consent : false}
                    >
                      See My Matches →
                    </Button>
                  </StickyButtonContainer>

                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-neutral-500 mt-4">
                    No spam, ever. · Unsubscribe anytime. · Your data is protected.
                  </div>
                </form>
              </div>
            </div>
          </div>
    </div>
  )
}

export default NamePhoneScreen
