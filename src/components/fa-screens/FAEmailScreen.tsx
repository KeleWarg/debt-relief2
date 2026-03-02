'use client'

import * as React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FAProgressBar } from './FAProgressBar'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import {
  FA_STEP_NUMBER,
  MOTIVATION_LABELS,
  getAgeLabel,
  getIncomeLabel,
  getObjectiveLabel,
  getAssetsLabel,
  EMAIL_SUB_COPY,
} from '@/types/fa-funnel'
import type { FAFunnelData, MotivationDriver } from '@/types/fa-funnel'

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type EmailForm = z.infer<typeof emailSchema>

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
        <span className="text-xs">Secure · Private · No credit impact</span>
      </div>
    </div>
  )
}

interface FAEmailScreenProps {
  initialValue?: string
  funnelData: FAFunnelData
  hasSavedEmail?: boolean
  hasTcpaConsent?: boolean
  onBack?: () => void
  onSubmit?: (email: string) => void
  onSkip?: () => void
}

export function FAEmailScreen({
  initialValue,
  funnelData,
  hasSavedEmail = false,
  hasTcpaConsent = false,
  onBack,
  onSubmit,
  onSkip,
}: FAEmailScreenProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: initialValue ?? funnelData.savedEmail ?? '' },
  })

  // Mode a: hasTcpaConsent && hasSavedEmail → skip immediately
  React.useEffect(() => {
    if (hasTcpaConsent && hasSavedEmail) {
      onSkip?.()
    }
  }, [hasTcpaConsent, hasSavedEmail, onSkip])

  const onFormSubmit = (data: EmailForm) => {
    onSubmit?.(data.email)
  }

  // Mode a: skip (render nothing while effect runs)
  if (hasTcpaConsent && hasSavedEmail) {
    return null
  }

  // Mode b: hasSavedEmail && !hasTcpaConsent → pre-fill, confirm
  if (hasSavedEmail && !hasTcpaConsent) {
    const savedEmail = funnelData.savedEmail ?? initialValue ?? ''
    return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8 flex items-center">
        <FAProgressBar currentStep={FA_STEP_NUMBER.email} onBack={onBack} />
        <div className="animate-slide-up has-sticky-button mt-8">
          <div className="max-w-content mx-auto text-center">
            <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 mb-3">
              Is this still the best email for your advisor matches?
            </h1>
          </div>
          <div className="max-w-content mx-auto">
            <p className="text-body text-neutral-800 font-medium mb-2">{savedEmail}</p>
            <p className="text-body-sm text-neutral-500 mb-6">
              We respect your privacy. Your email is only used to deliver your advisor recommendations.
            </p>

            <StickyButtonContainer>
              <Button
                fullWidth
                showTrailingIcon
                onClick={() => onSubmit?.(savedEmail)}
              >
                Continue
              </Button>
            </StickyButtonContainer>
          </div>
        </div>
      </div>
    )
  }

  // Mode c: Standard — Context Form layout
  const motivationDriver = funnelData.motivationDriver ?? 'plan_review'
  const subCopy = EMAIL_SUB_COPY[motivationDriver as MotivationDriver]

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8 flex items-center">
      <FAProgressBar currentStep={FA_STEP_NUMBER.email} onBack={onBack} />
          <div className="animate-slide-up has-sticky-button mt-8">
            <div className="max-w-content mx-auto text-center">
              <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 mb-3">
                Where can we send your personalized recommendation?
              </h1>
              <p className="text-body text-neutral-500 mb-6">
                {subCopy}
              </p>
            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <ContextCard funnelData={funnelData} />

              <div>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <div className="mb-4">
                    <Input
                      label="Email address"
                      type="email"
                      placeholder="you@example.com"
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>

                  <p className="text-body-sm text-neutral-500 mb-6">
                    We respect your privacy. Your email is only used to deliver your advisor recommendations.
                  </p>

                  <StickyButtonContainer>
                    <Button type="submit" fullWidth showTrailingIcon>
                      Continue
                    </Button>
                  </StickyButtonContainer>
                </form>
              </div>
            </div>
          </div>
    </div>
  )
}

export default FAEmailScreen
