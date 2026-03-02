'use client'

import * as React from 'react'
import {
  Clock,
  FileText,
  ScrollText,
  TrendingUp,
  Shield,
  GraduationCap,
  CreditCard,
  Building2,
  HelpCircle,
} from 'lucide-react'
import { FAProgressBar } from './FAProgressBar'
import { Button } from '@/components/ui/Button'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import { FA_STEP_NUMBER, SPECIALTY_OPTIONS } from '@/types/fa-funnel'

const SPECIALTY_ICONS: Record<string, React.ReactNode> = {
  'Retirement planning': <Clock className="w-4 h-4" />,
  'Tax planning': <FileText className="w-4 h-4" />,
  'Estate planning': <ScrollText className="w-4 h-4" />,
  'Investment management': <TrendingUp className="w-4 h-4" />,
  Insurance: <Shield className="w-4 h-4" />,
  'Education planning': <GraduationCap className="w-4 h-4" />,
  'Debt management': <CreditCard className="w-4 h-4" />,
  'Small business': <Building2 className="w-4 h-4" />,
  "I don't know": <HelpCircle className="w-4 h-4" />,
}

interface SpecialtiesScreenProps {
  initialValue?: string[]
  onBack?: () => void
  onSubmit?: (value: string[]) => void
}

export function SpecialtiesScreen({ initialValue, onBack, onSubmit }: SpecialtiesScreenProps) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set(initialValue ?? []))

  const toggle = (specialty: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (specialty === "I don't know") {
        return next.has(specialty) ? new Set() : new Set([specialty])
      }
      next.delete("I don't know")
      if (next.has(specialty)) {
        next.delete(specialty)
      } else {
        next.add(specialty)
      }
      return next
    })
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <FAProgressBar stepName="specialties" onBack={onBack} />
      <div className="animate-slide-up has-sticky-button mt-8">
        <div className="max-w-content mx-auto text-center">
          <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 mb-3">
            Are there any specialties you&apos;re looking for?
          </h1>
        </div>
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-2 gap-3 mb-4">
                {SPECIALTY_OPTIONS.map((specialty) => {
                  const isChecked = selected.has(specialty)
                  return (
                    <button
                      key={specialty}
                      type="button"
                      onClick={() => toggle(specialty)}
                      className={`flex items-center gap-2.5 p-3 rounded-lg border text-left transition-all duration-200 cursor-pointer ${
                        isChecked
                          ? 'border-primary-700 bg-primary-300'
                          : 'border-neutral-200 bg-white hover:border-primary-700'
                      }`}
                    >
                      <div className={`flex-shrink-0 ${isChecked ? 'text-primary-700' : 'text-neutral-500'}`}>
                        {SPECIALTY_ICONS[specialty]}
                      </div>
                      <span className="text-sm font-medium text-neutral-800">{specialty}</span>
                    </button>
                  )
                })}
          </div>

          <p className="text-body-sm text-neutral-500 mb-6">
            Select as many as apply. Your advisor match will reflect these priorities.
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

export default SpecialtiesScreen
