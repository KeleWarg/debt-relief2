'use client'

import * as React from 'react'
import {
  LocationScreen,
  DebtTypeScreen,
  DidYouKnowScreen,
  DebtAmountScreen,
  IncomeScreen,
  ResultsPreviewScreen,
  DateOfBirthScreen,
  NameScreen,
  ProcessingScreen,
  DebtProfileScreen,
  EmailScreen,
  PhoneScreen,
  AddressScreen,
  PartnerMatchingScreen,
  ResultsPage,
} from '@/components/screens'
import type { FunnelData } from '@/types/funnel'

type FunnelStep =
  | 'location'
  | 'debtType'
  | 'didYouKnow'
  | 'debtAmount'
  | 'income'
  | 'resultsPreview'
  | 'dateOfBirth'
  | 'name'
  | 'processing'
  | 'debtProfile'
  | 'email'
  | 'phone'
  | 'address'
  | 'partnerMatching'
  | 'results'

const STEP_ORDER: FunnelStep[] = [
  'location',
  'debtType',
  'didYouKnow',
  'debtAmount',
  'income',
  'resultsPreview',
  'dateOfBirth',
  'name',
  'processing',
  'debtProfile',
  'email',
  'phone',
  'address',
  'partnerMatching',
  'results',
]

export default function Home() {
  const [currentStep, setCurrentStep] = React.useState<FunnelStep>('location')
  const [funnelData, setFunnelData] = React.useState<Partial<FunnelData>>({})

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [currentStep])

  const goToNextStep = () => {
    const idx = STEP_ORDER.indexOf(currentStep)
    if (idx < STEP_ORDER.length - 1) {
      setCurrentStep(STEP_ORDER[idx + 1])
    }
  }

  const goToPreviousStep = () => {
    const idx = STEP_ORDER.indexOf(currentStep)
    if (idx > 0) {
      setCurrentStep(STEP_ORDER[idx - 1])
    }
  }

  const update = (data: Partial<FunnelData>) => {
    setFunnelData((prev) => ({ ...prev, ...data }))
  }

  switch (currentStep) {
    case 'location':
      return (
        <LocationScreen
          initialValue={funnelData.state}
          onSubmit={(state) => { update({ state }); goToNextStep() }}
        />
      )
    case 'debtType':
      return (
        <DebtTypeScreen
          initialValue={funnelData.debtType}
          onBack={goToPreviousStep}
          onSubmit={(debtType) => { update({ debtType }); goToNextStep() }}
        />
      )
    case 'didYouKnow':
      return (
        <DidYouKnowScreen
          onBack={goToPreviousStep}
          onContinue={goToNextStep}
        />
      )
    case 'debtAmount':
      return (
        <DebtAmountScreen
          initialValue={funnelData.debtAmount}
          onBack={goToPreviousStep}
          onSubmit={(debtAmount) => { update({ debtAmount }); goToNextStep() }}
        />
      )
    case 'income':
      return (
        <IncomeScreen
          initialValue={funnelData.income}
          onBack={goToPreviousStep}
          onSubmit={(income) => { update({ income }); goToNextStep() }}
        />
      )
    case 'resultsPreview':
      return (
        <ResultsPreviewScreen
          debtAmount={funnelData.debtAmount ?? 20000}
          onBack={goToPreviousStep}
          onContinue={goToNextStep}
        />
      )
    case 'dateOfBirth':
      return (
        <DateOfBirthScreen
          initialValue={funnelData.dateOfBirth}
          onBack={goToPreviousStep}
          onSubmit={(dateOfBirth) => { update({ dateOfBirth }); goToNextStep() }}
        />
      )
    case 'name':
      return (
        <NameScreen
          initialFirstName={funnelData.firstName}
          initialLastName={funnelData.lastName}
          onBack={goToPreviousStep}
          onSubmit={(firstName, lastName) => { update({ firstName, lastName }); goToNextStep() }}
        />
      )
    case 'processing':
      return (
        <ProcessingScreen
          onComplete={goToNextStep}
        />
      )
    case 'debtProfile':
      return (
        <DebtProfileScreen
          firstName={funnelData.firstName ?? 'Friend'}
          debtAmount={funnelData.debtAmount ?? 20000}
          onBack={goToPreviousStep}
          onContinue={goToNextStep}
        />
      )
    case 'email':
      return (
        <EmailScreen
          initialValue={funnelData.email}
          onBack={goToPreviousStep}
          onSubmit={(email) => { update({ email }); goToNextStep() }}
        />
      )
    case 'phone':
      return (
        <PhoneScreen
          initialValue={funnelData.phone}
          onBack={goToPreviousStep}
          onSubmit={(phone) => { update({ phone }); goToNextStep() }}
        />
      )
    case 'address':
      return (
        <AddressScreen
          initialValues={{
            line1: funnelData.addressLine1,
            line2: funnelData.addressLine2,
            zipCode: funnelData.zipCode,
          }}
          onBack={goToPreviousStep}
          onSubmit={(address) => {
            update({
              addressLine1: address.line1,
              addressLine2: address.line2,
              zipCode: address.zipCode,
            })
            goToNextStep()
          }}
        />
      )
    case 'partnerMatching':
      return (
        <PartnerMatchingScreen
          onComplete={goToNextStep}
        />
      )
    case 'results':
      return (
        <ResultsPage
          funnelData={funnelData as FunnelData}
        />
      )
    default:
      return null
  }
}
