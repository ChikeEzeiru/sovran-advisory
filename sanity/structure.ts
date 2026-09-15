import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sovran content')
    .items([
      S.documentTypeListItem('perspective').title('Perspectives'),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('caseStudy').title('Case studies'),
      S.divider(),
      S.documentTypeListItem('event').title('Events'),
      S.documentTypeListItem('careerRole').title('Career roles'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['perspective', 'author', 'caseStudy', 'event', 'careerRole'].includes(
            item.getId()!,
          ),
      ),
    ])
