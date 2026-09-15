import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {authorType} from './authorType'
import {caseStudyType} from './caseStudyType'
import {eventType} from './eventType'
import {careerRoleType} from './careerRoleType'
import {perspectiveType} from './perspectiveType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    authorType,
    perspectiveType,
    caseStudyType,
    eventType,
    careerRoleType,
  ],
}
