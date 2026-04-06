import type { Metadata } from 'next'
import './globals.css'
import SEO from '@/components/SEO'
import TransitionProvider from '@/components/TransitionProvider'
import CookieConsent from '@/components/CookieConsent'

const SITE_URL  = 'https://www.fort-finance.cz'
const SITE_NAME = 'Vladimír Fořt – Finanční specialista'
const DESC      = 'Specialista na financování a pojišťování s praxí od roku 2011. Hypotéky, družstevní financování, pojištění majetku, životní pojištění a pojištění podnikatelů. Konzultace zdarma a bez závazků.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_NAME,
    template: '%s | Vladimír Fořt',
  },
  description: DESC,
  keywords: [
    'Vladimír Fořt',
    'finanční specialista',
    'hypotéka',
    'hypoteční poradce',
    'nejlepší hypotéka',
    'srovnání hypoték',
    'refinancování hypotéky',
    'družstevní financování',
    'pojištění',
    'životní pojištění',
    'pojištění majetku',
    'pojištění odpovědnosti',
    'pojištění podnikatelů',
    'finanční poradenství',
    'Česká republika',
    'Bidli',
    'IČO 67763006',
  ],
  authors: [{ name: 'Vladimír Fořt', url: SITE_URL }],
  creator: 'Vladimír Fořt',
  publisher: 'Vladimír Fořt',
  category: 'finance',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
    languages: { 'cs-CZ': SITE_URL },
  },

  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DESC,
    locale: 'cs_CZ',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Vladimír Fořt – Finanční specialista',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: DESC,
    images: [`${SITE_URL}/og-image.jpg`],
  },

  icons: {
    icon: [
      { url: '/favicon/favicon.ico',      sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon/favicon-32x32.png',
    apple:    '/favicon/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' },
    ],
  },

  applicationName: SITE_NAME,
  referrer: 'origin-when-cross-origin',
  formatDetection: { email: false, address: false, telephone: false },

  other: {
    'geo.region':    'CZ',
    'geo.placename': 'Česká republika',
    subject:         'Finanční poradenství – hypotéky, pojištění, financování',
    language:        'Czech',
    'revisit-after': '7 days',
    rating:          'general',
    contact:         'vladimir.fort@bidli.cz',
    'profile:first_name': 'Vladimír',
    'profile:last_name':  'Fořt',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#0B1B13" />
        <meta name="msapplication-TileColor" content="#0B1B13" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <TransitionProvider>
          {children}
        </TransitionProvider>
        <SEO />
        <CookieConsent />
      </body>
    </html>
  )
}
