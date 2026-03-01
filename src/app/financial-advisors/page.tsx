'use client'

import * as React from 'react'
import { MotivationScreen, AffirmationMoment, IncomeRangeScreen, SavingsRangeScreen, ObjectivesScreen } from '@/components/fa-screens'
import type { FAFunnelData, MotivationDriver, AgeRange, IncomeRange, SavingsRange, InvestmentObjective } from '@/types/fa-funnel'
import { Header } from '@/components/layout/Header'

type Step = 'motivation' | 'affirmation' | 'income' | 'savings' | 'objectives'

export default function FinancialAdvisorsPage() {
  const [funnelData, setFunnelData] = React.useState<FAFunnelData>({})
  const [step, setStep] = React.useState<Step>('motivation')
  const [motivationPhase, setMotivationPhase] = React.useState<'motivation' | 'age'>('motivation')

  const update = (data: Partial<FAFunnelData>) => {
    setFunnelData((prev) => ({ ...prev, ...data }))
  }

  const isHero = step === 'motivation' && motivationPhase === 'motivation'


  if (isHero) {
    return (
      <div className="h-screen flex flex-col bg-white overflow-hidden">
        <Header />
        <div className="flex-1 min-h-0">
          <MotivationScreen
            initialMotivation={funnelData.motivationDriver}
            initialAge={funnelData.ageRange}
            onPhaseChange={setMotivationPhase}
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
      <Header />

      <div className="flex-1 min-h-0">
        {step === 'motivation' && (
          <MotivationScreen
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
            }}
          />
        )}
      </div>

    </div>
  )
}
