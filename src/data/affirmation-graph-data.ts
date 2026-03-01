import type { MotivationDriver, AgeRange } from '@/types/fa-funnel'

export type GraphType = 'accumulation' | 'drawdown' | 'preservation'

export interface GraphConfig {
  headline: string
  stat: string
  source: string
  xStart: number
  xEnd: number
  type: GraphType
  endpointWithLabel: string
  endpointWithoutLabel: string
  yAxisLabels?: string[]
}

export interface AffirmationVariantGraph {
  graph: GraphConfig
  benchmark: string
}

// ---------------------------------------------------------------------------
// Graph + benchmark data for all 25 motivation × age variants.
// Headline & body copy live in AFFIRMATION_CONTENT (fa-funnel.ts).
// ---------------------------------------------------------------------------

export const AFFIRMATION_GRAPH_DATA: Record<
  MotivationDriver,
  Record<AgeRange, AffirmationVariantGraph>
> = {
  // ===== BEHIND RETIREMENT =====
  behind_retirement: {
    under_30: {
      graph: {
        headline: 'Starting with an advisor in your 20s',
        stat: 'People who work with an advisor accumulate 2.7\u00d7 more retirement wealth over 30 years.',
        source: 'Vanguard, 2024',
        xStart: 25,
        xEnd: 65,
        type: 'accumulation',
        endpointWithLabel: '~$1.2M',
        endpointWithoutLabel: '~$450K',
        yAxisLabels: ['$0', '$400K', '$800K', '$1.2M'],
      },
      benchmark:
        'At 25, the goal is 1\u00d7 your salary saved for retirement. You have time \u2014 but starting now is the multiplier.',
    },
    thirties: {
      graph: {
        headline: 'Starting with an advisor at 30',
        stat: 'People who work with an advisor accumulate 2.7\u00d7 more wealth.',
        source: 'Vanguard, 2024',
        xStart: 30,
        xEnd: 65,
        type: 'accumulation',
        endpointWithLabel: '~$980K',
        endpointWithoutLabel: '~$380K',
        yAxisLabels: ['$0', '$300K', '$600K', '$1M'],
      },
      benchmark:
        'By 35, most advisors recommend 2\u00d7 your annual salary saved. The gap between where you are and where you should be is closable.',
    },
    forties: {
      graph: {
        headline: 'Starting with an advisor at 40',
        stat: '25 years of compounding advisor impact.',
        source: 'Vanguard, 2024',
        xStart: 40,
        xEnd: 65,
        type: 'accumulation',
        endpointWithLabel: '~$720K',
        endpointWithoutLabel: '~$340K',
        yAxisLabels: ['$0', '$250K', '$500K', '$750K'],
      },
      benchmark:
        "By 45, the benchmark is 4\u00d7 your annual salary. If you\u2019re behind, this is the decade where catch-up strategies matter most.",
    },
    fifties: {
      graph: {
        headline: 'The catch-up window starts now',
        stat: 'Advisor-managed catch-up strategies can close the gap faster than you think.',
        source: 'Vanguard, 2024',
        xStart: 50,
        xEnd: 70,
        type: 'accumulation',
        endpointWithLabel: '~$520K',
        endpointWithoutLabel: '~$310K',
        yAxisLabels: ['$0', '$200K', '$400K', '$600K'],
      },
      benchmark:
        "By 55, the target is 7\u00d7 your salary. That sounds like a lot \u2014 but catch-up contributions and the right strategy can close the gap fast.",
    },
    sixties: {
      graph: {
        headline: "It\u2019s about making your money last",
        stat: 'The right withdrawal strategy can extend your savings by 5\u201310 years in retirement.',
        source: 'Morningstar, 2023',
        xStart: 60,
        xEnd: 80,
        type: 'drawdown',
        endpointWithLabel: 'Lasts past 85',
        endpointWithoutLabel: 'Runs out at 74',
      },
      benchmark:
        "By 65, most advisors recommend 10\u00d7 your salary saved \u2014 or a clear drawdown plan that makes what you have last.",
    },
  },

  // ===== FAMILY PROTECTION =====
  family_protection: {
    under_30: {
      graph: {
        headline: 'Starting protection planning in your 20s',
        stat: 'Early coverage locks in lower premiums and builds a 40-year safety net.',
        source: 'LIMRA, 2023',
        xStart: 25,
        xEnd: 65,
        type: 'accumulation',
        endpointWithLabel: '~$1.8M coverage',
        endpointWithoutLabel: '~$600K coverage',
        yAxisLabels: ['$0', '$600K', '$1.2M', '$1.8M'],
      },
      benchmark:
        'At your age, most advisors recommend coverage equal to 10\u00d7 your income to protect your family\u2019s future.',
    },
    thirties: {
      graph: {
        headline: 'Protection planning starting at 30',
        stat: 'Families who work with an advisor close an average of 3 coverage gaps in the first year.',
        source: 'LIMRA, 2023',
        xStart: 30,
        xEnd: 65,
        type: 'accumulation',
        endpointWithLabel: 'Fully covered',
        endpointWithoutLabel: '2\u20133 critical gaps',
      },
      benchmark:
        'With a growing family, the benchmark is 10\u201312\u00d7 your income in total protection \u2014 life insurance, estate plan, emergency reserves.',
    },
    forties: {
      graph: {
        headline: 'Closing protection gaps in your 40s',
        stat: 'Most families in their 40s have at least one critical coverage gap.',
        source: 'LIMRA, 2023',
        xStart: 40,
        xEnd: 65,
        type: 'accumulation',
        endpointWithLabel: 'Full coverage',
        endpointWithoutLabel: '1\u20132 unaddressed gaps',
      },
      benchmark:
        'By your 40s, protection planning should cover mortgage, education, and 10+ years of income replacement. Most families have at least one gap.',
    },
    fifties: {
      graph: {
        headline: 'Preservation planning in your 50s',
        stat: "60% of Americans don\u2019t have an updated estate plan.",
        source: 'Caring.com, 2024',
        xStart: 50,
        xEnd: 70,
        type: 'preservation',
        endpointWithLabel: 'Protected estate',
        endpointWithoutLabel: 'Unstructured transfer',
      },
      benchmark:
        'At this stage, protection shifts toward estate planning, survivorship, and making sure your assets transfer the way you intend.',
    },
    sixties: {
      graph: {
        headline: 'Legacy planning after 60',
        stat: 'Families with a structured estate plan transfer 3\u00d7 more wealth to the next generation.',
        source: 'CFP Board, 2023',
        xStart: 60,
        xEnd: 80,
        type: 'preservation',
        endpointWithLabel: 'Structured legacy',
        endpointWithoutLabel: 'Unplanned distribution',
      },
      benchmark:
        'After 60, the focus is legacy \u2014 estate documents, wealth transfer strategy, and making sure nothing is left to chance.',
    },
  },

  // ===== WINDFALL =====
  windfall: {
    under_30: {
      graph: {
        headline: 'Positioning new wealth in your 20s',
        stat: '70% of windfall recipients lose their new wealth within a few years without a plan.',
        source: 'NEFE, 2023',
        xStart: 25,
        xEnd: 65,
        type: 'accumulation',
        endpointWithLabel: '~$2.5M',
        endpointWithoutLabel: '~$180K',
        yAxisLabels: ['$0', '$800K', '$1.6M', '$2.5M'],
      },
      benchmark:
        'Most windfalls are gone within 5 years without a plan. At your age, the right positioning turns new money into generational wealth.',
    },
    thirties: {
      graph: {
        headline: 'Managing new wealth starting at 30',
        stat: 'The first 12 months after a windfall determine 80% of its long-term outcome.',
        source: 'NEFE, 2023',
        xStart: 30,
        xEnd: 65,
        type: 'accumulation',
        endpointWithLabel: '~$1.8M',
        endpointWithoutLabel: '~$250K',
        yAxisLabels: ['$0', '$600K', '$1.2M', '$1.8M'],
      },
      benchmark:
        '70% of windfalls are spent within a few years. At 30, a structured plan can turn this into decades of compounding growth.',
    },
    forties: {
      graph: {
        headline: 'Windfall positioning in your 40s',
        stat: 'Proper positioning in year one preserves an average of 40% more long-term value.',
        source: 'NEFE, 2023',
        xStart: 40,
        xEnd: 65,
        type: 'accumulation',
        endpointWithLabel: '~$1.2M',
        endpointWithoutLabel: '~$350K',
        yAxisLabels: ['$0', '$400K', '$800K', '$1.2M'],
      },
      benchmark:
        'At your age, a windfall can reshape your entire retirement timeline \u2014 if it\u2019s positioned correctly in the first 12 months.',
    },
    fifties: {
      graph: {
        headline: 'Windfall positioning in your 50s',
        stat: 'Tax-efficient positioning can save 15\u201325% of a windfall\u2019s value in the first year.',
        source: 'Morningstar, 2023',
        xStart: 50,
        xEnd: 70,
        type: 'accumulation',
        endpointWithLabel: '~$800K preserved',
        endpointWithoutLabel: '~$500K after tax drag',
        yAxisLabels: ['$0', '$300K', '$600K', '$800K'],
      },
      benchmark:
        'A windfall in your 50s can close your retirement gap entirely \u2014 but only if the tax and positioning decisions happen upfront.',
    },
    sixties: {
      graph: {
        headline: 'Preserving new wealth after 60',
        stat: 'Estate-structured windfalls transfer 3\u00d7 more to the next generation.',
        source: 'CFP Board, 2023',
        xStart: 60,
        xEnd: 80,
        type: 'preservation',
        endpointWithLabel: 'Structured preservation',
        endpointWithoutLabel: 'Unmanaged erosion',
      },
      benchmark:
        'At this stage, protecting a windfall matters more than growing it. The right structure ensures it serves you and your family long-term.',
    },
  },

  // ===== OPTIMIZATION =====
  optimization: {
    under_30: {
      graph: {
        headline: 'Optimization impact starting in your 20s',
        stat: 'Even $3,000/year in recovered value compounds to six figures over 30 years.',
        source: 'Vanguard, 2024',
        xStart: 25,
        xEnd: 65,
        type: 'accumulation',
        endpointWithLabel: '~$280K captured',
        endpointWithoutLabel: '$0 (left on table)',
        yAxisLabels: ['$0', '$100K', '$200K', '$300K'],
      },
      benchmark:
        'The average household loses $2,000\u2013$5,000/year to suboptimal tax strategy alone. At your age, that compounds into six figures over time.',
    },
    thirties: {
      graph: {
        headline: 'Optimization impact starting at 30',
        stat: '$5,000/year in recovered value = $450K+ over 35 years at average market returns.',
        source: 'Vanguard, 2024',
        xStart: 30,
        xEnd: 65,
        type: 'accumulation',
        endpointWithLabel: '~$450K captured',
        endpointWithoutLabel: '$0',
        yAxisLabels: ['$0', '$150K', '$300K', '$450K'],
      },
      benchmark:
        'By 30, most people have 3\u20135 accounts with no coordinated strategy. The average leakage is $3,000\u2013$7,000/year in missed opportunities.',
    },
    forties: {
      graph: {
        headline: 'Optimization impact starting at 40',
        stat: 'The average household leaves $5,000\u2013$10,000/year on the table through missed tax and allocation opportunities.',
        source: 'Vanguard, 2024',
        xStart: 40,
        xEnd: 65,
        type: 'accumulation',
        endpointWithLabel: '~$350K captured',
        endpointWithoutLabel: '$0',
        yAxisLabels: ['$0', '$120K', '$240K', '$350K'],
      },
      benchmark:
        'In your 40s, the optimization surface area peaks \u2014 retirement contributions, tax strategy, mortgage, and allocation. Most households leave $5,000\u2013$10,000/year on the table.',
    },
    fifties: {
      graph: {
        headline: 'Peak optimization window: your 50s',
        stat: 'Roth conversions, catch-up contributions, and Social Security timing can add $100K\u2013$300K in retirement value.',
        source: 'Morningstar, 2023',
        xStart: 50,
        xEnd: 70,
        type: 'accumulation',
        endpointWithLabel: '~$250K captured',
        endpointWithoutLabel: '$0',
        yAxisLabels: ['$0', '$80K', '$160K', '$250K'],
      },
      benchmark:
        'The 50s are the highest-impact decade for optimization \u2014 catch-up contributions, Roth conversions, and Social Security timing all converge.',
    },
    sixties: {
      graph: {
        headline: 'Drawdown optimization after 60',
        stat: 'Tax-efficient withdrawal sequencing can save $50K\u2013$150K over a 20-year retirement.',
        source: 'Morningstar, 2023',
        xStart: 60,
        xEnd: 80,
        type: 'drawdown',
        endpointWithLabel: 'Lasts to 87',
        endpointWithoutLabel: 'Runs out at 79',
      },
      benchmark:
        'After 60, optimization shifts to withdrawal sequencing and tax-efficient drawdown. The right strategy can save tens of thousands over a 20-year retirement.',
    },
  },

  // ===== PLAN REVIEW =====
  plan_review: {
    under_30: {
      graph: {
        headline: 'The impact of a professional review in your 20s',
        stat: 'Most people who get a plan review discover at least one significant blind spot.',
        source: 'CFP Board, 2023',
        xStart: 25,
        xEnd: 65,
        type: 'accumulation',
        endpointWithLabel: 'Reviewed plan',
        endpointWithoutLabel: 'Unreviewed',
      },
      benchmark:
        'Even a simple plan benefits from a second pair of eyes. Most people your age discover they\u2019re missing at least one key piece.',
    },
    thirties: {
      graph: {
        headline: 'A professional review at 30',
        stat: 'A single review in your 30s can redirect $100K+ over a lifetime by catching misallocations early.',
        source: 'Vanguard, 2024',
        xStart: 30,
        xEnd: 65,
        type: 'accumulation',
        endpointWithLabel: 'Corrected trajectory',
        endpointWithoutLabel: 'Uncorrected',
      },
      benchmark:
        'By your 30s, your financial picture has enough moving parts that a review typically surfaces 2\u20133 blind spots worth addressing.',
    },
    forties: {
      graph: {
        headline: 'A professional review at 40',
        stat: "Most people in their 40s haven\u2019t rebalanced or updated beneficiaries in 3+ years.",
        source: 'CFP Board, 2023',
        xStart: 40,
        xEnd: 65,
        type: 'accumulation',
        endpointWithLabel: 'Reviewed + corrected',
        endpointWithoutLabel: 'Drifted plan',
      },
      benchmark:
        "Most people in their 40s haven\u2019t updated beneficiaries, rebalanced, or reviewed insurance in 3+ years. A review catches what time buries.",
    },
    fifties: {
      graph: {
        headline: 'A professional review in your 50s',
        stat: 'A pre-retirement review can identify $50K\u2013$200K in recoverable value through reallocation and tax strategy.',
        source: 'Morningstar, 2023',
        xStart: 50,
        xEnd: 70,
        type: 'accumulation',
        endpointWithLabel: 'Optimized plan',
        endpointWithoutLabel: 'Unreviewed plan',
      },
      benchmark:
        'The closer you get to retirement, the higher the stakes of an outdated plan. Most reviews at this stage uncover at least one significant gap.',
    },
    sixties: {
      graph: {
        headline: 'A retirement-stage review',
        stat: 'Retirees who get a professional review within a year of retiring report 40% higher financial confidence.',
        source: 'CFP Board, 2023',
        xStart: 60,
        xEnd: 80,
        type: 'drawdown',
        endpointWithLabel: 'Lasts to 87',
        endpointWithoutLabel: 'Runs short at 78',
      },
      benchmark:
        "At this stage, a review isn\u2019t a nice-to-have \u2014 it\u2019s essential. Withdrawal order, tax strategy, and estate alignment all need professional eyes.",
    },
  },
}

const FALLBACK_AGE: AgeRange = 'forties'

export function getGraphData(
  motivation?: MotivationDriver,
  age?: AgeRange
): AffirmationVariantGraph | null {
  if (!motivation) return null
  return AFFIRMATION_GRAPH_DATA[motivation][age ?? FALLBACK_AGE]
}
