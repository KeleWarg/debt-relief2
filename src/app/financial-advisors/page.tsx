'use client'

import * as React from 'react'
import { MotivationScreen, AffirmationMoment, IncomeRangeScreen, SavingsRangeScreen, ObjectivesScreen, GrowthHorizonScreen, NewSpecialtiesScreen, MaritalScreen, HomeownershipScreen, ZipCodeScreen, AdvisorRelationshipScreen, EmailWithReviewScreen, NamePhoneWithReviewScreen, ScreenB } from '@/components/fa-screens'
import { getStateFromZip } from '@/lib/zip-lookup'
import type { FAFunnelData, MotivationDriver, AgeRange, IncomeRange, SavingsRange, InvestmentObjective, RelationshipPreference } from '@/types/fa-funnel'
import { Header } from '@/components/layout/Header'
import { FAProgressBar } from '@/components/fa-screens/FAProgressBar'
import { cn } from '@/lib/utils'

type Step = 'motivation' | 'affirmation' | 'income' | 'savings' | 'objectives' | 'growthHorizon' | 'specialties' | 'marital' | 'home' | 'zip' | 'relationship' | 'growthHorizon2' | 'email' | 'namePhone' | 'growthHorizon3' | 'screenB'

const STEP_TO_PROGRESS: Record<Step, string> = {
  motivation: 'age',
  affirmation: 'affirmation',
  income: 'income',
  savings: 'savings',
  objectives: 'objectives',
  growthHorizon: 'growthHorizon',
  specialties: 'specialties',
  marital: 'married',
  home: 'home',
  zip: 'zipCode',
  relationship: 'relationship',
  growthHorizon2: 'growthHorizon2',
  email: 'email',
  namePhone: 'namePhone',
  growthHorizon3: 'growthHorizon2',
  screenB: 'namePhone',
}

export default function FinancialAdvisorsPage() {
  const [funnelData, setFunnelData] = React.useState<FAFunnelData>({})
  const [step, setStep] = React.useState<Step>('motivation')
  const [motivationPhase, setMotivationPhase] = React.useState<'motivation' | 'age'>('motivation')
  const [isModalFastTrack, setIsModalFastTrack] = React.useState(false)

  const update = (data: Partial<FAFunnelData>) => {
    setFunnelData((prev) => ({ ...prev, ...data }))
  }

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  const isHero = step === 'motivation' && motivationPhase === 'motivation'
  const isDarkStep = step === 'growthHorizon' || step === 'growthHorizon2' || step === 'growthHorizon3'

  const handleBack = React.useCallback(() => {
    switch (step) {
      case 'motivation': update({ motivationDriver: undefined, ageRange: undefined }); setMotivationPhase('motivation'); break
      case 'affirmation': setStep('motivation'); break
      case 'income': setStep('affirmation'); break
      case 'savings': setStep('income'); break
      case 'objectives': setStep('savings'); break
      case 'growthHorizon': setStep('objectives'); break
      case 'specialties': setStep('growthHorizon'); break
      case 'marital': setStep('specialties'); break
      case 'home': setStep('marital'); break
      case 'zip': setStep('home'); break
      case 'relationship': setStep('zip'); break
      case 'growthHorizon2': setStep('relationship'); break
      case 'email': setStep('relationship'); break
      case 'namePhone':
        if (isModalFastTrack) {
          setStep('relationship')
        } else if (funnelData.email) {
          setStep('email')
        } else {
          setStep('growthHorizon2')
        }
        break
      case 'growthHorizon3': setStep('namePhone'); break
      case 'screenB': setStep('namePhone'); break
    }
  }, [step, funnelData.email, isModalFastTrack])
  const loaderCompletionStep: Step | null =
    step === 'growthHorizon2' ? 'email' : step === 'growthHorizon3' ? 'screenB' : null



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
          <FAProgressBar
            stepName={STEP_TO_PROGRESS[step]}
            onBack={handleBack}
            dark={isDarkStep}
            loaderDuration={loaderCompletionStep ? 10000 : undefined}
            onLoaderComplete={loaderCompletionStep ? () => setStep(loaderCompletionStep) : undefined}
          />
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
            onSubmit={(value: SavingsRange, amount: number) => {
              update({ savingsRange: value, savingsAmount: amount })
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
              setStep('growthHorizon')
            }}
          />
        )}

        {step === 'growthHorizon' && (
          <GrowthHorizonScreen
            variant="original"
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
              setStep('relationship')
            }}
          />
        )}

        {step === 'relationship' && (() => {
          const stateInfo = funnelData.zipCode ? getStateFromZip(funnelData.zipCode) : null
          return (
            <AdvisorRelationshipScreen
              motivationDriver={funnelData.motivationDriver}
              stateName={stateInfo?.name}
              savedEmail={funnelData.savedEmail ?? funnelData.email}
              funnelData={funnelData}
              onBack={() => setStep('zip')}
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

                const hasEmail = Boolean(data.email || funnelData.email || funnelData.savedEmail)
                const hasPhone = Boolean(data.phone || funnelData.phone)
                const canSkipToName = hasEmail && hasPhone

                setIsModalFastTrack(canSkipToName)
                setStep(canSkipToName ? 'namePhone' : 'growthHorizon2')
              }}
            />
          )
        })()}

        {step === 'growthHorizon2' && (
          <GrowthHorizonScreen
            variant="duplicate"
            motivationDriver={funnelData.motivationDriver}
            ageRange={funnelData.ageRange}
            incomeRange={funnelData.incomeRange}
            savingsRange={funnelData.savingsRange}
            investmentObjective={funnelData.investmentObjective}
            showSaveProgressModal={false}
            onBack={() => setStep('relationship')}
            onNext={(email?: string) => {
              if (email) update({ savedEmail: email } as Partial<FAFunnelData>)
              setStep('email')
            }}
          />
        )}

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
            nameOnlyMode={isModalFastTrack}
            hasTcpaConsent={funnelData.tcpaConsent}
            hasEmailFromPrevious={!!(funnelData.savedEmail && !funnelData.email)}
            stateName={funnelData.zipCode ? getStateFromZip(funnelData.zipCode)?.name : undefined}
            funnelData={funnelData}
            onBack={() => {
              if (isModalFastTrack) {
                setStep('relationship')
                return
              }
              funnelData.email ? setStep('email') : setStep('growthHorizon2')
            }}
            onSubmit={(data: { firstName: string; lastName: string; phone: string; tcpaConsent: boolean }) => {
              update({
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                tcpaConsent: data.tcpaConsent,
                tcpaConsentTimestamp: data.tcpaConsent ? new Date().toISOString() : undefined,
              })
              setStep(isModalFastTrack ? 'growthHorizon3' : 'screenB')
            }}
          />
        )}

        {step === 'growthHorizon3' && (
          <GrowthHorizonScreen
            variant="duplicate"
            motivationDriver={funnelData.motivationDriver}
            ageRange={funnelData.ageRange}
            incomeRange={funnelData.incomeRange}
            savingsRange={funnelData.savingsRange}
            investmentObjective={funnelData.investmentObjective}
            showSaveProgressModal={false}
            onBack={() => setStep('namePhone')}
          />
        )}

        {step === 'screenB' && (
          <ScreenB funnelData={funnelData} onBack={() => setStep('namePhone')} />
        )}
      </div>

    </div>
  )
}
