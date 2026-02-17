export type BankAccountType = 'cds' | 'checking' | 'savings' | 'money-market'

export type BankConsideration = 'apy' | 'minimum-deposit'

export type BankingService = 'credit-cards' | 'mortgages' | 'personal-loans' | 'investing'

export interface BankFunnelData {
  accountType?: BankAccountType
  depositAmount?: string
  consideration?: BankConsideration
  interestedServices?: BankingService[]
  zipCode?: string
  email?: string
  agreedToTerms?: boolean
}

export interface BankAccountTypeOption {
  value: BankAccountType
  label: string
}

export interface BankConsiderationOption {
  value: BankConsideration
  label: string
}

export interface BankingServiceOption {
  value: BankingService
  label: string
}

export interface BankValueProp {
  id: 'proprietary-data' | 'comprehensive-research' | 'trusted-guidance'
  title: string
  description: string
}

export const BANK_TOTAL_QUESTIONS = 6

export const BANK_ACCOUNT_TYPE_OPTIONS: BankAccountTypeOption[] = [
  { value: 'cds', label: 'CDs' },
  { value: 'checking', label: 'Checking' },
  { value: 'savings', label: 'Savings' },
  { value: 'money-market', label: 'Money Market' },
]

export const BANK_BALANCE_OPTIONS = [
  { label: '$5,000', value: '5000' },
  { label: '$10,000', value: '10000' },
  { label: '$15,000', value: '15000' },
]

export const BANK_BALANCE_VALIDATION = {
  min: 0,
  max: 100000,
  errorMsg: 'Value must be less than $100,000',
}

export const BANK_CONSIDERATION_OPTIONS: BankConsiderationOption[] = [
  { value: 'apy', label: 'APY' },
  { value: 'minimum-deposit', label: 'Minimum Deposit Amount' },
]

export const BANK_SERVICE_OPTIONS: BankingServiceOption[] = [
  { value: 'credit-cards', label: 'Credit Cards' },
  { value: 'mortgages', label: 'Mortgages' },
  { value: 'personal-loans', label: 'Personal loans' },
  { value: 'investing', label: 'Investing' },
]

export const BANK_VALUE_PROPS: BankValueProp[] = [
  {
    id: 'proprietary-data',
    title: 'Proprietary Data',
    description:
      'Our ratings are powered by our own data insights and best-in-class methodologies.',
  },
  {
    id: 'comprehensive-research',
    title: 'Comprehensive Research',
    description:
      'We analyze thousands of data points across hundreds of banks to create informed recommendations.',
  },
  {
    id: 'trusted-guidance',
    title: 'Trusted Guidance',
    description:
      'Our team of experts has done the work for you. Join the hundreds who have found the best bank accounts for their needs.',
  },
]
