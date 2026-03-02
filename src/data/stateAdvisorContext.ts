/**
 * State-specific financial advisor context for the ZIP step.
 *
 * Each entry provides a single dynamic line that replaces the generic
 * "State tax rules can significantly impact how new wealth is positioned."
 *
 * Pattern: [Key tax fact]. [What advisors in that state typically focus on].
 *
 * Sources: Tax Foundation (2024), state revenue departments.
 * Review annually — rates change with legislative sessions.
 */

export interface StateAdvisorContext {
  /** The dynamic supporting copy shown below the zip input */
  guidance: string;
  /** Short tax profile tag (for potential future use in cards/tooltips) */
  taxTag: string;
}

export const stateAdvisorContext: Record<string, StateAdvisorContext> = {
  // --- No income tax states ---
  AK: {
    guidance:
      "Alaska has no state income tax and no sales tax. Advisors here often focus on maximizing investment growth and navigating unique cost-of-living factors.",
    taxTag: "No income tax",
  },
  FL: {
    guidance:
      "Florida has no state income tax. Advisors here often focus on retirement income positioning and estate planning strategies.",
    taxTag: "No income tax",
  },
  NV: {
    guidance:
      "Nevada has no state income tax. Advisors here often focus on business structuring and maximizing tax-free investment growth.",
    taxTag: "No income tax",
  },
  NH: {
    guidance:
      "New Hampshire has no tax on earned income — only interest and dividends. Advisors here often focus on portfolio structuring to minimize dividend exposure.",
    taxTag: "No earned income tax",
  },
  SD: {
    guidance:
      "South Dakota has no state income tax and is one of the top trust-friendly states in the U.S. Advisors here often focus on trust planning and asset protection.",
    taxTag: "No income tax",
  },
  TN: {
    guidance:
      "Tennessee has no state income tax. Advisors here often focus on retirement income strategies and cross-state tax planning for transplants.",
    taxTag: "No income tax",
  },
  TX: {
    guidance:
      "Texas has no state income tax. Advisors here often focus on maximizing that advantage through investment positioning and property tax planning.",
    taxTag: "No income tax",
  },
  WA: {
    guidance:
      "Washington has no state income tax but does tax capital gains above $250K at 7%. Advisors here often focus on capital gains timing and deferral strategies.",
    taxTag: "No income tax · Cap gains 7%",
  },
  WY: {
    guidance:
      "Wyoming has no state income tax and strong asset protection laws. Advisors here often focus on trust structures and ranch/land estate planning.",
    taxTag: "No income tax",
  },

  // --- High tax states ---
  CA: {
    guidance:
      "California's top marginal rate is 13.3% — the highest in the U.S. Advisors here often prioritize tax-loss harvesting, Roth conversions, and sheltering strategies.",
    taxTag: "Top rate 13.3%",
  },
  NY: {
    guidance:
      "New York's top state rate is 10.9%, and NYC adds up to 3.876% more. Advisors here often focus on residency planning and multi-state income allocation.",
    taxTag: "Top rate 10.9% + NYC",
  },
  NJ: {
    guidance:
      "New Jersey's top rate is 10.75% and it has an estate tax. Advisors here often focus on estate planning and cross-border strategies with NY and PA.",
    taxTag: "Top rate 10.75% · Estate tax",
  },
  HI: {
    guidance:
      "Hawaii's top rate is 11% with a high cost of living. Advisors here often focus on retirement income efficiency and managing concentrated real estate holdings.",
    taxTag: "Top rate 11%",
  },
  OR: {
    guidance:
      "Oregon's top rate is 9.9% with no sales tax. Advisors here often focus on income timing strategies and maximizing the no-sales-tax advantage for retirees.",
    taxTag: "Top rate 9.9% · No sales tax",
  },
  MN: {
    guidance:
      "Minnesota's top rate is 9.85% and it has an estate tax. Advisors here often focus on estate threshold planning and charitable giving strategies.",
    taxTag: "Top rate 9.85% · Estate tax",
  },
  VT: {
    guidance:
      "Vermont's top rate is 8.75% and it has an estate tax. Advisors here often focus on estate planning and retirement income sequencing.",
    taxTag: "Top rate 8.75% · Estate tax",
  },
  DC: {
    guidance:
      "D.C.'s top rate is 10.75% and it has an estate tax. Advisors here often focus on federal employee benefits optimization and estate threshold planning.",
    taxTag: "Top rate 10.75% · Estate tax",
  },

  // --- Moderate / progressive tax states ---
  CT: {
    guidance:
      "Connecticut's top rate is 6.99% and it has both estate and gift taxes. Advisors here often focus on estate planning and cross-border strategies with NY.",
    taxTag: "Top rate 6.99% · Estate tax",
  },
  DE: {
    guidance:
      "Delaware has no sales tax and moderate income tax (2.2%–6.6%). Advisors here often focus on tax-efficient income strategies and cross-state planning.",
    taxTag: "Top rate 6.6% · No sales tax",
  },
  MA: {
    guidance:
      "Massachusetts has a 5% flat tax plus a 4% surtax on income over $1M, and an estate tax. Advisors here often focus on millionaire surtax planning and Roth strategies.",
    taxTag: "5% + 4% surtax · Estate tax",
  },
  MD: {
    guidance:
      "Maryland has both an estate and inheritance tax — one of few states with both. Advisors here often focus on estate planning and beneficiary structuring.",
    taxTag: "Top rate 5.75% · Estate + inheritance tax",
  },
  ME: {
    guidance:
      "Maine's top rate is 7.15% and it has an estate tax. Advisors here often focus on retirement income planning and seasonal residency strategies.",
    taxTag: "Top rate 7.15% · Estate tax",
  },
  RI: {
    guidance:
      "Rhode Island's top rate is 5.99% and it has an estate tax. Advisors here often focus on estate threshold planning and Social Security optimization.",
    taxTag: "Top rate 5.99% · Estate tax",
  },
  WV: {
    guidance:
      "West Virginia's top rate is 5.12% and is gradually reducing. Advisors here often focus on retirement income planning and Social Security tax efficiency.",
    taxTag: "Top rate 5.12%",
  },
  VA: {
    guidance:
      "Virginia's top rate is 5.75% starting at just $17K of income. Advisors here often focus on federal employee benefits (TSP, FERS) and military retirement planning.",
    taxTag: "Top rate 5.75%",
  },
  PA: {
    guidance:
      "Pennsylvania has a flat 3.07% income tax and an inheritance tax. Advisors here often focus on inheritance planning and beneficiary designations.",
    taxTag: "Flat 3.07% · Inheritance tax",
  },

  // --- Flat tax states ---
  IL: {
    guidance:
      "Illinois has a flat 4.95% income tax and an estate tax. Advisors here often focus on estate planning and managing property tax burdens alongside income strategies.",
    taxTag: "Flat 4.95% · Estate tax",
  },
  IN: {
    guidance:
      "Indiana has a flat 3.05% income tax — one of the lowest flat rates. Advisors here often focus on maximizing retirement contributions and Roth conversion windows.",
    taxTag: "Flat 3.05%",
  },
  MI: {
    guidance:
      "Michigan has a flat 4.25% income tax. Advisors here often focus on pension income planning and auto-industry retirement benefit optimization.",
    taxTag: "Flat 4.25%",
  },
  NC: {
    guidance:
      "North Carolina has a flat 4.5% income tax, trending lower. Advisors here often focus on retirement relocation planning and military benefit optimization.",
    taxTag: "Flat 4.5%",
  },
  CO: {
    guidance:
      "Colorado has a flat 4.4% income tax. Advisors here often focus on retirement income planning — Colorado partially exempts Social Security and pension income.",
    taxTag: "Flat 4.4%",
  },
  UT: {
    guidance:
      "Utah has a flat 4.65% income tax. Advisors here often focus on large-family tax planning and retirement savings strategies.",
    taxTag: "Flat 4.65%",
  },
  AZ: {
    guidance:
      "Arizona has a flat 2.5% income tax — one of the lowest in the country. Advisors here often focus on retirement relocation advantages and estate planning.",
    taxTag: "Flat 2.5%",
  },
  GA: {
    guidance:
      "Georgia's top rate is 5.49% and moving toward a flat tax. Advisors here often focus on business owner strategies and retirement income positioning.",
    taxTag: "Top rate 5.49%",
  },
  ID: {
    guidance:
      "Idaho has a flat 5.695% income tax. Advisors here often focus on agricultural business planning and retirement income strategies for transplants from higher-tax states.",
    taxTag: "Flat 5.695%",
  },
  KY: {
    guidance:
      "Kentucky has a flat 4% income tax and an inheritance tax. Advisors here often focus on inheritance planning and pension income strategies.",
    taxTag: "Flat 4% · Inheritance tax",
  },
  IA: {
    guidance:
      "Iowa has a flat 3.8% income tax and an inheritance tax. Advisors here often focus on farm succession planning and inheritance structuring.",
    taxTag: "Flat 3.8% · Inheritance tax",
  },
  MS: {
    guidance:
      "Mississippi's top rate is 5% with the first $10K exempt. Advisors here often focus on retirement income planning and Social Security optimization.",
    taxTag: "Top rate 5%",
  },
  MO: {
    guidance:
      "Missouri's top rate is 4.8% and trending lower. Advisors here often focus on cross-border strategies with Kansas and retirement income planning.",
    taxTag: "Top rate 4.8%",
  },
  MT: {
    guidance:
      "Montana's top rate is 5.9% with no sales tax. Advisors here often focus on ranch/land estate planning and leveraging the no-sales-tax advantage.",
    taxTag: "Top rate 5.9% · No sales tax",
  },
  NE: {
    guidance:
      "Nebraska's top rate is 5.84% and it has an inheritance tax. Advisors here often focus on agricultural succession and inheritance tax minimization.",
    taxTag: "Top rate 5.84% · Inheritance tax",
  },
  NM: {
    guidance:
      "New Mexico's top rate is 5.9%. Advisors here often focus on retirement-friendly exemptions — the state exempts much of Social Security and pension income.",
    taxTag: "Top rate 5.9%",
  },
  ND: {
    guidance:
      "North Dakota has a flat 1.95% income tax — one of the lowest in the country. Advisors here often focus on energy-sector wealth planning and farm succession.",
    taxTag: "Flat 1.95%",
  },
  OH: {
    guidance:
      "Ohio's top rate is 3.5% with the first $26K exempt. Advisors here often focus on business income deductions and municipal tax coordination.",
    taxTag: "Top rate 3.5%",
  },
  OK: {
    guidance:
      "Oklahoma's top rate is 4.75%. Advisors here often focus on energy-sector wealth management and retirement income planning.",
    taxTag: "Top rate 4.75%",
  },
  SC: {
    guidance:
      "South Carolina's top rate is 6.4% but offers generous retirement income exemptions. Advisors here often focus on retirement relocation planning and military benefits.",
    taxTag: "Top rate 6.4%",
  },
  WI: {
    guidance:
      "Wisconsin's top rate is 7.65%. Advisors here often focus on retirement income sequencing and managing the impact of required minimum distributions.",
    taxTag: "Top rate 7.65%",
  },
  AL: {
    guidance:
      "Alabama's top rate is 5% and it allows a federal tax deduction on state returns. Advisors here often focus on leveraging that deduction and retirement income planning.",
    taxTag: "Top rate 5% · Fed deduction",
  },
  AR: {
    guidance:
      "Arkansas's top rate is 3.9% and trending lower. Advisors here often focus on retirement income strategies and small business planning.",
    taxTag: "Top rate 3.9%",
  },
  KS: {
    guidance:
      "Kansas's top rate is 5.7%. Advisors here often focus on cross-border planning with Missouri and Social Security taxation strategies.",
    taxTag: "Top rate 5.7%",
  },
  LA: {
    guidance:
      "Louisiana's top rate is 4.25%. Advisors here often focus on energy-sector wealth planning and retirement income positioning.",
    taxTag: "Top rate 4.25%",
  },
};

/**
 * Fallback for territories, APO/FPO, or unmapped zips.
 */
export const defaultAdvisorContext: StateAdvisorContext = {
  guidance:
    "State tax rules can significantly impact how new wealth is positioned. Your ZIP helps us account for that.",
  taxTag: "—",
};

/**
 * Look up advisor context by state abbreviation.
 * Returns the default if state is not found.
 */
export function getAdvisorContext(stateAbbr: string): StateAdvisorContext {
  return stateAdvisorContext[stateAbbr.toUpperCase()] ?? defaultAdvisorContext;
}
