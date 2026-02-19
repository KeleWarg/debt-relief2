'use client'

import * as React from 'react'
import {
  CreditCard,
  Banknote,
  Home,
  Calendar,
  CheckCircle2,
  Shield,
  Check,
  Users,
  Star,
  Quote,
  Phone,
  Lock,
  Handshake,
  TrendingDown,
  AlertTriangle,
  HelpCircle,
  Gift,
  Clock,
  MapPin,
  ChevronDown,
  Info,
  Lightbulb,
  FileText,
  TrendingUp,
} from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { Slider } from '@/components/ui/Slider'
import {
  RadioGroup,
  RadioCard,
  RadioGridCard,
  RadioListItem,
} from '@/components/ui/RadioCard'
import { DatePicker } from '@/components/ui/DatePicker'
import { Tooltip } from '@/components/ui/Tooltip'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { LottieIcon } from '@/components/ui/LottieIcon'
import { Starburst } from '@/components/ui/Starburst'
import { USMap } from '@/components/ui/USMap'
import { AddressAutocomplete } from '@/components/ui/AddressAutocomplete'
import { OTPVerificationModal } from '@/components/ui/OTPVerificationModal'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import { FormLayout } from '@/components/layout/FormLayout'

import { cn, formatCurrency } from '@/lib/utils'

import creditCardAnimation from '../../../public/lottie/credit-card.json'

// ---------------------------------------------------------------------------
// Navigation data
// ---------------------------------------------------------------------------
type NavSection = { id: string; label: string; children: { id: string; label: string }[] }

const NAV: NavSection[] = [
  {
    id: 'primitives',
    label: 'Primitives',
    children: [
      { id: 'button', label: 'Button' },
      { id: 'input', label: 'Input' },
      { id: 'select', label: 'Select' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'slider', label: 'Slider' },
      { id: 'radio-card', label: 'RadioCard' },
      { id: 'date-picker', label: 'DatePicker' },
      { id: 'tooltip', label: 'Tooltip' },
      { id: 'animated-counter', label: 'AnimatedCounter' },
      { id: 'lottie-icon', label: 'LottieIcon' },
      { id: 'starburst', label: 'Starburst' },
    ],
  },
  {
    id: 'layout',
    label: 'Layout',
    children: [
      { id: 'header', label: 'Header' },
      { id: 'progress-indicator', label: 'ProgressIndicator' },
      { id: 'trust-badges', label: 'TrustBadges' },
      { id: 'footer', label: 'Footer' },
      { id: 'sticky-button', label: 'StickyButtonContainer' },
      { id: 'form-layout', label: 'FormLayout' },
    ],
  },
  {
    id: 'widgets',
    label: 'Widgets',
    children: [
      { id: 'us-map', label: 'USMap' },
      { id: 'address-autocomplete', label: 'AddressAutocomplete' },
      { id: 'otp-modal', label: 'OTPVerificationModal' },
      { id: 'money-pyramid', label: 'MoneyPyramid' },
      { id: 'map-visual', label: 'MapVisual' },
    ],
  },
  {
    id: 'social-proof',
    label: 'Social Proof',
    children: [
      { id: 'testimonial-carousel', label: 'Testimonial Carousel' },
      { id: 'partner-logo-carousel', label: 'Partner Logo Carousel' },
      { id: 'social-proof-overlay', label: 'Social Proof Overlay' },
      { id: 'animated-checklist', label: 'Animated Checklist' },
      { id: 'trust-indicators', label: 'Trust Indicators' },
      { id: 'how-it-works', label: 'How it Works Card' },
    ],
  },
  {
    id: 'data-cards',
    label: 'Data Cards',
    children: [
      { id: 'debt-snapshot', label: 'Debt Snapshot Card' },
      { id: 'dti-badge', label: 'DTI Ratio Badge' },
      { id: 'status-banner', label: 'Status Banner' },
      { id: 'approach-tags', label: 'Approach Tags' },
      { id: 'value-checklist', label: 'Value Checklist' },
    ],
  },
  {
    id: 'content-blocks',
    label: 'Content Blocks',
    children: [
      { id: 'icon-stat-row', label: 'Icon + Stat Row' },
      { id: 'did-you-know', label: '"Did You Know" Callout' },
      { id: 'qualification-message', label: 'Qualification Message' },
      { id: 'badge-banner', label: 'Badge Banner' },
      { id: 'trust-stats-row', label: 'Trust Stats Row' },
      { id: 'feature-grid', label: 'Feature Grid' },
    ],
  },
  {
    id: 'disclaimers',
    label: 'Disclaimers',
    children: [
      { id: 'privacy-note', label: 'Privacy Note' },
      { id: 'credit-reassurance', label: 'Credit Reassurance' },
      { id: 'legal-consent', label: 'Legal Consent Block' },
      { id: 'source-attribution', label: 'Source Attribution' },
    ],
  },
  {
    id: 'composed',
    label: 'Composed Blocks',
    children: [
      { id: 'context-card', label: 'Context Card' },
      { id: 'urgency-banner', label: 'Urgency Banner' },
      { id: 'partner-match-card', label: 'Partner Match Card' },
      { id: 'what-to-expect', label: 'What to Expect' },
      { id: 'faq-accordion', label: 'FAQ Accordion' },
      { id: 'educational-steps', label: 'Educational Steps' },
      { id: 'call-cta-card', label: 'Call CTA Card' },
    ],
  },
  {
    id: 'page-patterns',
    label: 'Page Patterns',
    children: [
      { id: 'pattern-form', label: 'Form Capture' },
      { id: 'pattern-interstitial', label: 'Interstitial' },
      { id: 'pattern-results', label: 'Results / Profile' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Specimen card wrapper
// ---------------------------------------------------------------------------
function Specimen({
  id,
  title,
  description,
  children,
  className,
}: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className="scroll-mt-20 mb-12">
      <h3 className="text-lg font-semibold text-neutral-900 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-neutral-500 mb-4">{description}</p>
      )}
      <div
        className={cn(
          'border border-neutral-200 rounded-xl bg-white p-6 overflow-hidden',
          className
        )}
      >
        {children}
      </div>
    </section>
  )
}

function SectionHeader({ id, label }: { id: string; label: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-20 text-xs font-bold uppercase tracking-widest text-neutral-400 mt-16 mb-6 first:mt-0"
    >
      {label}
    </h2>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function ShowcasePage() {
  const [activeId, setActiveId] = React.useState<string>('')

  // Scroll spy
  React.useEffect(() => {
    const ids = NAV.flatMap((s) => [s.id, ...s.children.map((c) => c.id)])
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-neutral-200 bg-white sticky top-0 h-screen overflow-y-auto">
        <div className="p-4 border-b border-neutral-200">
          <p className="text-sm font-bold text-neutral-900">Component Showcase</p>
          <p className="text-xs text-neutral-500 mt-0.5">Debt Relief Funnel</p>
        </div>
        <nav className="p-3 text-sm">
          {NAV.map((section) => (
            <div key={section.id} className="mb-3">
              <a
                href={`#${section.id}`}
                className={cn(
                  'block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider',
                  activeId === section.id
                    ? 'text-primary-700'
                    : 'text-neutral-400 hover:text-neutral-600'
                )}
              >
                {section.label}
              </a>
              <div className="ml-2 mt-0.5">
                {section.children.map((child) => (
                  <a
                    key={child.id}
                    href={`#${child.id}`}
                    className={cn(
                      'block px-2 py-1 rounded text-[13px] transition-colors',
                      activeId === child.id
                        ? 'text-primary-700 bg-primary-300/50 font-medium'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    )}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile top nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200 overflow-x-auto">
        <div className="flex gap-1 px-3 py-2 min-w-max">
          {NAV.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
                activeId === section.id || section.children.some((c) => c.id === activeId)
                  ? 'bg-primary-700 text-white'
                  : 'bg-neutral-100 text-neutral-600'
              )}
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 pt-16 lg:pt-8">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-neutral-900">Debt Relief Funnel — Component Showcase</h1>
          <p className="text-neutral-500 mt-1">
            Every primitive, block, and page pattern used in the debt relief journey.
          </p>
        </div>

        {/* ================================================================ */}
        {/* PRIMITIVES                                                       */}
        {/* ================================================================ */}
        <SectionHeader id="primitives" label="Primitives" />

        <ButtonSpecimen />
        <InputSpecimen />
        <SelectSpecimen />
        <CheckboxSpecimen />
        <SliderSpecimen />
        <RadioCardSpecimen />
        <DatePickerSpecimen />
        <TooltipSpecimen />
        <AnimatedCounterSpecimen />
        <LottieIconSpecimen />
        <StarburstSpecimen />

        {/* ================================================================ */}
        {/* LAYOUT                                                           */}
        {/* ================================================================ */}
        <SectionHeader id="layout" label="Layout" />

        <HeaderSpecimen />
        <ProgressIndicatorSpecimen />
        <TrustBadgesSpecimen />
        <FooterSpecimen />
        <StickyButtonSpecimen />
        <FormLayoutSpecimen />

        {/* ================================================================ */}
        {/* WIDGETS                                                          */}
        {/* ================================================================ */}
        <SectionHeader id="widgets" label="Widgets" />

        <USMapSpecimen />
        <AddressAutocompleteSpecimen />
        <OTPModalSpecimen />
        <MoneyPyramidSpecimen />
        <MapVisualSpecimen />

        {/* ================================================================ */}
        {/* SOCIAL PROOF                                                     */}
        {/* ================================================================ */}
        <SectionHeader id="social-proof" label="Social Proof" />

        <TestimonialCarouselSpecimen />
        <PartnerLogoCarouselSpecimen />
        <SocialProofOverlaySpecimen />
        <AnimatedChecklistSpecimen />
        <TrustIndicatorsSpecimen />
        <HowItWorksSpecimen />

        {/* ================================================================ */}
        {/* DATA CARDS                                                       */}
        {/* ================================================================ */}
        <SectionHeader id="data-cards" label="Data Cards" />

        <DebtSnapshotSpecimen />
        <DTIBadgeSpecimen />
        <StatusBannerSpecimen />
        <ApproachTagsSpecimen />
        <ValueChecklistSpecimen />

        {/* ================================================================ */}
        {/* CONTENT BLOCKS                                                   */}
        {/* ================================================================ */}
        <SectionHeader id="content-blocks" label="Content Blocks" />

        <IconStatRowSpecimen />
        <DidYouKnowSpecimen />
        <QualificationMessageSpecimen />
        <BadgeBannerSpecimen />
        <TrustStatsRowSpecimen />
        <FeatureGridSpecimen />

        {/* ================================================================ */}
        {/* DISCLAIMERS                                                      */}
        {/* ================================================================ */}
        <SectionHeader id="disclaimers" label="Disclaimers" />

        <PrivacyNoteSpecimen />
        <CreditReassuranceSpecimen />
        <LegalConsentSpecimen />
        <SourceAttributionSpecimen />

        {/* ================================================================ */}
        {/* COMPOSED BLOCKS                                                  */}
        {/* ================================================================ */}
        <SectionHeader id="composed" label="Composed Blocks" />

        <ContextCardSpecimen />
        <UrgencyBannerSpecimen />
        <PartnerMatchCardSpecimen />
        <WhatToExpectSpecimen />
        <FAQAccordionSpecimen />
        <EducationalStepsSpecimen />
        <CallCTACardSpecimen />

        {/* ================================================================ */}
        {/* PAGE PATTERNS                                                    */}
        {/* ================================================================ */}
        <SectionHeader id="page-patterns" label="Page Patterns" />

        <FormCapturePatternSpecimen />
        <InterstitialPatternSpecimen />
        <ResultsPatternSpecimen />

        <div className="h-32" />
      </main>
    </div>
  )
}

// ===========================================================================
// PRIMITIVES
// ===========================================================================

function ButtonSpecimen() {
  return (
    <Specimen
      id="button"
      title="Button"
      description="Primary, secondary, and ghost variants. Sizes: sm, default, lg. States: loading, disabled, fullWidth, trailing icon."
    >
      <div className="space-y-6">
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Variants</p>
          <div className="flex flex-wrap gap-3 items-center">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Sizes</p>
          <div className="flex flex-wrap gap-3 items-center">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">States</p>
          <div className="flex flex-wrap gap-3 items-center">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button showTrailingIcon>With Arrow</Button>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Full Width</p>
          <Button fullWidth>Full Width Button</Button>
        </div>
      </div>
    </Specimen>
  )
}

function InputSpecimen() {
  return (
    <Specimen
      id="input"
      title="Input"
      description="Text input with label, hint, error, suffix, and disabled states."
    >
      <div className="space-y-4 max-w-sm">
        <Input label="Default" placeholder="Enter text..." />
        <Input label="With hint" hint="We'll never share this." placeholder="you@example.com" />
        <Input label="With error" error="This field is required" placeholder="Required..." />
        <Input label="With suffix" suffix={<span className="text-neutral-400">/year</span>} placeholder="50,000" />
        <Input label="Disabled" disabled placeholder="Can't edit" />
      </div>
    </Specimen>
  )
}

function SelectSpecimen() {
  const [val, setVal] = React.useState('')
  return (
    <Specimen
      id="select"
      title="Select"
      description="Radix-based dropdown with trigger, value, content, and items."
    >
      <div className="space-y-4 max-w-sm">
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-2">Default</p>
          <Select value={val} onValueChange={setVal}>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CA">California</SelectItem>
              <SelectItem value="NY">New York</SelectItem>
              <SelectItem value="TX">Texas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-2">Error State</p>
          <Select>
            <SelectTrigger error>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CA">California</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Specimen>
  )
}

function CheckboxSpecimen() {
  const [c1, setC1] = React.useState(false)
  const [c2, setC2] = React.useState(true)
  return (
    <Specimen
      id="checkbox"
      title="Checkbox"
      description="Unchecked, checked, with rich label, and disabled states."
    >
      <div className="space-y-4">
        <Checkbox checked={c1} onCheckedChange={() => setC1(!c1)} label="Unchecked" />
        <Checkbox checked={c2} onCheckedChange={() => setC2(!c2)} label="Checked" />
        <Checkbox
          checked={false}
          onCheckedChange={() => {}}
          label={
            <span>
              I agree to the{' '}
              <a href="#" className="text-primary-700 underline">Terms of Service</a>{' '}
              and <a href="#" className="text-primary-700 underline">Privacy Policy</a>
            </span>
          }
        />
        <Checkbox checked={false} disabled label="Disabled" />
      </div>
    </Specimen>
  )
}

function SliderSpecimen() {
  const [val, setVal] = React.useState([25000])
  return (
    <Specimen
      id="slider"
      title="Slider"
      description="Range slider with markers and formatted currency display."
    >
      <div className="max-w-md">
        <Slider
          min={10000}
          max={100000}
          step={1000}
          value={val}
          onValueChange={setVal}
          formatValue={(v) => formatCurrency(v)}
          markers={[
            { value: 10000, label: '$10K' },
            { value: 50000, label: '$50K' },
            { value: 100000, label: '$100K+' },
          ]}
        />
      </div>
    </Specimen>
  )
}

function RadioCardSpecimen() {
  const [v1, setV1] = React.useState('a')
  const [v2, setV2] = React.useState('x')
  const [v3, setV3] = React.useState('1')
  return (
    <Specimen
      id="radio-card"
      title="RadioCard"
      description="Three variants: RadioCard (vertical), RadioGridCard (grid), RadioListItem (horizontal with tags)."
    >
      <div className="space-y-8">
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">RadioCard</p>
          <RadioGroup value={v1} onValueChange={setV1} className="flex gap-3">
            <RadioCard value="a" icon={<CreditCard className="w-6 h-6" />}>Credit Card</RadioCard>
            <RadioCard value="b" icon={<Banknote className="w-6 h-6" />}>Personal Loan</RadioCard>
            <RadioCard value="c">Both</RadioCard>
          </RadioGroup>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">RadioGridCard</p>
          <RadioGroup value={v2} onValueChange={setV2} className="grid grid-cols-3 gap-3">
            <RadioGridCard value="x" icon={<Home className="w-5 h-5" />}>Studio</RadioGridCard>
            <RadioGridCard value="y" icon={<Home className="w-5 h-5" />}>1 Bedroom</RadioGridCard>
            <RadioGridCard value="z" icon={<Home className="w-5 h-5" />}>2 Bedroom</RadioGridCard>
          </RadioGroup>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">RadioListItem</p>
          <RadioGroup value={v3} onValueChange={setV3}>
            <RadioListItem value="1" icon={<Calendar className="w-4 h-4" />} tag="Most popular">
              Within 2 weeks
            </RadioListItem>
            <RadioListItem value="2" icon={<Calendar className="w-4 h-4" />} tag="Save 10%" tagVariant="success">
              2-4 weeks
            </RadioListItem>
            <RadioListItem value="3" icon={<Calendar className="w-4 h-4" />}>
              1+ month
            </RadioListItem>
          </RadioGroup>
        </div>
      </div>
    </Specimen>
  )
}

function DatePickerSpecimen() {
  const [d, setD] = React.useState('')
  return (
    <Specimen id="date-picker" title="DatePicker" description="Calendar picker with month navigation.">
      <div className="max-w-xs">
        <DatePicker value={d} onChange={setD} label="Select a date" placeholder="MM/DD/YYYY" />
      </div>
    </Specimen>
  )
}

function TooltipSpecimen() {
  return (
    <Specimen id="tooltip" title="Tooltip" description="Hover to reveal contextual information.">
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-800">DTI Ratio</span>
        <Tooltip content="Your debt-to-income ratio compares your total debt to your annual income.">
          <Info className="w-4 h-4 text-neutral-400 cursor-help" />
        </Tooltip>
      </div>
    </Specimen>
  )
}

function AnimatedCounterSpecimen() {
  const [val, setVal] = React.useState(5340)
  return (
    <Specimen
      id="animated-counter"
      title="AnimatedCounter"
      description="Number counter that animates on value change."
    >
      <div className="flex items-center gap-6">
        <AnimatedCounter value={val} prefix="$" className="text-2xl font-bold text-neutral-800" duration={800} />
        <Button size="sm" variant="secondary" onClick={() => setVal(val === 5340 ? 8920 : 5340)}>
          Toggle Value
        </Button>
      </div>
    </Specimen>
  )
}

function LottieIconSpecimen() {
  return (
    <Specimen id="lottie-icon" title="LottieIcon" description="Lottie animation wrapper (auto-play, loop).">
      <div className="w-24 h-24">
        <LottieIcon animationData={creditCardAnimation} className="w-full h-full" />
      </div>
    </Specimen>
  )
}

function StarburstSpecimen() {
  const [active, setActive] = React.useState(false)
  return (
    <Specimen
      id="starburst"
      title="Starburst"
      description="Gold burst animation triggered on button click. Used internally by the primary Button."
    >
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <Starburst active={active} />
        </div>
        <Button size="sm" variant="secondary" onClick={() => { setActive(true); setTimeout(() => setActive(false), 500) }}>
          Trigger
        </Button>
      </div>
    </Specimen>
  )
}

// ===========================================================================
// LAYOUT
// ===========================================================================

function HeaderSpecimen() {
  return (
    <Specimen id="header" title="Header" description="Forbes Advisor branded header. Optional trust text.">
      <div className="space-y-4 -mx-6 -mt-6">
        <Header />
        <div className="px-6">
          <p className="text-xs text-neutral-400 mb-2">With trust text:</p>
        </div>
        <Header trustText="Trusted by 100k+ people" />
      </div>
    </Specimen>
  )
}

function ProgressIndicatorSpecimen() {
  return (
    <Specimen
      id="progress-indicator"
      title="ProgressIndicator"
      description="Segmented step pills or a unified continuous bar."
    >
      <div className="space-y-6">
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Segmented (step 5 of 11)</p>
          <ProgressIndicator currentStep={5} onBack={() => {}} />
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Unified bar (step 3)</p>
          <ProgressIndicator currentStep={3} unified onBack={() => {}} />
        </div>
      </div>
    </Specimen>
  )
}

function TrustBadgesSpecimen() {
  return (
    <Specimen id="trust-badges" title="TrustBadges" description="Default (white) and longevity (dark green) variants.">
      <div className="space-y-6 -mx-6 -mb-6">
        <div className="px-6">
          <p className="text-xs font-medium text-neutral-400 uppercase mb-2">Default</p>
        </div>
        <TrustBadges />
        <div className="px-6">
          <p className="text-xs font-medium text-neutral-400 uppercase mb-2">Longevity</p>
        </div>
        <TrustBadges variant="longevity" />
      </div>
    </Specimen>
  )
}

function FooterSpecimen() {
  return (
    <Specimen id="footer" title="Footer" description="Trust signals and navigation links.">
      <div className="-mx-6 -mb-6">
        <Footer />
      </div>
    </Specimen>
  )
}

function StickyButtonSpecimen() {
  return (
    <Specimen
      id="sticky-button"
      title="StickyButtonContainer"
      description="Wraps buttons to be sticky on mobile, inline on desktop. Handles keyboard offset."
    >
      <div className="relative">
        <StickyButtonContainer>
          <Button fullWidth showTrailingIcon>Continue</Button>
          <p className="text-sm text-gray-500 text-center mt-2">Does not affect your credit</p>
        </StickyButtonContainer>
      </div>
    </Specimen>
  )
}

function FormLayoutSpecimen() {
  return (
    <Specimen
      id="form-layout"
      title="FormLayout"
      description="Full page wrapper: Header + ProgressIndicator + content well + optional side content + TrustBadges + Footer."
      className="p-0 h-[500px] overflow-y-auto"
    >
      <FormLayout currentStep={3} onBack={() => {}} sideContent={<div className="bg-neutral-100 rounded-lg p-6 text-sm text-neutral-500 text-center">Side content area</div>}>
        <div className="space-y-4">
          <h1 className="font-display text-display text-neutral-900">Sample Headline</h1>
          <p className="text-body text-neutral-500">This demonstrates FormLayout wrapping content with all chrome.</p>
          <Input label="Example field" placeholder="Type here..." />
          <Button fullWidth>Continue</Button>
        </div>
      </FormLayout>
    </Specimen>
  )
}

// ===========================================================================
// WIDGETS
// ===========================================================================

function USMapSpecimen() {
  const [selected, setSelected] = React.useState<string | null>('California')
  const [hovered, setHovered] = React.useState<string | null>(null)
  return (
    <Specimen id="us-map" title="USMap" description="Interactive US map with state selection and hover highlighting.">
      <div className="max-w-md mx-auto">
        <USMap
          selectedState={selected}
          hoveredState={hovered}
          onStateSelect={setSelected}
          onStateHover={setHovered}
        />
        <p className="text-sm text-neutral-500 text-center mt-2">
          Selected: <strong>{selected || 'None'}</strong>
        </p>
      </div>
    </Specimen>
  )
}

function AddressAutocompleteSpecimen() {
  return (
    <Specimen
      id="address-autocomplete"
      title="AddressAutocomplete"
      description="Smart address input with autocomplete suggestions and parsed result."
    >
      <div className="max-w-sm">
        <AddressAutocomplete onAddressSelect={(addr) => console.log(addr)} />
      </div>
    </Specimen>
  )
}

function OTPModalSpecimen() {
  const [open, setOpen] = React.useState(false)
  return (
    <Specimen id="otp-modal" title="OTPVerificationModal" description="6-digit OTP modal with auto-focus, paste support, and resend.">
      <Button variant="secondary" onClick={() => setOpen(true)}>Open OTP Modal</Button>
      <OTPVerificationModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onVerify={(otp) => { console.log('Verified:', otp); setOpen(false) }}
        onSkip={() => setOpen(false)}
        onResend={() => console.log('Resent')}
      />
    </Specimen>
  )
}

function MoneyPyramidSpecimen() {
  const [income, setIncome] = React.useState(50000)

  const getTier = (inc: number): number => {
    if (inc < 40000) return 1
    if (inc < 80000) return 2
    if (inc < 140000) return 3
    return 4
  }

  const tier = getTier(income)
  const rows = Array.from({ length: tier }, (_, i) => i + 1)

  return (
    <Specimen
      id="money-pyramid"
      title="MoneyPyramid"
      description="Dynamic icon pyramid that grows based on income tier. From IncomeScreen."
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center -space-y-2">
          {rows.map((count, rowIndex) => (
            <div key={`row-${rowIndex}-${tier}`} className="flex -space-x-2">
              {Array.from({ length: count }).map((_, iconIndex) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={`icon-${rowIndex}-${iconIndex}`}
                  src="/Money.svg"
                  alt=""
                  width={52}
                  height={40}
                  className="w-[52px] h-[40px]"
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {[20000, 60000, 100000, 180000].map((v) => (
            <Button
              key={v}
              size="sm"
              variant={income === v ? 'primary' : 'secondary'}
              onClick={() => setIncome(v)}
            >
              {formatCurrency(v)}
            </Button>
          ))}
        </div>
      </div>
    </Specimen>
  )
}

function MapVisualSpecimen() {
  return (
    <Specimen
      id="map-visual"
      title="MapVisual"
      description="Composed block: USMap + debt stats panel + 'Healthier finances' badge. From LocationScreen."
    >
      <div className="relative pt-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <div className="inline-flex items-center gap-2 rounded bg-secondary-500 px-2 py-1">
            <span className="text-xs leading-4 text-neutral-900 font-medium whitespace-nowrap">
              Healthier finances &bull; No obligations &bull; 3 minutes
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6 mt-8">
          <div className="flex justify-center w-full flex-[3]">
            <USMap
              selectedState="Texas"
              hoveredState={null}
              onStateSelect={() => {}}
              onStateHover={() => {}}
              className="w-full max-w-sm"
            />
          </div>
          <div className="py-2 flex flex-col gap-4 justify-center min-w-[180px]">
            <span className="text-sm font-medium text-primary-700">Texas</span>
            <div className="flex flex-col gap-1">
              <div className="text-xs font-normal text-neutral-500">Avg credit card debt:</div>
              <AnimatedCounter value={5340} prefix="$" className="font-display text-xl font-bold text-neutral-800" duration={800} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs font-normal text-neutral-500">Avg personal loan:</div>
              <AnimatedCounter value={6973} prefix="$" className="font-display text-xl font-bold text-neutral-800" duration={800} />
            </div>
            <div className="text-[10px] text-neutral-400 mt-1">Source: NY Fed, TransUnion</div>
          </div>
        </div>
      </div>
    </Specimen>
  )
}

// ===========================================================================
// SOCIAL PROOF
// ===========================================================================

const TESTIMONIALS = [
  { quote: "I was drowning in debt and didn't know where to turn. This process helped me understand my options.", name: "Michael R.", location: "Florida", rating: 5 },
  { quote: "The team was supportive and explained everything clearly. I finally have a plan.", name: "Sarah K.", location: "Ohio", rating: 5 },
  { quote: "I was skeptical at first, but the process was simple and the guidance was invaluable.", name: "Jessica M.", location: "Texas", rating: 5 },
]

const PARTNER_LOGOS = [
  { src: '/accredited_logo.png', alt: 'Accredited' },
  { src: '/ClearOne.png', alt: 'ClearOne' },
  { src: '/freedom-debt-relief_logo.png', alt: 'Freedom Debt Relief' },
  { src: '/JGW_logo.png', alt: 'JG Wentworth' },
  { src: '/National_logo.png', alt: 'National Debt Relief' },
]

function TestimonialCarouselSpecimen() {
  const [idx, setIdx] = React.useState(0)
  const t = TESTIMONIALS[idx]
  return (
    <Specimen
      id="testimonial-carousel"
      title="Testimonial Carousel"
      description="Rotating quote cards with star ratings and progress dots. From AddressScreen and DebtProfileScreen."
    >
      <div className="max-w-md space-y-4">
        <div className="border border-gray-100 rounded-xl p-5">
          <Quote className="w-6 h-6 text-gray-200 mb-2" />
          <p className="text-sm text-neutral-800 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
          <div className="flex gap-1 mt-3">
            {[...Array(t.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-xs text-neutral-500 mt-2">&mdash; {t.name}, {t.location}</p>
          <div className="flex justify-center gap-1.5 mt-4">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className="p-1">
                <span className={cn('h-1.5 rounded-full transition-all block', i === idx ? 'bg-primary-700 w-3' : 'bg-gray-300 w-1.5')} />
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs font-medium text-neutral-400 uppercase">Single Review Card variant</p>
        <div className="bg-neutral-50 rounded-xl p-4">
          <div className="flex items-center gap-0.5 mb-2">
            {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 text-secondary-500 fill-secondary-500" />)}
          </div>
          <p className="text-sm text-neutral-700 italic">&ldquo;Within 3 months of starting my program, I could finally see a path forward.&rdquo;</p>
          <p className="text-xs text-neutral-500 mt-2">&mdash; Michael R., Texas</p>
        </div>
      </div>
    </Specimen>
  )
}

function PartnerLogoCarouselSpecimen() {
  return (
    <Specimen
      id="partner-logo-carousel"
      title="Partner Logo Carousel"
      description="Infinite-scroll logo strip with fade masks. Used in 3 screens."
    >
      <div>
        <p className="text-xs uppercase tracking-wide text-neutral-500 text-center mb-3">Trusted Partners</p>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex animate-scroll w-max">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
              <div key={i} className="flex-shrink-0 px-6 flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.src} alt={logo.alt} className="h-8 w-auto object-contain grayscale opacity-60" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Specimen>
  )
}

function SocialProofOverlaySpecimen() {
  return (
    <Specimen
      id="social-proof-overlay"
      title="Social Proof Overlay"
      description="Image with 'Profile ready' badge and social proof message card. From DebtProfileScreen."
    >
      <div className="max-w-md relative rounded-2xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80"
          alt="Person feeling relieved"
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 inline-flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-sm text-sm">
          <Check className="w-4 h-4 text-feedback-success" />
          Profile ready
        </div>
        <div className="absolute inset-x-4 bottom-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-300 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-primary-700" />
            </div>
            <p className="text-sm text-neutral-800">
              Your debt profile matches thousands of people in <strong>Texas</strong>. Our partners have worked with over <strong>5 million Americans</strong>.
            </p>
          </div>
        </div>
      </div>
    </Specimen>
  )
}

function AnimatedChecklistSpecimen() {
  const steps = ['Analyzing your responses...', 'Checking partner availability...', 'Comparing program options...', 'Selecting your best match...']
  const [current, setCurrent] = React.useState(0)
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const si = setInterval(() => setCurrent((p) => p >= steps.length - 1 ? 0 : p + 1), 1200)
    const pi = setInterval(() => setProgress((p) => p >= 100 ? 0 : p + 1), 50)
    return () => { clearInterval(si); clearInterval(pi) }
  }, [steps.length])

  return (
    <Specimen
      id="animated-checklist"
      title="Animated Checklist"
      description="Spinner-to-check step progression with progress bar. From ProcessingScreen and PartnerMatchingScreen."
    >
      <div className="flex flex-col items-center gap-6">
        <div className="space-y-3 inline-flex flex-col items-start">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              {i < current && <CheckCircle2 className="w-5 h-5 text-feedback-success fill-feedback-success" />}
              {i === current && <div className="w-5 h-5 rounded-full border-2 border-primary-700 border-t-transparent animate-spin" />}
              {i > current && <div className="w-5 h-5 rounded-full border-2 border-neutral-200" />}
              <span className={cn('text-sm', i > current ? 'text-neutral-500' : 'text-neutral-800')}>{step}</span>
            </div>
          ))}
        </div>
        <div className="w-full max-w-xs">
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div className="h-full bg-feedback-success rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-neutral-500 text-center mt-2">{progress}% complete</p>
        </div>
      </div>
    </Specimen>
  )
}

function TrustIndicatorsSpecimen() {
  return (
    <Specimen
      id="trust-indicators"
      title="Trust Indicators"
      description="Inline icon + text rows for reassurance. From DebtTypeScreen, ProcessingScreen, PartnerMatchingScreen."
    >
      <div className="space-y-6">
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Check style</p>
          <div className="flex items-center justify-center gap-6 text-sm text-neutral-600">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-feedback-success" />Soft credit pull to start</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-feedback-success" />No obligation</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Icon style</p>
          <div className="flex items-center justify-center gap-6 text-neutral-500">
            <div className="flex items-center gap-2"><Shield className="w-4 h-4" /><span className="text-xs">Secure &amp; Private</span></div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4" /><span className="text-xs">No credit impact</span></div>
            <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span className="text-xs">1M+ Matched</span></div>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Stats style (from ProcessingScreen)</p>
          <div className="flex justify-center items-center gap-6">
            <div className="text-center"><p className="text-lg font-bold text-neutral-900">1M+</p><p className="text-xs text-neutral-500">Americans matched</p></div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center"><p className="text-lg font-bold text-neutral-900">24/7</p><p className="text-xs text-neutral-500">US Support</p></div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center"><p className="text-lg font-bold text-neutral-900">&#10003;</p><p className="text-xs text-neutral-500">No credit impact</p></div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center"><Lock className="w-5 h-5 text-neutral-900 mx-auto" /><p className="text-xs text-neutral-500">Info is secure</p></div>
          </div>
        </div>
      </div>
    </Specimen>
  )
}

function HowItWorksSpecimen() {
  return (
    <Specimen
      id="how-it-works"
      title="How it Works Card"
      description="Warm-background explainer with icon + text bullets. From DebtTypeScreen."
    >
      <div className="max-w-lg">
        <h2 className="text-center text-xl font-bold text-neutral-900 mb-4">How it works</h2>
        <div className="w-full bg-[#FEF9EF] rounded-lg p-4 flex flex-col sm:flex-row items-stretch gap-4">
          <div className="flex-1 flex items-center gap-4">
            <Star className="w-6 h-6 text-neutral-900 flex-shrink-0" />
            <p className="text-sm text-neutral-900">Get matched with debt relief specialists who negotiate with creditors on your behalf</p>
          </div>
          <div className="h-px sm:h-auto sm:w-px bg-[#C0C0C0]" />
          <div className="flex-1 flex items-center gap-4">
            <CreditCard className="w-6 h-6 text-neutral-900 flex-shrink-0" />
            <p className="text-sm text-neutral-900">Simplify your payments — work with one partner instead of juggling multiple creditors</p>
          </div>
        </div>
      </div>
    </Specimen>
  )
}

// ===========================================================================
// DATA CARDS
// ===========================================================================

function DebtSnapshotSpecimen() {
  return (
    <Specimen
      id="debt-snapshot"
      title="Debt Snapshot Card"
      description="Key-value card: Debt / Income / DTI / Status. 6 variations across screens."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-2">Light bg (EmailScreen)</p>
          <div className="bg-neutral-100 rounded-lg p-4">
            <p className="text-sm font-medium text-neutral-800 mb-3">Your debt snapshot</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-neutral-500">Debt</span><span className="text-neutral-800 font-medium">$25,000</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Income</span><span className="text-neutral-800 font-medium">$60,000</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">DTI</span><span className="text-neutral-800 font-medium">42%</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Status</span><span className="text-feedback-success font-medium">&#10003; Matches program requirements</span></div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-2">Blue bg (ResultsPreviewScreen)</p>
          <div className="bg-primary-300 rounded-xl p-4">
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Your profile summary</h2>
            <div className="flex justify-between items-center py-2"><span className="text-sm text-neutral-600">Debt</span><span className="text-sm text-neutral-800">$25,000</span></div>
            <div className="h-px bg-neutral-300/50" />
            <div className="flex justify-between items-center py-2"><span className="text-sm text-neutral-600">Income</span><span className="text-sm text-neutral-800">$60,000/year</span></div>
            <div className="h-px bg-neutral-300/50" />
            <div className="flex justify-between items-center py-2"><span className="text-sm text-neutral-600">DTI</span><span className="text-sm font-medium text-neutral-900">42%</span></div>
            <div className="h-px bg-neutral-300/50" />
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-neutral-600">Status</span>
              <span className="text-sm font-medium text-feedback-success flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" />Matches program requirements</span>
            </div>
          </div>
        </div>
      </div>
    </Specimen>
  )
}

function DTIBadgeSpecimen() {
  return (
    <Specimen id="dti-badge" title="DTI Ratio Badge" description="Colored pill: Low (green), Moderate (yellow), Elevated (red).">
      <div className="flex gap-3">
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Low</span>
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Moderate</span>
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Elevated</span>
      </div>
    </Specimen>
  )
}

function StatusBannerSpecimen() {
  return (
    <Specimen
      id="status-banner"
      title="Status Banner"
      description="Green background card with status check and contextual encouragement. From DebtProfileScreen."
    >
      <div className="bg-green-50 rounded-lg p-4 max-w-md">
        <p className="text-feedback-success font-medium">Status: &#10003; Matches multiple relief programs</p>
        <p className="text-sm text-neutral-600 mt-1">A 42% DTI means you&apos;re exactly who relief programs are built for.</p>
      </div>
    </Specimen>
  )
}

function ApproachTagsSpecimen() {
  return (
    <Specimen
      id="approach-tags"
      title="Approach Tags"
      description="Pill badges with icons for possible debt relief approaches. From DebtProfileScreen."
    >
      <div className="inline-flex flex-wrap gap-2">
        <span className="bg-primary-300 text-primary-700 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5"><Handshake className="w-4 h-4" />Debt Negotiation</span>
        <span className="bg-primary-300 text-primary-700 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5"><TrendingDown className="w-4 h-4" />Lower Interest</span>
        <span className="bg-primary-300 text-primary-700 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5"><Calendar className="w-4 h-4" />Payment Plan</span>
      </div>
    </Specimen>
  )
}

function ValueChecklistSpecimen() {
  return (
    <Specimen
      id="value-checklist"
      title="Value Checklist"
      description="Check icon + text list. From DebtProfileScreen ('Verify to unlock')."
    >
      <div className="space-y-2 max-w-sm">
        <p className="text-sm font-semibold text-neutral-900 mb-3">Verify to unlock:</p>
        {['Personalized debt relief options', 'Side-by-side partner comparison', 'No obligation — compare and decide'].map((t, i) => (
          <div key={i} className="flex items-center gap-2">
            <Check className="w-4 h-4 text-feedback-success flex-shrink-0" />
            <p className="text-sm text-neutral-800">{t}</p>
          </div>
        ))}
      </div>
    </Specimen>
  )
}

// ===========================================================================
// CONTENT BLOCKS
// ===========================================================================

function IconStatRowSpecimen() {
  return (
    <Specimen
      id="icon-stat-row"
      title="Icon + Stat Row"
      description="Horizontal flex pairing a lucide icon with a stat label. Three variants by debt type. From DidYouKnowScreen."
    >
      <div className="space-y-6">
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Credit Card</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary-700 flex-shrink-0" />
              <span className="text-neutral-800 text-sm">Avg balance: $4,180</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-700 flex-shrink-0" />
              <span className="text-neutral-800 text-sm">Avg APR: 24.7%</span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Personal Loan</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-700 flex-shrink-0" />
              <span className="text-neutral-800 text-sm">Avg balance: $11,676</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-700 flex-shrink-0" />
              <span className="text-neutral-800 text-sm">Avg APR: 13%–18%</span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Both / Mixed</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary-700 flex-shrink-0" />
              <span className="text-neutral-800 text-sm">Avg CC balance: $4,180</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-700 flex-shrink-0" />
              <span className="text-neutral-800 text-sm">Avg loan: $11,676</span>
            </div>
          </div>
        </div>
      </div>
    </Specimen>
  )
}

function DidYouKnowSpecimen() {
  return (
    <Specimen
      id="did-you-know"
      title={'"Did You Know" Callout'}
      description="Left-border accent card with Lightbulb icon, bold title, message body, and source attribution. From DebtAmountScreen."
    >
      <div className="space-y-4 max-w-md">
        <div className="bg-secondary-300 border-l-4 border-secondary-500 rounded-lg p-4 text-left">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-secondary-500" />
            <p className="font-semibold text-neutral-800">Did you know?</p>
          </div>
          <p className="text-body-sm text-neutral-800">
            The average American with $25K in credit card debt pays over $6,000 a year in interest alone — that&apos;s more than most car payments.
          </p>
          <p className="text-caption text-neutral-500 mt-2">
            Source: Federal Reserve, 2024
          </p>
        </div>
        <div className="bg-secondary-300 border-l-4 border-secondary-500 rounded-lg p-4 text-left">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-secondary-500" />
            <p className="font-semibold text-neutral-800">Did you know?</p>
          </div>
          <p className="text-body-sm text-neutral-800">
            Debt relief programs have helped over 5 million Americans resolve more than $10 billion in debt.
          </p>
          <p className="text-caption text-neutral-500 mt-2">
            Source: AFCC Industry Report
          </p>
        </div>
      </div>
    </Specimen>
  )
}

function QualificationMessageSpecimen() {
  return (
    <Specimen
      id="qualification-message"
      title="Qualification Message"
      description="Inline CheckCircle2 icon with colored status text. Success (green) and neutral (grey) states. From DebtAmountScreen."
    >
      <div className="space-y-6 max-w-md">
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Qualified (success)</p>
          <p className="text-feedback-success font-medium flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            This amount qualifies for most relief programs
          </p>
          <p className="text-sm text-neutral-500 text-center mt-1">
            Based on quoted partner outcomes of up to 50% reduction in total debt
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Not yet qualified (neutral)</p>
          <p className="text-neutral-500 font-medium text-center">
            Some programs may be available — let&apos;s check your options.
          </p>
          <p className="text-sm text-neutral-500 text-center mt-1">
            Based on quoted partner outcomes of up to 50% reduction in total debt
          </p>
        </div>
      </div>
    </Specimen>
  )
}

function BadgeBannerSpecimen() {
  return (
    <Specimen
      id="badge-banner"
      title="Badge Banner"
      description="Compact horizontal pill with icon and bullet-separated text. Used as a reassurance strip above content areas. From LocationScreen / MapVisual."
    >
      <div className="space-y-4 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 rounded bg-secondary-500 px-2 py-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1L9.79 5.73L15 6.46L11.25 9.85L12.18 15L8 12.52L3.82 15L4.75 9.85L1 6.46L6.21 5.73L8 1Z" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs leading-4 text-neutral-900 font-medium whitespace-nowrap">
            Healthier finances &bull; No obligations &bull; 3 minutes
          </span>
        </div>
        <div className="inline-flex items-center gap-2 rounded bg-primary-300 px-3 py-1.5">
          <Shield className="w-4 h-4 text-primary-700" />
          <span className="text-xs leading-4 text-primary-700 font-medium whitespace-nowrap">
            Secure &bull; Private &bull; No credit impact
          </span>
        </div>
        <div className="inline-flex items-center gap-2 rounded bg-green-100 px-3 py-1.5">
          <CheckCircle2 className="w-4 h-4 text-green-700" />
          <span className="text-xs leading-4 text-green-700 font-medium whitespace-nowrap">
            Free consultation &bull; No upfront fees &bull; 24/7 support
          </span>
        </div>
      </div>
    </Specimen>
  )
}

function TrustStatsRowSpecimen() {
  return (
    <Specimen
      id="trust-stats-row"
      title="Trust Stats Row"
      description="Divider-separated stat columns with numbers/icons and labels. Centered horizontally. From ProcessingScreen."
    >
      <div className="space-y-6">
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">4-column (ProcessingScreen)</p>
          <div className="flex justify-center items-center gap-6">
            <div className="text-center">
              <p className="text-lg font-bold text-neutral-900">1M+</p>
              <p className="text-xs text-neutral-500">Americans matched</p>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center">
              <p className="text-lg font-bold text-neutral-900">24/7</p>
              <p className="text-xs text-neutral-500">US Support</p>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center">
              <p className="text-lg font-bold text-neutral-900">&#10003;</p>
              <p className="text-xs text-neutral-500">No credit impact</p>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center">
              <Lock className="w-5 h-5 text-neutral-900 mx-auto" />
              <p className="text-xs text-neutral-500">Info is secure</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">3-column (ResultsPage)</p>
          <div className="flex justify-center items-center gap-6">
            <div className="text-center">
              <Shield className="w-5 h-5 text-neutral-500 mx-auto" />
              <p className="text-xs text-neutral-500 mt-1">30-Day Guarantee</p>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center">
              <Clock className="w-5 h-5 text-neutral-500 mx-auto" />
              <p className="text-xs text-neutral-500 mt-1">24/7 Support</p>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center">
              <MapPin className="w-5 h-5 text-neutral-500 mx-auto" />
              <p className="text-xs text-neutral-500 mt-1">US-Based Team</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">3-column stats (PartnerMatchCard)</p>
          <div className="flex justify-center items-center gap-6">
            <div className="text-center">
              <p className="text-lg font-bold text-neutral-900">15-25%</p>
              <p className="text-xs text-neutral-500">Avg. Fee</p>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center">
              <p className="text-lg font-bold text-neutral-900">A+</p>
              <p className="text-xs text-neutral-500">BBB Rating</p>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center">
              <p className="text-lg font-bold text-neutral-900">24-48 mo</p>
              <p className="text-xs text-neutral-500">Avg. Timeline</p>
            </div>
          </div>
        </div>
      </div>
    </Specimen>
  )
}

function FeatureGridSpecimen() {
  return (
    <Specimen
      id="feature-grid"
      title="Feature Grid"
      description="2-column grid of CheckCircle2 icon + feature text. Used inside partner cards for benefit lists. From ResultsPage."
    >
      <div className="space-y-6 max-w-md">
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Partner features (2-col)</p>
          <div className="grid grid-cols-2 gap-3">
            {['No upfront fees', 'Free consultation', 'A+ BBB rating', '24/7 support', '$10B+ debt resolved', 'Dedicated advisor'].map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-feedback-success flex-shrink-0" />
                <span className="text-sm text-neutral-800">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Value unlock list (single-col)</p>
          <div className="space-y-2">
            {['Personalized debt relief options', 'Side-by-side partner comparison', 'No obligation — compare and decide'].map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-feedback-success flex-shrink-0" />
                <span className="text-sm text-neutral-800">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Specimen>
  )
}

// ===========================================================================
// DISCLAIMERS
// ===========================================================================

function PrivacyNoteSpecimen() {
  return (
    <Specimen id="privacy-note" title="Privacy Note" description="Short centered disclaimer below CTAs. From EmailScreen, AddressScreen.">
      <div className="space-y-4 text-center max-w-md mx-auto">
        <p className="text-xs text-neutral-500">We respect your privacy. Your email will only be used to send you information about your debt relief options.</p>
        <p className="text-xs text-neutral-500">Your address is used to verify your identity and find location-specific debt relief options. We never share your address with third parties without your consent.</p>
      </div>
    </Specimen>
  )
}

function CreditReassuranceSpecimen() {
  return (
    <Specimen id="credit-reassurance" title="Credit Reassurance" description="Appears below Continue buttons. From LocationScreen, DidYouKnowScreen.">
      <div className="space-y-4 text-center">
        <p className="text-sm text-gray-500">Does not affect your credit</p>
        <div className="flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-feedback-success" />
          <span className="text-feedback-success font-medium">Checking your options won&apos;t affect your credit</span>
        </div>
      </div>
    </Specimen>
  )
}

function LegalConsentSpecimen() {
  const [consent, setConsent] = React.useState(false)
  return (
    <Specimen
      id="legal-consent"
      title="Legal Consent Block"
      description="Full TCPA consent with checkbox and linked terms. From PhoneScreen, DebtProfileScreen."
    >
      <div className="p-4 bg-neutral-100 rounded-lg max-w-lg">
        <Checkbox
          checked={consent}
          onCheckedChange={(c) => setConsent(c === true)}
          label={
            <span className="text-sm text-neutral-800">
              By clicking &quot;Agree &amp; Continue&quot; I consent to be contacted by
              Spinwheel and/or its{' '}
              <a href="#" className="text-primary-700 underline">marketing partners</a>{' '}
              using automated technology at the phone number I have provided.
              I agree to the{' '}
              <a href="#" className="text-primary-700 underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-primary-700 underline">Privacy Statement</a>.
              Message and data rates may apply.
            </span>
          }
        />
      </div>
    </Specimen>
  )
}

function SourceAttributionSpecimen() {
  return (
    <Specimen id="source-attribution" title="Source Attribution" description="Tiny data source credit. From LocationScreen.">
      <div className="text-[10px] text-neutral-400">Source: NY Fed, TransUnion</div>
    </Specimen>
  )
}

// ===========================================================================
// COMPOSED BLOCKS
// ===========================================================================

function ContextCardSpecimen() {
  return (
    <Specimen
      id="context-card"
      title="Context Card"
      description="Master sidebar block: 'Based on what you told us' header + Debt Snapshot + Testimonials + Partner Logos. From AddressScreen, DebtProfileScreen."
      className="max-w-md"
    >
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <p className="text-xs uppercase tracking-wide text-neutral-500 mb-4">Based on what you told us</p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium text-neutral-800 mb-3">Your debt snapshot</p>
          <div className="text-sm">
            <div className="flex justify-between py-2 border-b border-gray-200"><span className="text-neutral-500">Total Debt</span><span className="text-neutral-800 font-medium">$25,000</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-neutral-500">DTI</span>
              <div className="flex items-center gap-2"><span className="text-neutral-800 font-medium">42%</span><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Low</span></div>
            </div>
            <div className="flex justify-between py-2"><span className="text-neutral-500">Status</span><span className="text-feedback-success font-medium">&#10003; Matches program requirements</span></div>
          </div>
        </div>

        <div className="border border-gray-100 rounded-xl p-5 mb-6">
          <Quote className="w-6 h-6 text-gray-200 mb-2" />
          <p className="text-sm text-neutral-800 italic">&ldquo;I was drowning in debt. This process helped me understand my options and finally feel in control.&rdquo;</p>
          <div className="flex gap-1 mt-3">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
          <p className="text-xs text-neutral-500 mt-2">&mdash; Michael R., Florida</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500 text-center mb-3">Trusted Partners</p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex animate-scroll w-max">
              {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
                <div key={i} className="flex-shrink-0 px-4 flex items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo.src} alt={logo.alt} className="h-6 w-auto object-contain grayscale opacity-60" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Specimen>
  )
}

function UrgencyBannerSpecimen() {
  const [countdown, setCountdown] = React.useState(180)
  React.useEffect(() => {
    const t = setInterval(() => setCountdown((p) => (p > 0 ? p - 1 : 180)), 1000)
    return () => clearInterval(t)
  }, [])
  const mins = Math.floor(countdown / 60)
  const secs = countdown % 60
  return (
    <Specimen id="urgency-banner" title="Urgency Banner" description="Sticky countdown timer. From ResultsPage.">
      <div className="bg-feedback-warning text-neutral-900 py-3 px-4 rounded-lg">
        <div className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-medium">
            A debt specialist will call you in{' '}
            <span className="bg-black/10 px-2 py-0.5 rounded font-bold">{mins}:{secs.toString().padStart(2, '0')}</span>
          </span>
        </div>
      </div>
    </Specimen>
  )
}

function PartnerMatchCardSpecimen() {
  return (
    <Specimen
      id="partner-match-card"
      title="Partner Match Card"
      description="Full partner card: logo, stats, features, rating. From ResultsPage."
    >
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden max-w-lg">
        <div className="bg-feedback-success text-white text-center py-2 text-sm font-medium">&#10003; Best Match for Your Profile</div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/freedom-debt-relief_logo.png" alt="Freedom Debt Relief" className="w-16 h-16 object-contain" />
            <div>
              <p className="text-xs text-primary-700 font-medium uppercase">Top Match for Your Profile</p>
              <h3 className="text-xl font-bold text-neutral-900">Freedom Debt Relief</h3>
              <p className="text-sm text-neutral-500 mt-1">One of America&apos;s largest and most trusted debt relief companies.</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-neutral-100">
            <div className="text-center"><p className="text-lg font-bold text-neutral-900">15-25%</p><p className="text-xs text-neutral-500">Avg. Fee</p></div>
            <div className="text-center"><p className="text-lg font-bold text-neutral-900">A+</p><p className="text-xs text-neutral-500">BBB Rating</p></div>
            <div className="text-center"><p className="text-lg font-bold text-neutral-900">24-48 mo</p><p className="text-xs text-neutral-500">Avg. Timeline</p></div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {['No upfront fees', 'Free consultation', 'A+ BBB rating', '24/7 support', '$10B+ debt resolved', 'Dedicated advisor'].map((f, i) => (
              <div key={i} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-feedback-success" /><span className="text-sm text-neutral-800">{f}</span></div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-neutral-100">
            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
            <span className="text-sm text-neutral-500">4.7/5 from 10,000+ reviews</span>
          </div>
        </div>
      </div>
    </Specimen>
  )
}

function WhatToExpectSpecimen() {
  return (
    <Specimen id="what-to-expect" title="What to Expect Callout" description="Colored callout with icon and guidance. From ResultsPage.">
      <div className="bg-primary-300 rounded-xl p-5 max-w-lg">
        <div className="flex items-start gap-3">
          <Phone className="w-6 h-6 text-primary-700 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-neutral-900">What to expect now</h4>
            <p className="text-sm text-neutral-800 mt-1">Expect a call from your matched partner in just a few minutes. Be sure to answer — speaking with them right away will help tailor the best options for your needs.</p>
          </div>
        </div>
      </div>
    </Specimen>
  )
}

function FAQAccordionSpecimen() {
  const [open, setOpen] = React.useState<number | null>(null)
  const faqs = [
    { q: 'How much does debt relief cost?', a: 'Debt relief companies typically charge 15-25% of the total debt owed, on a performance-based fee structure.' },
    { q: 'How long does debt settlement take?', a: 'Most programs take 24-48 months depending on the amount of debt.' },
    { q: 'Will it affect my credit score?', a: 'Debt settlement can temporarily lower your score, but many people recover over time.' },
  ]
  return (
    <Specimen id="faq-accordion" title="FAQ Accordion" description="Expandable Q&A list. From ResultsPage.">
      <div className="max-w-lg space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-neutral-100 pb-3 last:border-b-0">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex items-center justify-between w-full text-left">
              <span className="font-medium text-neutral-800 pr-4">{faq.q}</span>
              <ChevronDown className={cn('w-5 h-5 text-neutral-500 transition-transform flex-shrink-0', open === i && 'rotate-180')} />
            </button>
            {open === i && <p className="text-sm text-neutral-500 mt-2 pr-8">{faq.a}</p>}
          </div>
        ))}
      </div>
    </Specimen>
  )
}

function EducationalStepsSpecimen() {
  const steps = [
    { title: 'Research companies', desc: 'Identify reputable debt relief companies by reading reviews.' },
    { title: 'Verify credentials', desc: 'Check accreditation with the BBB or AFCC.' },
    { title: 'Schedule a consultation', desc: 'Most companies offer free initial consultations.' },
  ]
  return (
    <Specimen id="educational-steps" title="Educational Steps" description="Numbered ordered list with circled step numbers. From ResultsPage.">
      <div className="max-w-lg">
        <ol className="divide-y divide-neutral-100">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 py-4 first:pt-0 last:pb-0">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-300 text-primary-700 text-sm font-medium flex items-center justify-center">{i + 1}</span>
              <div><p className="font-medium text-neutral-800">{step.title}</p><p className="text-sm text-neutral-500 mt-0.5">{step.desc}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </Specimen>
  )
}

function CallCTACardSpecimen() {
  return (
    <Specimen id="call-cta-card" title="Call CTA Card" description="Phone link button with mini trust badges. From ResultsPage.">
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 max-w-xs">
        <h4 className="font-semibold text-neutral-900 mb-3">Can&apos;t wait for the call?</h4>
        <a href="#" className="flex items-center justify-center gap-2 w-full bg-primary-700 text-white py-3 rounded-[8px] font-semibold hover:bg-primary-750 transition">
          <Phone className="w-5 h-5" />Call Now: 800-808-6539
        </a>
        <p className="text-xs text-neutral-500 text-center mt-3">Speak with a debt specialist immediately</p>
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-neutral-100">
          <div className="text-center"><Shield className="w-5 h-5 text-neutral-500 mx-auto" /><p className="text-xs text-neutral-500 mt-1">30-Day Guarantee</p></div>
          <div className="text-center"><Clock className="w-5 h-5 text-neutral-500 mx-auto" /><p className="text-xs text-neutral-500 mt-1">24/7 Support</p></div>
          <div className="text-center"><MapPin className="w-5 h-5 text-neutral-500 mx-auto" /><p className="text-xs text-neutral-500 mt-1">US-Based Team</p></div>
        </div>
      </div>
    </Specimen>
  )
}

// ===========================================================================
// PAGE PATTERNS
// ===========================================================================

function PatternCard({ title, description, screens, children }: { title: string; description: string; screens: string[]; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-neutral-900">{title}</h4>
        <p className="text-sm text-neutral-500 mt-1">{description}</p>
        <p className="text-xs text-neutral-400 mt-2">Screens: {screens.join(', ')}</p>
      </div>
      <div className="border border-neutral-200 rounded-lg bg-neutral-50 p-4 overflow-hidden">
        {children}
      </div>
    </div>
  )
}

function FormCapturePatternSpecimen() {
  return (
    <Specimen id="pattern-form" title="Form Capture" description="The primary screen archetype: headline, description, form fields, CTA, optional sidebar.">
      <PatternCard
        title="Form Capture Pattern"
        description="FormLayout wraps content. Centered content well (640px). Headline + description at top, input fields in middle, sticky CTA at bottom. Optional side content (Context Card) on desktop."
        screens={['LocationScreen', 'DebtAmountScreen', 'IncomeScreen', 'DateOfBirthScreen', 'NameScreen', 'EmailScreen', 'PhoneScreen', 'AddressScreen']}
      >
        <div className="max-w-xs mx-auto space-y-3">
          <div className="h-6 bg-neutral-200 rounded w-3/4 mx-auto" />
          <div className="h-3 bg-neutral-200 rounded w-full mx-auto" />
          <div className="mt-4 space-y-2">
            <div className="h-3 bg-neutral-300 rounded w-1/4" />
            <div className="h-10 bg-white border border-neutral-200 rounded-lg" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-3 bg-neutral-300 rounded w-1/4" />
            <div className="h-10 bg-white border border-neutral-200 rounded-lg" />
          </div>
          <div className="h-10 bg-primary-700 rounded-lg mt-4" />
          <div className="h-2 bg-neutral-200 rounded w-1/2 mx-auto" />
        </div>
      </PatternCard>
    </Specimen>
  )
}

function InterstitialPatternSpecimen() {
  return (
    <Specimen id="pattern-interstitial" title="Interstitial" description="Educational, selection, or loading screens that break up the form flow.">
      <PatternCard
        title="Interstitial Pattern"
        description="Centered layout, no text inputs. Either card-based selections (auto-advance on click), animated loading states (auto-advance on timer), or educational content with a simple CTA."
        screens={['DebtTypeScreen', 'DidYouKnowScreen', 'ResultsPreviewScreen', 'ProcessingScreen', 'PartnerMatchingScreen']}
      >
        <div className="max-w-xs mx-auto space-y-3 text-center">
          <div className="w-12 h-12 bg-primary-300 rounded-full mx-auto" />
          <div className="h-6 bg-neutral-200 rounded w-3/4 mx-auto" />
          <div className="h-3 bg-neutral-200 rounded w-full" />
          <div className="flex gap-3 mt-4">
            <div className="flex-1 h-20 bg-white border border-neutral-200 rounded-lg" />
            <div className="flex-1 h-20 bg-primary-300 border border-primary-700 rounded-lg" />
            <div className="flex-1 h-20 bg-white border border-neutral-200 rounded-lg" />
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 text-neutral-300">
            <div className="flex items-center gap-1"><Check className="w-3 h-3" /><div className="h-2 bg-neutral-200 rounded w-16" /></div>
            <div className="flex items-center gap-1"><Check className="w-3 h-3" /><div className="h-2 bg-neutral-200 rounded w-12" /></div>
          </div>
        </div>
      </PatternCard>
    </Specimen>
  )
}

function ResultsPatternSpecimen() {
  return (
    <Specimen id="pattern-results" title="Results / Profile" description="Two-column layouts for showing computed results, partner matches, and profiles.">
      <PatternCard
        title="Results Pattern"
        description="Full-width layout. Left column: profile/partner card, educational content, FAQ. Right column: sticky recap sidebar, CTA card. Urgency banner at top."
        screens={['DebtProfileScreen', 'ResultsPage']}
      >
        <div className="space-y-2">
          <div className="h-6 bg-feedback-warning rounded w-full" />
          <div className="h-5 bg-neutral-200 rounded w-1/2 mx-auto" />
          <div className="grid grid-cols-3 gap-3 mt-3">
            <div className="col-span-2 space-y-2">
              <div className="h-24 bg-white border border-neutral-200 rounded-lg" />
              <div className="h-10 bg-primary-300 rounded-lg" />
              <div className="h-16 bg-white border border-neutral-200 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-white border border-neutral-200 rounded-lg" />
              <div className="h-16 bg-white border border-neutral-200 rounded-lg" />
            </div>
          </div>
        </div>
      </PatternCard>
    </Specimen>
  )
}
