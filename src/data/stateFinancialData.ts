/**
 * State financial data including retirement savings and income tax information.
 */
export interface StateFinancialData {
  name: string
  avgRetirementSavings: string
  hasStateIncomeTax: boolean
  topMarginalRate: string | null
}

export const defaultStateData: StateFinancialData = {
  name: 'your state',
  avgRetirementSavings: '$125,000',
  hasStateIncomeTax: true,
  topMarginalRate: null,
}

export const stateFinancialData: Record<string, StateFinancialData> = {
  AL: { name: 'Alabama', avgRetirementSavings: '$98,000', hasStateIncomeTax: true, topMarginalRate: '5' },
  AK: { name: 'Alaska', avgRetirementSavings: '$112,000', hasStateIncomeTax: false, topMarginalRate: null },
  AZ: { name: 'Arizona', avgRetirementSavings: '$108,000', hasStateIncomeTax: true, topMarginalRate: '2.5' },
  AR: { name: 'Arkansas', avgRetirementSavings: '$92,000', hasStateIncomeTax: true, topMarginalRate: '4.4' },
  CA: { name: 'California', avgRetirementSavings: '$156,000', hasStateIncomeTax: true, topMarginalRate: '13.3' },
  CO: { name: 'Colorado', avgRetirementSavings: '$124,000', hasStateIncomeTax: true, topMarginalRate: '4.4' },
  CT: { name: 'Connecticut', avgRetirementSavings: '$158,000', hasStateIncomeTax: true, topMarginalRate: '6.99' },
  DE: { name: 'Delaware', avgRetirementSavings: '$122,000', hasStateIncomeTax: true, topMarginalRate: '6.6' },
  FL: { name: 'Florida', avgRetirementSavings: '$132,000', hasStateIncomeTax: false, topMarginalRate: null },
  GA: { name: 'Georgia', avgRetirementSavings: '$106,000', hasStateIncomeTax: true, topMarginalRate: '5.49' },
  HI: { name: 'Hawaii', avgRetirementSavings: '$134,000', hasStateIncomeTax: true, topMarginalRate: '11' },
  ID: { name: 'Idaho', avgRetirementSavings: '$102,000', hasStateIncomeTax: true, topMarginalRate: '5.8' },
  IL: { name: 'Illinois', avgRetirementSavings: '$128,000', hasStateIncomeTax: true, topMarginalRate: '4.95' },
  IN: { name: 'Indiana', avgRetirementSavings: '$100,000', hasStateIncomeTax: true, topMarginalRate: '3.05' },
  IA: { name: 'Iowa', avgRetirementSavings: '$116,000', hasStateIncomeTax: true, topMarginalRate: '5.7' },
  KS: { name: 'Kansas', avgRetirementSavings: '$104,000', hasStateIncomeTax: true, topMarginalRate: '5.7' },
  KY: { name: 'Kentucky', avgRetirementSavings: '$94,000', hasStateIncomeTax: true, topMarginalRate: '4' },
  LA: { name: 'Louisiana', avgRetirementSavings: '$88,000', hasStateIncomeTax: true, topMarginalRate: '4.25' },
  ME: { name: 'Maine', avgRetirementSavings: '$118,000', hasStateIncomeTax: true, topMarginalRate: '7.15' },
  MD: { name: 'Maryland', avgRetirementSavings: '$152,000', hasStateIncomeTax: true, topMarginalRate: '5.75' },
  MA: { name: 'Massachusetts', avgRetirementSavings: '$154,000', hasStateIncomeTax: true, topMarginalRate: '9' },
  MI: { name: 'Michigan', avgRetirementSavings: '$110,000', hasStateIncomeTax: true, topMarginalRate: '4.25' },
  MN: { name: 'Minnesota', avgRetirementSavings: '$136,000', hasStateIncomeTax: true, topMarginalRate: '9.85' },
  MS: { name: 'Mississippi', avgRetirementSavings: '$86,000', hasStateIncomeTax: true, topMarginalRate: '4.7' },
  MO: { name: 'Missouri', avgRetirementSavings: '$100,000', hasStateIncomeTax: true, topMarginalRate: '4.8' },
  MT: { name: 'Montana', avgRetirementSavings: '$108,000', hasStateIncomeTax: true, topMarginalRate: '5.9' },
  NE: { name: 'Nebraska', avgRetirementSavings: '$114,000', hasStateIncomeTax: true, topMarginalRate: '5.84' },
  NV: { name: 'Nevada', avgRetirementSavings: '$118,000', hasStateIncomeTax: false, topMarginalRate: null },
  NH: { name: 'New Hampshire', avgRetirementSavings: '$130,000', hasStateIncomeTax: false, topMarginalRate: null },
  NJ: { name: 'New Jersey', avgRetirementSavings: '$148,000', hasStateIncomeTax: true, topMarginalRate: '10.75' },
  NM: { name: 'New Mexico', avgRetirementSavings: '$96,000', hasStateIncomeTax: true, topMarginalRate: '5.9' },
  NY: { name: 'New York', avgRetirementSavings: '$142,000', hasStateIncomeTax: true, topMarginalRate: '10.9' },
  NC: { name: 'North Carolina', avgRetirementSavings: '$112,000', hasStateIncomeTax: true, topMarginalRate: '4.5' },
  ND: { name: 'North Dakota', avgRetirementSavings: '$120,000', hasStateIncomeTax: true, topMarginalRate: '2.5' },
  OH: { name: 'Ohio', avgRetirementSavings: '$102,000', hasStateIncomeTax: true, topMarginalRate: '3.5' },
  OK: { name: 'Oklahoma', avgRetirementSavings: '$94,000', hasStateIncomeTax: true, topMarginalRate: '4.75' },
  OR: { name: 'Oregon', avgRetirementSavings: '$130,000', hasStateIncomeTax: true, topMarginalRate: '9.9' },
  PA: { name: 'Pennsylvania', avgRetirementSavings: '$118,000', hasStateIncomeTax: true, topMarginalRate: '3.07' },
  RI: { name: 'Rhode Island', avgRetirementSavings: '$126,000', hasStateIncomeTax: true, topMarginalRate: '5.99' },
  SC: { name: 'South Carolina', avgRetirementSavings: '$98,000', hasStateIncomeTax: true, topMarginalRate: '6.4' },
  SD: { name: 'South Dakota', avgRetirementSavings: '$110,000', hasStateIncomeTax: false, topMarginalRate: null },
  TN: { name: 'Tennessee', avgRetirementSavings: '$104,000', hasStateIncomeTax: false, topMarginalRate: null },
  TX: { name: 'Texas', avgRetirementSavings: '$126,000', hasStateIncomeTax: false, topMarginalRate: null },
  UT: { name: 'Utah', avgRetirementSavings: '$116,000', hasStateIncomeTax: true, topMarginalRate: '4.65' },
  VT: { name: 'Vermont', avgRetirementSavings: '$128,000', hasStateIncomeTax: true, topMarginalRate: '8.75' },
  VA: { name: 'Virginia', avgRetirementSavings: '$138,000', hasStateIncomeTax: true, topMarginalRate: '5.75' },
  WA: { name: 'Washington', avgRetirementSavings: '$138,000', hasStateIncomeTax: false, topMarginalRate: null },
  WV: { name: 'West Virginia', avgRetirementSavings: '$90,000', hasStateIncomeTax: true, topMarginalRate: '5.12' },
  WI: { name: 'Wisconsin', avgRetirementSavings: '$122,000', hasStateIncomeTax: true, topMarginalRate: '7.65' },
  WY: { name: 'Wyoming', avgRetirementSavings: '$114,000', hasStateIncomeTax: false, topMarginalRate: null },
  DC: { name: 'District of Columbia', avgRetirementSavings: '$152,000', hasStateIncomeTax: true, topMarginalRate: '10.75' },
}

export function getStateFinancialData(stateAbbr: string): StateFinancialData {
  const key = stateAbbr.toUpperCase()
  return stateFinancialData[key] ?? defaultStateData
}
