import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from './i18n-config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const cookie: any = request.cookies.get('lang');

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales

  if(matchLocale(cookie?.value, locales, i18n.defaultLocale) === cookie?.value) {
    return cookie?.value
  }
  
  return matchLocale(languages, locales, i18n.defaultLocale)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const pattern = [
    '/manifest.json',
    '/favicon.ico',
    '/logo/',
    '/site.webmanifest',
    '/favicon',
    '/apple',
    '/android',
    '/workbox',
    '/sw.js'
  ]

  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  if (
    pattern.some(pattern => pathname.startsWith(pattern) || pathname.includes(pattern))
  ) {
    return
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url))
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
