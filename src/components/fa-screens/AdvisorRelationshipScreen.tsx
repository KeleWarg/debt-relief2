'use client'

import * as React from 'react'
import { FAProgressBar } from './FAProgressBar'
import { Button } from '@/components/ui/Button'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import { FA_STEP_NUMBER, RELATIONSHIP_OPTIONS } from '@/types/fa-funnel'

interface AdvisorRelationshipScreenProps {
  initialValue?: string[]
  onBack?: () => void
  onSubmit?: (value: string[]) => void
}

export function AdvisorRelationshipScreen({
  initialValue,
  onBack,
  onSubmit,
}: AdvisorRelationshipScreenProps) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set(initialValue ?? []))

  const toggle = (value: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (value === 'not_sure') {
        return next.has(value) ? new Set() : new Set([value])
      }
      next.delete('not_sure')
      if (next.has(value)) {
        next.delete(value)
      } else {
        next.add(value)
      }
      return next
    })
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 flex items-center">
      <FAProgressBar currentStep={FA_STEP_NUMBER.relationship} onBack={onBack} />
      <div className="animate-slide-up has-sticky-button mt-8">
            <div className="max-w-content mx-auto text-center">
              <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 mb-3">
                What is your preferred relationship with an advisor?
              </h1>
              <p className="text-body text-neutral-500 mb-6">
                Last question before we show you your matches.
              </p>
            </div>
            <div className="max-w-content mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {RELATIONSHIP_OPTIONS.map((opt) => {
                  const isChecked = selected.has(opt.value)
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggle(opt.value)}
                      className={`flex items-center gap-2.5 p-4 rounded-lg border text-left transition-all duration-200 cursor-pointer ${
                        isChecked
                          ? 'border-primary-700 bg-primary-300'
                          : 'border-neutral-200 bg-white hover:border-primary-700'
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-5 h-5 rounded-[4px] border-2 flex-shrink-0 transition-colors duration-200 ${
                          isChecked ? 'border-primary-700 bg-primary-700' : 'border-neutral-200'
                        }`}
                      >
                        {isChecked && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium text-neutral-800">{opt.label}</span>
                    </button>
                  )
                })}
              </div>

              <p className="text-body-sm text-neutral-500 mb-6">
                Not sure what&apos;s right for you? Select &quot;I&apos;m not sure yet&quot; and we&apos;ll recommend based on your profile.
              </p>

              <StickyButtonContainer>
                <Button
                  fullWidth
                  showTrailingIcon
                  disabled={selected.size === 0}
                  onClick={() => onSubmit?.(Array.from(selected))}
                >
                  Continue
                </Button>
              </StickyButtonContainer>
            </div>
          </div>
    </div>
  )
}

export default AdvisorRelationshipScreen
