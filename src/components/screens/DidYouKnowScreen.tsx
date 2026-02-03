'use client'

import { 
  CreditCard, 
  TrendingUp, 
  Clock,
  FileText,
  Layers,
  CheckCircle2
} from 'lucide-react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { LottieIcon } from '@/components/ui/LottieIcon'
import { type DebtTypeOption } from '@/types/funnel'

// Import Lottie animation data
import interstitialAnimation from '../../../public/lottie/interstitial-1.json'

// Card titles based on debt type
const CARD_TITLES: Record<DebtTypeOption | 'default', string> = {
  'credit-card': 'Why credit card debt gets harder over time',
  'personal-loan': 'Why personal loan debt can keep you stuck',
  'both': 'Why mixed debt is harder to get out of',
  'default': 'Why mixed debt is harder to get out of',
}

interface DidYouKnowScreenProps {
  debtType?: DebtTypeOption
  onBack?: () => void
  onNext?: () => void
}

/**
 * DidYouKnowScreen
 * 
 * Interstitial screen between DebtTypeScreen and IncomeScreen
 * A reassurance/social proof "breather" moment with debt-type specific stats
 */
export function DidYouKnowScreen({ 
  debtType,
  onBack, 
  onNext 
}: DidYouKnowScreenProps) {
  // Get card title based on debt type
  const cardTitle = debtType 
    ? CARD_TITLES[debtType] 
    : CARD_TITLES['default']

  // Build stats dynamically based on debt type
  const renderStats = () => {
    if (debtType === 'credit-card') {
      return (
        <>
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-primary-700 flex-shrink-0" />
            <span className="text-neutral-800 text-left">Avg balance: $4,180</span>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-primary-700 flex-shrink-0" />
            <span className="text-neutral-800 text-left">Avg APR: 24.7%</span>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
            <span className="text-neutral-500 text-left text-sm italic">
              Interest compounds monthly — balances can grow even if you keep paying
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-feedback-success flex-shrink-0" />
            <span className="text-neutral-800 text-left">Checking your options won&apos;t affect your credit</span>
          </div>
        </>
      )
    }
    
    if (debtType === 'personal-loan') {
      return (
        <>
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary-700 flex-shrink-0" />
            <span className="text-neutral-800 text-left">Avg balance: $11,676</span>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-primary-700 flex-shrink-0" />
            <span className="text-neutral-800 text-left">Avg APR: 13%–18%</span>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
            <span className="text-neutral-500 text-left text-sm italic">
              Fixed payments mean you can stay in debt for years if nothing changes
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-feedback-success flex-shrink-0" />
            <span className="text-neutral-800 text-left">Checking your options won&apos;t affect your credit</span>
          </div>
        </>
      )
    }
    
    // Default/both/mixed debt
    return (
      <>
        <div className="flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-primary-700 flex-shrink-0" />
          <span className="text-neutral-800 text-left">Avg credit card balance: $4,180</span>
        </div>
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-primary-700 flex-shrink-0" />
          <span className="text-neutral-800 text-left">Avg personal loan balance: $11,676</span>
        </div>
        <div className="flex items-start gap-3">
          <Layers className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
          <span className="text-neutral-500 text-left text-sm italic">
            Juggling multiple debts often means higher total interest and slower progress
          </span>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-feedback-success flex-shrink-0" />
          <span className="text-neutral-800 text-left">Checking your options won&apos;t affect your credit</span>
        </div>
      </>
    )
  }

  return (
    <FormLayout currentStep={2} onBack={onBack}>
      <div className="animate-slide-up flex flex-col items-center text-center py-8 space-y-8 has-sticky-button">
        {/* Lottie Animation */}
        <div className="flex items-center justify-center">
          <div className="w-32 h-32">
            <LottieIcon 
              animationData={interstitialAnimation}
              className="w-full h-full"
            />
          </div>
        </div>
        
        {/* Headline */}
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-neutral-900 text-center">
            Over 100 million Americans are working to pay down debt. You&apos;re not alone.
          </h1>
          {/* Subheadline */}
          <p className="font-body text-lg text-primary-700 font-semibold text-center mt-2">
            You&apos;re taking a real step by being here.
          </p>
        </div>
        
        {/* Stats Card */}
        <div className="w-full max-w-md bg-primary-300 rounded-xl p-6">
          {/* Card Title */}
          <h2 className="font-body text-lg font-semibold text-neutral-900 mb-4 text-left">
            {cardTitle}
          </h2>
          <div className="space-y-4">
            {renderStats()}
          </div>
        </div>
        
        {/* CTA Button - Sticky on mobile */}
        <StickyButtonContainer className="w-full max-w-md">
          <Button type="button" fullWidth onClick={onNext}>
            Continue
          </Button>
        </StickyButtonContainer>
        
        {/* Bottom Reassurance */}
        <p className="text-neutral-500 text-center italic mt-4">
          You&apos;re taking the right step — options are available.
        </p>
        
        {/* Disclaimer */}
        <p className="text-xs text-neutral-400 text-center mt-2">
          Average rates and balances subject to change. Rates updated as of February 2026.
        </p>
      </div>
    </FormLayout>
  )
}

export default DidYouKnowScreen
