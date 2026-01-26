// Historical cases database for empirical validation of theoretical models
// Scores are 0-100 (higher = more authoritarian/consolidated)
// Sources: V-Dem, historiography, country-specific scholarship

export interface HistoricalCase {
  id: string;
  country: string;
  period: string;
  yearStart: number;
  yearEnd: number;
  outcome: 'consolidated' | 'resisted' | 'democratized' | 'ongoing';
  outcomeScore: number; // 0 = democracy held, 100 = full consolidation
  factors: {
    judicial: number;
    federalism: number;
    political: number;
    media: number;
    civil: number;
    publicOpinion: number; // regime approval + norm erosion
    mobilizationalBalance: number;
    stateCapacity: number;
    corporateCompliance: number;
    electionInterference: number;
  };
  notes: string;
  sources: string[];
}

export const historicalCases: HistoricalCase[] = [
  // === CONSOLIDATED (FASCIST/AUTHORITARIAN) ===
  {
    id: 'weimar-germany',
    country: 'Germany',
    period: 'Weimar Collapse',
    yearStart: 1930,
    yearEnd: 1933,
    outcome: 'consolidated',
    outcomeScore: 100,
    factors: {
      judicial: 55, // Courts initially independent but deferential to executive emergency powers
      federalism: 40, // Länder still had autonomy but Prussia coup 1932 showed vulnerability
      political: 70, // KPD/SPD fragmented, NSDAP + DNVP coalition, enabling act
      media: 50, // Still plural but Nazi press growing, violence against left press
      civil: 60, // SA violence, but unions/SPD/churches still existed
      publicOpinion: 75, // ~44% voted NSDAP/DNVP, economic despair, Versailles resentment
      mobilizationalBalance: 70, // SA/SS vs weakened unions, SPD demobilized, KPD isolated
      stateCapacity: 45, // Fragmented but Reichswehr intact, police politicized
      corporateCompliance: 65, // Industry funded NSDAP, saw it as bulwark against communism
      electionInterference: 55, // 1933 election: SA intimidation, Reichstag fire, but votes still counted
    },
    notes: 'Classic case of democratic breakdown. Key factors: economic crisis, fragmented left, elite complicity (Hindenburg, Papen, industry), SA mobilization advantage, Article 48 abuse.',
    sources: ['Shirer - Rise and Fall of Third Reich', 'Evans - Coming of the Third Reich', 'V-Dem', 'Berman - Social Origins of Dictatorship']
  },
  {
    id: 'italy-fascism',
    country: 'Italy',
    period: 'Fascist Consolidation',
    yearStart: 1921,
    yearEnd: 1925,
    outcome: 'consolidated',
    outcomeScore: 100,
    factors: {
      judicial: 50, // Courts acquiesced after March on Rome
      federalism: 30, // Italy centralized, prefects loyal to Rome
      political: 75, // Squadristi violence, Matteotti murder, opposition walked out
      media: 55, // Press initially plural but violence against socialist papers
      civil: 65, // Squadristi destroyed socialist/union infrastructure
      publicOpinion: 60, // Significant support from middle class, fear of Bolshevism
      mobilizationalBalance: 80, // Squadristi vs demoralized socialists, PPI divided
      stateCapacity: 40, // Weak state, Mussolini had to build capacity
      corporateCompliance: 70, // Industrialists funded squadristi, Confindustria aligned
      electionInterference: 70, // 1924 Acerbo Law, violence, Matteotti killed for exposing fraud
    },
    notes: 'Squadristi violence key - destroyed left infrastructure before formal power. Elite complicity (king, army, industry, Vatican). Riley/Paxton emphasis on civil society destruction.',
    sources: ['Paxton - Anatomy of Fascism', 'Riley - Civic Foundations of Fascism', 'Bosworth - Mussolini', 'V-Dem']
  },
  {
    id: 'chile-pinochet',
    country: 'Chile',
    period: 'Pinochet Coup',
    yearStart: 1970,
    yearEnd: 1973,
    outcome: 'consolidated',
    outcomeScore: 95,
    factors: {
      judicial: 35, // Courts initially independent, would later capitulate
      federalism: 25, // Chile centralized
      political: 50, // UP government, opposition in congress, but polarized
      media: 40, // Plural but El Mercurio CIA-funded opposition
      civil: 30, // Strong unions, but also gremios organizing against Allende
      publicOpinion: 55, // Polarized, middle class turned against Allende, truckers strike
      mobilizationalBalance: 55, // CUT unions vs gremios + military plotting
      stateCapacity: 70, // Military highly professional, US-backed
      corporateCompliance: 75, // Business actively sought coup, ITT, copper companies
      electionInterference: 60, // 1970 election legitimate, but CIA destabilization
    },
    notes: 'External intervention (CIA) crucial. Business-military alliance. Middle class mobilization against Allende. Polarization enabled coup.',
    sources: ['Kornbluh - Pinochet File', 'Valenzuela - Breakdown of Democratic Regimes', 'V-Dem']
  },
  {
    id: 'venezuela-chavez',
    country: 'Venezuela',
    period: 'Chavez Consolidation',
    yearStart: 1999,
    yearEnd: 2010,
    outcome: 'consolidated',
    outcomeScore: 85,
    factors: {
      judicial: 70, // TSJ packed 2004, courts became rubber stamp
      federalism: 65, // Governors defunded, Caracas centralized power
      political: 70, // Opposition boycotted 2005, then fragmented
      media: 60, // RCTV closed 2007, but Globovision still critical initially
      civil: 55, // Bolivarian circles vs old unions, civil society pressured
      publicOpinion: 65, // High approval (oil boom), missions built support
      mobilizationalBalance: 70, // Bolivarian circles, colectivos vs weakened opposition
      stateCapacity: 55, // PDVSA captured, military politicized, but still gaps
      corporateCompliance: 60, // Expropriations, but private sector still existed
      electionInterference: 50, // Elections held but CNE controlled, registration issues
    },
    notes: 'Oil wealth enabled patronage. Gradual erosion not single coup. Opposition mistakes (2002 coup attempt, boycotts). Levitsky-Ziblatt gradual playbook.',
    sources: ['Corrales - Dragon in the Tropics', 'Levitsky & Ziblatt', 'V-Dem']
  },
  {
    id: 'hungary-orban',
    country: 'Hungary',
    period: 'Orban Consolidation',
    yearStart: 2010,
    yearEnd: 2022,
    outcome: 'consolidated',
    outcomeScore: 80,
    factors: {
      judicial: 75, // Constitutional court packed, ordinary courts captured
      federalism: 70, // Hungary unitary, local govts defunded
      political: 70, // Opposition fragmented, 2/3 supermajority gerrymandered
      media: 80, // KESMA media conglomerate, only Klubradio survived briefly
      civil: 65, // CEU expelled, NGOs "foreign agent" pressure, but some survive
      publicOpinion: 60, // Fidesz ~50% support, EU skepticism weaponized
      mobilizationalBalance: 65, // Fidesz civic circles vs weak unions, churches aligned
      stateCapacity: 60, // EU oversight limits capacity, but NER controls state
      corporateCompliance: 70, // Oligarchs created, foreign companies comply
      electionInterference: 65, // Elections held but tilted playing field, OSCE concerns
    },
    notes: 'EU membership moderated but did not prevent consolidation. Media capture key. Supermajority enabled constitutional changes. "Illiberal democracy" framing.',
    sources: ['Scheppele - Autocratic Legalism', 'Batory - Co-opting Civil Society', 'V-Dem', 'OSCE reports']
  },
  {
    id: 'turkey-erdogan',
    country: 'Turkey',
    period: 'Erdogan Consolidation',
    yearStart: 2013,
    yearEnd: 2018,
    outcome: 'consolidated',
    outcomeScore: 85,
    factors: {
      judicial: 80, // Post-coup purges, HSYK captured, mass arrests of judges
      federalism: 60, // Turkey centralized, Kurdish regions under emergency rule
      political: 75, // HDP leaders jailed, opposition harassed, 2017 referendum
      media: 85, // Mass media closures post-coup, journalists imprisoned
      civil: 75, // Academics, NGOs purged, Gezi protesters prosecuted
      publicOpinion: 55, // ~50% support, polarized, rally-around-flag post-coup
      mobilizationalBalance: 70, // AKP grassroots vs Kemalists/HDP weakened, Gulenists purged
      stateCapacity: 75, // Military purged and subordinated, MIT expanded
      corporateCompliance: 70, // Dogan media sold under pressure, TUSIAD quiet
      electionInterference: 70, // 2017 referendum irregularities, 2018 emergency conditions
    },
    notes: 'Failed coup (2016) accelerated consolidation. State of emergency enabled purges. Gulenist alliance then betrayal. NATO membership did not prevent.',
    sources: ['Esen & Gumuscu - Rising Competitive Authoritarianism', 'V-Dem', 'Freedom House']
  },
  {
    id: 'russia-putin',
    country: 'Russia',
    period: 'Putin Consolidation',
    yearStart: 1999,
    yearEnd: 2008,
    outcome: 'consolidated',
    outcomeScore: 90,
    factors: {
      judicial: 75, // Procuracy captured, Khodorkovsky trial signaled capture
      federalism: 80, // Governors appointed not elected (2004), federal districts
      political: 75, // Unity/UR dominance, Duma captured, governors co-opted
      media: 80, // NTV taken 2001, Gusinsky/Berezovsky exiled
      civil: 65, // NGO foreign agent law (later), but early 2000s still some space
      publicOpinion: 70, // High approval post-Yeltsin chaos, Chechen war rally
      mobilizationalBalance: 70, // Nashi youth vs demoralized liberals, no opposition infra
      stateCapacity: 75, // FSB power, siloviki network, vertical of power
      corporateCompliance: 80, // Oligarchs submit or exile (Khodorkovsky lesson)
      electionInterference: 70, // Elections held but managed, Kremlin admin resources
    },
    notes: 'Consolidation framed as stability after 1990s chaos. Oil wealth enabled. Siloviki capture of state. Oligarch bargain: wealth for political loyalty.',
    sources: ['Levitsky & Way - Competitive Authoritarianism', 'Gessen - Future is History', 'V-Dem']
  },

  // === RESISTED / REVERSED ===
  {
    id: 'poland-pis',
    country: 'Poland',
    period: 'PiS Attempt',
    yearStart: 2015,
    yearEnd: 2023,
    outcome: 'resisted',
    outcomeScore: 35,
    factors: {
      judicial: 65, // Constitutional Tribunal captured, but EU pushback, judges resisted
      federalism: 40, // Poland unitary but local govts opposition-held
      political: 50, // Opposition fragmented but functional, 2023 coalition won
      media: 55, // TVP captured, but TVN, Gazeta Wyborcza independent
      civil: 45, // Women's strikes, KOD protests, civil society mobilized
      publicOpinion: 50, // PiS ~35-45%, significant opposition, EU popular
      mobilizationalBalance: 45, // PiS church alliance vs women's movement, liberals mobilized
      stateCapacity: 50, // EU and NATO constraints, professionalized bureaucracy
      corporateCompliance: 45, // Foreign investment constrained PiS, EU funds leverage
      electionInterference: 45, // Elections tilted but opposition won 2023
    },
    notes: 'EU constraint mattered. Civil society (women, judges, students) resisted. Opposition finally unified 2023. Shows consolidation not inevitable.',
    sources: ['Sadurski - Polands Constitutional Breakdown', 'Cienski reporting', 'V-Dem', 'OSCE']
  },
  {
    id: 'brazil-bolsonaro',
    country: 'Brazil',
    period: 'Bolsonaro Attempt',
    yearStart: 2019,
    yearEnd: 2022,
    outcome: 'resisted',
    outcomeScore: 30,
    factors: {
      judicial: 40, // STF resisted, Moraes investigations, courts checked executive
      federalism: 35, // Governors (Doria, Witzel) opposition, COVID federalism
      political: 45, // Congress transactional, Centrao not ideologically aligned
      media: 40, // Globo critical, Folha critical, social media pro-Bolsonaro
      civil: 40, // Some evangelical/rural support but unions, movements opposed
      publicOpinion: 50, // ~30-40% core support, high rejection, COVID hurt
      mobilizationalBalance: 50, // Evangelical churches vs unions, MST, indigenous movements
      stateCapacity: 40, // Military kept distance, institutions held
      corporateCompliance: 40, // Faria Lima initially supportive then hedged
      electionInterference: 35, // TSE held, election conducted fairly, Bolsonaro lost
    },
    notes: 'Institutions held - STF key. Military did not back autogolpe. Federalism enabled COVID resistance. Lula coalition unified. Jan 8 2023 insurrection failed.',
    sources: ['Hunter & Power - Bolsonaro and Brazils Illiberal Backlash', 'V-Dem', 'LASA reports']
  },

  // === DEMOCRATIZED ===
  {
    id: 'spain-transition',
    country: 'Spain',
    period: 'Democratic Transition',
    yearStart: 1975,
    yearEnd: 1982,
    outcome: 'democratized',
    outcomeScore: 15,
    factors: {
      judicial: 50, // Francoist judges initially, gradual reform
      federalism: 45, // Autonomies created (Basque, Catalonia), decentralization
      political: 35, // PCE legalized, PSOE won 1982, genuine competition
      media: 40, // Press freedom expanded, El Pais launched
      civil: 40, // Unions legalized, CCOO/UGT, civil society rebuilt
      publicOpinion: 35, // Desire for normalcy, European integration popular
      mobilizationalBalance: 40, // CCOO/UGT rebuilt vs Francoist bunker weakened
      stateCapacity: 55, // Military attempted coup 1981, but failed, then subordinated
      corporateCompliance: 45, // Business wanted European integration, modernization
      electionInterference: 25, // 1977, 1979, 1982 elections free and fair
    },
    notes: 'Pacted transition. King crucial. Military coup attempt failed (23-F). EC/EU anchor. Memory politics deferred (Pacto del Olvido).',
    sources: ['Linz & Stepan - Problems of Democratic Transition', 'Preston - Triumph of Democracy in Spain', 'V-Dem']
  },
  {
    id: 'south-korea-transition',
    country: 'South Korea',
    period: 'Democratic Transition',
    yearStart: 1987,
    yearEnd: 1997,
    outcome: 'democratized',
    outcomeScore: 10,
    factors: {
      judicial: 40, // Courts gained independence, Constitutional Court created 1988
      federalism: 30, // Centralized but local elections restored
      political: 30, // Opposition won 1997 (Kim Dae-jung), genuine rotation
      media: 35, // Press freedom expanded, chaebol media but plural
      civil: 30, // Labor movement strong (KCTU), student movements, churches
      publicOpinion: 30, // Strong pro-democracy sentiment, middle class support
      mobilizationalBalance: 30, // June Uprising showed opposition strength, chaebol hedged
      stateCapacity: 50, // Military subordinated, but agencies professionalized
      corporateCompliance: 40, // Chaebol initially backed authoritarians, then adapted
      electionInterference: 20, // 1987 election relatively free, 1997 opposition won
    },
    notes: 'June 1987 uprising key - mass mobilization forced concessions. Middle class joined students/labor. Chaebol calculated democracy compatible with growth.',
    sources: ['Im - Faltering Democratic Consolidation in South Korea', 'Kim - Politics of Democratization', 'V-Dem']
  },
  {
    id: 'argentina-transition',
    country: 'Argentina',
    period: 'Post-Junta Democratization',
    yearStart: 1983,
    yearEnd: 1995,
    outcome: 'democratized',
    outcomeScore: 20,
    factors: {
      judicial: 45, // Junta trials then pardons, courts gradually strengthened
      federalism: 40, // Federal system restored, governors elected
      political: 30, // UCR then Peronists, genuine rotation
      media: 35, // Press freedom restored, Clarin/La Nacion independent
      civil: 35, // Mothers of Plaza de Mayo, human rights movement, unions
      publicOpinion: 25, // "Nunca Mas" consensus, Malvinas discredited military
      mobilizationalBalance: 35, // CGT unions, human rights orgs vs discredited military
      stateCapacity: 40, // Military defeated and discredited, gradual subordination
      corporateCompliance: 45, // Economic instability, business pragmatic
      electionInterference: 25, // Elections free since 1983
    },
    notes: 'Military discredited by Malvinas defeat and dirty war. Human rights movement crucial. Hyperinflation weakened but economic instability persists.',
    sources: ['Levitsky - Transforming Labor-Based Parties', 'Cavarozzi', 'V-Dem']
  },

  // === US HISTORICAL STRESS POINTS ===
  {
    id: 'us-1850s',
    country: 'United States',
    period: 'Pre-Civil War Crisis',
    yearStart: 1854,
    yearEnd: 1861,
    outcome: 'consolidated', // Confederacy consolidated, Union preserved through war
    outcomeScore: 50, // Partial - system broke, war required
    factors: {
      judicial: 60, // Dred Scott (1857) delegitimized Court for North
      federalism: 70, // Fundamental conflict over slavery in territories
      political: 75, // Party system collapsed (Whigs died), sectional parties
      media: 50, // Partisan press North and South, but plural
      civil: 55, // Abolitionist movement vs Southern slave society
      publicOpinion: 65, // Sectional polarization, different "nations"
      mobilizationalBalance: 60, // Abolitionists/Free Soil vs Southern planters/militias
      stateCapacity: 40, // Weak federal state, regional variation
      corporateCompliance: 55, // Northern industry vs Southern cotton, different interests
      electionInterference: 50, // 1860 election legitimate but South seceded
    },
    notes: 'Structural conflict (slavery) could not be resolved within democratic framework. Shows limits of democracy when fundamental cleavage unresolvable.',
    sources: ['McPherson - Battle Cry of Freedom', 'Potter - Impending Crisis', 'Howe - What Hath God Wrought']
  },
  {
    id: 'us-1930s',
    country: 'United States',
    period: 'Depression Era',
    yearStart: 1933,
    yearEnd: 1938,
    outcome: 'resisted',
    outcomeScore: 20,
    factors: {
      judicial: 45, // Court-packing attempt failed, but Court pivoted
      federalism: 35, // Federal power expanded but states intact
      political: 30, // Two-party system held, Huey Long killed, Coughlin marginalized
      media: 35, // Radio new but FDR mastered it, press plural
      civil: 30, // Union surge (CIO), but also Father Coughlin followers
      publicOpinion: 40, // FDR popular, but also Coughlin/Long/Townsend movements
      mobilizationalBalance: 35, // CIO organizing vs weakened business temporarily
      stateCapacity: 40, // New Deal agencies built capacity
      corporateCompliance: 45, // Business Plot alleged, Liberty League, but ultimately complied
      electionInterference: 15, // Elections free, FDR won legitimately
    },
    notes: 'Depression tested but democracy held. FDR within bounds (court-packing failed). Huey Long threat ended by assassination. CIO organized labor as democratic force.',
    sources: ['Katznelson - Fear Itself', 'Brinkley - Voices of Protest', 'Leuchtenburg']
  },
  {
    id: 'us-nixon',
    country: 'United States',
    period: 'Nixon/Watergate',
    yearStart: 1969,
    yearEnd: 1974,
    outcome: 'resisted',
    outcomeScore: 15,
    factors: {
      judicial: 25, // Courts held, unanimous decision in US v Nixon
      federalism: 20, // Not relevant to crisis
      political: 35, // Both parties ultimately rejected Nixon, bipartisan impeachment
      media: 20, // Press (WaPo, NYT) exposed Watergate, adversarial journalism
      civil: 30, // Anti-war movement, but also Silent Majority
      publicOpinion: 35, // Nixon approval collapsed from 67% to 24%
      mobilizationalBalance: 35, // Anti-war movement vs Silent Majority, but elite consensus
      stateCapacity: 35, // FBI/CIA abused but also leaked (Deep Throat)
      corporateCompliance: 30, // Business distanced after revelations
      electionInterference: 40, // Watergate WAS election interference, but exposed
    },
    notes: 'Institutions held: Courts, Congress (bipartisan), Press. Elite consensus that Nixon violated norms. Republican elites ultimately told Nixon to resign.',
    sources: ['Dean - Blind Ambition', 'Woodward & Bernstein', 'Kutler - Wars of Watergate']
  }
];

// Calculate average factor scores by outcome for regression baseline
export function getAveragesByOutcome(): Record<string, Record<string, number>> {
  const outcomes = ['consolidated', 'resisted', 'democratized'];
  const factors = ['judicial', 'federalism', 'political', 'media', 'civil', 'publicOpinion',
                   'mobilizationalBalance', 'stateCapacity', 'corporateCompliance', 'electionInterference'];

  const result: Record<string, Record<string, number>> = {};

  for (const outcome of outcomes) {
    const cases = historicalCases.filter(c => c.outcome === outcome);
    const averages: Record<string, number> = {};

    for (const factor of factors) {
      const sum = cases.reduce((acc, c) => acc + c.factors[factor as keyof typeof c.factors], 0);
      averages[factor] = cases.length > 0 ? Math.round(sum / cases.length) : 0;
    }

    result[outcome] = averages;
  }

  return result;
}

// Get factor importance via variance between outcomes
export function getFactorDiscriminativePower(): { factor: string; power: number }[] {
  const averages = getAveragesByOutcome();
  const factors = ['judicial', 'federalism', 'political', 'media', 'civil', 'publicOpinion',
                   'mobilizationalBalance', 'stateCapacity', 'corporateCompliance', 'electionInterference'];

  return factors.map(factor => {
    const consolidated = averages.consolidated[factor];
    const resisted = averages.resisted[factor];
    const democratized = averages.democratized[factor];

    // Variance between outcomes - higher = more discriminative
    const mean = (consolidated + resisted + democratized) / 3;
    const variance = ((consolidated - mean) ** 2 + (resisted - mean) ** 2 + (democratized - mean) ** 2) / 3;

    return { factor, power: Math.round(Math.sqrt(variance)) };
  }).sort((a, b) => b.power - a.power);
}
