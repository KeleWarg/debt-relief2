'use client'

import * as React from 'react'
import {
  AccountTypeScreen,
  MinimumBalanceScreen,
  AccountConsiderationsScreen,
  BankingServicesScreen,
  LocationScreen,
  PersonalInfoScreen,
} from '@/components/bank-screens'
import type {
  BankAccountType,
  BankConsideration,
  BankFunnelData,
  BankingService,
} from '@/types/banks'

type BankFunnelStep =
  | 'accountType'
  | 'minimumBalance'
  | 'considerations'
  | 'bankingServices'
  | 'location'
  | 'personalInfo'

const STEP_ORDER: BankFunnelStep[] = [
  'accountType',
  'minimumBalance',
  'considerations',
  'bankingServices',
  'location',
  'personalInfo',
]

export default function BanksPage() {
  const [currentStep, setCurrentStep] = React.useState<BankFunnelStep>('accountType')
  const [funnelData, setFunnelData] = React.useState<BankFunnelData>({})

  const updateFunnelData = (data: Partial<BankFunnelData>) => {
    setFunnelData((prev) => ({ ...prev, ...data }))
  }

  const goToStep = (step: BankFunnelStep) => {
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToNextStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    if (currentIndex < STEP_ORDER.length - 1) {
      goToStep(STEP_ORDER[currentIndex + 1])
    }
  }

  const goToPrevStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    if (currentIndex > 0) {
      goToStep(STEP_ORDER[currentIndex - 1])
    }
  }

  const getAnsweredCount = (): number => {
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    return currentIndex
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'accountType':
        return (
          <AccountTypeScreen
            initialValue={funnelData.accountType}
            onSubmit={(accountType: BankAccountType) => {
              updateFunnelData({ accountType })
              goToNextStep()
            }}
          />
        )

      case 'minimumBalance':
        return (
          <MinimumBalanceScreen
            answeredCount={getAnsweredCount()}
            initialValue={funnelData.depositAmount}
            onBack={goToPrevStep}
            onSubmit={(depositAmount: string) => {
              updateFunnelData({ depositAmount })
              goToNextStep()
            }}
          />
        )

      case 'considerations':
        return (
          <AccountConsiderationsScreen
            answeredCount={getAnsweredCount()}
            initialValue={funnelData.consideration}
            onBack={goToPrevStep}
            onSubmit={(consideration: BankConsideration) => {
              updateFunnelData({ consideration })
              goToNextStep()
            }}
          />
        )

      case 'bankingServices':
        return (
          <BankingServicesScreen
            answeredCount={getAnsweredCount()}
            initialValue={funnelData.interestedServices}
            onBack={goToPrevStep}
            onSubmit={(interestedServices: BankingService[]) => {
              updateFunnelData({ interestedServices })
              goToNextStep()
            }}
            onSkip={goToNextStep}
          />
        )

      case 'location':
        return (
          <LocationScreen
            answeredCount={getAnsweredCount()}
            initialValue={funnelData.zipCode}
            onBack={goToPrevStep}
            onSubmit={(zipCode: string) => {
              updateFunnelData({ zipCode })
              goToNextStep()
            }}
          />
        )

      case 'personalInfo':
        return (
          <PersonalInfoScreen
            answeredCount={getAnsweredCount()}
            initialEmail={funnelData.email}
            onBack={goToPrevStep}
            onSubmit={({ email, agreedToTerms }) => {
              updateFunnelData({ email, agreedToTerms })
              // Final step -- this would normally redirect to results
              // eslint-disable-next-line no-console
              console.log('Funnel complete:', { ...funnelData, email, agreedToTerms })
              alert('Funnel complete! Check console for data.')
            }}
          />
        )

      default:
        return null
    }
  }

  return renderStep()
}
