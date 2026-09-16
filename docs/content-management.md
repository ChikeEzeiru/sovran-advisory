# Sovran content management

The embedded Sanity Studio is available at `/studio` and is organised around the public site language:

- Perspectives
- Authors
- Case studies
- Events
- Career roles

## Access and sign-in

The Studio uses Sanity-managed authentication. Sovran does not store CMS passwords.

Editors should visit `/studio` on the deployed website and sign in with the same invited Google account every time. The Studio is intentionally configured with Google as its only sign-in provider and sends signed-out users directly into that login flow.

Access is granted through the Members area of the `sovran consulting` project in Sanity Manage. An administrator must invite the person's real Google Workspace email address before they can enter the Studio. A content author profile does not create a login account; authors and project members are separate records.

Recommended access:

- Project owner — Administrator
- Technical maintainer — Developer, or Administrator when the current plan does not provide Developer
- Lina / Perspectives Lead — Editor
- Chinedu / Strategy & Markets Editor — Contributor
- Njeri / Research Editor — Contributor
- Occasional reviewers — Viewer

Contributors prepare drafts but cannot publish. The Perspectives Lead reviews and publishes them. Keep Administrator membership limited to the project owner and, only when necessary, the technical maintainer.

Sanity's Editor, Contributor and Developer roles require a plan that supports them. On a plan that only offers Administrator and Viewer, do not grant routine writers Administrator access; upgrade the project before onboarding a wider editorial team.

## What the CMS controls

Sanity controls the editorial content and content-specific media. React components continue to control layout, typography, spacing, animation and responsive behaviour.

The perspectives and case-study index pages fetch their content on the server and pass serializable card data into the existing client-side search, filtering and pagination components. Detail pages fetch the matching slug directly from the same content layer.

## Initial content migration

The production dataset was empty when the CMS integration was completed. Until a content type has at least one published Sanity document, the site uses the existing local content for that type. Once the first document exists, Sanity becomes authoritative for that entire collection.

To migrate the complete current set in one operation:

1. Log in through the Sanity CLI with a user who can create and publish documents.
2. Run `npm run sanity:seed` once.

The command uses the authenticated CLI session. A temporary `SANITY_API_WRITE_TOKEN` can still be supplied for automated environments, but it is not required for a local migration and should never be committed.

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

## Perspectives editorial team

The regular publishing group is deliberately limited to three people:

- Lina Adeyemi — Perspectives Lead
- Chinedu Eze — Strategy & Markets Editor
- Njeri Mwangi — Research Editor

Other members of the leadership team remain available as subject-matter contributors, but they are not maintained as regular author records. Use the Sovran Editorial Team byline only for institutional publications rather than individual analysis.
