import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://devrimsoft.com',
  output: 'static',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const url = item.url
        const isRoot = url === 'https://devrimsoft.com/'
        const isDefaultLocale = url === 'https://devrimsoft.com/tr/'
        return {
          ...item,
          changefreq: 'monthly',
          lastmod: new Date().toISOString().split('T')[0],
          priority: isRoot ? 1.0 : isDefaultLocale ? 0.9 : 0.8,
        }
      },
      i18n: {
        defaultLocale: 'tr',
        locales: {
          tr: 'tr',
          en: 'en',
          ru: 'ru',
          uk: 'uk',
          de: 'de',
          es: 'es',
          fr: 'fr',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en', 'ru', 'uk', 'de', 'es', 'fr'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
})
