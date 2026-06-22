import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: import.meta.env.DEV
    ? { kind: 'local' }
    : { kind: 'cloud' },
  cloud: {
    project: 'redevise/blog',
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: { label: 'Title', validation: { isRequired: true } },
        }),
        date: fields.date({
          label: 'Publish Date',
          validation: { isRequired: true },
          defaultValue: { kind: 'today' },
        }),
        summary: fields.text({
          label: 'Summary',
          description: 'A short description shown on the blog listing and in SEO meta tags.',
          multiline: true,
          validation: { isRequired: true },
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value,
          }
        ),
        author: fields.text({
          label: 'Author',
          defaultValue: 'Redevise',
        }),
        content: fields.markdoc({
          label: 'Content',
        }),
      },
    }),
  },
});
