'use client'

import * as React from 'react'
import { FAProgressBar } from './FAProgressBar'
import { RadioGroup, RadioGridCard } from '@/components/ui/RadioCard'
import { Button } from '@/components/ui/Button'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import { FA_STEP_NUMBER, ASSETS_OPTIONS, ASSETS_SUB_COPY } from '@/types/fa-funnel'
import type { TotalAssetsRange, FAFunnelData, MotivationDriver } from '@/types/fa-funnel'

const REFINEMENT_CATEGORIES = [
  { key: 'cash', label: 'Cash' },
  { key: 'investments', label: 'Investments' },
  { key: 'retirement', label: 'Retirement' },
  { key: 'realEstate', label: 'Real Estate' },
] as const

type AssetBreakdown = FAFunnelData['assetBreakdown']

interface InvestableAssetsScreenProps {
  initialValue?: TotalAssetsRange
  initialBreakdown?: AssetBreakdown
  motivationDriver?: MotivationDriver
  onBack?: () => void
  onSubmit?: (total: TotalAssetsRange, breakdown?: AssetBreakdown) => void
}

export function InvestableAssetsScreen({
  initialValue,
  initialBreakdown,
  motivationDriver,
  onBack,
  onSubmit,
}: InvestableAssetsScreenProps) {
  const [selected, setSelected] = React.useState<string>(initialValue ?? '')
  const [refinementOpen, setRefinementOpen] = React.useState(false)
  const [breakdown, setBreakdown] = React.useState<AssetBreakdown>(initialBreakdown ?? {})

  const handlePrimarySelect = (value: string) => {
    setSelected(value)
    if (!refinementOpen) {
      setTimeout(() => onSubmit?.(value as TotalAssetsRange), 300)
    }
  }

  const updateBreakdown = (key: string, value: string) => {
    setBreakdown((prev) => ({ ...prev, [key]: value }))
  }

  const handleRefinedSubmit = () => {
    onSubmit?.(selected as TotalAssetsRange, breakdown)
  }

  const subCopy = motivationDriver ? ASSETS_SUB_COPY[motivationDriver] : undefined

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 flex items-center">
          <FAProgressBar currentStep={FA_STEP_NUMBER.assets} onBack={onBack} />
          <div className="animate-slide-up has-sticky-button mt-8">
            <div className="max-w-content mx-auto text-center">
              <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 mb-3">
                What are your total investable assets?
              </h1>
              {subCopy && (
                <p className="text-body-sm text-neutral-500 mb-8">{subCopy}</p>
              )}
            </div>
            <div className="max-w-content mx-auto">
              <RadioGroup
                value={selected}
                onValueChange={handlePrimarySelect}
                className="grid grid-cols-2 gap-3"
              >
                {ASSETS_OPTIONS.map((opt) => (
                  <RadioGridCard key={opt.value} value={opt.value}>
                    {opt.label}
                  </RadioGridCard>
                ))}
              </RadioGroup>

              <p className="text-body-sm text-neutral-500 mt-6">
                🔒 Secured by Forbes.com — your financial details are encrypted and protected.
              </p>

              {selected && (
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setRefinementOpen(!refinementOpen)}
                    className="flex items-center gap-2 text-sm text-primary-700 font-medium hover:underline"
                  >
                    <span className={`inline-block transition-transform ${refinementOpen ? 'rotate-90' : ''}`}>▸</span>
                    Want a more precise match? Tell us how your assets are spread.
                  </button>

                  {refinementOpen && (
                    <div className="mt-4 space-y-6 border border-neutral-200 rounded-lg p-4">
                      {REFINEMENT_CATEGORIES.map((cat) => (
                        <div key={cat.key}>
                          <p className="text-sm font-medium text-neutral-800 mb-2">{cat.label}</p>
                          <RadioGroup
                            value={(breakdown as Record<string, string>)?.[cat.key] ?? ''}
                            onValueChange={(v) => updateBreakdown(cat.key, v)}
                            className="grid grid-cols-2 gap-2"
                          >
                            {ASSETS_OPTIONS.map((opt) => (
                              <RadioGridCard key={opt.value} value={opt.value} className="min-h-[56px] text-xs">
                                {opt.label}
                              </RadioGridCard>
                            ))}
                          </RadioGroup>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <p className="text-body-sm text-neutral-500 mt-4">
                Not sure? That&apos;s fine — select &quot;Not sure&quot; and we&apos;ll match you with advisors who work across asset levels.
              </p>

              {refinementOpen && selected && (
                <StickyButtonContainer>
                  <Button fullWidth showTrailingIcon onClick={handleRefinedSubmit}>
                    Continue
                  </Button>
                </StickyButtonContainer>
              )}
            </div>
          </div>
    </div>
  )
}

export default InvestableAssetsScreen
