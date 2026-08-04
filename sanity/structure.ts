import type { StructureResolver } from 'sanity/structure'
import { DocumentTextIcon, CaseIcon } from '@sanity/icons'

// Document types grouped under the "Blog" folder in the desk sidebar.
const BLOG_TYPES = ['post', 'category', 'tag', 'label', 'author']
// Document types grouped under the "Careers" folder in the desk sidebar.
const CAREERS_TYPES = ['opening', 'submission']

const GROUPED_TYPES = [...BLOG_TYPES, ...CAREERS_TYPES]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Blog')
            .items(
              BLOG_TYPES.map((type) => S.documentTypeListItem(type)),
            ),
        ),
      S.listItem()
        .title('Career')
        .icon(CaseIcon)
        .child(
          S.list()
            .title('Career')
            .items(
              CAREERS_TYPES.map((type) => S.documentTypeListItem(type)),
            ),
        ),
      S.divider(),
      // Everything else stays at the desk root — auto-derived from the
      // schema so new types don't need a manual entry here unless they
      // belong in Blog or Careers.
      ...S.documentTypeListItems().filter(
        (item) => !GROUPED_TYPES.includes(item.getId() ?? ''),
      ),
    ])
