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

export const ACCOUNT_TYPE_LABELS: Record<BankAccountType, string> = {
  cds: 'CD',
  checking: 'Checking',
  savings: 'Savings',
  'money-market': 'Money Market',
}

export const ACCOUNT_SUBTYPES: Record<BankAccountType, string[]> = {
  checking: ['Business Checking', 'Student Checking', 'Consumer Checking'],
  savings: ['High-Yield Savings', 'Traditional Savings', 'Kids Savings'],
  cds: ['Standard CD', 'No-Penalty CD', 'Jumbo CD'],
  'money-market': ['High-Yield Money Market', 'Business Money Market', 'Standard Money Market'],
}

export interface BankProduct {
  id: string
  name: string
  logoUrl: string
  category: string
  apy: string
  apyDate: string
  bonus: string
  bonusDetails: string
  monthlyFee: string
  estEarnings: string
  memberFdic: boolean
  websiteName: string
  learnMoreUrl: string
  offerDetailsUrl: string
}

export const MOCK_BANK_PRODUCTS: BankProduct[] = [
  {
    id: '1',
    name: 'Novo Business Banking',
    logoUrl: '/novo-logo.svg',
    category: 'Checking',
    apy: 'N/A',
    apyDate: 'Jan. 20, 2025',
    bonus: 'N/A',
    bonusDetails: 'Up to $360 per year.\nSee website for details.',
    monthlyFee: '$0.00',
    estEarnings: 'N/A',
    memberFdic: true,
    websiteName: "Novo's Website",
    learnMoreUrl: '#',
    offerDetailsUrl: '#',
  },
  {
    id: '2',
    name: 'Axos Bank Rewards Checking',
    logoUrl: '/axos-logo.svg',
    category: 'Checking',
    apy: '3.30%',
    apyDate: 'Jan. 20, 2025',
    bonus: '$300',
    bonusDetails: 'With qualifying activities.\nSee website for details.',
    monthlyFee: '$0.00',
    estEarnings: '$660',
    memberFdic: true,
    websiteName: "Axos's Website",
    learnMoreUrl: '#',
    offerDetailsUrl: '#',
  },
  {
    id: '3',
    name: 'Quontic High Interest Checking',
    logoUrl: '/quontic-logo.svg',
    category: 'Checking',
    apy: '1.50%',
    apyDate: 'Jan. 20, 2025',
    bonus: 'N/A',
    bonusDetails: 'No sign-up bonus.\nSee website for details.',
    monthlyFee: '$0.00',
    estEarnings: '$300',
    memberFdic: true,
    websiteName: "Quontic's Website",
    learnMoreUrl: '#',
    offerDetailsUrl: '#',
  },
  {
    id: '4',
    name: 'LendingClub Rewards Checking',
    logoUrl: '/lendingclub-logo.svg',
    category: 'Checking',
    apy: '2.00%',
    apyDate: 'Jan. 20, 2025',
    bonus: '$50',
    bonusDetails: 'With direct deposit.\nSee website for details.',
    monthlyFee: '$0.00',
    estEarnings: '$400',
    memberFdic: true,
    websiteName: "LendingClub's Website",
    learnMoreUrl: '#',
    offerDetailsUrl: '#',
  },
  {
    id: '5',
    name: 'Discover Cashback Debit',
    logoUrl: '/discover-logo.svg',
    category: 'Checking',
    apy: 'N/A',
    apyDate: 'Jan. 20, 2025',
    bonus: 'N/A',
    bonusDetails: '1% cashback on debit.\nSee website for details.',
    monthlyFee: '$0.00',
    estEarnings: 'N/A',
    memberFdic: true,
    websiteName: "Discover's Website",
    learnMoreUrl: '#',
    offerDetailsUrl: '#',
  },
]

export const BANK_FAQ_ITEMS = [
  {
    question: 'How much does debt relief cost?',
    answer:
      'This depends on the materials that make up your gutters. Most gutters are made from galvanized steel, vinyl or aluminum, and these last around 20 years. Copper gutters are a higher-end option that lasts as long as 50 years. Of course, these lifespans assume regular maintenance and cleaning, in addition to promptly conducting necessary repairs.',
  },
  {
    question: 'What percentage of a debt is typically accepted in a settlement?',
    answer:
      'Typically, a creditor will agree to accept 40% to 50% of the debt you owe, although it could be as much as 80%. In all cases, your ability to come up with a lump sum payment is key.',
  },
  {
    question: 'How long does debt settlement take?',
    answer:
      'Debt settlement programs typically take 2 to 4 years. The timeline depends on how much debt you have, how much you can save each month, and your creditors\' willingness to negotiate.',
  },
  {
    question: 'How much does debt relief affect your credit score?',
    answer:
      'Debt relief can lower your credit score by 100 points or more initially. However, if you\'re already behind on payments, the impact may be less significant, and your score can recover over time.',
  },
  {
    question: 'How long does debt settlement stay on your credit report?',
    answer:
      'Settled debts remain on your credit report for 7 years from the date of the original delinquency. After that period, they are automatically removed.',
  },
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
