import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: 'published',
  useCdn: true,
  stega: {
    // The Studio is embedded at the same origin in every environment.
    studioUrl: '/studio',
  },
})
