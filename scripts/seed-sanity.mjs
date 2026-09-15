import {createReadStream, existsSync} from 'node:fs'
import path from 'node:path'
import {createClient} from '@sanity/client'
import {CASE_STUDIES} from '../lib/case-studies.ts'
import {PERSPECTIVE_DETAILS} from '../lib/perspective-details.ts'
import {PERSPECTIVES} from '../lib/perspectives.ts'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  throw new Error(
    'Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN before running the content seed.',
  )
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-06-18',
  useCdn: false,
})

const root = process.cwd()

const INITIAL_ROLES = [
  {
    _id: 'career-role-senior-associate',
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
    isOpen: true,
    departmentOrder: 0,
    order: 0,
  },
  {
    _id: 'career-role-policy-consultant',
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
    isOpen: true,
    departmentOrder: 0,
    order: 1,
  },
]

function publicFile(url) {
  const file = path.join(root, 'public', url.replace(/^\//, ''))
  if (!existsSync(file)) throw new Error(`Missing local asset: ${file}`)
  return file
}

async function uploadAsset(type, url) {
  const file = publicFile(url)
  return client.assets.upload(type, createReadStream(file), {
    filename: path.basename(file),
  })
}

function imageValue(asset, alt) {
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: asset._id},
    alt,
  }
}

function fileValue(asset) {
  return {
    _type: 'file',
    asset: {_type: 'reference', _ref: asset._id},
  }
}

function publishedAt(value) {
  const date = new Date(`${value} 00:00:00 UTC`)
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid publication date: ${value}`)
  return date.toISOString()
}

async function seedPerspectives() {
  const count = await client.fetch('count(*[_type == "perspective"])')
  if (count > 0) {
    console.log(`Skipping perspectives: ${count} document(s) already exist.`)
    return
  }

  const authorId = 'author-sovran-editorial-team'
  let transaction = client.transaction().createOrReplace({
    _id: authorId,
    _type: 'author',
    name: 'Sovran Editorial Team',
    slug: {_type: 'slug', current: 'sovran-editorial-team'},
  })

  for (const [index, article] of PERSPECTIVES.entries()) {
    const detail = PERSPECTIVE_DETAILS[article.slug]
    const image = await uploadAsset('image', detail.image)

    transaction = transaction.createOrReplace({
      _id: `perspective-${article.slug}`,
      _type: 'perspective',
      title: article.title,
      slug: {_type: 'slug', current: article.slug},
      summary: article.summary,
      perspectiveType: article.type,
      topic: article.topic,
      audience: article.audience,
      author: {_type: 'reference', _ref: authorId},
      mainImage: imageValue(image, article.title),
      publishedAt: publishedAt(detail.published),
      featured: article.slug === 'the-new-competitive-landscape-for-african-payments',
      featuredOrder: index,
      introduction: article.paragraphs,
      sections: detail.sections.map((section, sectionIndex) => ({
        _key: `section-${sectionIndex + 1}`,
        _type: 'perspectiveSection',
        ...section,
      })),
      quote: detail.quote,
      takeaway: detail.takeaway,
      seoDescription: article.summary,
    })
  }

  await transaction.commit()
  console.log(`Seeded ${PERSPECTIVES.length} perspectives.`)
}

async function seedCaseStudies() {
  const count = await client.fetch('count(*[_type == "caseStudy"])')
  if (count > 0) {
    console.log(`Skipping case studies: ${count} document(s) already exist.`)
    return
  }

  let transaction = client.transaction()

  for (const [index, study] of CASE_STUDIES.entries()) {
    const [image, logo] = await Promise.all([
      uploadAsset('image', study.image),
      uploadAsset('file', study.logo),
    ])
    const related = PERSPECTIVES.find((item) => item.title === study.related)

    transaction = transaction.createOrReplace({
      _id: `case-study-${study.slug}`,
      _type: 'caseStudy',
      client: study.client,
      sector: study.sector,
      market: study.market,
      practices: study.practices.split(' + '),
      title: study.title,
      slug: {_type: 'slug', current: study.slug},
      summary: study.summary,
      challenge: study.challenge,
      challengeDetails: study.challengeDetails,
      work: study.work,
      workstreams: study.workstreams.map((workstream, workstreamIndex) => ({
        _key: `workstream-${workstreamIndex + 1}`,
        _type: 'workstream',
        ...workstream,
      })),
      deliverables: study.deliverables,
      outcome: study.outcome,
      outcomeDetails: study.outcomeDetails,
      insight: {_type: 'insight', ...study.insight},
      pullQuote: study.pullQuote,
      mainImage: imageValue(image, `${study.client} case study`),
      logo: fileValue(logo),
      logoAlt: study.logoAlt,
      logoWidth: study.logoWidth,
      metric: {_type: 'metric', ...study.metric},
      secondaryMetric: {_type: 'secondaryMetric', ...study.secondaryMetric},
      relatedPerspective: related
        ? {_type: 'reference', _ref: `perspective-${related.slug}`}
        : undefined,
      conceptWork: true,
      order: index,
      seoDescription: study.summary,
    })
  }

  await transaction.commit()
  console.log(`Seeded ${CASE_STUDIES.length} case studies.`)
}

async function seedCareerRoles() {
  const count = await client.fetch('count(*[_type == "careerRole"])')
  if (count > 0) {
    console.log(`Skipping career roles: ${count} document(s) already exist.`)
    return
  }

  let transaction = client.transaction()
  for (const role of INITIAL_ROLES) {
    transaction = transaction.createOrReplace({_type: 'careerRole', ...role})
  }
  await transaction.commit()
  console.log(`Seeded ${INITIAL_ROLES.length} career roles.`)
}

await seedPerspectives()
await seedCaseStudies()
await seedCareerRoles()
console.log('Sanity content seed complete.')
