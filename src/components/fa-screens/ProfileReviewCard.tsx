'use client'

import * as React from 'react'
import type { FAFunnelData, MotivationDriver, AgeRange } from '@/types/fa-funnel'

const GOAL_LABELS: Record<string, string> = {
  behind_retirement: 'Catching up on retirement',
  family_protection: 'Protecting your family',
  windfall: 'Managing new wealth',
  optimization: 'Optimizing your finances',
  plan_review: 'Getting a professional review',
}

const AGE_LABELS: Record<string, string> = {
  under_30: 'Under 30', thirties: '30s', forties: '40s', fifties: '50s', sixties: '60s+',
}

const INCOME_LABELS: Record<string, string> = {
  under_50k: 'Under $50K', '50k_100k': '$50K\u2013$100K', '100k_150k': '$100K\u2013$150K',
  '150k_250k': '$150K\u2013$250K', '250k_500k': '$250K\u2013$500K', '500k_plus': '$500K+',
  prefer_not_to_say: 'Prefer not to say',
}

const SAVINGS_LABELS: Record<string, string> = {
  under_50k: 'Under $50K', '50k_150k': '$50K\u2013$150K', '150k_350k': '$150K\u2013$350K',
  '350k_750k': '$350K\u2013$750K', '750k_1.5m': '$750K\u2013$1.5M', '1.5m_plus': '$1.5M+',
}

const OBJECTIVE_LABELS: Record<string, string> = {
  growth: 'Long-term growth', preservation: 'Wealth preservation',
  income_generation: 'Income generation', balanced: 'Balanced growth and safety',
}

const MARITAL_LABELS: Record<string, string> = {
  single: 'Single', married: 'Married', divorced: 'Divorced',
  widowed: 'Widowed', prefer_not_to_say: 'Not specified',
}

const HOMEOWNERSHIP_LABELS: Record<string, string> = {
  own: 'Owns', rent: 'Rents', other: 'Other',
}

interface Strategy { label: string; description: string }

const STRATEGY_MATRIX: Record<MotivationDriver, Record<AgeRange, Strategy[]>> = {
  behind_retirement: {
    under_30: [
      { label: 'Automated Savings', description: 'Set up automatic contributions to capture employer matches and build the habit early.' },
      { label: 'Index Fund Strategy', description: 'Low-cost index funds aligned with your long time horizon.' },
      { label: 'Employer Match Max', description: 'Ensure you are capturing 100% of available employer matching.' },
    ],
    thirties: [
      { label: 'Contribution Ramp-Up', description: 'Increase your savings rate by 1-2% annually to close the gap.' },
      { label: 'Asset Allocation', description: 'Review your mix of stocks, bonds, and alternatives for your timeline.' },
      { label: 'Tax-Advantaged Accounts', description: 'Maximize IRAs, HSAs, and 401(k) contributions before year-end.' },
    ],
    forties: [
      { label: 'Max Contributions', description: 'Contribute the full $23,500/year to your 401(k) before catch-up kicks in.' },
      { label: 'Roth Conversion', description: 'Evaluate converting pre-tax funds while your tax bracket allows it.' },
      { label: 'Portfolio Rebalance', description: 'Align your allocation with a 20-25 year retirement horizon.' },
    ],
    fifties: [
      { label: 'Catch-Up Contributions', description: 'Maximize your 401(k) to $30,500/year including catch-up provisions.' },
      { label: 'Roth Conversion Window', description: 'Evaluate converting pre-tax funds before RMDs begin.' },
      { label: 'Tax-Loss Harvesting', description: 'Offset gains with strategic losses, especially effective in taxable accounts.' },
    ],
    sixties: [
      { label: 'Social Security Timing', description: 'Delaying benefits to 70 can increase payouts by up to 76%.' },
      { label: 'Withdrawal Strategy', description: 'Sequence withdrawals across account types to minimize lifetime taxes.' },
      { label: 'Medicare Planning', description: 'Coordinate Medicare enrollment with your overall healthcare and tax strategy.' },
    ],
  },
  family_protection: {
    under_30: [
      { label: 'Term Life Insurance', description: 'Affordable coverage to protect dependents during your highest-earning years.' },
      { label: 'Emergency Fund Build', description: 'Target 3-6 months of expenses in a liquid, accessible account.' },
      { label: 'Will & Basic Trust', description: 'Foundational documents to ensure your wishes are carried out.' },
    ],
    thirties: [
      { label: 'Coverage Gap Analysis', description: 'Identify gaps in life, disability, and liability coverage.' },
      { label: 'Education Funding', description: 'Start 529 plans early to maximize compound growth for education.' },
      { label: 'Estate Documents', description: 'Update beneficiaries, powers of attorney, and healthcare directives.' },
    ],
    forties: [
      { label: 'Coverage Gap Analysis', description: 'Review coverage as your family and assets grow.' },
      { label: 'Education Funding Strategy', description: 'Balance college savings with retirement contributions.' },
      { label: 'Estate Document Review', description: 'Ensure estate documents reflect your current situation.' },
    ],
    fifties: [
      { label: 'Estate Planning', description: 'Structure trusts and transfers to minimize estate tax exposure.' },
      { label: 'Survivorship Strategy', description: 'Plan for the financial impact on a surviving spouse.' },
      { label: 'Long-Term Care', description: 'Evaluate LTC insurance or self-funding strategies before premiums rise.' },
    ],
    sixties: [
      { label: 'Wealth Transfer', description: 'Use annual exclusions and lifetime exemptions to transfer assets tax-efficiently.' },
      { label: 'Legacy Structure', description: 'Set up trusts and charitable vehicles aligned with your values.' },
      { label: 'Beneficiary Audit', description: 'Verify all accounts, policies, and documents name the correct beneficiaries.' },
    ],
  },
  windfall: {
    under_30: [
      { label: 'Tax-Efficient Positioning', description: 'Structure new wealth across account types to minimize tax drag.' },
      { label: 'Growth Allocation', description: 'Your long time horizon supports a growth-oriented allocation.' },
      { label: 'Wealth Structure', description: 'Set up the right entity and account structures from the start.' },
    ],
    thirties: [
      { label: 'Tax-Efficient Positioning', description: 'Place assets in the most tax-advantaged locations.' },
      { label: 'Diversified Growth', description: 'Spread new wealth across asset classes to manage risk.' },
      { label: 'Asset Protection', description: 'Shield assets with appropriate insurance and legal structures.' },
    ],
    forties: [
      { label: 'Tax-Efficient Placement', description: 'Coordinate new wealth with existing accounts for optimal tax treatment.' },
      { label: 'Retirement Acceleration', description: 'Use new wealth to close any retirement savings gaps.' },
      { label: 'Estate Foundation', description: 'Establish estate planning structures while assets are being positioned.' },
    ],
    fifties: [
      { label: 'Tax Mitigation', description: 'Spread recognition of gains and income across multiple tax years.' },
      { label: 'Retirement Gap Close', description: 'Accelerate retirement readiness with targeted contributions.' },
      { label: 'Preservation Strategy', description: 'Shift toward capital preservation as your timeline shortens.' },
    ],
    sixties: [
      { label: 'Tax-Efficient Transfer', description: 'Structure gifts and transfers to minimize estate and gift tax.' },
      { label: 'Preservation First', description: 'Prioritize capital preservation with inflation-adjusted income.' },
      { label: 'Estate Structure', description: 'Build a comprehensive estate plan around your total wealth picture.' },
    ],
  },
  optimization: {
    under_30: [
      { label: 'Fee Reduction', description: 'Switch to low-cost index funds and eliminate unnecessary advisory fees.' },
      { label: 'Tax-Advantaged Max', description: 'Maximize contributions to every tax-advantaged account available.' },
      { label: 'Asset Location', description: 'Place investments in the most tax-efficient account types.' },
    ],
    thirties: [
      { label: 'Tax-Loss Harvesting', description: 'Offset gains with strategic losses to reduce your annual tax bill.' },
      { label: 'Account Consolidation', description: 'Simplify your accounts to reduce fees and improve oversight.' },
      { label: 'Fee Audit', description: 'Review all fund expense ratios and advisory fees.' },
    ],
    forties: [
      { label: 'Tax Strategy Overhaul', description: 'Restructure your tax approach around your current income and deductions.' },
      { label: 'Portfolio Rebalance', description: 'Align your allocation with a 20+ year retirement horizon.' },
      { label: 'Fee Reduction Audit', description: 'Identify and eliminate hidden fees across all accounts.' },
    ],
    fifties: [
      { label: 'Catch-Up Max', description: 'Use catch-up provisions to maximize every tax-advantaged dollar.' },
      { label: 'Roth Conversion', description: 'Convert pre-tax funds strategically before RMDs begin.' },
      { label: 'Tax-Loss Harvesting', description: 'Harvest losses across taxable accounts to offset gains.' },
    ],
    sixties: [
      { label: 'Withdrawal Sequencing', description: 'Draw from accounts in the order that minimizes lifetime taxes.' },
      { label: 'RMD Strategy', description: 'Plan for required minimum distributions to avoid penalties and surprises.' },
      { label: 'Tax-Bracket Management', description: 'Keep income within optimal brackets through strategic timing.' },
    ],
  },
  plan_review: {
    under_30: [
      { label: 'Foundation Review', description: 'Assess whether your current accounts and allocations match your goals.' },
      { label: 'Account Optimization', description: 'Ensure you are using the right account types for your situation.' },
      { label: 'Goal Alignment', description: 'Verify your savings rate and timeline support your stated objectives.' },
    ],
    thirties: [
      { label: 'Allocation Review', description: 'Check whether your investment mix still fits your risk tolerance and timeline.' },
      { label: 'Beneficiary Update', description: 'Confirm all beneficiary designations are current.' },
      { label: 'Gap Analysis', description: 'Identify gaps in insurance, savings, and estate planning.' },
    ],
    forties: [
      { label: 'Mid-Life Audit', description: 'Comprehensive review of all accounts, insurance, and estate documents.' },
      { label: 'Rebalance Assessment', description: 'Evaluate whether your portfolio allocation needs adjustment.' },
      { label: 'Insurance Review', description: 'Confirm coverage levels match your current obligations.' },
    ],
    fifties: [
      { label: 'Pre-Retirement Readiness', description: 'Stress-test your plan against retirement income needs.' },
      { label: 'Social Security Analysis', description: 'Model optimal claiming strategies for your situation.' },
      { label: 'Tax Projection', description: 'Project future tax obligations and plan withdrawals accordingly.' },
    ],
    sixties: [
      { label: 'Retirement Readiness', description: 'Final assessment of whether your plan supports your desired lifestyle.' },
      { label: 'Drawdown Planning', description: 'Create a sustainable withdrawal strategy across all accounts.' },
      { label: 'Estate Alignment', description: 'Ensure your estate plan reflects your current wealth and wishes.' },
    ],
  },
}

function getStrategies(motivation?: MotivationDriver, age?: AgeRange): Strategy[] {
  if (!motivation || !age) return []
  return STRATEGY_MATRIX[motivation]?.[age] ?? []
}

interface ProfileReviewCardProps {
  data: FAFunnelData
  motivationDriver?: MotivationDriver
  ageRange?: AgeRange
  showStrategies?: boolean
  showConfidenceBuilders?: boolean
  stateName?: string
  className?: string
}

export function ProfileReviewCard({ data, motivationDriver, ageRange, showStrategies = true, showConfidenceBuilders = false, stateName, className }: ProfileReviewCardProps) {
  const profileRows = [
    { label: 'Goal', value: data.motivationDriver ? GOAL_LABELS[data.motivationDriver] ?? '' : '' },
    { label: 'Age', value: data.ageRange ? AGE_LABELS[data.ageRange] ?? '' : '' },
    { label: 'Income', value: data.incomeRange ? INCOME_LABELS[data.incomeRange] ?? '' : '' },
    { label: 'Savings', value: data.savingsRange ? SAVINGS_LABELS[data.savingsRange] ?? '' : '' },
    { label: 'Objective', value: data.investmentObjective ? OBJECTIVE_LABELS[data.investmentObjective] ?? '' : '' },
    { label: 'Status', value: data.maritalStatus ? MARITAL_LABELS[data.maritalStatus] ?? '' : '' },
    { label: 'Home', value: data.homeownership ? HOMEOWNERSHIP_LABELS[data.homeownership] ?? '' : '' },
    { label: 'Location', value: data.state ? stateAbbrToName(data.state) : '' },
  ].filter((r) => r.value)

  const strategies = getStrategies(motivationDriver, ageRange)

  return (
    <div
      className={className}
      style={{
        backgroundColor: '#F8F8FA',
        border: '1px solid #E8E8E8',
        borderRadius: '8px',
        padding: '20px',
      }}
    >
      <p className="text-xs font-medium uppercase tracking-wider mb-4" style={{ color: '#999999' }}>
        Your Profile Review
      </p>

      <div className="flex flex-col" style={{ gap: '0' }}>
        {profileRows.map((row) => (
          <div key={row.label} className="flex items-center justify-between" style={{ height: '28px' }}>
            <span style={{ fontSize: '13px', color: '#999999' }}>{row.label}</span>
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#1B2A4A' }}>{row.value}</span>
          </div>
        ))}
      </div>

      {showConfidenceBuilders && (
        <>
          <div className="border-t" style={{ borderColor: '#E0E0E0', margin: '12px 0' }} />

          {[
            'Your profile qualifies for a free consultation',
            `Advisors in ${stateName ?? 'your state'} are accepting new clients`,
            'Average first call is scheduled within 48 hours',
          ].map((text) => (
            <div key={text} className="flex items-center gap-2" style={{ height: '32px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                <circle cx="8" cy="8" r="8" fill="#0B6E4F" />
                <path d="M5 8.5L7 10.5L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: '14px', color: '#1B2A4A' }}>{text}</span>
            </div>
          ))}
        </>
      )}

      {showStrategies && !showConfidenceBuilders && strategies.length > 0 && (
        <>
          <div className="border-t" style={{ borderColor: '#E0E0E0', margin: '12px 0' }} />

          <p className="text-xs font-medium uppercase tracking-wider mb-4" style={{ color: '#999999' }}>
            Recommended Strategies
          </p>

          <div className="flex flex-col" style={{ gap: '16px' }}>
            {strategies.map((s) => (
              <div key={s.label}>
                <span
                  className="inline-block text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded mb-1"
                  style={{ color: '#1B2A4A', backgroundColor: '#E8F0FE' }}
                >
                  {s.label}
                </span>
                <p style={{ fontSize: '14px', color: '#1B2A4A' }}>{s.description}</p>
              </div>
            ))}
          </div>

          <p className="mt-3" style={{ fontSize: '13px', color: '#999999' }}>
            Your matched advisor will walk through these with you in your first call.
          </p>
        </>
      )}
    </div>
  )
}

function stateAbbrToName(abbr: string): string {
  const map: Record<string, string> = {
    AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
    CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', DC: 'Washington DC', FL: 'Florida',
    GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana',
    IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine',
    MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
    MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire',
    NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota',
    OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island',
    SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah',
    VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  }
  return map[abbr.toUpperCase()] ?? abbr
}

export default ProfileReviewCard
