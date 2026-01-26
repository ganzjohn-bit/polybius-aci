// State-level mobilization profiles for regional assessment
// These provide baselines for understanding geographic variation in mobilizational balance
// Scores are 0-100 where lower = opposition advantage, higher = regime advantage

export interface StateProfile {
  state: string;
  mobilizationScore: number; // 0-100, lower = opposition stronger
  unionDensity: number; // percentage
  unionTrend: 'growing' | 'stable' | 'declining';
  keyOppositionInfrastructure: string[];
  keyRegimeInfrastructure: string[];
  religiousLandscape: {
    dominantTraditions: string[];
    politicalLean: string;
    activationLevel: 'high' | 'medium' | 'low';
  };
  coalitionInfrastructure: {
    exists: boolean;
    description: string;
    yearsActive?: number;
  };
  notes: string;
  lastUpdated: string;
}

export const stateProfiles: StateProfile[] = [
  {
    state: 'Minnesota',
    mobilizationScore: 28, // Updated based on January 2026 demonstrated capacity
    unionDensity: 14.2,
    unionTrend: 'growing',
    keyOppositionInfrastructure: [
      'ISAIAH (200 congregations + mosques, Faith in Action affiliate) - activated within days of ICE surge',
      'TakeAction Minnesota (coalition hub)',
      'Education Minnesota (teachers, $34M dues)',
      'SEIU Local 26 (4,000 janitors)',
      'CWA Local 7250 (led general strike coordination)',
      'AFSCME Council 5 (state workers)',
      'Minneapolis Regional Labor Federation',
      'Lutheran Advocacy-MN (6 ELCA synods)',
      'Catholic Charities Twin Cities (immigration defense)',
      'Black Votes Matter MN',
      'Muslim Coalition (40+ Islamic centers)',
      'Monarca (rapid response legal line: 612-441-2881)',
      'MIRAC (mutual aid for families in hiding)',
      'Unidos MN (know your rights infrastructure)',
      'Community Aid Network (food distribution)',
      'Womens Foundation of MN (Immigrant Rapid Response Fund)'
    ],
    keyRegimeInfrastructure: [
      'Action 4 Liberty (far-right, but in conflict with MN GOP)',
      'Alpha News (conservative media)',
      'Minnesota Catholic Conference (conservative positions)',
      'Lutheran Church-Missouri Synod (conservative Lutheran)',
      'Transform MN (evangelical network)'
    ],
    religiousLandscape: {
      dominantTraditions: ['ELCA Lutheran (progressive)', 'Catholic (split)', 'Evangelical (minority)', 'Growing Muslim community'],
      politicalLean: 'Mainline Protestant infrastructure leans progressive; Catholic split; Muslim community organized and Democratic-leaning',
      activationLevel: 'high'
    },
    coalitionInfrastructure: {
      exists: true,
      description: 'DEMONSTRATED January 2026: ICE "Operation Metro Surge" triggered 700+ business closures, 20,000+ protesters, 100 clergy arrested, general strike. Infrastructure built from George Floyd 2020 organizing transferred immediately. CWA leader Kieran Knutson: "2020 created a network of organization and experience and confidence." Church hubs (Bethel Lutheran, Our Saviour\'s Lutheran, Dios Habla Hoy) activated for food/shelter. Rapid response legal lines operational. This is what actual mobilization capacity looks like.',
      yearsActive: 11
    },
    notes: 'BENCHMARK CASE for opposition mobilization. January 2026 ICE response proved infrastructure is real, not theoretical. Key factors: (1) Union density above national average AND growing, (2) ISAIAH 200 congregations activated within days, (3) Networks from George Floyd 2020 transferred to immigration crisis, (4) Rapid response legal/mutual aid infrastructure operational, (5) Conservative side divided - Action 4 Liberty at war with mainstream GOP. Score lowered to 28 based on demonstrated capacity.',
    lastUpdated: '2026-01'
  },
  {
    state: 'Texas',
    mobilizationScore: 62,
    unionDensity: 4.1,
    unionTrend: 'stable',
    keyOppositionInfrastructure: [
      'Texas Organizing Project (TOP)',
      'Texas AFT (teachers)',
      'LULAC chapters',
      'Texas Civil Rights Project',
      'Workers Defense Project (Austin)',
      'SEIU Texas',
      'Black churches in Houston, Dallas',
      'Border network for Human Rights'
    ],
    keyRegimeInfrastructure: [
      'Texas GOP (unified, dominant)',
      'Evangelical megachurches (Houston, Dallas)',
      'Texas Public Policy Foundation',
      'Empower Texans / Texas Scorecard',
      'True Texas Project',
      'Business associations (oil & gas)'
    ],
    religiousLandscape: {
      dominantTraditions: ['Southern Baptist', 'Evangelical megachurch', 'Catholic (large Hispanic population)', 'Black Baptist'],
      politicalLean: 'White evangelical strongly GOP; Hispanic Catholic contested; Black churches Democratic but less organized than Deep South',
      activationLevel: 'high'
    },
    coalitionInfrastructure: {
      exists: true,
      description: 'Texas Organizing Project and affiliates provide some coordination. Less institutionalized than Minnesota model.',
      yearsActive: 10
    },
    notes: 'Large state with weak union infrastructure but significant Latino and Black organizing capacity. Evangelical megachurch presence is real GOP asset. Catholic population split - bishops conservative on abortion but Hispanic laity more Democratic. Business (especially oil & gas) strongly aligned with GOP. Some suburban shift toward Democrats but opposition infrastructure still catching up to demographic potential.',
    lastUpdated: '2025-01'
  },
  {
    state: 'Georgia',
    mobilizationScore: 48,
    unionDensity: 4.4,
    unionTrend: 'stable',
    keyOppositionInfrastructure: [
      'New Georgia Project (Stacey Abrams network)',
      'Black Voters Matter',
      'Georgia STAND-UP',
      'Asian American Advocacy Fund',
      'Black churches (AME, Baptist - Atlanta metro)',
      'UNITE HERE (hospitality workers)',
      'Georgia AFL-CIO'
    ],
    keyRegimeInfrastructure: [
      'Georgia GOP (but fractured post-2020)',
      'Georgia Baptist Convention',
      'Faith & Freedom Coalition (Ralph Reed)',
      'First Baptist Atlanta and evangelical megachurches'
    ],
    religiousLandscape: {
      dominantTraditions: ['Southern Baptist', 'AME/Black Baptist', 'Evangelical megachurch', 'Growing diversity in Atlanta'],
      politicalLean: 'Black church infrastructure strong and activated; White evangelical GOP-aligned; Atlanta suburbs diversifying',
      activationLevel: 'high'
    },
    coalitionInfrastructure: {
      exists: true,
      description: 'New Georgia Project and Black Voters Matter demonstrated turnout capacity in 2020-2021. Infrastructure tested and proven.',
      yearsActive: 8
    },
    notes: 'Contested battleground. Black church infrastructure proved decisive in 2020-2021 (Warnock a pastor). New Georgia Project model for voter registration/turnout. GOP fractured between Trump loyalists and Kemp/Raffensperger wing. Ralph Reed Faith & Freedom Coalition headquartered here but white evangelical activation may be overstated relative to Black church turnout.',
    lastUpdated: '2025-01'
  },
  {
    state: 'Ohio',
    mobilizationScore: 55,
    unionDensity: 12.2,
    unionTrend: 'declining',
    keyOppositionInfrastructure: [
      'Ohio AFL-CIO',
      'Ohio Education Association',
      'SEIU Ohio',
      'UAW (auto workers - less than before)',
      'Ohio Organizing Collaborative',
      'Black churches (Cleveland, Columbus, Cincinnati)',
      'Catholic Charities (immigration work)'
    ],
    keyRegimeInfrastructure: [
      'Ohio GOP (dominant in rural areas)',
      'Ohio Christian Alliance',
      'Center for Christian Virtue',
      'Citizens for Community Values',
      'Evangelical churches (rural/suburban)'
    ],
    religiousLandscape: {
      dominantTraditions: ['Catholic (significant)', 'Evangelical/Baptist', 'Mainline Protestant', 'Black Baptist in cities'],
      politicalLean: 'Catholic swing constituency; Evangelical lean GOP; Black churches Democratic but concentrated in cities losing population',
      activationLevel: 'medium'
    },
    coalitionInfrastructure: {
      exists: true,
      description: 'Ohio Organizing Collaborative attempts coordination. Union infrastructure still present but weakened from manufacturing decline. Issue 1 (abortion rights 2023) showed latent progressive capacity.',
      yearsActive: 6
    },
    notes: 'Former swing state trending red. Union decline tracks deindustrialization. Issue 1 abortion referendum (2023) showed progressive coalition can still win on specific issues. Catholic population significant - bishops conservative but laity more mixed. Rural-urban divide stark. Cleveland, Columbus, Cincinnati have infrastructure but rural areas lack opposition presence.',
    lastUpdated: '2025-01'
  },
  {
    state: 'Arizona',
    mobilizationScore: 50,
    unionDensity: 5.0,
    unionTrend: 'stable',
    keyOppositionInfrastructure: [
      'LUCHA (Living United for Change in Arizona)',
      'Mi Familia Vota',
      'Arizona Education Association',
      'Chicanos Por La Causa',
      'UNITE HERE Local 11 (hospitality)',
      'Black churches (Phoenix)',
      'Planned Parenthood Advocates'
    ],
    keyRegimeInfrastructure: [
      'Arizona GOP (fractured between establishment and MAGA)',
      'Turning Point USA (HQ in Phoenix)',
      'Center for Arizona Policy',
      'Evangelical churches',
      'Mormon/LDS influence'
    ],
    religiousLandscape: {
      dominantTraditions: ['Catholic (Hispanic)', 'Evangelical', 'LDS/Mormon', 'Mainline Protestant'],
      politicalLean: 'Hispanic Catholic lean Democratic; Mormon historically GOP but some Trump skepticism; Evangelical strongly GOP',
      activationLevel: 'medium'
    },
    coalitionInfrastructure: {
      exists: true,
      description: 'LUCHA and affiliates built infrastructure that helped flip Arizona in 2020. Latino voter mobilization key.',
      yearsActive: 12
    },
    notes: 'Battleground with emerging opposition infrastructure. LUCHA model for Latino organizing. Turning Point USA headquartered here but GOP fractured (Kari Lake wing vs traditional). LDS population provides some GOP skepticism of Trump-style politics. Abortion rights ballot measure showed progressive coalition capacity. Phoenix metro growth changing demographics.',
    lastUpdated: '2025-01'
  },
  {
    state: 'Michigan',
    mobilizationScore: 42,
    unionDensity: 13.8,
    unionTrend: 'growing',
    keyOppositionInfrastructure: [
      'UAW (revitalized under Fain)',
      'Michigan AFL-CIO',
      'Michigan Education Association',
      'SEIU Healthcare Michigan',
      'Detroit Action',
      'Black churches (Detroit)',
      'Arab American community (Dearborn)',
      'We the People Michigan'
    ],
    keyRegimeInfrastructure: [
      'Michigan GOP (weakened)',
      'Michigan Freedom Fund',
      'Great Lakes Education Project (DeVos)',
      'Evangelical churches (West Michigan)'
    ],
    religiousLandscape: {
      dominantTraditions: ['Catholic', 'Reformed/Dutch Reformed (West MI)', 'Black Baptist (Detroit)', 'Muslim (Dearborn)', 'Mainline Protestant'],
      politicalLean: 'Dutch Reformed in West Michigan strongly GOP; Catholic swing; Black churches Democratic; Arab American community activated post-2016',
      activationLevel: 'high'
    },
    coalitionInfrastructure: {
      exists: true,
      description: 'UAW revival under Shawn Fain energized labor movement. Prop 2 (voting rights) and Prop 3 (abortion) wins in 2022 showed coalition capacity. Arab American community newly activated.',
      yearsActive: 5
    },
    notes: 'Union revitalization story. UAW 2023 strike showed renewed labor militancy. Arab American community in Dearborn represents new force (complicated by Gaza politics). Detroit Black church infrastructure intact. West Michigan (Grand Rapids area) remains evangelical/Reformed stronghold for GOP. DeVos family funds conservative infrastructure but GOP weakened statewide.',
    lastUpdated: '2025-01'
  },
  {
    state: 'Wisconsin',
    mobilizationScore: 45,
    unionDensity: 8.0,
    unionTrend: 'stable',
    keyOppositionInfrastructure: [
      'Wisconsin AFL-CIO (weakened by Act 10 but surviving)',
      'WEAC (teachers)',
      'SEIU Wisconsin',
      'Voces de la Frontera (immigrant rights)',
      'Black Leaders Organizing for Communities (BLOC)',
      'Citizen Action of Wisconsin',
      'Lutheran (ELCA) churches'
    ],
    keyRegimeInfrastructure: [
      'Wisconsin GOP (gerrymandered legislature)',
      'Wisconsin Institute for Law & Liberty',
      'Americans for Prosperity - Wisconsin',
      'MacIver Institute',
      'Evangelical churches (rural)'
    ],
    religiousLandscape: {
      dominantTraditions: ['Catholic (significant)', 'Lutheran (ELCA and Missouri Synod)', 'Evangelical', 'Black Baptist (Milwaukee)'],
      politicalLean: 'Catholic swing; ELCA Lutheran lean progressive; Missouri Synod conservative; Rural evangelical GOP',
      activationLevel: 'medium'
    },
    coalitionInfrastructure: {
      exists: true,
      description: 'Act 10 (2011) devastated public sector unions but opposition rebuilt. BLOC (Milwaukee) represents new Black organizing model. Voces de la Frontera strong on immigrant rights.',
      yearsActive: 12
    },
    notes: 'Post-Act 10 recovery story. Public sector unions gutted in 2011 but have partially rebuilt. BLOC represents new model of Black political organizing in Milwaukee. Voces de la Frontera activated Latino community. Legislature heavily gerrymandered for GOP but statewide elections competitive. Rural-urban divide extreme. New legislative maps (2024) may shift dynamics.',
    lastUpdated: '2025-01'
  },
  {
    state: 'Alabama',
    mobilizationScore: 72,
    unionDensity: 5.8,
    unionTrend: 'declining',
    keyOppositionInfrastructure: [
      'Alabama AFL-CIO (weak)',
      'Black churches (Birmingham, Selma, Montgomery)',
      'Alabama NAACP',
      'Greater Birmingham Ministries',
      'Alabama Arise (poverty advocacy)',
      'UAW (Mercedes plant organizing attempt)'
    ],
    keyRegimeInfrastructure: [
      'Alabama GOP (supermajority)',
      'Alabama Policy Institute',
      'Southern Baptist Convention churches',
      'Evangelical megachurches',
      'Business Council of Alabama',
      'Alabama Farmers Federation'
    ],
    religiousLandscape: {
      dominantTraditions: ['Southern Baptist (dominant)', 'Black Baptist/AME', 'Evangelical', 'Catholic (Mobile area)'],
      politicalLean: 'White evangelical thoroughly GOP; Black churches Democratic but insufficient counter-weight; Catholic small',
      activationLevel: 'high'
    },
    coalitionInfrastructure: {
      exists: false,
      description: 'Opposition fragmented. Black church infrastructure exists but faces overwhelming white evangelical/GOP dominance. No effective statewide coordination.',
      yearsActive: 0
    },
    notes: 'Regime advantage case study. GOP supermajority entrenched. Union organizing attempts (Mercedes) face hostile state environment. Black church infrastructure historic (civil rights movement) but now outnumbered. White evangelical activation genuine and overwhelming. Business community aligned with GOP. Opposition concentrated in Birmingham, Montgomery, Black Belt counties but insufficient statewide.',
    lastUpdated: '2025-01'
  },
  {
    state: 'Oklahoma',
    mobilizationScore: 75,
    unionDensity: 4.7,
    unionTrend: 'declining',
    keyOppositionInfrastructure: [
      'Oklahoma Education Association (teachers - activated 2018 walkout)',
      'Oklahoma AFL-CIO',
      'Oklahoma Policy Institute',
      'Black churches (Oklahoma City, Tulsa)',
      'Native American nations (limited political engagement)'
    ],
    keyRegimeInfrastructure: [
      'Oklahoma GOP (supermajority)',
      'Oklahoma Council of Public Affairs',
      'Baptist General Convention of Oklahoma',
      'Evangelical churches (pervasive)',
      'Oil & gas industry',
      'Oklahoma Farm Bureau'
    ],
    religiousLandscape: {
      dominantTraditions: ['Southern Baptist', 'Evangelical/Pentecostal', 'Methodist', 'Catholic (small)'],
      politicalLean: 'Thoroughly evangelical and GOP-aligned; Black churches small; Native nations politically complex',
      activationLevel: 'high'
    },
    coalitionInfrastructure: {
      exists: false,
      description: 'Teachers showed capacity in 2018 walkout but no sustained coalition. Opposition atomized.',
      yearsActive: 0
    },
    notes: 'Deep red with weak opposition infrastructure. 2018 teacher walkout showed latent capacity but not sustained. Oil & gas industry dominates economy and politics. Evangelical saturation genuine. Native American nations have sovereignty but limited integration with state politics. Opposition concentrated in Oklahoma City, Tulsa, Norman (university) but overwhelmed elsewhere.',
    lastUpdated: '2025-01'
  },
  {
    state: 'Pennsylvania',
    mobilizationScore: 44,
    unionDensity: 12.6,
    unionTrend: 'stable',
    keyOppositionInfrastructure: [
      'Pennsylvania AFL-CIO',
      'PSEA (teachers)',
      'SEIU Healthcare Pennsylvania',
      'UNITE HERE (Philadelphia hotels)',
      'Philadelphia labor council',
      'Black churches (Philadelphia)',
      'One PA (statewide coordination)',
      'Neighborhood Networks (Pittsburgh)'
    ],
    keyRegimeInfrastructure: [
      'Pennsylvania GOP (strong in rural areas)',
      'Commonwealth Foundation',
      'Pennsylvania Family Institute',
      'Evangelical churches (rural/suburban)',
      'Patriot groups (varied)'
    ],
    religiousLandscape: {
      dominantTraditions: ['Catholic (significant - Philly, Pittsburgh, Scranton)', 'Mainline Protestant', 'Evangelical', 'Black Baptist (cities)', 'Anabaptist (Lancaster)'],
      politicalLean: 'Catholic swing (Biden home state); Black churches Democratic; Rural evangelical GOP; Suburban mainline contested',
      activationLevel: 'medium'
    },
    coalitionInfrastructure: {
      exists: true,
      description: 'Philadelphia and Pittsburgh have strong union/community infrastructure. Rural areas lack opposition presence. State-level coordination improving.',
      yearsActive: 8
    },
    notes: 'Classic battleground with strong regional variation. Philadelphia and Pittsburgh have dense union and Black church infrastructure. "Pennsyltucky" (rural center) is deep red with evangelical dominance. Suburbs (collar counties) are swing terrain. Catholic vote significant - Biden being from Scranton matters. Union density above average but concentrated in cities.',
    lastUpdated: '2025-01'
  },
  {
    state: 'Nevada',
    mobilizationScore: 38,
    unionDensity: 14.0,
    unionTrend: 'stable',
    keyOppositionInfrastructure: [
      'Culinary Workers Union Local 226 (60,000+ members)',
      'Nevada AFL-CIO',
      'SEIU Nevada',
      'Make the Road Nevada',
      'Progressive Leadership Alliance of Nevada (PLAN)',
      'Mi Familia Vota Nevada',
      'Black churches (Las Vegas)'
    ],
    keyRegimeInfrastructure: [
      'Nevada GOP (weakened)',
      'Nevada Policy Research Institute',
      'Evangelical churches (growing but minority)',
      'LDS/Mormon community'
    ],
    religiousLandscape: {
      dominantTraditions: ['Catholic (Hispanic)', 'LDS/Mormon', 'Evangelical (growing)', 'Low religiosity overall'],
      politicalLean: 'Least religious state helps opposition; Hispanic Catholic lean Democratic; Mormon minority GOP but less dominant than Utah',
      activationLevel: 'medium'
    },
    coalitionInfrastructure: {
      exists: true,
      description: 'Culinary Union is the model - high density, politically active, integrated with Democratic Party. Reid machine legacy. Latino organizing infrastructure strong.',
      yearsActive: 20
    },
    notes: 'Culinary Union case study for labor mobilization. 60,000+ members, mostly Latino and immigrant workers in Las Vegas hospitality. Highly politically active - knocking doors is part of union culture. Reid political machine built infrastructure now maintained by unions. Low religiosity means evangelical advantage muted. Growing population from California may shift dynamics.',
    lastUpdated: '2025-01'
  },
  {
    state: 'Florida',
    mobilizationScore: 65,
    unionDensity: 5.0,
    unionTrend: 'declining',
    keyOppositionInfrastructure: [
      'Florida AFL-CIO (weak)',
      'SEIU Florida',
      'Florida Education Association',
      'New Florida Majority',
      'Black churches (Miami, Jacksonville, Tampa)',
      'Hispanic outreach orgs (struggling)',
      'Florida Immigrant Coalition'
    ],
    keyRegimeInfrastructure: [
      'Florida GOP (DeSantis machine)',
      'Moms for Liberty (HQ in Florida)',
      'Florida Family Policy Council',
      'Cuban American community (shifting)',
      'Evangelical churches',
      'Retiree conservative networks'
    ],
    religiousLandscape: {
      dominantTraditions: ['Catholic (Cuban, Puerto Rican, Anglo)', 'Evangelical/Baptist', 'Black Baptist', 'Jewish (South Florida)'],
      politicalLean: 'Cuban Catholic shifted GOP; Puerto Rican more Democratic; Black churches Democratic but outmatched; Jewish liberal but aging',
      activationLevel: 'medium'
    },
    coalitionInfrastructure: {
      exists: false,
      description: 'Opposition infrastructure collapsed under DeSantis. Florida Democratic Party weak. New Florida Majority attempting rebuild but facing hostile environment.',
      yearsActive: 0
    },
    notes: 'Case study in opposition collapse. Once swing state now solid red. Cuban American shift to GOP was decisive. Moms for Liberty HQ here - model for conservative parent mobilization. DeSantis actively hostile to organizing (anti-union legislation, attacks on New College, etc.). Retiree population provides conservative base. Opposition concentrated in Miami-Dade (declining), Broward, Orange County but insufficient.',
    lastUpdated: '2025-01'
  }
];

// Helper function to get state profile
export function getStateProfile(state: string): StateProfile | undefined {
  return stateProfiles.find(p => p.state.toLowerCase() === state.toLowerCase());
}

// Get states by mobilization category
export function getStatesByMobilizationCategory(): {
  oppositionStrong: StateProfile[];
  oppositionAdvantage: StateProfile[];
  contested: StateProfile[];
  regimeAdvantage: StateProfile[];
} {
  return {
    oppositionStrong: stateProfiles.filter(p => p.mobilizationScore <= 25),
    oppositionAdvantage: stateProfiles.filter(p => p.mobilizationScore > 25 && p.mobilizationScore <= 40),
    contested: stateProfiles.filter(p => p.mobilizationScore > 40 && p.mobilizationScore <= 55),
    regimeAdvantage: stateProfiles.filter(p => p.mobilizationScore > 55)
  };
}

// Get union density comparison
export function getUnionDensityRanking(): { state: string; density: number; trend: string }[] {
  return stateProfiles
    .map(p => ({ state: p.state, density: p.unionDensity, trend: p.unionTrend }))
    .sort((a, b) => b.density - a.density);
}
