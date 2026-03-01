'use client'

import * as React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { FAProgressBar } from './FAProgressBar'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import { FA_STEP_NUMBER } from '@/types/fa-funnel'

const ZIP_LOOKUP: Record<string, { city: string; state: string }> = {
  '10001': { city: 'New York', state: 'NY' },
  '90210': { city: 'Beverly Hills', state: 'CA' },
  '60601': { city: 'Chicago', state: 'IL' },
  '33101': { city: 'Miami', state: 'FL' },
  '78701': { city: 'Austin', state: 'TX' },
  '02101': { city: 'Boston', state: 'MA' },
  '98101': { city: 'Seattle', state: 'WA' },
}

interface ZipCodeScreenProps {
  initialValue?: string
  onBack?: () => void
  onSubmit?: (zip: string, city?: string, state?: string) => void
}

export function ZipCodeScreen({ initialValue, onBack, onSubmit }: ZipCodeScreenProps) {
  const [zip, setZip] = React.useState(initialValue ?? '')
  const [resolved, setResolved] = React.useState<{ city: string; state: string } | null>(null)
  const [error, setError] = React.useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5)
    setZip(value)
    setError('')

    if (value.length === 5) {
      const match = ZIP_LOOKUP[value]
      setResolved(match ?? { city: 'Your city', state: value.startsWith('9') ? 'CA' : 'NY' })
    } else {
      setResolved(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^\d{5}$/.test(zip)) {
      setError('Please enter a valid 5-digit ZIP code')
      return
    }
    onSubmit?.(zip, resolved?.city, resolved?.state)
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 flex items-center">
      <FAProgressBar currentStep={FA_STEP_NUMBER.zipCode} onBack={onBack} />
      <form onSubmit={handleSubmit} className="animate-slide-up has-sticky-button mt-8">
            <div className="max-w-content mx-auto">
              <div className="flex items-center gap-2 bg-feedback-success/10 rounded-lg px-4 py-3 mb-6">
                <CheckCircle2 className="w-5 h-5 text-feedback-success flex-shrink-0" />
                <p className="text-sm font-medium text-feedback-success">
                  ✓ We&apos;ve found advisors in your area.
                </p>
              </div>

              <div className="text-center mb-6">
                <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 mb-3">
                  Where are you located?
                </h1>
              </div>

              <div className="mb-4">
                <Input
                  label="ZIP Code"
                  placeholder="Enter your 5-digit ZIP code"
                  value={zip}
                  onChange={handleChange}
                  error={error}
                  inputMode="numeric"
                />
              </div>

              {resolved && (
                <p className="text-sm text-feedback-success font-medium mb-4">
                  {resolved.city}, {resolved.state}
                </p>
              )}

              <p className="text-body-sm text-neutral-500 mb-2">
                🔒 Secured by Forbes.com
              </p>
              <p className="text-body-sm text-neutral-500 mb-6">
                Your ZIP code helps us find advisors licensed and available in your state.
              </p>

              <StickyButtonContainer>
                <Button type="submit" fullWidth showTrailingIcon disabled={zip.length !== 5}>
                  Continue
                </Button>
              </StickyButtonContainer>
            </div>
      </form>
    </div>
  )
}

export default ZipCodeScreen
