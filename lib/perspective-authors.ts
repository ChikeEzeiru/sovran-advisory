import {LEADERS} from '@/lib/leadership'

export const PERSPECTIVE_AUTHOR_IDS: Record<string, string> = {
  'nigerias-next-digital-infrastructure-cycle': 'lina-adeyemi',
  'why-market-entry-fails-after-strategy': 'chinedu-eze',
  'the-new-competitive-landscape-for-african-payments': 'chinedu-eze',
  'regulatory-fragmentation-cross-border-growth': 'lina-adeyemi',
  'cost-of-treating-africa-as-a-single-market': 'lina-adeyemi',
  'infrastructure-opportunities-beyond-major-cities': 'njeri-mwangi',
  'digital-identity-public-infrastructure': 'njeri-mwangi',
  'signals-reshaping-east-african-logistics': 'njeri-mwangi',
  'local-context-and-strategy': 'chinedu-eze',
  'cross-border-expansion-research': 'lina-adeyemi',
}

export const PERSPECTIVE_EDITORIAL_TEAM = [
  {id: 'lina-adeyemi', editorialRole: 'Perspectives Lead'},
  {id: 'chinedu-eze', editorialRole: 'Strategy & Markets Editor'},
  {id: 'njeri-mwangi', editorialRole: 'Research Editor'},
] as const

export const EDITORIAL_AUTHOR = {
  name: 'Sovran Editorial Team',
  role: 'Editorial team',
  image: undefined,
  imageAlt: '',
}

export function getLocalPerspectiveAuthor(slug: string) {
  const leaderId = PERSPECTIVE_AUTHOR_IDS[slug]
  const leader = LEADERS.find((item) => item.id === leaderId)

  return leader
    ? {
        name: leader.name,
        role: leader.role,
        image: leader.image ?? undefined,
        imageAlt: leader.image ? `${leader.name}, ${leader.role}` : '',
      }
    : EDITORIAL_AUTHOR
}
