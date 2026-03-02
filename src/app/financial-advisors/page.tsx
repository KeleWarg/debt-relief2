'use client'

import * as React from 'react'
import { MotivationScreen, AffirmationMoment, IncomeRangeScreen, SavingsRangeScreen, ObjectivesScreen, SavingsInterstitialScreen, GrowthHorizonScreen, NewSpecialtiesScreen, MaritalScreen, HomeownershipScreen, ZipCodeScreen, StateConfirmationScreen, AdvisorRelationshipScreen, EmailWithReviewScreen, NamePhoneWithReviewScreen } from '@/components/fa-screens'
import { getStateFromZip } from '@/lib/zip-lookup'
import type { FAFunnelData, MotivationDriver, AgeRange, IncomeRange, SavingsRange, InvestmentObjective, RelationshipPreference } from '@/types/fa-funnel'
import { Header } from '@/components/layout/Header'
import { FAProgressBar } from '@/components/fa-screens/FAProgressBar'
import { cn } from '@/lib/utils'

type Step = 'motivation' | 'affirmation' | 'income' | 'savings' | 'objectives' | 'savingsInterstitial' | 'growthHorizon' | 'specialties' | 'marital' | 'home' | 'zip' | 'stateConfirmation' | 'relationship' | 'email' | 'namePhone'

const STEP_TO_PROGRESS: Record<Step, string> = {
  motivation: 'age',
  affirmation: 'affirmation',
  income: 'income',
  savings: 'savings',
  objectives: 'objectives',
  savingsInterstitial: 'savingsInterstitial',
  growthHorizon: 'growthHorizon',
  specialties: 'specialties',
  marital: 'married',
  home: 'home',
  zip: 'zipCode',
  stateConfirmation: 'stateConfirmation',
  relationship: 'relationship',
  email: 'email',
  namePhone: 'namePhone',
}

export default function FinancialAdvisorsPage() {
  const [funnelData, setFunnelData] = React.useState<FAFunnelData>({})
  const [step, setStep] = React.useState<Step>('motivation')
  const [motivationPhase, setMotivationPhase] = React.useState<'motivation' | 'age'>('motivation')

  const update = (data: Partial<FAFunnelData>) => {
    setFunnelData((prev) => ({ ...prev, ...data }))
  }

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  const isHero = step === 'motivation' && motivationPhase === 'motivation'
  const isDarkStep = step === 'savingsInterstitial'

  const handleBack = React.useCallback(() => {
    switch (step) {
      case 'motivation': update({ motivationDriver: undefined, ageRange: undefined }); setMotivationPhase('motivation'); break
      case 'affirmation': setStep('motivation'); break
      case 'income': setStep('affirmation'); break
      case 'savings': setStep('income'); break
      case 'objectives': setStep('savings'); break
      case 'savingsInterstitial': setStep('objectives'); break
      case 'growthHorizon': setStep('savingsInterstitial'); break
      case 'specialties': setStep('growthHorizon'); break
      case 'marital': setStep('specialties'); break
      case 'home': setStep('marital'); break
      case 'zip': setStep('home'); break
      case 'stateConfirmation': setStep('zip'); break
      case 'relationship': setStep('stateConfirmation'); break
      case 'email': setStep('relationship'); break
      case 'namePhone': funnelData.email ? setStep('email') : setStep('relationship'); break
    }
  }, [step, funnelData.email])


  if (isHero) {
    return (
      <div className="h-screen flex flex-col bg-white overflow-hidden relative">
        <Header className="sticky top-0 z-50 bg-white" />
        <div className="flex-1 min-h-0">
          <MotivationScreen
            key="hero"
            initialMotivation={funnelData.motivationDriver}
            initialAge={funnelData.ageRange}
            onPhaseChange={setMotivationPhase}
            onMotivationSelect={(motivation) => update({ motivationDriver: motivation })}
            onSubmit={(motivation: MotivationDriver, age: AgeRange) => {
              update({ motivationDriver: motivation, ageRange: age })
              setStep('affirmation')
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-page-gradient overflow-auto">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className={cn('sticky top-[56px] z-40', isDarkStep ? 'bg-transparent' : 'bg-white')}>
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <FAProgressBar stepName={STEP_TO_PROGRESS[step]} onBack={handleBack} dark={isDarkStep} />
        </div>
      </div>

      <div className="flex-1 min-h-0 pb-24 sm:pb-0">
        {step === 'motivation' && (
          <MotivationScreen
            key="form"
            initialMotivation={funnelData.motivationDriver}
            initialAge={funnelData.ageRange}
            onPhaseChange={setMotivationPhase}
            onSubmit={(motivation: MotivationDriver, age: AgeRange) => {
              update({ motivationDriver: motivation, ageRange: age })
              setStep('affirmation')
            }}
          />
        )}

        {step === 'affirmation' && (
          <AffirmationMoment
            motivationDriver={funnelData.motivationDriver}
            ageRange={funnelData.ageRange}
            onBack={() => setStep('motivation')}
            onNext={() => setStep('income')}
          />
        )}

        {step === 'income' && (
          <IncomeRangeScreen
            initialValue={funnelData.incomeRange}
            motivationDriver={funnelData.motivationDriver}
            onBack={() => setStep('affirmation')}
            onSubmit={(value: IncomeRange) => {
              update({ incomeRange: value })
              setStep('savings')
            }}
          />
        )}

        {step === 'savings' && (
          <SavingsRangeScreen
            initialValue={funnelData.savingsRange}
            motivationDriver={funnelData.motivationDriver}
            onBack={() => setStep('income')}
            onSubmit={(value: SavingsRange) => {
              update({ savingsRange: value })
              setStep('objectives')
            }}
          />
        )}

        {step === 'objectives' && (
          <ObjectivesScreen
            initialValue={funnelData.investmentObjective}
            motivationDriver={funnelData.motivationDriver}
            ageRange={funnelData.ageRange}
            savingsRange={funnelData.savingsRange}
            onBack={() => setStep('savings')}
            onSubmit={(value: InvestmentObjective) => {
              update({ investmentObjective: value })
              setStep('savingsInterstitial')
            }}
          />
        )}

        {step === 'savingsInterstitial' && (
          <SavingsInterstitialScreen
            savingsRange={funnelData.savingsRange}
            motivationDriver={funnelData.motivationDriver}
            ageRange={funnelData.ageRange}
            incomeRange={funnelData.incomeRange}
            onBack={() => setStep('objectives')}
            onNext={() => setStep('growthHorizon')}
          />
        )}

        {step === 'growthHorizon' && (
          <GrowthHorizonScreen
            motivationDriver={funnelData.motivationDriver}
            ageRange={funnelData.ageRange}
            incomeRange={funnelData.incomeRange}
            savingsRange={funnelData.savingsRange}
            investmentObjective={funnelData.investmentObjective}
            onBack={() => setStep('objectives')}
            onNext={(email?: string) => {
              if (email) update({ savedEmail: email } as Partial<FAFunnelData>)
              setStep('specialties')
            }}
          />
        )}

        {step === 'specialties' && (
          <NewSpecialtiesScreen
            motivationDriver={funnelData.motivationDriver}
            ageRange={funnelData.ageRange}
            savingsRange={funnelData.savingsRange}
            incomeRange={funnelData.incomeRange}
            funnelData={funnelData}
            onBack={() => setStep('growthHorizon')}
            onSubmit={(specialties: string[]) => {
              update({ specialties })
              setStep('marital')
            }}
          />
        )}

        {step === 'marital' && (
          <MaritalScreen
            initialValue={funnelData.maritalStatus}
            motivationDriver={funnelData.motivationDriver}
            funnelData={funnelData}
            onBack={() => setStep('specialties')}
            onSubmit={(value: string) => {
              update({ maritalStatus: value as FAFunnelData['maritalStatus'] })
              setStep('home')
            }}
          />
        )}

        {step === 'home' && (
          <HomeownershipScreen
            maritalStatus={funnelData.maritalStatus}
            motivationDriver={funnelData.motivationDriver}
            funnelData={funnelData}
            onBack={() => setStep('marital')}
            onSubmit={(value: string) => {
              update({ homeownership: value as FAFunnelData['homeownership'] })
              setStep('zip')
            }}
          />
        )}

        {step === 'zip' && (
          <ZipCodeScreen
            initialValue={funnelData.zipCode}
            homeownership={funnelData.homeownership}
            motivationDriver={funnelData.motivationDriver}
            funnelData={funnelData}
            onBack={() => setStep('home')}
            onSubmit={(zip: string, derivedState?: string) => {
              update({ zipCode: zip, state: derivedState })
              setStep('stateConfirmation')
            }}
          />
        )}

        {step === 'stateConfirmation' && (() => {
          const stateInfo = funnelData.zipCode ? getStateFromZip(funnelData.zipCode) : null
          return (
            <StateConfirmationScreen
              stateAbbr={stateInfo?.abbr}
              stateName={stateInfo?.name}
              motivationDriver={funnelData.motivationDriver}
              onBack={() => setStep('zip')}
              onNext={() => setStep('relationship')}
            />
          )
        })()}

        {step === 'relationship' && (() => {
          const stateInfo = funnelData.zipCode ? getStateFromZip(funnelData.zipCode) : null
          return (
            <AdvisorRelationshipScreen
              motivationDriver={funnelData.motivationDriver}
              stateName={stateInfo?.name}
              savedEmail={funnelData.savedEmail ?? funnelData.email}
              funnelData={funnelData}
              onBack={() => setStep('stateConfirmation')}
              onSubmit={(data: { preference: RelationshipPreference; phone?: string; email?: string; tcpaConsent?: boolean }) => {
                const updates: Partial<FAFunnelData> = {
                  relationshipPreference: data.preference,
                }
                if (data.phone) updates.phone = data.phone
                if (data.email) updates.email = data.email
                if (data.tcpaConsent) {
                  updates.tcpaConsent = true
                  updates.tcpaConsentTimestamp = new Date().toISOString()
                }
                update(updates)

                const hasEmail = !!(data.email || funnelData.email || funnelData.savedEmail)
                const hasPhone = !!data.phone

                if (hasEmail && hasPhone) {
                  // TODO: advance to Screen B / loading
                  setStep('namePhone')
                } else if (hasEmail) {
                  setStep('namePhone')
                } else if (hasPhone) {
                  setStep('email')
                } else {
                  setStep('email')
                }
              }}
            />
          )
        })()}

        {step === 'email' && (
          <EmailWithReviewScreen
            motivationDriver={funnelData.motivationDriver}
            relationshipPreference={funnelData.relationshipPreference}
            stateName={funnelData.zipCode ? getStateFromZip(funnelData.zipCode)?.name : undefined}
            savedEmail={funnelData.savedEmail}
            hasTcpaConsent={funnelData.tcpaConsent}
            funnelData={funnelData}
            onBack={() => setStep('relationship')}
            onSubmit={(email: string) => {
              update({ email })
              if (funnelData.phone) {
                // TODO: advance to Screen B / loading
                setStep('namePhone')
              } else {
                setStep('namePhone')
              }
            }}
          />
        )}

        {step === 'namePhone' && (
          <NamePhoneWithReviewScreen
            motivationDriver={funnelData.motivationDriver}
            existingPhone={funnelData.phone}
            hasTcpaConsent={funnelData.tcpaConsent}
            hasEmailFromPrevious={!!(funnelData.savedEmail && !funnelData.email)}
            stateName={funnelData.zipCode ? getStateFromZip(funnelData.zipCode)?.name : undefined}
            funnelData={funnelData}
            onBack={() => funnelData.email ? setStep('email') : setStep('relationship')}
            onSubmit={(data: { firstName: string; lastName: string; phone: string; tcpaConsent: boolean }) => {
              update({
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                tcpaConsent: data.tcpaConsent,
                tcpaConsentTimestamp: data.tcpaConsent ? new Date().toISOString() : undefined,
              })
              // TODO: advance to Screen B / loading
            }}
          />
        )}
      </div>

    </div>
  )
}
