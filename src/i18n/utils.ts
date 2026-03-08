import { DEFAULT_LOCALE, LOCALE_CODES, ROUTE_MAP, SERVICE_SLUGS, type Locale } from './locales'
import { ui } from './ui'

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/')
  if (LOCALE_CODES.includes(lang as Locale)) {
    return lang as Locale
  }
  return DEFAULT_LOCALE
}

export function useTranslations(lang: Locale) {
  return function t(key: string): string {
    const entry = ui[key]
    if (!entry) return key
    return entry[lang] ?? entry[DEFAULT_LOCALE] ?? key
  }
}

export function getLocalizedPath(lang: Locale, page: string): string {
  if (page === '' || page === 'home') {
    return `/${lang}/`
  }

  const routeEntry = ROUTE_MAP[page]
  if (routeEntry) {
    return `/${lang}/${routeEntry[lang]}/`
  }

  return `/${lang}/${page}/`
}

export function getAlternateLinks(currentPage: string): Array<{ lang: Locale; href: string }> {
  return LOCALE_CODES.map((lang) => ({
    lang,
    href: getLocalizedPath(lang, currentPage),
  }))
}

export function getServiceDetailPath(lang: Locale, serviceKey: string): string {
  const servicesSlug = ROUTE_MAP.services[lang]
  const serviceSlug = SERVICE_SLUGS[serviceKey]?.[lang]
  if (!serviceSlug) return `/${lang}/${servicesSlug}/`
  return `/${lang}/${servicesSlug}/${serviceSlug}/`
}

export function getServiceAlternateLinks(serviceKey: string): Array<{ lang: Locale; href: string }> {
  return LOCALE_CODES.map((lang) => ({
    lang,
    href: getServiceDetailPath(lang, serviceKey),
  }))
}

export function getServiceKeyFromSlug(lang: Locale, slug: string): string | undefined {
  for (const [key, slugs] of Object.entries(SERVICE_SLUGS)) {
    if (slugs[lang] === slug) return key
  }
  return undefined
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE

  const browserLangs = navigator.languages ?? [navigator.language]

  for (const browserLang of browserLangs) {
    const code = browserLang.split('-')[0].toLowerCase()
    if (LOCALE_CODES.includes(code as Locale)) {
      return code as Locale
    }
  }

  return DEFAULT_LOCALE
}
