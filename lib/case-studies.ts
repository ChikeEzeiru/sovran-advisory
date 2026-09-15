export type CaseStudyWorkstream = {
  title: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  market: string;
  practices: string;
  title: string;
  summary: string;
  challenge: string;
  challengeDetails: string[];
  work: string;
  workstreams: CaseStudyWorkstream[];
  deliverables: string[];
  outcome: string;
  outcomeDetails: string[];
  insight: { title: string; body: string };
  pullQuote: string;
  image: string;
  logo: string;
  logoAlt: string;
  logoWidth: number;
  metric: { value: string; label: string };
  secondaryMetric: { value: string; label: string };
  related: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "payments-entry",
    client: "AsterPay",
    sector: "Payments",
    market: "Nigeria, Kenya and Ghana",
    practices: "Intelligence + Institutions",
    title: "Building a smarter route into three fast-moving payments markets",
    summary:
      "AsterPay needed to turn a broad regional ambition into a sequenced market-entry plan grounded in customer demand, regulatory reality and credible local partnerships.",
    challenge:
      "A global payments company needed to decide whether and how to enter three fast-moving markets. It had strong technology but an incomplete picture of licensing pathways, local competitors and the practical differences between each market.",
    challengeDetails: [
      "The initial business case treated Nigeria, Kenya and Ghana as one expansion programme. In practice, the addressable customers, payment habits, licensing routes and partner ecosystems differed sharply. A simultaneous launch would have committed capital before those differences were understood.",
      "The leadership team needed more than a market ranking. It needed to know which proposition could win in each country, what approvals would govern the route to launch, where a local partner was essential and which decisions could be deferred without weakening the opportunity.",
    ],
    work:
      "Sovran built one decision framework across the three markets, while preserving the local evidence needed to treat each market on its own terms.",
    workstreams: [
      {
        title: "Establish the real demand",
        body: "We segmented merchants and enterprise buyers by payment need, scale and willingness to switch. Interviews with operators and ecosystem participants tested where AsterPay's product solved a material problem rather than simply adding another provider.",
      },
      {
        title: "Map the route to licence",
        body: "We compared licence categories, capital requirements, data obligations and approval dependencies, then mapped 42 regulators, industry bodies and potential partners against the decisions they could influence.",
      },
      {
        title: "Sequence entry and engagement",
        body: "We converted the evidence into a staged twelve-month plan, including partner-selection criteria, early regulatory conversations, product adaptations and clear gates for committing further investment.",
      },
    ],
    deliverables: [
      "Sequenced three-market entry plan",
      "Regulatory pathway and action tracker",
      "Partner longlist and selection criteria",
      "Board-ready investment case",
    ],
    outcome:
      "The client replaced three simultaneous launches with a controlled two-stage programme.",
    outcomeDetails: [
      "Kenya was selected for the first launch because the combination of customer demand, regulatory clarity and partnership options produced the strongest executable case. The Nigerian proposition was adapted around local payment behaviour and a different partnership model.",
      "Ghana remained strategically attractive, but the team deferred the launch until a licensing change became clearer. This protected management capacity and allowed the first market to generate evidence for the second wave.",
    ],
    insight: {
      title: "Regional ambition still requires local entry logic.",
      body: "A common platform can support expansion, but the order of entry should follow the quality of the operating case—not market size alone.",
    },
    pullQuote:
      "AsterPay's first market needed to combine regulatory clarity, a differentiated proposition and the foundations for repeatable regional expansion.",
    image: "/images/case-studies/Case-study_Asterpay.avif",
    logo: "/logos/case_study_logos/Asterpay Logo.svg",
    logoAlt: "AsterPay",
    logoWidth: 51,
    metric: {
      value: "42",
      label: "regulators, industry bodies and potential partners mapped",
    },
    secondaryMetric: {
      value: "3",
      label: "markets assessed through one entry framework",
    },
    related: "What regulatory fragmentation means for cross-border growth",
  },
  {
    slug: "infrastructure-investment",
    client: "Northline Capital",
    sector: "Infrastructure",
    market: "East Africa",
    practices: "Intelligence + Strategy",
    title: "Testing an infrastructure opportunity against freight corridor constraints",
    summary:
      "Northline Capital needed to test a multi-country freight corridor opportunity against operating realities the investment case had overlooked.",
    challenge:
      "An investment platform was assessing a multi-country freight-corridor opportunity. The opportunity was attractive on paper, but its assumptions did not yet account for border delays, port capacity, concession terms or local operator incentives.",
    challengeDetails: [
      "The model projected demand from headline trade growth and planned infrastructure improvements. It did not show how cargo actually moved through the corridor, where delays accumulated or which public and commercial actors controlled the assets required to unlock value.",
      "Before advancing the investment, Northline needed to separate structural demand from optimistic throughput assumptions and understand whether the opportunity could be divided into investable phases.",
    ],
    work:
      "Sovran combined trade-flow analysis with operating evidence to test the investment thesis asset by asset and decision by decision.",
    workstreams: [
      {
        title: "Reconstruct corridor economics",
        body: "We traced priority cargo flows from origin to port, comparing volumes, seasonality, handling costs and delay points. This exposed where the model relied on capacity that was planned but not yet dependable.",
      },
      {
        title: "Test the operating constraints",
        body: "Interviews with freight operators, cargo owners and public agencies clarified border processes, concession limits, maintenance risks and the incentives shaping route choice.",
      },
      {
        title: "Build investable scenarios",
        body: "We modelled downside, base and accelerated cases, then linked each scenario to the approvals, counterparties and operating conditions required for it to hold.",
      },
    ],
    deliverables: [
      "Commercial diligence report",
      "Traffic and trade-flow scenario model",
      "Stakeholder and decision map",
      "Phased investment recommendation",
    ],
    outcome:
      "The investor narrowed the first phase to two linked assets with clearer demand evidence and controllable dependencies.",
    outcomeDetails: [
      "Rather than underwriting the entire corridor as one proposition, Northline focused on assets that shared customers and could operate under current capacity conditions. Larger investments remained in the pipeline but were tied to explicit throughput and approval milestones.",
      "The work also informed conditions precedent and the stakeholder plan for diligence, giving the investment committee a clearer view of what could be mitigated contractually and what required continued monitoring.",
    ],
    insight: {
      title: "Infrastructure demand is only bankable when the route works in practice.",
      body: "Corridor investments depend on the weakest operational link. Testing interfaces between assets can matter more than validating each asset in isolation.",
    },
    pullQuote:
      "Each operating assumption affected the next, making the least controllable part of the corridor central to the investment case.",
    image: "/images/case-studies/development_finance-case.avif",
    logo: "/logos/case_study_logos/Northline logo.svg",
    logoAlt: "Northline Capital",
    logoWidth: 49,
    metric: {
      value: "2",
      label: "linked assets prioritised for initial investment",
    },
    secondaryMetric: {
      value: "3",
      label: "investment scenarios tested against operating conditions",
    },
    related: "Infrastructure opportunities beyond major cities",
  },
  {
    slug: "logistics-expansion",
    client: "Axis Freight",
    sector: "Logistics",
    market: "West Africa",
    practices: "Strategy + Delivery",
    title: "Launching two regional hubs through one coordinated delivery programme",
    summary:
      "Axis Freight needed to expand its regional network without reproducing the inconsistent service, duplicated cost and fragmented accountability of its earlier growth.",
    challenge:
      "A regional logistics business had won new enterprise clients, but country-by-country expansion was creating inconsistent service levels, duplicate vendor contracts and unclear accountability.",
    challengeDetails: [
      "Commercial growth was moving faster than the operating model. Country teams were solving similar problems independently, suppliers were contracted on different terms and customers received different service commitments across the same regional account.",
      "Two new hubs were due to launch while the business was still serving existing contracts. Axis needed a model that created consistency without removing the local discretion required to operate in each market.",
    ],
    work:
      "Sovran designed the regional model and stayed through the first rollout waves to translate it into daily operating decisions.",
    workstreams: [
      {
        title: "Define the common service promise",
        body: "We worked from customer commitments back into operational standards for hand-offs, exception management, reporting and vendor performance, creating one scorecard for regional accounts.",
      },
      {
        title: "Clarify regional and local rights",
        body: "The operating model specified which decisions belonged to the regional centre, which remained with country teams and how commercial, operations and finance leaders would resolve trade-offs.",
      },
      {
        title: "Run the launch as one programme",
        body: "A light delivery office coordinated dependencies across sites, procurement, systems, recruitment and customer readiness. Weekly decision sessions focused leaders on exceptions rather than status reporting.",
      },
    ],
    deliverables: [
      "Network expansion strategy",
      "Regional operating-model blueprint",
      "Hub mobilisation and rollout plan",
      "Service and performance dashboard",
    ],
    outcome:
      "Axis launched two hubs through one repeatable delivery playbook while maintaining service to existing customers.",
    outcomeDetails: [
      "The programme consolidated duplicate supplier arrangements, assigned named owners to cross-border hand-offs and introduced a consistent service scorecard for enterprise accounts.",
      "The second hub reused the governance, readiness criteria and launch sequence established for the first, reducing reinvention and giving management a clearer basis for the next wave of expansion.",
    ],
    insight: {
      title: "Expansion becomes repeatable when local flexibility has clear boundaries.",
      body: "A regional model should standardise the customer promise and decision rhythm while leaving market teams room to solve genuinely local operating constraints.",
    },
    pullQuote:
      "A dependable regional customer experience required clear operating standards, with local discretion reserved for market-specific constraints.",
    image: "/images/case-studies/financial_services-case.avif",
    logo: "/logos/case_study_logos/Axis logo.svg",
    logoAlt: "Axis Freight",
    logoWidth: 55,
    metric: {
      value: "2",
      label: "new hubs launched with one delivery programme",
    },
    secondaryMetric: {
      value: "1",
      label: "regional service scorecard adopted across the network",
    },
    related: "Three signals reshaping East African logistics",
  },
  {
    slug: "digital-infrastructure",
    client: "National Digital Services Office",
    sector: "Public sector",
    market: "West Africa",
    practices: "Institutions + Delivery",
    title: "Aligning institutions around a shared digital infrastructure programme",
    summary:
      "A national digital programme needed a workable institutional model so agencies with different mandates could deliver shared identity and service-access infrastructure together.",
    challenge:
      "A public institution was planning a shared digital identity and service-access programme. The technical case was strong, but agencies had different mandates, data responsibilities and concerns about readiness.",
    challengeDetails: [
      "The programme depended on agencies that owned different parts of the citizen journey, operated systems at different levels of maturity and answered to separate legal mandates. The technology architecture did not resolve who could make cross-agency decisions or carry delivery risk.",
      "Without a shared governance model, each agency was progressing its own plan. This created overlapping requirements, unresolved data questions and no agreed sequence for moving priority services into a pilot.",
    ],
    work:
      "Sovran treated institutional alignment as part of the infrastructure, not as a communications exercise around the technology.",
    workstreams: [
      {
        title: "Map mandates and dependencies",
        body: "We documented statutory responsibilities, data ownership, approval rights and operational dependencies across the participating agencies, then made the areas of ambiguity explicit for senior decision-makers.",
      },
      {
        title: "Design programme governance",
        body: "A cross-agency model established sponsor, programme and working-level forums, with clear escalation paths and decision rights for architecture, data governance, service design and implementation.",
      },
      {
        title: "Move from roadmap to pilot",
        body: "We prioritised services against citizen value and delivery readiness, created an integrated implementation plan and supported public-facing communication around the programme's purpose and safeguards.",
      },
    ],
    deliverables: [
      "Stakeholder, mandate and dependency map",
      "Cross-agency governance model",
      "Prioritised implementation roadmap",
      "Public communication framework",
    ],
    outcome:
      "Separate agency plans were consolidated into one roadmap with shared governance and a defined first set of services.",
    outcomeDetails: [
      "Leaders agreed how decisions would be made across institutional boundaries and which issues required executive resolution. Delivery teams gained a common view of dependencies, readiness and the evidence needed to move each service forward.",
      "The first pilot scope was selected from services that combined visible citizen value with manageable integration demands, allowing the programme to demonstrate progress before taking on more complex journeys.",
    ],
    insight: {
      title: "Shared digital infrastructure needs shared decision infrastructure.",
      body: "Technical interoperability is not enough. Institutions also need explicit authority, incentives and escalation routes to act as one programme.",
    },
    pullQuote:
      "Programme readiness depended on aligning mandates, decision rights and delivery responsibilities alongside the technology.",
    image: "/images/case-studies/public_sector-case.avif",
    logo:
      "/logos/case_study_logos/National Dig. Serv. Logo [Vectorized].svg",
    logoAlt: "National Digital Services Office",
    logoWidth: 44,
    metric: {
      value: "1",
      label: "agreed roadmap with shared programme governance",
    },
    secondaryMetric: {
      value: "4",
      label: "delivery domains brought into shared governance",
    },
    related: "Digital identity and the next phase of public infrastructure",
  },
  {
    slug: "financial-transformation",
    client: "Harbour Bank Group",
    sector: "Financial services",
    market: "Southern Africa",
    practices: "Strategy + Delivery",
    title: "Refocusing a regional transformation around the customer journey",
    summary:
      "Harbour Bank needed to turn a broad transformation portfolio into a smaller sequence of changes that would materially improve the small-business customer journey.",
    challenge:
      "A regional bank needed to improve how it served growing small-business customers. The journey crossed sales, credit, operations and digital channels without a shared owner.",
    challengeDetails: [
      "The transformation portfolio contained dozens of initiatives, but customers still experienced repeated requests for information, uncertain turnaround times and inconsistent hand-offs between relationship teams and operations.",
      "Each function was improving its own part of the process. No leader owned the end-to-end journey, benefits were measured differently and the programme could not show which investments would remove the most consequential points of friction.",
    ],
    work:
      "Sovran reorganised the transformation around customer outcomes and the operating changes required to deliver them.",
    workstreams: [
      {
        title: "Diagnose the whole journey",
        body: "We followed applications from first enquiry through onboarding, credit assessment and account use, combining customer evidence with process data to identify where time, confidence and conversion were being lost.",
      },
      {
        title: "Prioritise the changes that mattered",
        body: "Initiatives were assessed against customer value, operational benefit, dependency and execution effort. This gave leaders one basis for stopping, sequencing or accelerating work across functions.",
      },
      {
        title: "Create ownership for delivery",
        body: "We defined executive owners, cross-functional journey teams, quarterly benefit measures and a governance rhythm that connected delivery decisions to the customer outcome.",
      },
    ],
    deliverables: [
      "End-to-end customer-journey diagnosis",
      "Target operating model",
      "Prioritised transformation roadmap",
      "Benefits and delivery governance",
    ],
    outcome:
      "The bank concentrated its conceptual transformation budget on three journey changes with the clearest customer and operational case.",
    outcomeDetails: [
      "The revised roadmap removed overlapping initiatives and sequenced work around onboarding clarity, credit hand-offs and proactive status communication. Each priority had a named executive owner and a common definition of benefit.",
      "Quarterly reviews shifted from tracking activity to testing whether the journey was becoming easier for customers and more efficient for teams, giving leadership a practical basis for continuing or redirecting investment.",
    ],
    insight: {
      title: "Transformation portfolios become clearer when the unit of change is the journey.",
      body: "Functional projects can all report progress while the customer experience remains unchanged. End-to-end ownership makes that disconnect visible.",
    },
    pullQuote:
      "A shared view of the highest-priority customer problems gave the programme the focus required to deliver meaningful change.",
    image: "/images/case-studies/case-study-card-texture.png",
    logo:
      "/logos/case_study_logos/HarbourBank grp Logo [Vectorized].svg",
    logoAlt: "Harbour Bank Group",
    logoWidth: 43,
    metric: {
      value: "3",
      label: "customer-journey changes prioritised for delivery",
    },
    secondaryMetric: {
      value: "1",
      label: "end-to-end journey given shared ownership",
    },
    related: "Local context is not a footnote to strategy",
  },
];
