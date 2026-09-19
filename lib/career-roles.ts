import {sanityFetch} from '@/sanity/lib/live'

export type CareerRole = {
  id: string
  title: string
  department: string
  departmentDescription: string
  summary: string
  overview: readonly string[]
  responsibilities: readonly string[]
  requirements: readonly string[]
  location: string
  countryCode: string
  employmentType: string
  compensation?: string
  detailsUrl?: string
}

type CareerRoleResponse = {
  documentCount: number
  roles: CareerRole[]
}

const CAREER_ROLES_QUERY = `{
  "documentCount": count(*[_type == "careerRole"]),
  "roles": *[_type == "careerRole" && isOpen != false] | order(
    coalesce(departmentOrder, 0) asc,
    coalesce(order, 0) asc,
    title asc
  ) {
    "id": _id,
    title,
    "department": coalesce(department, "Advisory"),
    "departmentDescription": coalesce(departmentDescription, "Open positions on our advisory team."),
    summary,
    "overview": coalesce(overview, [summary]),
    "responsibilities": coalesce(responsibilities, []),
    "requirements": coalesce(requirements, []),
    location,
    countryCode,
    "employmentType": coalesce(employmentType, "Full-time"),
    compensation,
    detailsUrl
  }
}`

export const INITIAL_CAREER_ROLES: CareerRole[] = [
  {
    id: 'initial-senior-associate',
    title: 'Senior Associate, Strategy & Market Intelligence',
    department: 'Advisory',
    departmentDescription: 'Open positions on our advisory team.',
    summary:
      'Turn research, market insight and commercial context into clear recommendations for clients making complex decisions.',
    overview: [
      'As a Senior Associate, you will help teams understand unfamiliar markets, test commercial assumptions and turn evidence into clear advice for clients.',
      'You will work across research, analysis and client delivery. The role suits someone who can move comfortably between detailed investigation and concise communication.',
    ],
    responsibilities: [
      'Structure and deliver market, competitor and stakeholder research.',
      'Analyse commercial, policy and operating information from multiple sources.',
      'Develop clear findings, presentations and recommendations for client teams.',
      'Support interviews, workshops and working sessions with senior stakeholders.',
      'Coordinate workstreams and help maintain the quality of project outputs.',
    ],
    requirements: [
      'Relevant experience in consulting, strategy, research or market intelligence.',
      'Strong analytical judgement and confidence working with incomplete information.',
      'Clear business writing and presentation skills.',
      'An informed interest in African markets and the institutions shaping them.',
      'The ability to work collaboratively while taking ownership of your work.',
    ],
    location: 'Accra, Ghana',
    countryCode: 'GH',
    employmentType: 'Full-time',
    compensation: '20k - 30k',
    detailsUrl: '/contact',
  },
  {
    id: 'initial-policy-consultant',
    title: 'Consultant, Policy & Public Affairs',
    department: 'Advisory',
    departmentDescription: 'Open positions on our advisory team.',
    summary:
      'Help clients understand policy, regulation and stakeholder dynamics, and navigate the environments shaping their work.',
    overview: [
      'The Consultant will support assignments where policy, regulation and institutional relationships have a direct bearing on a client’s plans.',
      'You will combine desk research with stakeholder insight, helping project teams explain how public priorities and formal rules affect practical choices.',
    ],
    responsibilities: [
      'Research policy, regulatory and institutional developments across client markets.',
      'Map relevant stakeholders, mandates, interests and decision-making processes.',
      'Prepare briefings, issue analyses and practical recommendations.',
      'Support stakeholder interviews, consultations and client workshops.',
      'Track changes that could affect active engagements or client decisions.',
    ],
    requirements: [
      'Experience in public policy, government affairs, consulting or a related field.',
      'A sound understanding of how public institutions and regulatory processes work.',
      'Strong research skills and careful attention to evidence and context.',
      'Clear written and verbal communication.',
      'Good judgement when working with sensitive or politically complex issues.',
    ],
    location: 'Lagos, Nigeria',
    countryCode: 'NG',
    employmentType: 'Full-time',
    compensation: '25k - 35k',
    detailsUrl: '/contact',
  },
]

export async function getCareerRoles() {
  try {
    const {data} = await sanityFetch({query: CAREER_ROLES_QUERY})
    const result = data as CareerRoleResponse

    // Keep the designed roles visible only while the new CMS collection is unseeded.
    return result.documentCount === 0 ? INITIAL_CAREER_ROLES : result.roles
  } catch (error) {
    console.error('Unable to load career roles from Sanity.', error)
    return INITIAL_CAREER_ROLES
  }
}
