export type Leader = {
  id: string;
  name: string;
  role: string;
  bio: readonly string[];
  image: string | null;
  imagePosition?: string;
  linkedinUrl?: string;
  xUrl?: string;
};

const PROFILE_BIOS = {
  amara: [
    "Amara leads Sovran’s strategy and market advisory work. Her career spans corporate strategy, market intelligence and transformation across emerging economies.",
    "She works with leadership teams assessing new markets, reviewing growth choices and translating evidence into decisions that can be implemented.",
    "At Sovran, she remains closely involved when commercial ambition must be tested against regulation, institutional relationships and operating realities.",
  ],
  daniel: [
    "Daniel leads work involving public institutions, regulatory environments and multi-party programmes. His background spans policy, economic development and stakeholder strategy.",
    "He advises organisations whose plans depend on understanding how public priorities, formal rules and institutional incentives interact.",
    "At Sovran, he leads engagements that require careful stakeholder judgement and coordination between organisations with different mandates.",
  ],
  lina: [
    "Lina leads Sovran’s market and investment analysis. She turns fragmented commercial, competitor and policy information into decisions that can be tested.",
    "Her work covers market entry, sector assessment, investment questions and the early signals that can materially alter an opportunity.",
    "She makes research useful to decision-makers: clear about what is known, honest about uncertainty and specific about what should be examined next.",
  ],
  kofi: [
    "Kofi leads implementation and operating-model work at Sovran. He helps client teams turn approved plans into coordinated programmes with visible accountability.",
    "His experience includes programme design, operating-model development and delivery where several teams or partners must move together.",
    "He helps clients clarify ownership, sequence activity and resolve the issues that emerge when a strategy meets real operating conditions.",
  ],
} as const;

export const LEADERS: Leader[] = [
  {
    id: "amara-okafor",
    name: "Amara Okafor",
    role: "Co-Founder & Managing Partner",
    bio: PROFILE_BIOS.amara,
    image: "/images/about-us/Managing Partner co founder img.avif",
    imagePosition: "object-center",
  },
  {
    id: "daniel-mensah",
    name: "Daniel Mensah",
    role: "Co-Founder & Partner, Institutional Advisory",
    bio: PROFILE_BIOS.daniel,
    image: "/images/about-us/Partner co founder img.avif",
    imagePosition: "object-center",
  },
  {
    id: "lina-adeyemi",
    name: "Lina Adeyemi",
    role: "Partner, Intelligence",
    bio: PROFILE_BIOS.lina,
    image: "/images/about-us/Intelligence Partner img.avif",
    imagePosition: "object-center",
  },
  {
    id: "kofi-asare",
    name: "Kofi Asare",
    role: "Partner, Delivery",
    bio: PROFILE_BIOS.kofi,
    image: "/images/about-us/Delivery Partner img.avif",
    imagePosition: "object-center",
  },
  {
    id: "amina-diallo",
    name: "Amina Diallo",
    role: "Partner, Public Sector & Institutions",
    bio: [
      "Amina advises governments, development institutions and businesses working with the public sector. She has led policy reform and institutional-strengthening assignments across West and Central Africa.",
      "Before joining Sovran, she held economic policy and programme leadership roles requiring coordination between ministries, regulators, funders and private operators.",
      "Her work focuses on the institutional conditions behind major decisions: authority, incentives and what must change for a programme to work in practice.",
    ],
    // TODO: Add the optimized portrait at /images/about-us/Amina Diallo.avif and replace null with that path.
    image: "/images/about-us/Amina Diallo.avif",
  },
  {
    id: "chinedu-eze",
    name: "Chinedu Eze",
    role: "Director, Strategy",
    bio: [
      "Chinedu works with executive teams on growth strategy, portfolio choices and market entry. His experience covers financial services, consumer businesses and technology-enabled companies.",
      "He previously held corporate strategy and commercial planning roles, assessing new propositions and supporting investment decisions through implementation.",
      "At Sovran, he connects market evidence to practical choices, including the capabilities, partnerships and operating commitments needed to pursue them.",
    ],
    // TODO: Add the optimized portrait at /images/about-us/Chinedu Eze.avif and replace null with that path.
    image: "/images/about-us/Chinedu Eze.avif",
  },
  {
    id: "njeri-mwangi",
    name: "Njeri Mwangi",
    role: "Director, Market Intelligence",
    bio: [
      "Njeri leads research on sectors, competitors and changing market conditions in East Africa. She has supported investors and businesses with commercial diligence and demand assessment.",
      "Her earlier roles combined primary research with industry analysis, giving her a strong understanding of how formal data and on-the-ground evidence work together.",
      "At Sovran, she tests investment assumptions and helps clients distinguish structural market change from short-term noise.",
    ],
    // TODO: Add the optimized portrait at /images/about-us/Njeri Mwangi.avif and replace null with that path.
    image: "/images/about-us/Njeri Mwangi.avif",
  },
  {
    id: "kwame-boateng",
    name: "Kwame Boateng",
    role: "Director, Digital & Infrastructure",
    bio: [
      "Kwame advises organisations investing in digital services and enabling infrastructure. His work covers payments, connectivity, public digital systems and the partnerships needed at scale.",
      "Before Sovran, he worked across product strategy and infrastructure programmes, translating technical choices for senior decision-makers.",
      "He now leads assignments where technology must be considered alongside regulation, delivery capacity and user trust.",
    ],
    // TODO: Add the optimized portrait at /images/about-us/Kwame Boateng.avif and replace null with that path.
    image: "/images/about-us/Kwame Boateng.avif",
  },
  {
    id: "thandiwe-moyo",
    name: "Thandiwe Moyo",
    role: "Director, Programme Delivery",
    bio: [
      "Thandiwe leads complex programmes involving several teams, delivery partners and public institutions. Her background spans programme management and operating-model design.",
      "She has worked on assignments where ownership, sequencing and governance had to be rebuilt before delivery could progress.",
      "At Sovran, she helps clients establish clear responsibilities and keep decisions moving through operational or institutional constraints.",
    ],
    // TODO: Add the optimized portrait at /images/about-us/Thandiwe Moyo.avif and replace null with that path.
    image: "/images/about-us/Thandiwe Moyo.avif",
  },
  {
    id: "samuel-okoro",
    name: "Samuel Okoro",
    role: "Principal, Investment Advisory",
    bio: [
      "Samuel works with investors, lenders and corporate development teams assessing opportunities in unfamiliar sectors and markets.",
      "His experience spans investment analysis, commercial diligence and transaction support, especially where performance depends on regulation, infrastructure or local partnerships.",
      "At Sovran, he tests the operating assumptions behind investment cases and supports clients as they decide whether and how to proceed.",
    ],
    // TODO: Add the optimized portrait at /images/about-us/Samuel Okoro.avif and replace null with that path.
    image: "/images/about-us/Samuel Okoro.avif",
  },
];
