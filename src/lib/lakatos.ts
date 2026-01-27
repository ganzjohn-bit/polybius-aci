// Lakatosian Research Programme Framework
// Each theoretical model is treated as a research programme with:
// - Hard core: unfalsifiable central commitments
// - Protective belt: modifiable auxiliary hypotheses
// - Predictions: testable hypotheses generated from the model
// - Track record: progressive (predicts novel facts) vs degenerating (only post-hoc explanation)

// =============================================================================
// CRISIS & INFLECTION POINT FRAMEWORK (v0.1 sketch)
// =============================================================================
//
// The basic insight: authoritarian consolidation is not linear. Crises create
// discontinuous jumps - inflection points where trajectories can accelerate,
// reverse, or transform. The SAME crisis can push in opposite directions
// depending on existing conditions.
//
// Key concepts:
// 1. Crisis Type - the nature of the exogenous shock
// 2. Regime Phase - where we are in consolidation (early/mid/late/failing)
// 3. Structural Conditions - civil society strength, elite cohesion, etc.
// 4. Model-Specific Interpretation - each theory predicts different outcomes
// 5. Path Dependency - sequence matters, some transitions are irreversible

export type CrisisType =
  | 'economic'           // recession, inflation, financial panic, unemployment spike
  | 'legitimacy'         // scandal, corruption revelation, policy failure, hypocrisy exposed
  | 'succession'         // leader incapacity, death, intra-elite power struggle
  | 'external'           // war, international sanctions, foreign intervention, treaty violation
  | 'mobilization'       // mass protest crosses critical threshold
  | 'repression_backfire' // crackdown delegitimizes rather than intimidates
  | 'defection_cascade'  // elite defections reach tipping point
  | 'institutional'      // constitutional crisis, court confrontation, election dispute
  | 'security'           // terrorism, political violence, assassination
  | 'media'              // major leak, whistleblower, investigative exposé

export type RegimePhase =
  | 'pre_authoritarian'  // democratic but with warning signs (ACI < 25)
  | 'early_consolidation' // initial moves against institutions (ACI 25-40)
  | 'mid_consolidation'   // significant erosion underway (ACI 40-60)
  | 'late_consolidation'  // near-complete capture (ACI 60-80)
  | 'consolidated'        // full authoritarian control (ACI > 80)
  | 'failing_attempt'     // consolidation stalling or reversing (ACI declining)

export interface Crisis {
  id: string;
  type: CrisisType;
  description: string;
  date: string;
  severity: number; // 0-100
  resolved: boolean;
  outcome?: 'accelerated_consolidation' | 'decelerated_consolidation' | 'reversed_trajectory' | 'no_effect' | 'pending';
}

export interface InflectionPoint {
  crisisId: string;
  phase: RegimePhase;
  structuralConditions: {
    civilSocietyStrength: 'weak' | 'moderate' | 'strong';
    eliteCohesion: 'fragmented' | 'divided' | 'unified';
    popularLegitimacy: 'low' | 'contested' | 'high';
    repressiveCapacity: 'low' | 'moderate' | 'high';
    internationalConstraints: 'none' | 'weak' | 'strong';
  };
  modelPredictions: Record<string, {
    predictedOutcome: string;
    confidence: number;
    reasoning: string;
  }>;
}

// How each model interprets crisis-phase interactions
export const crisisInterpretations: Record<string, Record<CrisisType, {
  duringConsolidation: string;
  duringFailure: string;
  keyVariable: string;
}>> = {
  levitsky: {
    economic: {
      duringConsolidation: 'Economic crisis provides pretext for emergency powers, accelerates institutional capture if guardrails already weakened',
      duringFailure: 'Economic crisis blamed on regime, accelerates elite defection and opposition unity',
      keyVariable: 'Whether institutions retain independence to constrain emergency response'
    },
    legitimacy: {
      duringConsolidation: 'Scandal absorbed if norms already eroded; opposition lacks institutional tools to enforce accountability',
      duringFailure: 'Scandal becomes focal point for elite coordination against regime',
      keyVariable: 'State of norm erosion and opposition institutional capacity'
    },
    succession: {
      duringConsolidation: 'Succession crisis reveals regime fragility, may trigger elite defection if no clear successor',
      duringFailure: 'Succession crisis accelerates collapse as factions compete',
      keyVariable: 'Elite cohesion and institutionalization of succession'
    },
    external: {
      duringConsolidation: 'External threat enables rally effect, justifies expanded executive power',
      duringFailure: 'External pressure (sanctions, isolation) compounds regime weakness',
      keyVariable: 'Credibility of external threat and international regime preferences'
    },
    mobilization: {
      duringConsolidation: 'Mass protest tests repressive capacity; success emboldens further repression, failure may trigger defection',
      duringFailure: 'Mass protest becomes revolution threat, accelerates elite exit',
      keyVariable: 'Repressive capacity and willingness of security forces'
    },
    repression_backfire: {
      duringConsolidation: 'Backfire rare when norms eroded; regime supporters rationalize',
      duringFailure: 'Backfire accelerates delegitimization, potential cascade',
      keyVariable: 'Remaining norm constraints and media freedom'
    },
    defection_cascade: {
      duringConsolidation: 'Early defections can be punished, used to enforce discipline',
      duringFailure: 'Defection cascade is the mechanism of collapse',
      keyVariable: 'Elite coordination capacity and exit costs'
    },
    institutional: {
      duringConsolidation: 'Constitutional crisis is the consolidation mechanism - regime wins these confrontations',
      duringFailure: 'Institutional crisis exposes regime weakness, courts/legislature reassert independence',
      keyVariable: 'Which side security forces and key institutions back'
    },
    security: {
      duringConsolidation: 'Security crisis justifies emergency measures, surveillance, restrictions',
      duringFailure: 'Security crisis may provide temporary rally effect even for failing regime',
      keyVariable: 'Whether regime can credibly claim to provide security'
    },
    media: {
      duringConsolidation: 'Exposé dismissed as "fake news" if media already captured/delegitimized',
      duringFailure: 'Exposé provides ammunition for opposition, focal point for elite defection',
      keyVariable: 'Media independence and credibility with regime supporters'
    }
  },

  bermanRiley: {
    economic: {
      duringConsolidation: 'Economic crisis atomizes workers, weakens unions, reduces civil society capacity',
      duringFailure: 'Economic crisis can strengthen solidarity if organizational infrastructure intact',
      keyVariable: 'Pre-existing organizational density and labor movement strength'
    },
    legitimacy: {
      duringConsolidation: 'Without strong civil society to amplify, scandals fade quickly',
      duringFailure: 'Civil society organizations can sustain pressure, prevent normalization',
      keyVariable: 'Organizational capacity to maintain sustained campaigns'
    },
    succession: {
      duringConsolidation: 'Civil society too weak to exploit elite divisions',
      duringFailure: 'Strong civil society can ally with defecting elites',
      keyVariable: 'Whether civil society can coordinate with elite factions'
    },
    external: {
      duringConsolidation: 'External threat weakens civil society as "fifth column" accusations',
      duringFailure: 'International civil society linkages provide protection and resources',
      keyVariable: 'Transnational civil society networks'
    },
    mobilization: {
      duringConsolidation: 'Weak civil society means protests are spontaneous, uncoordinated, easily dispersed',
      duringFailure: 'Strong civil society means protests are sustained, strategic, resilient',
      keyVariable: 'Organizational infrastructure behind mobilization'
    },
    repression_backfire: {
      duringConsolidation: 'Without organizations to document and amplify, repression is invisible',
      duringFailure: 'Civil society documents abuses, maintains memory, builds solidarity',
      keyVariable: 'Documentation and communication capacity'
    },
    defection_cascade: {
      duringConsolidation: 'Defectors have nowhere to go - no civil society to receive them',
      duringFailure: 'Civil society provides landing pad for elite defectors',
      keyVariable: 'Whether alternative power centers exist outside regime'
    },
    institutional: {
      duringConsolidation: 'Courts without civil society backing cannot enforce rulings',
      duringFailure: 'Civil society mobilizes to defend institutional independence',
      keyVariable: 'Civil society capacity for court defense and compliance pressure'
    },
    security: {
      duringConsolidation: 'Security crisis used to target civil society organizations',
      duringFailure: 'Civil society may provide alternative security/mutual aid',
      keyVariable: 'Whether civil society is framed as security threat'
    },
    media: {
      duringConsolidation: 'No organizational infrastructure to act on revelations',
      duringFailure: 'Civil society amplifies and operationalizes media exposés',
      keyVariable: 'Links between investigative media and organized civil society'
    }
  },

  marxian: {
    economic: {
      duringConsolidation: 'Economic crisis is THE key variable - reveals capital-regime alliance as capital demands discipline of labor',
      duringFailure: 'Economic crisis may cause capital to abandon failing regime that cannot deliver stability',
      keyVariable: 'Profit rates, capital strike threats, business confidence'
    },
    legitimacy: {
      duringConsolidation: 'Ideology is superstructure; scandal irrelevant if material interests served',
      duringFailure: 'Legitimacy crisis may reflect deeper crisis of accumulation',
      keyVariable: 'Whether scandal threatens capital accumulation'
    },
    succession: {
      duringConsolidation: 'Capital will back whichever faction best serves accumulation',
      duringFailure: 'Succession crisis is opportunity for class realignment',
      keyVariable: 'Which faction capital prefers'
    },
    external: {
      duringConsolidation: 'War/sanctions may serve military-industrial capital faction',
      duringFailure: 'International capital may withdraw support from unstable regime',
      keyVariable: 'International capital flows and investment patterns'
    },
    mobilization: {
      duringConsolidation: 'Working class mobilization is the primary threat - regime exists to suppress it',
      duringFailure: 'Labor mobilization can be decisive in bringing down regime',
      keyVariable: 'Strike activity, union density, class consciousness'
    },
    repression_backfire: {
      duringConsolidation: 'Repression of labor is the point; backfire only if it threatens production',
      duringFailure: 'Repression backfire may trigger capital flight',
      keyVariable: 'Impact on production and accumulation'
    },
    defection_cascade: {
      duringConsolidation: 'Capital defection is what matters; political elites follow capital',
      duringFailure: 'Capital abandonment precedes and causes political collapse',
      keyVariable: 'Business community positioning'
    },
    institutional: {
      duringConsolidation: 'Institutions serve class interests; crisis just reveals this',
      duringFailure: 'Institutional crisis may create opening for working class advance',
      keyVariable: 'Which class forces can exploit institutional vacuum'
    },
    security: {
      duringConsolidation: 'Security crisis justifies discipline of labor under emergency',
      duringFailure: 'Security crisis reveals regime inability to maintain order capital needs',
      keyVariable: 'Impact on conditions for accumulation'
    },
    media: {
      duringConsolidation: 'Media owned by capital; exposé only matters if capital wants it to',
      duringFailure: 'Capital-owned media may turn against regime when useful',
      keyVariable: 'Media ownership and capital interests'
    }
  },

  paxton: {
    economic: {
      duringConsolidation: 'Stage 3-4: Economic crisis may deepen elite alliance (need strong hand) or fracture it (blame game)',
      duringFailure: 'Economic crisis prevents stage advancement; movement stuck or regresses',
      keyVariable: 'Current stage and elite alliance stability'
    },
    legitimacy: {
      duringConsolidation: 'Stage 4: Scandal may trigger move to Stage 5 radicalization (purge "traitors") or entropy',
      duringFailure: 'Scandal prevents advancement to next stage',
      keyVariable: 'Which stage and whether scandal implicates leader or movement'
    },
    succession: {
      duringConsolidation: 'Fascist movements are leader-centric; succession crisis existential',
      duringFailure: 'Succession crisis accelerates Stage 5 entropy',
      keyVariable: 'Cult of personality strength and institutional depth'
    },
    external: {
      duringConsolidation: 'Stage 4-5: External war is classic radicalization path',
      duringFailure: 'External defeat accelerates entropy and collapse',
      keyVariable: 'Military capacity and international correlation of forces'
    },
    mobilization: {
      duringConsolidation: 'Counter-mobilization may slow stage progression',
      duringFailure: 'Mass mobilization can force stage regression',
      keyVariable: 'Relative mobilization capacity of movement vs opposition'
    },
    repression_backfire: {
      duringConsolidation: 'Stage 4: Backfire may trigger radicalization spiral',
      duringFailure: 'Backfire accelerates elite defection and stage regression',
      keyVariable: 'Current stage and elite alliance strength'
    },
    defection_cascade: {
      duringConsolidation: 'Stage 3 conservative alliance is key; defection can prevent Stage 4',
      duringFailure: 'Elite defection is mechanism of stage regression',
      keyVariable: 'Conservative elite calculation of interests'
    },
    institutional: {
      duringConsolidation: 'Each stage involves specific institutional confrontations',
      duringFailure: 'Losing institutional confrontation means stage regression',
      keyVariable: 'Current stage and specific institution at stake'
    },
    security: {
      duringConsolidation: 'Security crisis classic pretext for stage advancement',
      duringFailure: 'Security failure may discredit regime',
      keyVariable: 'Whether regime can claim to provide order'
    },
    media: {
      duringConsolidation: 'Exposé effect depends on stage - earlier stages more vulnerable',
      duringFailure: 'Exposé can prevent elite alliance formation (Stage 3 block)',
      keyVariable: 'Current stage and target of exposé'
    }
  },

  frankfurtSchool: {
    economic: {
      duringConsolidation: 'Economic crisis intensifies inter-racket competition for resources',
      duringFailure: 'Economic crisis accelerates Behemoth dysfunction and racket warfare',
      keyVariable: 'Which rackets control economic policy and who gets blamed'
    },
    legitimacy: {
      duringConsolidation: 'Scandal is inter-racket warfare; one faction exposing another',
      duringFailure: 'Scandal reveals Behemoth chaos, no unified will to cover up',
      keyVariable: 'Which racket is implicated and who benefits'
    },
    succession: {
      duringConsolidation: 'Succession is peak Behemoth dynamics - rackets compete for new leader control',
      duringFailure: 'Succession crisis may cause Behemoth to fly apart',
      keyVariable: 'Balance of power among rackets'
    },
    external: {
      duringConsolidation: 'War reveals Behemoth dysfunction (competing commands, contradictory orders)',
      duringFailure: 'External pressure may unite rackets temporarily or accelerate fragmentation',
      keyVariable: 'Whether external threat creates common enemy or blame game'
    },
    mobilization: {
      duringConsolidation: 'Protest response reveals inter-racket conflict (who controls security?)',
      duringFailure: 'Rackets may separately negotiate with opposition',
      keyVariable: 'Security apparatus cohesion'
    },
    repression_backfire: {
      duringConsolidation: 'Backfire blamed on rival racket; internal purge follows',
      duringFailure: 'Backfire accelerates racket defection',
      keyVariable: 'Which racket controlled the repression'
    },
    defection_cascade: {
      duringConsolidation: 'Individual racket defection (e.g., business) destabilizes Behemoth',
      duringFailure: 'Rackets race to defect and position for post-regime',
      keyVariable: 'Exit options for each racket'
    },
    institutional: {
      duringConsolidation: 'Institutions are rackets; crisis is inter-racket warfare',
      duringFailure: 'Institutional crisis reveals lack of unified state capacity',
      keyVariable: 'Which rackets control which institutions'
    },
    security: {
      duringConsolidation: 'Security crisis reveals competing security rackets',
      duringFailure: 'Security failure blamed across rackets',
      keyVariable: 'Security apparatus fragmentation'
    },
    media: {
      duringConsolidation: 'Media is racket; exposé may be inter-racket attack',
      duringFailure: 'Media racket may switch sides or fragment',
      keyVariable: 'Media ownership and racket alignment'
    }
  },

  svolik: {
    economic: {
      duringConsolidation: 'Economic crisis tests partisan tolerance; supporters may accept erosion for policy',
      duringFailure: 'Economic crisis reduces partisan tolerance, enables elite coordination',
      keyVariable: 'Whether supporters blame regime or external factors'
    },
    legitimacy: {
      duringConsolidation: 'Scandal creates elite coordination opportunity if severe enough',
      duringFailure: 'Scandal provides focal point for elite defection coordination',
      keyVariable: 'Elite perception of regime survival probability'
    },
    succession: {
      duringConsolidation: 'Succession uncertainty complicates elite calculations',
      duringFailure: 'Succession crisis enables elite coordination against weakened leader',
      keyVariable: 'Elite expectations about successor'
    },
    external: {
      duringConsolidation: 'External threat may increase partisan tolerance',
      duringFailure: 'External pressure may coordinate elite defection',
      keyVariable: 'Whether threat is seen as regime-caused'
    },
    mobilization: {
      duringConsolidation: 'Mass mobilization is signal to elites about regime support',
      duringFailure: 'Large opposition mobilization enables elite coordination',
      keyVariable: 'Elite interpretation of mobilization meaning'
    },
    repression_backfire: {
      duringConsolidation: 'Backfire may shift elite calculations about regime viability',
      duringFailure: 'Backfire becomes coordination signal for defection',
      keyVariable: 'Whether elites see backfire as regime weakness signal'
    },
    defection_cascade: {
      duringConsolidation: 'Early defectors are punished; deters others',
      duringFailure: 'Each defection lowers cost of next defection (cascade)',
      keyVariable: 'Number and prominence of defectors'
    },
    institutional: {
      duringConsolidation: 'Institutional crisis tests whether elites will coordinate defense',
      duringFailure: 'Elites may coordinate behind institution against regime',
      keyVariable: 'Elite stake in threatened institution'
    },
    security: {
      duringConsolidation: 'Security crisis may raise partisan tolerance temporarily',
      duringFailure: 'Security failure is elite coordination opportunity',
      keyVariable: 'Elite perception of regime security competence'
    },
    media: {
      duringConsolidation: 'Exposé creates common knowledge, enables elite coordination',
      duringFailure: 'Exposé is focal point for coordinated elite response',
      keyVariable: 'Whether exposé becomes common knowledge among elites'
    }
  },

  gramscian: {
    economic: {
      duringConsolidation: 'Economic crisis is organic crisis - opens space for hegemonic reconstruction',
      duringFailure: 'Economic crisis reveals failure of regime hegemonic project',
      keyVariable: 'Whether counter-hegemonic narrative can explain crisis'
    },
    legitimacy: {
      duringConsolidation: 'Scandal is hegemonic struggle - regime will try to reframe',
      duringFailure: 'Scandal reveals hegemonic failure, opens counter-hegemonic space',
      keyVariable: 'Narrative control and framing capacity'
    },
    succession: {
      duringConsolidation: 'Succession is moment of hegemonic vulnerability',
      duringFailure: 'Succession crisis opens war of position',
      keyVariable: 'Organic intellectuals available for counter-hegemony'
    },
    external: {
      duringConsolidation: 'External threat may strengthen hegemonic narrative (nationalism)',
      duringFailure: 'External pressure may delegitimize regime internationally',
      keyVariable: 'Hegemonic framing of external relations'
    },
    mobilization: {
      duringConsolidation: 'Counter-hegemonic mobilization is the goal',
      duringFailure: 'Mobilization is manifestation of successful counter-hegemony',
      keyVariable: 'Whether movement has coherent counter-hegemonic project'
    },
    repression_backfire: {
      duringConsolidation: 'Backfire creates martyrs, strengthens counter-hegemonic narrative',
      duringFailure: 'Backfire reveals regime reliance on coercion over consent',
      keyVariable: 'Counter-hegemonic narrative capacity'
    },
    defection_cascade: {
      duringConsolidation: 'Defectors become organic intellectuals for counter-hegemony',
      duringFailure: 'Defection is symptom of hegemonic collapse',
      keyVariable: 'Intellectual quality and reach of defectors'
    },
    institutional: {
      duringConsolidation: 'Institutions are sites of hegemonic struggle',
      duringFailure: 'Institutional crisis reveals hegemonic failure in civil society',
      keyVariable: 'Civil society institution alignment'
    },
    security: {
      duringConsolidation: 'Security crisis tests hegemony - can regime maintain consent under stress?',
      duringFailure: 'Security failure delegitimizes regime claims',
      keyVariable: 'Whether security crisis enables fear-based temporary consent'
    },
    media: {
      duringConsolidation: 'Media is hegemonic apparatus; exposé is counter-hegemonic action',
      duringFailure: 'Exposé accelerates hegemonic crisis',
      keyVariable: 'Reach and credibility of counter-hegemonic media'
    }
  },

  redistributive: {
    economic: {
      duringConsolidation: 'Economic crisis shifts bargaining power - may increase or decrease revolution threat',
      duringFailure: 'Economic crisis may force elite concessions to reduce threat',
      keyVariable: 'Direction of threat perception shift'
    },
    legitimacy: {
      duringConsolidation: 'Scandal may not shift material calculations',
      duringFailure: 'Scandal plus economic stress may trigger redistribution demands',
      keyVariable: 'Whether scandal affects mass mobilization capacity'
    },
    succession: {
      duringConsolidation: 'Succession uncertainty may increase elite risk aversion',
      duringFailure: 'Masses may extract concessions during succession uncertainty',
      keyVariable: 'Elite coordination during transition'
    },
    external: {
      duringConsolidation: 'External threat may justify suppressing redistribution demands',
      duringFailure: 'External isolation may weaken elite bargaining position',
      keyVariable: 'Elite access to external resources and exit options'
    },
    mobilization: {
      duringConsolidation: 'Mobilization is the revolution threat that drives elite calculations',
      duringFailure: 'Strong mobilization forces elite concessions',
      keyVariable: 'Credibility of revolution threat'
    },
    repression_backfire: {
      duringConsolidation: 'Backfire increases perceived cost of repression in elite calculation',
      duringFailure: 'Backfire shifts bargaining toward concessions',
      keyVariable: 'Elite perception of repression costs vs redistribution costs'
    },
    defection_cascade: {
      duringConsolidation: 'Elite defection reduces repressive capacity, shifts bargaining',
      duringFailure: 'Defection is elite concession strategy (abandon hardliners)',
      keyVariable: 'Whether defectors join redistribution coalition'
    },
    institutional: {
      duringConsolidation: 'Institutional crisis may affect redistribution credibility',
      duringFailure: 'Institutional crisis may lock in redistributive bargain',
      keyVariable: 'Credibility of commitment mechanisms'
    },
    security: {
      duringConsolidation: 'Security crisis may increase elite repressive capacity justification',
      duringFailure: 'Security failure reveals limits of repressive capacity',
      keyVariable: 'Actual vs perceived repressive capacity'
    },
    media: {
      duringConsolidation: 'Exposé may affect mass calculation of regime strength',
      duringFailure: 'Exposé of elite wealth may intensify redistribution demands',
      keyVariable: 'Content of exposé (elite wealth vs regime weakness)'
    }
  },

  linz: {
    economic: {
      duringConsolidation: 'Economic crisis may trigger presidential emergency powers',
      duringFailure: 'Economic crisis blamed on executive, strengthens legislative resistance',
      keyVariable: 'Which branch is blamed and constitutional emergency provisions'
    },
    legitimacy: {
      duringConsolidation: 'Scandal may trigger impeachment standoff',
      duringFailure: 'Scandal provides grounds for constitutional removal',
      keyVariable: 'Impeachment provisions and legislative will'
    },
    succession: {
      duringConsolidation: 'Fixed terms create succession vulnerability points',
      duringFailure: 'Succession crisis in presidential system is constitutional crisis',
      keyVariable: 'Constitutional succession provisions'
    },
    external: {
      duringConsolidation: 'War powers expand executive authority',
      duringFailure: 'Failed foreign policy strengthens legislative oversight',
      keyVariable: 'War powers provisions'
    },
    mobilization: {
      duringConsolidation: 'Mass mobilization may be directed at legislature to support executive',
      duringFailure: 'Mobilization pressures legislature to check executive',
      keyVariable: 'Target of mobilization (executive support vs legislative action)'
    },
    repression_backfire: {
      duringConsolidation: 'Backfire may trigger legislative investigation',
      duringFailure: 'Backfire strengthens legislative resistance',
      keyVariable: 'Legislative independence and oversight capacity'
    },
    defection_cascade: {
      duringConsolidation: 'Legislative co-partisans defecting is key check',
      duringFailure: 'Co-partisan defection enables legislative action',
      keyVariable: 'Co-partisan legislative loyalty'
    },
    institutional: {
      duringConsolidation: 'Institutional crisis IS the Linzian dynamic - dual legitimacy conflict',
      duringFailure: 'Institutional crisis resolved in favor of legislative/judicial branch',
      keyVariable: 'Military and security force positioning'
    },
    security: {
      duringConsolidation: 'Security crisis may justify executive emergency action',
      duringFailure: 'Security failure may trigger legislative assertion',
      keyVariable: 'Emergency powers provisions'
    },
    media: {
      duringConsolidation: 'Exposé may trigger congressional investigation',
      duringFailure: 'Exposé provides grounds for legislative action',
      keyVariable: 'Congressional investigation capacity'
    }
  },

  classical: {
    economic: {
      duringConsolidation: 'Economic hardship feeds popular passion, enables demagogy',
      duringFailure: 'Economic failure discredits demagogue',
      keyVariable: 'Whether demagogue can blame others for economic pain'
    },
    legitimacy: {
      duringConsolidation: 'Scandal may not penetrate if public virtue already degraded',
      duringFailure: 'Scandal may restore public virtue by revealing vice',
      keyVariable: 'State of civic virtue and discernment'
    },
    succession: {
      duringConsolidation: 'Tyrannies have succession problems by nature',
      duringFailure: 'Succession crisis reveals tyranny fragility',
      keyVariable: 'Institutionalization vs personal rule'
    },
    external: {
      duringConsolidation: 'External threat feeds passion and rally around leader',
      duringFailure: 'Military defeat historically ends tyrannies',
      keyVariable: 'Military outcomes'
    },
    mobilization: {
      duringConsolidation: 'Mob (ochlos) mobilization is mechanism of tyranny',
      duringFailure: 'Virtuous citizen mobilization can restore republic',
      keyVariable: 'Character of mobilization (passionate mob vs virtuous citizens)'
    },
    repression_backfire: {
      duringConsolidation: 'Tyranny eventually overreaches, creating martyrs',
      duringFailure: 'Backfire awakens civic virtue',
      keyVariable: 'Moral clarity of repression'
    },
    defection_cascade: {
      duringConsolidation: 'Virtuous elites have already withdrawn from public life',
      duringFailure: 'Return of virtuous elites to public engagement',
      keyVariable: 'Quality and virtue of potential defectors'
    },
    institutional: {
      duringConsolidation: 'Institutions cannot save republic without civic virtue',
      duringFailure: 'Institutional restoration follows virtue restoration',
      keyVariable: 'State of civic virtue'
    },
    security: {
      duringConsolidation: 'Security crisis feeds passion and fear',
      duringFailure: 'Security failure may awaken citizens from fear',
      keyVariable: 'Fear vs reason in public psychology'
    },
    media: {
      duringConsolidation: 'Exposé wasted if public lacks virtue to act on it',
      duringFailure: 'Exposé may spark virtue restoration',
      keyVariable: 'Public capacity for moral judgment'
    }
  }
};

// Determine regime phase from scores
export function determinePhase(avgScore: number, trend: 'rising' | 'stable' | 'falling'): RegimePhase {
  if (trend === 'falling' && avgScore < 50) return 'failing_attempt';
  if (avgScore < 25) return 'pre_authoritarian';
  if (avgScore < 40) return 'early_consolidation';
  if (avgScore < 60) return 'mid_consolidation';
  if (avgScore < 80) return 'late_consolidation';
  return 'consolidated';
}

// Generate crisis-conditional predictions
export function generateCrisisPredictions(
  modelId: string,
  crisisType: CrisisType,
  phase: RegimePhase,
  currentScores: Record<string, number>
): Prediction[] {
  const predictions: Prediction[] = [];
  const now = new Date();
  const threeMonths = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const interpretation = crisisInterpretations[modelId]?.[crisisType];
  if (!interpretation) return predictions;

  const isConsolidating = phase !== 'failing_attempt' && phase !== 'pre_authoritarian';
  const hypothesis = isConsolidating ? interpretation.duringConsolidation : interpretation.duringFailure;

  predictions.push({
    id: `${modelId}-crisis-${crisisType}-${Date.now()}`,
    modelId,
    hypothesis: `Given ${crisisType} crisis during ${phase}: ${hypothesis}`,
    timeframe: '3 months',
    generatedDate: formatDate(now),
    targetDate: formatDate(threeMonths),
    conditions: `Key variable to watch: ${interpretation.keyVariable}`,
    refutationConditions: isConsolidating
      ? 'Crisis leads to deconsolidation instead of acceleration'
      : 'Crisis leads to consolidation instead of deceleration',
    status: 'pending',
    novelty: 'novel'
  });

  return predictions;
}

// Point of no return thresholds by model
export const pointOfNoReturn: Record<string, {
  threshold: string;
  indicators: string[];
  reversibility: string;
}> = {
  levitsky: {
    threshold: 'When judiciary AND electoral system both captured (ACI > 70 in both)',
    indicators: ['Courts no longer rule against executive', 'Electoral commission under executive control', 'Opposition cannot win elections'],
    reversibility: 'Extremely difficult - requires external intervention or regime collapse'
  },
  bermanRiley: {
    threshold: 'When autonomous civil society organizations destroyed (civil society score > 75)',
    indicators: ['Independent unions illegal or captured', 'NGOs shuttered or co-opted', 'No autonomous organizational infrastructure'],
    reversibility: 'Rebuilding takes a generation - organizational memory lost'
  },
  frankfurtSchool: {
    threshold: 'No single threshold - Behemoth is inherently unstable',
    indicators: ['Look for signs of entropy: infighting, policy chaos, racket warfare'],
    reversibility: 'Regime may collapse from internal contradictions regardless of opposition'
  },
  paxton: {
    threshold: 'Stage 4 completion - exercise of power with radicalization dynamic',
    indicators: ['New outgroups being targeted', 'Former allies purged', 'Radicalization spiral begun'],
    reversibility: 'Stage 5 typically ends in war, collapse, or transformation - rarely stable reversal'
  },
  marxian: {
    threshold: 'When independent working class organization destroyed',
    indicators: ['Unions illegal or fully captured', 'Strike activity criminalized', 'No autonomous labor party'],
    reversibility: 'Working class organization can rebuild but takes time and usually external support'
  },
  svolik: {
    threshold: 'When elite coordination against autocrat becomes impossible',
    indicators: ['All potential coordinators surveilled', 'No safe communication channels', 'Exit options closed'],
    reversibility: 'Requires external shock or generational change in elite composition'
  },
  gramscian: {
    threshold: 'When counter-hegemonic space closed',
    indicators: ['All media captured', 'Educational institutions aligned', 'No alternative common sense articulable'],
    reversibility: 'Hegemony is never total - cracks always exist, but may take generation to exploit'
  },
  redistributive: {
    threshold: 'When elite repressive capacity exceeds any credible revolution threat',
    indicators: ['Modern surveillance state', 'Atomized population', 'No credible mass mobilization possible'],
    reversibility: 'Technology shock or elite defection can shift balance'
  },
  linz: {
    threshold: 'When executive controls both legislature and judiciary',
    indicators: ['No impeachment threat', 'Courts rubber-stamp', 'Military aligned with executive'],
    reversibility: 'Constitutional restoration requires regime collapse'
  },
  classical: {
    threshold: 'When civic virtue completely degraded',
    indicators: ['No public-spirited citizens', 'Universal cynicism', 'Private interest dominates'],
    reversibility: 'Virtue restoration possible but rare - usually requires crisis or inspiration'
  }
};

// =============================================================================
// END CRISIS FRAMEWORK SKETCH
// =============================================================================

export interface Prediction {
  id: string;
  modelId: string;
  hypothesis: string;
  timeframe: string; // e.g., "3 months", "6 months", "1 year"
  generatedDate: string;
  targetDate: string;
  conditions: string; // what would confirm this
  refutationConditions: string; // what would refute this
  status: 'pending' | 'confirmed' | 'refuted' | 'ambiguous';
  outcome?: string;
  outcomeDate?: string;
  novelty: 'novel' | 'known' | 'retrodiction'; // novel prediction vs explaining known facts
}

export interface ResearchProgramme {
  modelId: string;
  modelName: string;
  hardCore: string[]; // unfalsifiable central assumptions
  protectiveBelt: string[]; // modifiable auxiliary hypotheses
  positiveHeuristic: string; // how to develop the programme
  negativeHeuristic: string; // what's off-limits for modification
  predictions: Prediction[];
  confirmedNovel: number; // novel predictions confirmed
  confirmedKnown: number; // known facts explained
  refuted: number;
  pending: number;
  progressivenessScore: number; // calculated from track record
  status: 'progressive' | 'stagnant' | 'degenerating';
}

// Define the hard core and heuristics for each theoretical model
export const researchProgrammes: Record<string, Omit<ResearchProgramme, 'predictions' | 'confirmedNovel' | 'confirmedKnown' | 'refuted' | 'pending' | 'progressivenessScore' | 'status'>> = {
  levitsky: {
    modelId: 'levitsky',
    modelName: 'Levitsky-Ziblatt (Institutional Erosion)',
    hardCore: [
      'Democratic breakdown in modern era proceeds through gradual institutional erosion, not dramatic coups',
      'Elected autocrats use legal means to dismantle checks and balances',
      'Polarization and norm erosion precede institutional capture',
      'Opposition fragmentation enables consolidation'
    ],
    protectiveBelt: [
      'Specific sequence of institutional capture (courts first vs legislature first)',
      'Role of media capture timing',
      'Whether elite defection can reverse consolidation',
      'Precise thresholds for "point of no return"'
    ],
    positiveHeuristic: 'Track institutional independence metrics, norm violations, and elite accommodation patterns',
    negativeHeuristic: 'Do not explain breakdown through external shocks or mass uprising alone - focus on elite-level institutional dynamics'
  },

  bermanRiley: {
    modelId: 'bermanRiley',
    modelName: 'Berman-Riley (Civil Society Destruction)',
    hardCore: [
      'Strong autonomous civil society is the key bulwark against authoritarianism',
      'Fascism succeeds when civil society is weak or destroyed before the regime takes power',
      'Working-class organization (unions, parties) is particularly crucial',
      'Elite-mass linkages through civil society constrain both left and right extremism'
    ],
    protectiveBelt: [
      'Which types of civil society matter most (unions vs churches vs associations)',
      'Whether civil society can be rebuilt under authoritarian pressure',
      'Role of new digital civil society forms',
      'Threshold of civil society density needed for resistance'
    ],
    positiveHeuristic: 'Measure civil society density, union membership, associational life, and organizational capacity for collective action',
    negativeHeuristic: 'Do not reduce explanation to elite bargaining or institutional design alone - civil society is causally primary'
  },

  frankfurtSchool: {
    modelId: 'frankfurtSchool',
    modelName: 'Frankfurt School (Behemoth)',
    hardCore: [
      'Fascism represents non-state: competing power blocs (party, military, industry, bureaucracy) in unstable equilibrium',
      'No unified totalitarian will - rather chaotic inter-racket competition',
      'Capital is complicit but not in control - one racket among many',
      'Propaganda creates false consciousness but system is fundamentally irrational'
    ],
    protectiveBelt: [
      'Which rackets dominate in specific cases',
      'Whether Behemoth dynamics apply to electoral authoritarianism',
      'Role of tech platforms as new racket',
      'How racket competition manifests in policy incoherence'
    ],
    positiveHeuristic: 'Look for inter-elite conflict, policy incoherence, competing power centers, corporate complicity alongside autonomy',
    negativeHeuristic: 'Do not assume unified regime will or rational state coordination - expect chaos and contradiction'
  },

  classical: {
    modelId: 'classical',
    modelName: 'Classical Theory (Tyranny/Anacyclosis)',
    hardCore: [
      'Regime types cycle: democracy → ochlocracy (mob rule) → tyranny',
      'Democratic decline driven by demagogues exploiting popular passions',
      'Excessive freedom breeds disorder, creating demand for strongman',
      'Civic virtue decay is root cause - institutions are symptoms'
    ],
    protectiveBelt: [
      'Specific triggers that accelerate cycle',
      'Whether mixed constitution can break cycle',
      'Role of economic inequality in cycle dynamics',
      'How long cycles take in modern conditions'
    ],
    positiveHeuristic: 'Track public opinion, demagogic rhetoric, civic virtue indicators, passion vs reason in political discourse',
    negativeHeuristic: 'Do not expect institutional solutions to work absent civic virtue renewal'
  },

  paxton: {
    modelId: 'paxton',
    modelName: 'Paxton (Fascism Stages)',
    hardCore: [
      'Fascism proceeds through identifiable stages: creation → rooting → power → exercise → radicalization/entropy',
      'Each stage requires different conditions and alliances',
      'Conservative elite alliance is necessary for stage 3 (taking power)',
      'Radicalization OR entropy in stage 5 - not stable equilibrium'
    ],
    protectiveBelt: [
      'Whether stages can be skipped or reversed',
      'How to identify current stage boundaries',
      'Whether electoral authoritarianism follows same stages',
      'Role of external constraints (international) on stage progression'
    ],
    positiveHeuristic: 'Identify current stage, track conditions for stage transitions, monitor elite alliance formation',
    negativeHeuristic: 'Do not treat fascism as static ideology - it is a process with dynamic stages'
  },

  marxian: {
    modelId: 'marxian',
    modelName: 'Marxian (Class Analysis)',
    hardCore: [
      'State form reflects class power relations',
      'Authoritarianism serves capital accumulation when democracy threatens property',
      'Fascism is capitalism in crisis - emergency rule to discipline labor',
      'Working class organization is primary constraint on authoritarian turn'
    ],
    protectiveBelt: [
      'Role of petty bourgeoisie and middle class',
      'Whether finance vs industrial capital have different regime preferences',
      'How racial capitalism modifies class dynamics',
      'Conditions under which capital prefers democracy'
    ],
    positiveHeuristic: 'Track class conflict indicators, strike activity, profit rates, capital-state coordination, labor organization strength',
    negativeHeuristic: 'Do not reduce to culture, ideas, or leadership - material class interests are causally fundamental'
  },

  redistributive: {
    modelId: 'redistributive',
    modelName: 'Acemoglu-Robinson (Redistributive Conflict)',
    hardCore: [
      'Democracy emerges from redistributive conflict between elites and masses',
      'Elites accept democracy when revolution threat exceeds cost of redistribution',
      'Democracy survives when neither side can profitably defect (consolidation)',
      'High inequality + high elite repressive capacity → authoritarianism'
    ],
    protectiveBelt: [
      'Specific inequality thresholds',
      'Role of middle class in stabilizing democracy',
      'Whether repressive technology changes calculations',
      'How international factors affect bargaining'
    ],
    positiveHeuristic: 'Track inequality metrics, elite cohesion, mass mobilization capacity, repressive capacity, redistributive policies',
    negativeHeuristic: 'Do not ignore material interests - democracy is a bargain, not just norms or institutions'
  },

  linz: {
    modelId: 'linz',
    modelName: 'Linz (Presidentialism/Breakdown)',
    hardCore: [
      'Presidential systems more prone to breakdown than parliamentary',
      'Winner-take-all dynamics, fixed terms, and dual legitimacy create rigidity',
      'Breakdown occurs when conflicts cannot be resolved within constitutional framework',
      'Military as "moderating power" often intervenes in deadlock'
    ],
    protectiveBelt: [
      'Whether specific institutional fixes (runoffs, term limits) reduce risk',
      'Role of party system fragmentation',
      'How federalism interacts with presidentialism',
      'Whether semi-presidentialism avoids problems'
    ],
    positiveHeuristic: 'Track executive-legislative conflict, constitutional hardball, military positioning, deadlock indicators',
    negativeHeuristic: 'Do not ignore institutional structure - it shapes incentives independent of actor preferences'
  },

  gramscian: {
    modelId: 'gramscian',
    modelName: 'Gramscian (Hegemony)',
    hardCore: [
      'Rule depends on hegemony (consent) not just coercion',
      'Hegemonic crisis opens space for counter-hegemonic movements',
      'Civil society is terrain of hegemonic struggle, not just bulwark',
      'Organic intellectuals articulate class interests into political projects'
    ],
    protectiveBelt: [
      'How to identify hegemonic vs counter-hegemonic movements',
      'Role of new media in hegemonic struggle',
      'Whether right-populism represents hegemonic crisis or new hegemony',
      'Passive revolution as elite response to crisis'
    ],
    positiveHeuristic: 'Track media narratives, common sense shifts, intellectual alignment, consent vs coercion balance',
    negativeHeuristic: 'Do not reduce to coercion or interests alone - ideological struggle is materially consequential'
  },

  svolik: {
    modelId: 'svolik',
    modelName: 'Svolik (Elite Coordination)',
    hardCore: [
      'Democratic breakdown is an elite coordination problem',
      'Citizens face trade-off between policy and democracy',
      'Polarization leads citizens to tolerate democratic erosion by co-partisans',
      'Elite defection (abandoning would-be autocrat) requires coordination'
    ],
    protectiveBelt: [
      'Threshold of polarization that enables erosion tolerance',
      'Whether elite coordination can be facilitated externally',
      'Role of information in citizen tolerance calculations',
      'How party loyalty vs democratic commitment interact'
    ],
    positiveHeuristic: 'Track elite defection signals, partisan polarization, cross-party elite communication, citizen tolerance of violations',
    negativeHeuristic: 'Do not assume citizens always prefer democracy - they make trade-offs'
  }
};

// Generate predictions based on current scores and model logic
export function generatePredictions(
  modelId: string,
  currentScores: Record<string, number>,
  countryContext: string
): Prediction[] {
  const predictions: Prediction[] = [];
  const now = new Date();
  const threeMonths = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  const sixMonths = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000);
  const oneYear = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  switch (modelId) {
    case 'levitsky':
      if (currentScores.judicial > 50) {
        predictions.push({
          id: `${modelId}-judicial-high-${Date.now()}`,
          modelId,
          hypothesis: 'Given elevated judicial capture score, model predicts attempted expansion of executive control over remaining independent courts within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Court-packing legislation proposed, or administrative restructuring of judiciary announced, or judges forced to resign/retire',
          refutationConditions: 'No significant moves against judicial independence; courts continue to rule against executive',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (currentScores.judicial < 35) {
        predictions.push({
          id: `${modelId}-judicial-low-${Date.now()}`,
          modelId,
          hypothesis: 'With low judicial capture score, model predicts courts will continue to check executive overreach within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Courts rule against executive actions, judicial independence maintained, no court-packing attempts succeed',
          refutationConditions: 'Sudden judicial capture, courts begin rubber-stamping executive actions',
          status: 'pending',
          novelty: 'novel'
        });
      }
      if (currentScores.political > 60) {
        predictions.push({
          id: `${modelId}-opposition-high-${Date.now()}`,
          modelId,
          hypothesis: 'With high political opposition weakness, model predicts further opposition fragmentation or co-optation within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Major opposition party split, key opposition figures defect to regime, or opposition boycotts elections',
          refutationConditions: 'Opposition unifies, new coalition forms, or opposition makes electoral gains',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (currentScores.political < 40) {
        predictions.push({
          id: `${modelId}-opposition-low-${Date.now()}`,
          modelId,
          hypothesis: 'With strong opposition, model predicts continued or growing opposition unity and electoral competitiveness within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Opposition maintains unity, gains in polls, or wins by-elections/local races',
          refutationConditions: 'Opposition fragments, key defections to regime, or electoral losses',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'bermanRiley':
      if (currentScores.civil > 50) {
        predictions.push({
          id: `${modelId}-civil-high-${Date.now()}`,
          modelId,
          hypothesis: 'Civil society weakness predicts regime will face less organized resistance to next major policy initiative',
          timeframe: '3 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(threeMonths),
          conditions: 'Major policy passes with minimal street protest (<10,000 nationally), or NGO/union challenges fail to materialize',
          refutationConditions: 'Significant mobilization (>50,000) against regime initiative, or civil society legal challenge succeeds',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (currentScores.civil < 35) {
        predictions.push({
          id: `${modelId}-civil-low-${Date.now()}`,
          modelId,
          hypothesis: 'Strong civil society predicts successful resistance to next major authoritarian initiative',
          timeframe: '3 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(threeMonths),
          conditions: 'Significant mobilization (>50,000) forces regime backdown, or civil society legal challenge succeeds, or policy blocked',
          refutationConditions: 'Regime initiative passes despite civil society opposition',
          status: 'pending',
          novelty: 'novel'
        });
      }
      if (currentScores.mobilizationalBalance > 55) {
        predictions.push({
          id: `${modelId}-mobilization-high-${Date.now()}`,
          modelId,
          hypothesis: 'Regime mobilization advantage predicts pro-regime demonstrations will exceed opposition demonstrations in next 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Aggregate pro-regime rally attendance exceeds opposition rally attendance',
          refutationConditions: 'Opposition mobilizes larger aggregate turnout than regime supporters',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (currentScores.mobilizationalBalance < 45) {
        predictions.push({
          id: `${modelId}-mobilization-low-${Date.now()}`,
          modelId,
          hypothesis: 'Opposition mobilization advantage predicts anti-regime demonstrations will exceed pro-regime demonstrations in next 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Opposition rally attendance exceeds pro-regime rally attendance, sustained protest movements',
          refutationConditions: 'Regime supporters mobilize larger aggregate turnout',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'frankfurtSchool':
      // Behemoth dynamics apply regardless but predictions differ based on consolidation level
      const frankfurtAvg = Object.values(currentScores).reduce((a, b) => a + b, 0) / Object.keys(currentScores).length;
      predictions.push({
        id: `${modelId}-racket-${Date.now()}`,
        modelId,
        hypothesis: 'Behemoth model predicts visible inter-elite conflict (regime factions, business vs party, military vs civilians) within 3 months',
        timeframe: '3 months',
        generatedDate: formatDate(now),
        targetDate: formatDate(threeMonths),
        conditions: 'Public disputes between regime figures, contradictory policy announcements, or visible business-regime tension',
        refutationConditions: 'Unified regime messaging, smooth policy coordination, elite solidarity',
        status: 'pending',
        novelty: 'novel'
      });
      if (frankfurtAvg > 50) {
        predictions.push({
          id: `${modelId}-incoherence-high-${Date.now()}`,
          modelId,
          hypothesis: 'Policy incoherence: major policy reversal or contradictory policies from different regime factions within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Announced policy reversed, or simultaneous contradictory policies from different agencies/officials',
          refutationConditions: 'Consistent policy direction maintained across regime',
          status: 'pending',
          novelty: 'novel'
        });
      } else {
        predictions.push({
          id: `${modelId}-incoherence-low-${Date.now()}`,
          modelId,
          hypothesis: 'Behemoth instability: inter-racket conflict will undermine regime effectiveness, leading to visible dysfunction',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Regime appears chaotic, key figures resign or are fired, business distances itself, policy failures accumulate',
          refutationConditions: 'Regime achieves coherence and stability',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-capital-exit-${Date.now()}`,
          modelId,
          hypothesis: 'Capital racket will begin distancing from failing regime - business elites hedge bets within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Business leaders publicly distance, corporations pause political engagement, or economic elites criticize regime',
          refutationConditions: 'Capital maintains alliance with regime despite dysfunction',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'classical':
      if (currentScores.publicOpinion > 50) {
        predictions.push({
          id: `${modelId}-demagogy-high-${Date.now()}`,
          modelId,
          hypothesis: 'Given receptive public opinion, model predicts increased demagogic rhetoric (scapegoating, enemy-naming, crisis framing) in next 3 months',
          timeframe: '3 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(threeMonths),
          conditions: 'Measurable increase in demagogic rhetoric patterns in regime communications',
          refutationConditions: 'Rhetoric moderates, appeals to reason/unity rather than passion/division',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-virtue-decline-${Date.now()}`,
          modelId,
          hypothesis: 'Civic virtue decay predicts declining trust in democratic institutions in next 6 months (measurable in polling)',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Polling shows decreased trust in courts, elections, media, or legislative bodies',
          refutationConditions: 'Institutional trust stabilizes or increases',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (currentScores.publicOpinion < 40) {
        predictions.push({
          id: `${modelId}-demagogy-low-${Date.now()}`,
          modelId,
          hypothesis: 'Given resistant public opinion, model predicts demagogic appeals will fail to gain traction and regime popularity will decline',
          timeframe: '3 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(threeMonths),
          conditions: 'Regime approval ratings decline, demagogic rhetoric fails to shift polls, backlash to divisive messaging',
          refutationConditions: 'Demagogic appeals succeed in shifting opinion favorably',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-virtue-stable-${Date.now()}`,
          modelId,
          hypothesis: 'Civic virtue resilience predicts maintained or increasing trust in democratic institutions',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Polling shows stable or increased trust in courts, elections, and legislative bodies',
          refutationConditions: 'Institutional trust begins declining',
          status: 'pending',
          novelty: 'novel'
        });
      } else {
        // Medium score - just predict virtue trend
        predictions.push({
          id: `${modelId}-virtue-${Date.now()}`,
          modelId,
          hypothesis: 'Model predicts civic virtue indicators (institutional trust) will be key variable to watch in next 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Polling shows change in trust in courts, elections, media, or legislative bodies',
          refutationConditions: 'Institutional trust remains completely stable',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'paxton':
      // Determine likely current stage and predict movement
      const avgScore = Object.values(currentScores).reduce((a, b) => a + b, 0) / Object.keys(currentScores).length;
      if (avgScore < 30) {
        // Very low - predicting resistance/stall
        predictions.push({
          id: `${modelId}-stage-stall-${Date.now()}`,
          modelId,
          hypothesis: 'At early stages with low consolidation: model predicts movement will stall or regress - elite alliance will not form or will fracture within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Elite defections, business distances from regime, military signals neutrality, religious leaders criticize',
          refutationConditions: 'New prominent elite endorsements deepen the alliance',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-stage-reverse-${Date.now()}`,
          modelId,
          hypothesis: 'Failed stage transition: authoritarian movement loses momentum, electoral losses or reduced influence within 1 year',
          timeframe: '1 year',
          generatedDate: formatDate(now),
          targetDate: formatDate(oneYear),
          conditions: 'Movement loses elections, splits, or key figures abandon project',
          refutationConditions: 'Movement gains strength and advances to next stage',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (avgScore < 50) {
        predictions.push({
          id: `${modelId}-stage-early-${Date.now()}`,
          modelId,
          hypothesis: 'At Stage 2-3 (rooting/power): model predicts deepening elite alliance (business, military, religious leaders endorsing regime) within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'New prominent elite endorsements, business associations align, or military signals support',
          refutationConditions: 'Elite defections, business criticism, or military distance from regime',
          status: 'pending',
          novelty: 'novel'
        });
      } else {
        predictions.push({
          id: `${modelId}-stage-late-${Date.now()}`,
          modelId,
          hypothesis: 'At Stage 4-5 (exercise/radicalization): model predicts either radicalization (new targets, expanded repression) OR entropy (regime infighting, loss of direction) within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'New outgroups targeted, repression expands to former allies, OR visible regime fragmentation and drift',
          refutationConditions: 'Stable consolidation without radicalization or entropy',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'marxian':
      if (currentScores.corporateCompliance > 50) {
        predictions.push({
          id: `${modelId}-capital-high-${Date.now()}`,
          modelId,
          hypothesis: 'Capital compliance predicts anti-labor policies (union restrictions, wage suppression, deregulation) within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Legislation restricting union rights, NLRB weakened, or major deregulation benefiting capital',
          refutationConditions: 'Pro-labor policies enacted or capital faces regime restrictions',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-strike-${Date.now()}`,
          modelId,
          hypothesis: 'Class conflict model predicts labor unrest (strikes, work actions) as response to consolidation within 1 year',
          timeframe: '1 year',
          generatedDate: formatDate(now),
          targetDate: formatDate(oneYear),
          conditions: 'Significant strike activity (>100,000 workers), major work actions, or union organizing surge',
          refutationConditions: 'Labor quiescence, declining strike activity, union membership decline',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (currentScores.corporateCompliance < 40) {
        predictions.push({
          id: `${modelId}-capital-low-${Date.now()}`,
          modelId,
          hypothesis: 'Weak capital-regime alliance predicts business will not support authoritarian measures and may actively resist',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Business associations criticize regime, corporations refuse cooperation, capital flight or investment decline',
          refutationConditions: 'Business rallies to regime support, capital-state alliance strengthens',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-labor-strength-${Date.now()}`,
          modelId,
          hypothesis: 'Strong labor organization predicts successful resistance to anti-worker policies within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Union actions block anti-labor legislation, strike threats deter policy, labor wins concessions',
          refutationConditions: 'Anti-labor policies pass despite union opposition',
          status: 'pending',
          novelty: 'novel'
        });
      } else {
        predictions.push({
          id: `${modelId}-class-conflict-${Date.now()}`,
          modelId,
          hypothesis: 'Class conflict model predicts intensifying labor-capital tension within 1 year regardless of outcome',
          timeframe: '1 year',
          generatedDate: formatDate(now),
          targetDate: formatDate(oneYear),
          conditions: 'Increased strike activity, union organizing, or visible business-labor confrontation',
          refutationConditions: 'Class peace, no significant labor-capital conflict',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'redistributive':
      // Calculate overall consolidation tendency
      const redistAvg = Object.values(currentScores).reduce((a, b) => a + b, 0) / Object.keys(currentScores).length;
      if (redistAvg > 50) {
        predictions.push({
          id: `${modelId}-inequality-high-${Date.now()}`,
          modelId,
          hypothesis: 'Model predicts regime will pursue policies that protect elite wealth/reduce redistribution within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Tax cuts for wealthy, social program cuts, or deregulation benefiting capital',
          refutationConditions: 'Progressive taxation enacted, social programs expanded, or wealth redistribution policies',
          status: 'pending',
          novelty: 'novel'
        });
      } else {
        predictions.push({
          id: `${modelId}-inequality-low-${Date.now()}`,
          modelId,
          hypothesis: 'With failed consolidation, model predicts elites will offer redistributive concessions to reduce mass mobilization threat',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Social programs maintained or expanded, moderate taxation policies, elite accommodation of mass demands',
          refutationConditions: 'Elite doubles down on anti-redistribution despite popular opposition',
          status: 'pending',
          novelty: 'novel'
        });
      }
      if (currentScores.mobilizationalBalance < 45) {
        predictions.push({
          id: `${modelId}-threat-${Date.now()}`,
          modelId,
          hypothesis: 'Given opposition mobilization capacity, model predicts elite will perceive revolution threat and either increase repressive capacity OR offer concessions within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Increased policing and protest restrictions, OR policy concessions to reduce threat',
          refutationConditions: 'Elite ignores mobilization threat entirely',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (currentScores.mobilizationalBalance > 55) {
        predictions.push({
          id: `${modelId}-secure-${Date.now()}`,
          modelId,
          hypothesis: 'With regime mobilization advantage, elites feel secure and will not offer redistributive concessions',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'No new social programs, continued or increased inequality, elite confidence',
          refutationConditions: 'Redistributive policies enacted despite regime security',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'svolik':
      // Overall consolidation check
      const svolikAvg = Object.values(currentScores).reduce((a, b) => a + b, 0) / Object.keys(currentScores).length;
      if (svolikAvg > 50) {
        predictions.push({
          id: `${modelId}-tolerance-high-${Date.now()}`,
          modelId,
          hypothesis: 'Model predicts partisan voters will tolerate democratic violations by co-partisan regime (measurable in polling)',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Polling shows regime supporters accept norm violations their party would condemn if done by opposition',
          refutationConditions: 'Co-partisan voters punish regime for democratic violations',
          status: 'pending',
          novelty: 'novel'
        });
      } else {
        predictions.push({
          id: `${modelId}-tolerance-low-${Date.now()}`,
          modelId,
          hypothesis: 'With low consolidation, model predicts co-partisan voters may begin punishing democratic violations - limit to tolerance',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Polling shows declining regime support among co-partisans after norm violations, or backlash visible',
          refutationConditions: 'Partisan voters continue tolerating violations despite low consolidation',
          status: 'pending',
          novelty: 'novel'
        });
      }
      if (currentScores.political > 40) {
        predictions.push({
          id: `${modelId}-defection-weak-${Date.now()}`,
          modelId,
          hypothesis: 'Elite coordination: if violation becomes public, some co-partisan elites will defect within 3 months',
          timeframe: '3 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(threeMonths),
          conditions: 'Prominent regime-party figures publicly criticize or distance from violation',
          refutationConditions: 'Elite unanimity in supporting/ignoring violation',
          status: 'pending',
          novelty: 'novel'
        });
      } else if (currentScores.political < 35) {
        predictions.push({
          id: `${modelId}-defection-strong-${Date.now()}`,
          modelId,
          hypothesis: 'Strong opposition predicts elite defection cascade - co-partisan elites will coordinate to abandon would-be autocrat',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Multiple prominent regime-party figures defect, coordinate criticism, or form anti-regime faction',
          refutationConditions: 'Elite remains loyal despite strong opposition',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'gramscian':
      // Check hegemonic success via media/public opinion
      const hegemonyIndicator = (currentScores.media || 50) + (currentScores.publicOpinion || 50);
      if (hegemonyIndicator > 100) {
        predictions.push({
          id: `${modelId}-hegemony-high-${Date.now()}`,
          modelId,
          hypothesis: 'Hegemonic success: model predicts regime narratives will become normalized "common sense" within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Regime narratives become mainstream media "both sides" framing, or cultural institutions align with regime framing',
          refutationConditions: 'Counter-hegemonic narratives dominate, regime framing rejected by mainstream',
          status: 'pending',
          novelty: 'novel'
        });
      } else {
        predictions.push({
          id: `${modelId}-hegemony-low-${Date.now()}`,
          modelId,
          hypothesis: 'Hegemonic failure: model predicts counter-hegemonic narratives will successfully contest regime framing within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Counter-hegemonic narratives gain mainstream traction, regime framing rejected, alternative "common sense" emerges',
          refutationConditions: 'Regime successfully normalizes its framing despite initial failure',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-organic-${Date.now()}`,
          modelId,
          hypothesis: 'Counter-hegemonic organic intellectuals (media figures, academics, activists) will articulate successful resistance narrative',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Prominent figures emerge articulating counter-narrative that gains mass following',
          refutationConditions: 'No coherent counter-narrative emerges, opposition remains fragmented ideologically',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;

    case 'linz':
      // Check for regime consolidation vs divided government
      const linzAvg = Object.values(currentScores).reduce((a, b) => a + b, 0) / Object.keys(currentScores).length;
      if (linzAvg > 50) {
        predictions.push({
          id: `${modelId}-deadlock-high-${Date.now()}`,
          modelId,
          hypothesis: 'Presidential system rigidity predicts executive-legislative conflict will escalate (constitutional hardball) within 6 months',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Government shutdown, impeachment attempts, executive orders challenged, or legislative obstruction',
          refutationConditions: 'Interbranch cooperation, negotiated compromises, normal legislative process',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-bypass-${Date.now()}`,
          modelId,
          hypothesis: 'Executive will attempt to bypass legislative constraints through unilateral action (executive orders, emergency powers)',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Increased executive orders, emergency declarations, or administrative actions bypassing Congress',
          refutationConditions: 'Executive works through normal legislative process',
          status: 'pending',
          novelty: 'novel'
        });
      } else {
        predictions.push({
          id: `${modelId}-deadlock-low-${Date.now()}`,
          modelId,
          hypothesis: 'With weak consolidation, presidential system checks will function - legislative constraints will hold against executive overreach',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Congress blocks executive overreach, courts check executive orders, impeachment threat credible',
          refutationConditions: 'Executive successfully bypasses legislative constraints',
          status: 'pending',
          novelty: 'novel'
        });
        predictions.push({
          id: `${modelId}-checks-${Date.now()}`,
          modelId,
          hypothesis: 'Interbranch cooperation: normal legislative process will continue despite tensions',
          timeframe: '6 months',
          generatedDate: formatDate(now),
          targetDate: formatDate(sixMonths),
          conditions: 'Bills pass through regular order, bipartisan deals, executive works with legislature',
          refutationConditions: 'Total gridlock, constitutional crisis, or executive unilateralism',
          status: 'pending',
          novelty: 'novel'
        });
      }
      break;
  }

  return predictions;
}

// Calculate progressiveness score based on prediction track record
export function calculateProgressiveness(programme: ResearchProgramme): { score: number; status: 'progressive' | 'stagnant' | 'degenerating' } {
  const total = programme.confirmedNovel + programme.confirmedKnown + programme.refuted;

  if (total === 0) {
    return { score: 50, status: 'stagnant' }; // No track record yet
  }

  // Novel confirmed predictions are most valuable
  // Retrodictions (explaining known facts) are less valuable
  // Refutations hurt the score
  const novelWeight = 3;
  const knownWeight = 1;
  const refutedWeight = -2;

  const weightedSum = (programme.confirmedNovel * novelWeight) +
                      (programme.confirmedKnown * knownWeight) +
                      (programme.refuted * refutedWeight);

  const maxPossible = total * novelWeight;
  const minPossible = total * refutedWeight;

  // Normalize to 0-100
  const score = Math.round(((weightedSum - minPossible) / (maxPossible - minPossible)) * 100);

  let status: 'progressive' | 'stagnant' | 'degenerating';
  if (score >= 60 && programme.confirmedNovel > programme.refuted) {
    status = 'progressive';
  } else if (score <= 40 || programme.refuted > programme.confirmedNovel) {
    status = 'degenerating';
  } else {
    status = 'stagnant';
  }

  return { score, status };
}

// Evaluate which programmes are performing best
export function evaluateProgrammes(programmes: ResearchProgramme[]): {
  ranking: { modelId: string; modelName: string; score: number; status: string }[];
  insights: string[];
} {
  const ranking = programmes
    .map(p => {
      const { score, status } = calculateProgressiveness(p);
      return {
        modelId: p.modelId,
        modelName: p.modelName,
        score,
        status
      };
    })
    .sort((a, b) => b.score - a.score);

  const insights: string[] = [];

  const progressive = ranking.filter(r => r.status === 'progressive');
  const degenerating = ranking.filter(r => r.status === 'degenerating');

  if (progressive.length > 0) {
    insights.push(`Progressive programmes (predicting novel facts): ${progressive.map(p => p.modelName).join(', ')}`);
  }

  if (degenerating.length > 0) {
    insights.push(`Degenerating programmes (failing predictions): ${degenerating.map(p => p.modelName).join(', ')}`);
  }

  if (ranking.length >= 2 && ranking[0].score - ranking[ranking.length - 1].score > 30) {
    insights.push(`Large gap between best (${ranking[0].modelName}) and worst (${ranking[ranking.length - 1].modelName}) performing programmes suggests some theories fit current case better than others`);
  }

  return { ranking, insights };
}
