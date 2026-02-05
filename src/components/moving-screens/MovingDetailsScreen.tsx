'use client'

import * as React from 'react'
import { User, Phone, Check, Clock, Shield, DollarSign, BadgeCheck } from 'lucide-react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, Input, StickyButtonContainer } from '@/components/ui'
import { MOVING_VALIDATION, HOME_SIZE_OPTIONS, MOVING_PROGRESS_SUBTITLES, MOVING_PROGRESS_TIME_ESTIMATES, MOVING_TOTAL_STEPS, type HomeSizeOption } from '@/types/moving'

interface MovingDetailsScreenProps {
  initialFirstName?: string
  initialLastName?: string
  initialPhone?: string
  homeSize: HomeSizeOption
  onBack?: () => void
  onSubmit?: (data: { firstName: string; lastName: string; phone: string }) => void
}

// Phone formatting helper
function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  
  if (digits.length === 0) return ''
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

/**
 * MovingDetailsScreen
 * 
 * Step 5 of 5 - "Almost there!"
 * Name and phone input with "what happens next" info
 */
export function MovingDetailsScreen({ 
  initialFirstName = '',
  initialLastName = '',
  initialPhone = '',
  homeSize,
  onBack, 
  onSubmit 
}: MovingDetailsScreenProps) {
  const [firstName, setFirstName] = React.useState(initialFirstName)
  const [lastName, setLastName] = React.useState(initialLastName)
  const [phone, setPhone] = React.useState(initialPhone)
  const [errors, setErrors] = React.useState<{
    firstName?: string
    lastName?: string
    phone?: string
  }>({})
  
  // Get estimated savings based on home size
  const sizeOption = HOME_SIZE_OPTIONS.find(o => o.value === homeSize)
  const priceRange = sizeOption?.priceRange ?? { low: 600, high: 1200 }
  const avgPrice = (priceRange.low + priceRange.high) / 2
  const estimatedSavings = Math.round(avgPrice * 0.25)
  
  // Validation check
  const isValid = 
    firstName.length >= MOVING_VALIDATION.name.minLength &&
    lastName.length >= MOVING_VALIDATION.name.minLength &&
    MOVING_VALIDATION.phone.pattern.test(phone)
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhone(formatted)
    if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: typeof errors = {}
    
    if (firstName.length < MOVING_VALIDATION.name.minLength) {
      newErrors.firstName = `First name must be at least ${MOVING_VALIDATION.name.minLength} characters`
    }
    if (lastName.length < MOVING_VALIDATION.name.minLength) {
      newErrors.lastName = `Last name must be at least ${MOVING_VALIDATION.name.minLength} characters`
    }
    if (!MOVING_VALIDATION.phone.pattern.test(phone)) {
      newErrors.phone = MOVING_VALIDATION.phone.message
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    onSubmit?.({ firstName, lastName, phone })
  }
  
  return (
    <FormLayout 
      currentStep={5} 
      onBack={onBack}
      progressSubtitles={MOVING_PROGRESS_SUBTITLES}
      progressTimeEstimates={MOVING_PROGRESS_TIME_ESTIMATES}
      totalSteps={MOVING_TOTAL_STEPS}
    >
      <form onSubmit={handleSubmit} className="animate-slide-up has-sticky-button">
        <div className="space-y-6">
          {/* Step indicator + Badge */}
          <div className="text-center space-y-2">
            <span className="text-body-sm text-neutral-500">Step 5 of 5</span>
            <div className="inline-flex items-center gap-1.5 bg-feedback-success/10 text-feedback-success px-3 py-1 rounded-full text-sm font-medium">
              <BadgeCheck className="w-4 h-4" />
              Final step
            </div>
          </div>
          
          {/* Headline */}
          <div className="text-center space-y-2">
            <h1 className="font-display text-2xl sm:text-3xl text-neutral-900">
              Almost there!
            </h1>
            <p className="text-body-sm text-neutral-500">
              Just a few details to get your personalized quotes.
            </p>
          </div>
          
          {/* Form Fields */}
          <div className="space-y-4 max-w-md mx-auto">
            {/* Name fields side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-body-sm font-medium text-neutral-800 mb-2">
                  <User className="w-4 h-4 text-primary-700" />
                  First name
                </label>
                <Input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                    if (errors.firstName) setErrors(prev => ({ ...prev, firstName: undefined }))
                  }}
                  error={errors.firstName}
                  autoComplete="given-name"
                />
              </div>
              <div>
                <label className="text-body-sm font-medium text-neutral-800 mb-2 block">
                  Last name
                </label>
                <Input
                  type="text"
                  placeholder="Smith"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value)
                    if (errors.lastName) setErrors(prev => ({ ...prev, lastName: undefined }))
                  }}
                  error={errors.lastName}
                  autoComplete="family-name"
                />
              </div>
            </div>
            
            {/* Phone field */}
            <div>
              <label className="flex items-center gap-2 text-body-sm font-medium text-neutral-800 mb-2">
                <Phone className="w-4 h-4 text-primary-700" />
                Phone number
              </label>
              <Input
                type="tel"
                placeholder="(555) 555-5555"
                value={phone}
                onChange={handlePhoneChange}
                error={errors.phone}
                autoComplete="tel"
              />
            </div>
          </div>
          
          {/* What Happens Next Card */}
          <div className="bg-primary-300 rounded-xl p-5 max-w-md mx-auto">
            <p className="text-body-sm font-semibold text-neutral-800 mb-3">
              What happens next:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-body-sm text-neutral-700">
                <Check className="w-4 h-4 text-primary-700 flex-shrink-0 mt-0.5" />
                Compare up to 5 verified movers
              </li>
              <li className="flex items-start gap-2 text-body-sm text-neutral-700">
                <Check className="w-4 h-4 text-primary-700 flex-shrink-0 mt-0.5" />
                Get personalized quotes instantly
              </li>
              <li className="flex items-start gap-2 text-body-sm text-neutral-700">
                <Check className="w-4 h-4 text-primary-700 flex-shrink-0 mt-0.5" />
                Save an average of ${estimatedSavings.toLocaleString()}
              </li>
              <li className="flex items-start gap-2 text-body-sm text-neutral-700">
                <Check className="w-4 h-4 text-primary-700 flex-shrink-0 mt-0.5" />
                Free cancellation anytime
              </li>
            </ul>
          </div>
          
          {/* Stats Row */}
          <div className="flex justify-center items-center gap-6 max-w-md mx-auto">
            <div className="flex flex-col items-center gap-1">
              <Clock className="w-5 h-5 text-primary-700" />
              <span className="text-body-sm font-medium text-neutral-800">2 min</span>
              <span className="text-caption text-neutral-500">Avg. response</span>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="flex flex-col items-center gap-1">
              <Shield className="w-5 h-5 text-primary-700" />
              <span className="text-body-sm font-medium text-neutral-800">Licensed</span>
              <span className="text-caption text-neutral-500">Verified movers</span>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="flex flex-col items-center gap-1">
              <DollarSign className="w-5 h-5 text-primary-700" />
              <span className="text-body-sm font-medium text-neutral-800">$0</span>
              <span className="text-caption text-neutral-500">No booking fees</span>
            </div>
          </div>
          
          {/* CTA */}
          <StickyButtonContainer>
            <Button 
              type="submit" 
              fullWidth 
              showTrailingIcon
              disabled={!isValid}
            >
              Get My Free Quotes
            </Button>
            
            {/* Legal line */}
            <p className="text-caption text-neutral-500 text-center mt-3">
              By clicking &ldquo;Get My Free Quotes&rdquo;, you agree to be contacted by our partner moving companies.
            </p>
          </StickyButtonContainer>
        </div>
      </form>
    </FormLayout>
  )
}

export default MovingDetailsScreen
