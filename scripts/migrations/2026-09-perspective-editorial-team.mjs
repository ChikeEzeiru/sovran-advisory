import {getCliClient} from 'sanity/cli'
import {LEADERS} from '../../lib/leadership.ts'
import {
  PERSPECTIVE_AUTHOR_IDS,
  PERSPECTIVE_EDITORIAL_TEAM,
} from '../../lib/perspective-authors.ts'
import {PERSPECTIVES} from '../../lib/perspectives.ts'

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-06-18'
const client = getCliClient({apiVersion}).withConfig({useCdn: false})
const editorialRoles = new Map(
  PERSPECTIVE_EDITORIAL_TEAM.map(({id, editorialRole}) => [id, editorialRole]),
)

let assignmentTransaction = client.transaction().patch(
  'author-sovran-editorial-team',
  (patch) => patch.set({editorialRole: 'Institutional byline'}),
)

for (const {id, editorialRole} of PERSPECTIVE_EDITORIAL_TEAM) {
  assignmentTransaction = assignmentTransaction.patch(`author-${id}`, (patch) =>
    patch.set({editorialRole}),
  )
}

for (const perspective of PERSPECTIVES) {
  const leaderId = PERSPECTIVE_AUTHOR_IDS[perspective.slug]
  assignmentTransaction = assignmentTransaction.patch(
    `perspective-${perspective.slug}`,
    (patch) =>
      patch.set({author: {_type: 'reference', _ref: `author-${leaderId}`}}),
  )
}

await assignmentTransaction.commit()

const retiredAuthorIds = LEADERS.filter((leader) => !editorialRoles.has(leader.id)).map(
  (leader) => `author-${leader.id}`,
)
const safeToDelete = []

for (const authorId of retiredAuthorIds) {
  const referenceCount = await client.fetch('count(*[references($authorId)])', {authorId})
  if (referenceCount !== 0) {
    throw new Error(`Cannot retire ${authorId}; it still has ${referenceCount} reference(s).`)
  }
  safeToDelete.push(authorId)
}

let cleanupTransaction = client.transaction()
for (const authorId of safeToDelete) {
  cleanupTransaction = cleanupTransaction.delete(authorId)
}
await cleanupTransaction.commit()

console.log('Assigned the three-person Perspectives editorial team.')
console.log(`Retired ${safeToDelete.length} unused staff author records.`)
