import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: process.env.VERCEL_GIT_COMMIT_REF || 'main',
  clientId: process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },
  
  schema: {
    collections: [
      {
        name: 'mix',
        label: 'Mixes',
        path: 'content/mixes',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
          },
          {
            type: 'string',
            name: 'subtitle',
            label: 'Subtitle',
          },
          {
            type: 'string',
            name: 'duration',
            label: 'Duration',
            description: 'e.g., 1:23:45',
          },
          {
            type: 'string',
            name: 'genre',
            label: 'Genre',
          },
          {
            type: 'string',
            name: 'color',
            label: 'Card Color',
            description: 'Tailwind gradient classes',
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'soundcloudUrl',
            label: 'SoundCloud URL',
          },
          {
            type: 'image',
            name: 'coverImage',
            label: 'Cover Image',
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Release Date',
          },
          {
            type: 'boolean',
            name: 'featured',
            label: 'Featured on Homepage',
          },
        ],
      },
      {
        name: 'gig',
        label: 'Tour Dates',
        path: 'content/gigs',
        format: 'mdx',
        fields: [
          {
            type: 'datetime',
            name: 'date',
            label: 'Date',
            required: true,
          },
          {
            type: 'string',
            name: 'venue',
            label: 'Venue',
            required: true,
          },
          {
            type: 'string',
            name: 'city',
            label: 'City',
            required: true,
          },
          {
            type: 'string',
            name: 'event',
            label: 'Event Name',
          },
          {
            type: 'string',
            name: 'ticketUrl',
            label: 'Ticket URL',
          },
          {
            type: 'string',
            name: 'status',
            label: 'Status',
            options: [
              { label: 'On Sale', value: 'on-sale' },
              { label: 'Sold Out', value: 'sold-out' },
              { label: 'Coming Soon', value: 'coming-soon' },
            ],
          },
          {
            type: 'string',
            name: 'color',
            label: 'Accent Color (hex)',
          },
        ],
      },
      {
        name: 'page',
        label: 'Pages',
        path: 'content/pages',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'metaDescription',
            label: 'Meta Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
      {
        name: 'site',
        label: 'Site Settings',
        path: 'content/site',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Site Title',
          },
          {
            type: 'string',
            name: 'description',
            label: 'Site Description',
          },
          {
            type: 'object',
            name: 'social',
            label: 'Social Links',
            fields: [
              { type: 'string', name: 'instagram', label: 'Instagram' },
              { type: 'string', name: 'twitter', label: 'Twitter' },
              { type: 'string', name: 'youtube', label: 'YouTube' },
              { type: 'string', name: 'soundcloud', label: 'SoundCloud' },
            ],
          },
          {
            type: 'string',
            name: 'bookingEmail',
            label: 'Booking Email',
          },
        ],
      },
    ],
  },
})
