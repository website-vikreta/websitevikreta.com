import type { StructureResolver } from 'sanity/structure'
import { EditIcon } from '@sanity/icons'

// Document types grouped under the "Blog" folder in the desk sidebar.
const BLOG_TYPES = ['post', 'category', 'tag', 'label', 'author']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog')
        .icon(EditIcon)
        .child(
          S.list()
            .title('Blog')
            .items(
              BLOG_TYPES.map((type) => S.documentTypeListItem(type)),
            ),
        ),
      S.divider(),
      // Everything else (Opening, Submission, and any future types) stays
      // at the desk root — auto-derived from the schema so new types don't
      // need a manual entry here unless they belong in Blog.
      ...S.documentTypeListItems().filter(
        (item) => !BLOG_TYPES.includes(item.getId() ?? ''),
      ),
    ])
