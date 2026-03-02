'use client'

import * as React from 'react'
import { Button } from '@/components/ui'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import { REINFORCEMENT_COPY } from '@/types/fa-funnel'
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
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="animate-slide-up mt-4">
        <div className="w-full rounded-lg p-6 sm:p-8 bg-primary-300/20 flex flex-col items-center gap-6">
          <p className="text-body text-neutral-800 text-center">{copy}</p>
        </div>

        <div className="mt-6">
          <StickyButtonContainer>
            <Button variant="primary" fullWidth showTrailingIcon onClick={() => onNext?.()}>
              Continue
            </Button>
          </StickyButtonContainer>
        </div>
      </div>
    </div>
  )
}

export default ReinforcementMoment
