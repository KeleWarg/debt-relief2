'use client'

import * as React from 'react'
import { Check, Shield, ExternalLink } from 'lucide-react'
import { FAProgressBar } from './FAProgressBar'
import { Button } from '@/components/ui/Button'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import { FA_STEP_NUMBER } from '@/types/fa-funnel'

interface PartnerHandoffScreenProps {
  onBack?: () => void
  onContinue?: () => void
}

export function PartnerHandoffScreen({ onBack, onContinue }: PartnerHandoffScreenProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <FAProgressBar currentStep={FA_STEP_NUMBER.handoff} onBack={onBack} />
          <div className="animate-slide-up has-sticky-button mt-8">
            <div className="max-w-content mx-auto space-y-6 text-center">
              {/* Lottie / icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-feedback-success/10 flex items-center justify-center">
                  <Check className="w-8 h-8 text-feedback-success" />
                </div>
              </div>

              {/* Display headline */}
              <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900">
                We&apos;ve found your matches — here&apos;s what happens next.
              </h1>

              {/* Content Box: partnership explanation */}
              <div className="bg-white border border-neutral-200 rounded-lg p-5 space-y-5 text-left">
                <p className="text-sm text-neutral-800">
                  Forbes Advisor has partnered with Zoe Financial to connect you directly with vetted financial advisors.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-feedback-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-800">Your profile has been securely shared with matched advisors</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-feedback-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-800">You control who can contact you</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-feedback-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-800">No obligation — compare advisors and decide on your terms</span>
                  </div>
                </div>

                <div className="h-px bg-neutral-200" />

                <div>
                  <p className="text-sm text-neutral-600">
                    You&apos;re about to enter Zoe Financial&apos;s advisor portal where you can review profiles, read reviews, and book a free introductory call.
                  </p>
                  <p className="text-xs text-neutral-400 mt-2 flex items-center justify-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    This will open in a new tab
                  </p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-4 text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs">Forbes Advisor vetted</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span className="text-xs">Your data is protected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span className="text-xs">Free, no obligation</span>
                </div>
              </div>

              <StickyButtonContainer>
                <Button fullWidth showTrailingIcon onClick={onContinue}>
                  View My Advisor Matches
                </Button>
              </StickyButtonContainer>
            </div>
          </div>
    </div>
  )
}

export default PartnerHandoffScreen
