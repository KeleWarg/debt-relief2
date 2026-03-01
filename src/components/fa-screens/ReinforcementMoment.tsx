'use client'

import * as React from 'react'
import { FAProgressBar } from './FAProgressBar'
import { Button } from '@/components/ui'
import { FA_STEP_NUMBER, REINFORCEMENT_COPY } from '@/types/fa-funnel'
import type { FAFunnelData, MotivationDriver } from '@/types/fa-funnel'

interface ReinforcementMomentProps {
  funnelData: FAFunnelData
  onNext?: () => void
}

export function ReinforcementMoment({ funnelData, onNext }: ReinforcementMomentProps) {
  const motivationDriver = funnelData.motivationDriver
  const copy =
    motivationDriver && motivationDriver in REINFORCEMENT_COPY
      ? REINFORCEMENT_COPY[motivationDriver as MotivationDriver]
      : REINFORCEMENT_COPY.plan_review

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <FAProgressBar currentStep={FA_STEP_NUMBER.reinforcement} />
          <div className="animate-slide-up mt-8">
            <div className="max-w-content mx-auto">
              <div className="flex flex-col items-center justify-center min-h-[320px]">
                <div className="w-full max-w-md rounded-lg p-8 bg-primary-300/20 flex flex-col items-center gap-6">
                  <p className="text-body text-neutral-800 text-center">{copy}</p>
                  <Button variant="primary" fullWidth showTrailingIcon onClick={() => onNext?.()}>
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default ReinforcementMoment
