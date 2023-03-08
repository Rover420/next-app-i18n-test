export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'pl'],
}

export type Locale = typeof i18n['locales'][number]
