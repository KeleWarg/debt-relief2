'use client'

import * as React from 'react'
import {
  AgeScreen,
  GenderScreen,
  HealthPrioritiesScreen,
  TreatmentPreferenceScreen,
  TravelWillingnessScreen,
  OngoingSupportScreen,
  BudgetScreen,
  ZipCodeScreen,
  EmailScreen,
  LongevityResultsScreen,
} from '@/components/longevity-screens'
import type {
  LongevityFunnelData,
  AgeRangeOption,
  GenderOption,
  HealthPriorityOption,
  TreatmentPreferenceOption,
  TravelWillingnessOption,
  SupportOption,
  BudgetOption,
} from '@/types/longevity'

/**
 * Longevity funnel steps — matches the live Forbes Health journey:
 * 
 * Core flow (all users):
 * 1. Age (10%)  →  2. Gender (17%)  →  3. Health Priorities (25%)
 * 4. Treatment (33%)  →  5. Travel (42%)  →  6. Support (50%)  →  7. Budget (58%)
 * 
 * Branching after budget:
 * - "Less than $250/mo" → Results (Superpower direct match)
 * - "$250-$500/mo" or "$500+/mo" → ZIP (67%) → Email (75%) → Results
 */
type LongevityFunnelStep =
  | 'age'
  | 'gender'
  | 'healthPriorities'
  | 'treatmentPreference'
  | 'travelWillingness'
  | 'support'
  | 'budget'
  | 'zipCode'
  | 'email'
  | 'results'

const CORE_STEPS: LongevityFunnelStep[] = [
  'age',
  'gender',
  'healthPriorities',
  'treatmentPreference',
  'travelWillingness',
  'support',
  'budget',
]

const EXTENDED_STEPS: LongevityFunnelStep[] = [
  'zipCode',
  'email',
]

function getStepOrder(budget?: BudgetOption): LongevityFunnelStep[] {
  if (budget === 'under-250') {
    return [...CORE_STEPS, 'results']
  }
  return [...CORE_STEPS, ...EXTENDED_STEPS, 'results']
}

export default function LongevityPage() {
  const [currentStep, setCurrentStep] = React.useState<LongevityFunnelStep>('age')
  const [funnelData, setFunnelData] = React.useState<LongevityFunnelData>({})

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [currentStep])

  const stepOrder = getStepOrder(funnelData.budget)

  const goToNextStep = () => {
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1])
    }
  }

  const goToPreviousStep = () => {
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1])
    }
  }

  const updateFunnelData = (data: Partial<LongevityFunnelData>) => {
    setFunnelData((prev) => ({ ...prev, ...data }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'age':
        return (
          <AgeScreen
            initialValue={funnelData.ageRange}
            onSubmit={(ageRange: AgeRangeOption) => {
              updateFunnelData({ ageRange })
              goToNextStep()
            }}
          />
        )

      case 'gender':
        return (
          <GenderScreen
            initialValue={funnelData.gender}
            onBack={goToPreviousStep}
            onSubmit={(gender: GenderOption) => {
              updateFunnelData({ gender })
              goToNextStep()
            }}
          />
        )

      case 'healthPriorities':
        return (
          <HealthPrioritiesScreen
            initialValue={funnelData.healthPriorities}
            onBack={goToPreviousStep}
            onSubmit={(healthPriorities: HealthPriorityOption[]) => {
              updateFunnelData({ healthPriorities })
              goToNextStep()
            }}
          />
        )

      case 'treatmentPreference':
        return (
          <TreatmentPreferenceScreen
            initialValue={funnelData.treatmentPreference}
            onBack={goToPreviousStep}
            onSubmit={(treatmentPreference: TreatmentPreferenceOption) => {
              updateFunnelData({ treatmentPreference })
              goToNextStep()
            }}
          />
        )

      case 'travelWillingness':
        return (
          <TravelWillingnessScreen
            initialValue={funnelData.travelWillingness}
            onBack={goToPreviousStep}
            onSubmit={(travelWillingness: TravelWillingnessOption) => {
              updateFunnelData({ travelWillingness })
              goToNextStep()
            }}
          />
        )

      case 'support':
        return (
          <OngoingSupportScreen
            initialValue={funnelData.support}
            onBack={goToPreviousStep}
            onSubmit={(support: SupportOption) => {
              updateFunnelData({ support })
              goToNextStep()
            }}
          />
        )

      case 'budget':
        return (
          <BudgetScreen
            initialValue={funnelData.budget}
            onBack={goToPreviousStep}
            onSubmit={(budget: BudgetOption) => {
              updateFunnelData({ budget })
              // Branching: low budget goes straight to results
              if (budget === 'under-250') {
                setCurrentStep('results')
              } else {
                setCurrentStep('zipCode')
              }
            }}
          />
        )

      case 'zipCode':
        return (
          <ZipCodeScreen
            initialValue={funnelData.zipCode}
            onBack={goToPreviousStep}
            onSubmit={(zipCode: string) => {
              updateFunnelData({ zipCode })
              goToNextStep()
            }}
          />
        )

      case 'email':
        return (
          <EmailScreen
            initialValue={funnelData.email}
            onBack={goToPreviousStep}
            onSubmit={(email: string) => {
              updateFunnelData({ email })
              goToNextStep()
            }}
          />
        )

      case 'results':
        return (
          <LongevityResultsScreen
            budget={funnelData.budget}
          />
        )

      default:
        return null
    }
  }

  return renderStep()
}
