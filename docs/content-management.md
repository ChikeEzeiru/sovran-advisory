# Sovran content management

The embedded Sanity Studio is available at `/studio` and is organised around the public site language:

- Perspectives
- Authors
- Case studies
- Events
- Career roles

## What the CMS controls

Sanity controls the editorial content and content-specific media. React components continue to control layout, typography, spacing, animation and responsive behaviour.

The perspectives and case-study index pages fetch their content on the server and pass serializable card data into the existing client-side search, filtering and pagination components. Detail pages fetch the matching slug directly from the same content layer.

## Initial content migration

The production dataset was empty when the CMS integration was completed. Until a content type has at least one published Sanity document, the site uses the existing local content for that type. Once the first document exists, Sanity becomes authoritative for that entire collection.

To migrate the complete current set in one operation:

1. Create a Sanity Editor token.
2. Add it to `.env.local` as `SANITY_API_WRITE_TOKEN`.
3. Run `npm run sanity:seed` once.
4. Remove the write token from local and hosted environments after the migration.

The seed is deliberately collection-safe: it skips a collection when documents of that type already exist.

## Publishing behaviour

Published content is queried through Sanity Live. New publications and edits use Sanity's query-derived cache tags, allowing affected pages to refresh without rebuilding the entire site.

The Studio's Presentation tool opens the real site with draft mode enabled, so editors can inspect unpublished changes in the production page components before publishing. Configure a Viewer token as `SANITY_API_READ_TOKEN` in local and hosted environments to enable this workflow. Never expose an Editor token to the browser or use it as the read token.

Draft mode can be exited by visiting `/api/draft-mode/disable`.

## Editorial rules

- Use a unique, stable slug before publishing.
- Supply meaningful alternative text for every editorial image.
- Keep only one perspective marked as featured.
- Use URL-safe section anchors such as `market-context`; these power the article table of contents.
- Relate case studies to perspectives with the reference field rather than repeating a title.
- Turn off `Open for applications` to remove a role without deleting its record.
- Leave a role's application URL blank to use the site's contact page.
