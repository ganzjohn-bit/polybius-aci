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

  // === ADDITIONAL POLITY-DOCUMENTED COLLAPSES ===
  {
    id: 'austria-1933',
    country: 'Austria',
    period: 'Dollfuss Austrofascism',
    yearStart: 1932,
    yearEnd: 1934,
    outcome: 'consolidated',
    outcomeScore: 90,
    factors: {
      judicial: 60,
      federalism: 35,
      political: 70, // Parliament dissolved, SPÖ banned
      media: 60,
      civil: 65, // Schutzbund destroyed after 1934 uprising
      publicOpinion: 55,
      mobilizationalBalance: 65, // Heimwehr vs Schutzbund, then Schutzbund crushed
      stateCapacity: 55,
      corporateCompliance: 60,
      electionInterference: 75,
    },
    notes: 'Polity score dropped from 10 to -7 (1933-34). Dollfuss used emergency powers, dissolved parliament. Civil war Feb 1934 crushed Social Democrats. Preempted Nazi takeover but created authoritarian state.',
    sources: ['Polity5', 'Tálos - Austrofaschismus', 'V-Dem']
  },
  {
    id: 'greece-colonels',
    country: 'Greece',
    period: 'Colonels Coup',
    yearStart: 1965,
    yearEnd: 1967,
    outcome: 'consolidated',
    outcomeScore: 95,
    factors: {
      judicial: 55,
      federalism: 30, // Greece centralized
      political: 60, // Political instability, palace-parliament conflict
      media: 50,
      civil: 45, // Left organizations existed but fragmented
      publicOpinion: 50, // Polarized between left and right
      mobilizationalBalance: 55,
      stateCapacity: 70, // Military cohesive
      corporateCompliance: 55,
      electionInterference: 70, // 1967 elections cancelled by coup
    },
    notes: 'Polity: 8 to -7 overnight (1967). Military preemptive coup fearing left electoral victory. Junta lasted until 1974 Cyprus disaster. Shows military veto in polarized democracy.',
    sources: ['Polity5', 'Clogg - A Concise History of Greece', 'V-Dem']
  },
  {
    id: 'peru-fujimori',
    country: 'Peru',
    period: 'Fujimori Autogolpe',
    yearStart: 1990,
    yearEnd: 1992,
    outcome: 'consolidated',
    outcomeScore: 75,
    factors: {
      judicial: 65, // Courts dissolved in autogolpe
      federalism: 40,
      political: 60, // Congress dissolved, constitution rewritten
      media: 50, // Initially plural, then Montesinos bought tabloids
      civil: 45, // Sendero emergency weakened civil society
      publicOpinion: 60, // Fujimori popular (inflation, Sendero defeated)
      mobilizationalBalance: 55,
      stateCapacity: 60, // SIN under Montesinos
      corporateCompliance: 55,
      electionInterference: 55,
    },
    notes: 'Polity: 7 to -3 (1992 autogolpe). Popular president dissolved congress with military backing. Security crisis (Sendero Luminoso) enabled. Eventually fell to corruption scandal.',
    sources: ['Polity5', 'Cameron - The Fujimori Legacy', 'V-Dem']
  },
  {
    id: 'philippines-marcos',
    country: 'Philippines',
    period: 'Marcos Martial Law',
    yearStart: 1969,
    yearEnd: 1972,
    outcome: 'consolidated',
    outcomeScore: 85,
    factors: {
      judicial: 60, // Supreme Court initially resisted then capitulated
      federalism: 35,
      political: 65, // Opposition arrested, Senate abolished
      media: 70, // Media closed, then reopened under control
      civil: 55, // Student movement crushed
      publicOpinion: 50, // Initial support for "discipline"
      mobilizationalBalance: 60,
      stateCapacity: 65, // Military empowered
      corporateCompliance: 60, // Crony capitalism created
      electionInterference: 75,
    },
    notes: 'Polity: 2 to -9 (1972 martial law). Used communist threat to justify. "Constitutional authoritarianism." Eventually toppled by People Power 1986.',
    sources: ['Polity5', 'Thompson - The Anti-Marcos Struggle', 'V-Dem']
  },
  {
    id: 'uruguay-1973',
    country: 'Uruguay',
    period: 'Civic-Military Dictatorship',
    yearStart: 1971,
    yearEnd: 1973,
    outcome: 'consolidated',
    outcomeScore: 85,
    factors: {
      judicial: 55,
      federalism: 30,
      political: 65, // Congress dissolved, parties banned
      media: 60,
      civil: 60, // Strong unions crushed (CNT general strike failed)
      publicOpinion: 45, // Tupamaro threat used as justification
      mobilizationalBalance: 55, // Unions tried general strike but military won
      stateCapacity: 70,
      corporateCompliance: 55,
      electionInterference: 70,
    },
    notes: 'Polity: 10 to -9 (1973). "Switzerland of South America" fell. Gradual military encroachment then coup. CNT general strike resistance crushed. Returned to democracy 1984.',
    sources: ['Polity5', 'Gillespie - Negotiating Democracy', 'V-Dem']
  },
  {
    id: 'thailand-2014',
    country: 'Thailand',
    period: 'NCPO Coup',
    yearStart: 2013,
    yearEnd: 2014,
    outcome: 'consolidated',
    outcomeScore: 80,
    factors: {
      judicial: 65, // Courts dissolved parliament, enabled coup
      federalism: 35,
      political: 70, // Thaksin parties repeatedly dissolved, protests
      media: 60, // Lese-majeste laws, military controls
      civil: 50, // Red vs Yellow shirt division
      publicOpinion: 50, // Polarized, Bangkok vs rural
      mobilizationalBalance: 55, // Yellow shirts + military vs Red shirts
      stateCapacity: 65, // Military experienced at coups
      corporateCompliance: 55,
      electionInterference: 65, // 2014 election invalidated by courts
    },
    notes: 'Polity: 7 to -3 (2014). 12th coup since 1932. Courts as "judicial coup" preceded military coup. Palace-military-Bangkok elite alliance vs Thaksin populism.',
    sources: ['Polity5', 'Hewison - Thailand: Contestation and Crisis', 'V-Dem']
  },
  {
    id: 'nicaragua-ortega',
    country: 'Nicaragua',
    period: 'Ortega Consolidation',
    yearStart: 2007,
    yearEnd: 2021,
    outcome: 'consolidated',
    outcomeScore: 85,
    factors: {
      judicial: 75, // Supreme Court packed, term limits removed
      federalism: 60,
      political: 80, // Opposition leaders jailed 2021, parties banned
      media: 70, // La Prensa raided, Confidencial closed
      civil: 75, // 2018 protests crushed, NGOs criminalized
      publicOpinion: 55, // Base support but 2018 showed discontent
      mobilizationalBalance: 70, // Sandinista base vs fragmented opposition
      stateCapacity: 60,
      corporateCompliance: 60, // Business initially accommodated, then targeted
      electionInterference: 80, // 2021 election: opponents jailed before
    },
    notes: 'Polity: 9 to 2 to eventually autocracy. Slow erosion then acceleration after 2018 protests. Used COVID and crime as justification for crackdown.',
    sources: ['Polity5', 'Marti i Puig - Nicaragua', 'V-Dem']
  },

  // === ADDITIONAL RESISTED/DEMOCRATIZED CASES ===
  {
    id: 'colombia-uribe',
    country: 'Colombia',
    period: 'Uribe Third Term Blocked',
    yearStart: 2002,
    yearEnd: 2010,
    outcome: 'resisted',
    outcomeScore: 30,
    factors: {
      judicial: 35, // Constitutional Court blocked third term
      federalism: 40,
      political: 45, // Congress passed amendment, but Court blocked
      media: 40,
      civil: 40,
      publicOpinion: 55, // Uribe very popular (~70%)
      mobilizationalBalance: 45,
      stateCapacity: 55,
      corporateCompliance: 45,
      electionInterference: 35,
    },
    notes: 'Polity: Stayed at 7. Constitutional Court blocked popular president from third term despite congressional amendment. Judicial independence held against popular pressure.',
    sources: ['Polity5', 'Bejarano - Precarious Democracies', 'V-Dem']
  },
  {
    id: 'ecuador-correa',
    country: 'Ecuador',
    period: 'Correa Erosion Then Reversal',
    yearStart: 2007,
    yearEnd: 2017,
    outcome: 'resisted',
    outcomeScore: 40,
    factors: {
      judicial: 55, // Courts captured but successor (Moreno) independent
      federalism: 45,
      political: 55, // Opposition weakened but not eliminated
      media: 55, // Media law restrictive but private media survived
      civil: 50,
      publicOpinion: 55, // Correa popular but Moreno won then broke
      mobilizationalBalance: 50,
      stateCapacity: 50,
      corporateCompliance: 50,
      electionInterference: 45,
    },
    notes: 'Polity: 5 to 7. Correa consolidated power but successor Lenin Moreno reversed course, allied with opposition, prosecuted Correa. Shows path dependence not guaranteed.',
    sources: ['Polity5', 'de la Torre - Populist Seduction', 'V-Dem']
  },
  {
    id: 'portugal-transition',
    country: 'Portugal',
    period: 'Carnation Revolution',
    yearStart: 1974,
    yearEnd: 1976,
    outcome: 'democratized',
    outcomeScore: 15,
    factors: {
      judicial: 45,
      federalism: 35,
      political: 35, // Multi-party democracy established
      media: 35,
      civil: 35, // Unions, parties legalized
      publicOpinion: 30, // Desire for change after colonial wars
      mobilizationalBalance: 35, // MFA officers, workers councils
      stateCapacity: 45, // Military split, MFA reformist
      corporateCompliance: 45,
      electionInterference: 20,
    },
    notes: 'Polity: -9 to 10 (1974-76). Military coup but democratizing. PREC period (ongoing revolutionary process) chaotic but consolidated into democracy. EC anchor important.',
    sources: ['Polity5', 'Maxwell - Making of Portuguese Democracy', 'V-Dem']
  },
  {
    id: 'czech-1989',
    country: 'Czechoslovakia',
    period: 'Velvet Revolution',
    yearStart: 1989,
    yearEnd: 1990,
    outcome: 'democratized',
    outcomeScore: 10,
    factors: {
      judicial: 40,
      federalism: 40, // Federal state, later split peacefully
      political: 30, // Civic Forum, genuine competition
      media: 35,
      civil: 35, // Charter 77 network, intellectuals
      publicOpinion: 25, // Mass demonstrations
      mobilizationalBalance: 30, // Regime had no mobilized base left
      stateCapacity: 40, // Party-state collapsed
      corporateCompliance: 40,
      electionInterference: 20,
    },
    notes: 'Polity: -7 to 10 (1989-90). Rapid transition. Charter 77 provided opposition network. Havel moral authority. No violence. Split with Slovakia 1993 also peaceful.',
    sources: ['Polity5', 'Garton Ash - Magic Lantern', 'V-Dem']
  },
  {
    id: 'taiwan-transition',
    country: 'Taiwan',
    period: 'Democratic Transition',
    yearStart: 1987,
    yearEnd: 1996,
    outcome: 'democratized',
    outcomeScore: 10,
    factors: {
      judicial: 40, // Courts gained independence
      federalism: 30,
      political: 25, // DPP legalized, rotation achieved 2000
      media: 35, // Press liberalized
      civil: 35, // Presbyterian church, Tangwai movement
      publicOpinion: 30, // Middle class wanted democracy, identity shift
      mobilizationalBalance: 35,
      stateCapacity: 50, // KMT state strong but reformed
      corporateCompliance: 40, // Business adapted
      electionInterference: 25, // 1996 first direct presidential election
    },
    notes: 'Polity: -1 to 10 (1987-96). Gradual liberalization. Chiang Ching-kuo began, Lee Teng-hui completed. No rupture, negotiated transition. 2000 rotation to DPP confirmed.',
    sources: ['Polity5', 'Rigger - Politics in Taiwan', 'V-Dem']
  },
  {
    id: 'ghana-transition',
    country: 'Ghana',
    period: 'Rawlings Transition',
    yearStart: 1992,
    yearEnd: 2000,
    outcome: 'democratized',
    outcomeScore: 15,
    factors: {
      judicial: 40,
      federalism: 35,
      political: 35, // NPP won 2000, genuine rotation
      media: 40,
      civil: 40,
      publicOpinion: 35,
      mobilizationalBalance: 40,
      stateCapacity: 45,
      corporateCompliance: 45,
      electionInterference: 30,
    },
    notes: 'Polity: -7 to 8 (1992-2000). Rawlings coup leader became elected president, then allowed rotation. 2000 election key test: Kufuor won, Rawlings conceded.',
    sources: ['Polity5', 'Gyimah-Boadi - Africas Turn?', 'V-Dem']
  },
  {
    id: 'mexico-2000',
    country: 'Mexico',
    period: 'End of PRI Hegemony',
    yearStart: 1994,
    yearEnd: 2000,
    outcome: 'democratized',
    outcomeScore: 20,
    factors: {
      judicial: 45, // IFE created, courts strengthened
      federalism: 40, // Governors gained autonomy
      political: 35, // PAN won 2000, first rotation since 1929
      media: 45, // Televisa dominant but some opening
      civil: 40, // Civil society grew after 1985 earthquake, 1994 crisis
      publicOpinion: 35,
      mobilizationalBalance: 40, // PRI corporatist structures weakened
      stateCapacity: 50, // State strong but reformed
      corporateCompliance: 45,
      electionInterference: 35, // IFE ensured clean 2000 election
    },
    notes: 'Polity: 4 to 8 (1994-2000). Gradual transition within regime. IFE (electoral institute) key. 1988 fraud created pressure. 2000 Fox victory confirmed democratization.',
    sources: ['Polity5', 'Magaloni - Voting for Autocracy', 'V-Dem']
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
