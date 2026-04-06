/**
 * SEO & strukturovaná data (Schema.org) pro Vladimíra Fořta
 */

const SITE_URL = 'https://www.fort-finance.cz'
const SITE_NAME = 'Vladimír Fořt – Finanční specialista'
const PHONE = '+420773606013'
const EMAIL = 'vladimir.fort@bidli.cz'

const FAQ = [
  {
    q: 'Co je hypotéka a jak ji získat?',
    a: 'Hypotéka je dlouhodobý úvěr zajištěný nemovitostí. Jako finanční specialista vám bezplatně porovnám nabídky ze všech bank a pomohu vybrat tu nejvýhodnější. Kontaktujte mě na čísle 773 60 60 13.',
  },
  {
    q: 'Co je družstevní financování?',
    a: 'Družstevní financování je alternativní forma financování bydlení přes bytová družstva. Využívá se tam, kde klasická hypotéka není dostupná nebo vhodná. Pomůžu vám zjistit, zda je tato varianta pro vás vhodná.',
  },
  {
    q: 'Kolik stojí konzultace s finančním poradcem?',
    a: 'Konzultace je u mě zcela zdarma a bez závazků. Moje odměna je hrazena bankou nebo pojišťovnou z uzavřeného produktu — pro vás tedy nic navíc.',
  },
  {
    q: 'Jaké pojištění potřebuje podnikatel?',
    a: 'Podnikatel by měl mít pojištění majetku, odpovědnosti za škodu a ideálně i pojištění přerušení provozu. Jako specialista vám sestavím komplexní pojistné krytí přesně na míru vaší firmy.',
  },
  {
    q: 'Jak dlouho trvá vyřízení hypotéky?',
    a: 'Standardně 3–6 týdnů od podání žádosti. Délka závisí na rychlosti doložení dokumentů a interním procesu banky. Celý proces vás provedu krok za krokem.',
  },
  {
    q: 'Kde Vladimír Fořt působí?',
    a: 'Působím v celé České republice. Jsem k dispozici osobně i online — videohovor nebo telefonická konzultace jsou samozřejmostí.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: 'Specialista na financování a pojišťování – hypotéky, pojištění a financování. Vladimír Fořt, praxe od roku 2011.',
      inLanguage: 'cs-CZ',
      publisher: { '@id': `${SITE_URL}/#vladimir` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#vladimir`,
      name: 'Vladimír Fořt',
      givenName: 'Vladimír',
      familyName: 'Fořt',
      jobTitle: 'Finanční specialista',
      description:
        'Vladimír Fořt je specialista na financování a pojišťování. Od roku 2011 pomáhá klientům po celé České republice s hypotékami, pojištěním majetku, životním pojištěním a pojištěním podnikatelů. Registrován jako vázaný zástupce České národní banky.',
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      knowsAbout: [
        'Hypoteční úvěry',
        'Refinancování hypotéky',
        'Družstevní financování',
        'Životní pojištění',
        'Pojištění majetku a odpovědnosti',
        'Pojištění podnikatelů',
        'Finanční plánování',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Bidli',
        url: 'https://www.bidli.cz',
      },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        name: 'Vázaný zástupce České národní banky',
        credentialCategory: 'Licence',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Česká národní banka',
          url: 'https://www.cnb.cz',
        },
      },
    },
    {
      '@type': ['FinancialService', 'ProfessionalService', 'LocalBusiness'],
      '@id': `${SITE_URL}/#business`,
      name: 'Vladimír Fořt – Finanční specialista',
      legalName: 'Vladimír Fořt',
      taxID: '67763006',
      foundingDate: '2011-01-01',
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      founder: { '@id': `${SITE_URL}/#vladimir` },
      priceRange: 'Zdarma',
      currenciesAccepted: 'CZK',
      paymentAccepted: 'Konzultace zdarma',
      openingHours: 'Mo-Fr 08:00-18:00',
      areaServed: { '@type': 'Country', name: 'Česká republika' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Finanční služby',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Hypotéky', description: 'Srovnání hypoték ze 20+ bank, bezplatná konzultace, kompletní vyřízení.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Družstevní financování', description: 'Alternativní forma financování bydlení přes bytová družstva.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Pojištění majetku a odpovědnosti', description: 'Pojištění nemovitosti, domácnosti a osobní odpovědnosti.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Životní pojištění', description: 'Životní pojištění přesně na míru.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pojištění podnikatelů', description: 'Komplexní pojistný servis pro OSVČ a firmy.' } },
        ],
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: PHONE,
          email: EMAIL,
          contactType: 'customer service',
          availableLanguage: { '@type': 'Language', name: 'Czech' },
          areaServed: 'CZ',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: FAQ.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: a,
          author: { '@id': `${SITE_URL}/#vladimir` },
        },
      })),
    },
  ],
}

export default function SEO() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 0) }}
    />
  )
}
