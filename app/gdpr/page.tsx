'use client'

import Link from 'next/link'

export default function GdprPage() {
  return (
    <div className="min-h-screen" style={{ background: '#EEF3EF' }}>
      {/* Header */}
      <div className="py-16" style={{ background: '#0B1B13' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link href="/"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
            style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Zpět na hlavní stránku
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#4CAF79' }}>Právní</span>
            <span className="h-px w-8" style={{ background: 'rgba(76,175,121,0.4)', display: 'block' }} />
          </div>
          <h1 className="text-white font-extrabold text-3xl md:text-4xl tracking-tight">
            Ochrana osobních údajů
          </h1>
          <p className="text-sm mt-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Platné od 1. 1. 2024 · V souladu s nařízením EU 2016/679 (GDPR)
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <div style={{ background: '#fff', padding: '2rem 2.5rem', color: '#0B1B13' }} className="space-y-10 md:p-12">

          {/* Správce */}
          <section>
            <h2 className="font-bold text-xl mb-4">1. Správce osobních údajů</h2>
            <div className="text-sm p-6 space-y-2" style={{ background: '#F5F8F6', borderRadius: 2 }}>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-500">Správce:</span>
                <span className="font-semibold">Vladimír Fořt</span>
                <span className="text-gray-500">IČO:</span>
                <span className="font-semibold">67763006</span>
                <span className="text-gray-500">Telefon:</span>
                <span className="font-semibold">
                  <a href="tel:+420773606013" className="hover:underline" style={{ color: '#27744E' }}>773 60 60 13</a>
                </span>
                <span className="text-gray-500">E-mail:</span>
                <span className="font-semibold">
                  <a href="mailto:vladimir.fort@bidli.cz" className="hover:underline" style={{ color: '#27744E' }}>vladimir.fort@bidli.cz</a>
                </span>
              </div>
            </div>
          </section>

          {/* Účel zpracování */}
          <section>
            <h2 className="font-bold text-xl mb-4">2. Účel a právní základ zpracování</h2>
            <p className="text-gray-600 leading-relaxed">
              Osobní údaje zpracovávám výhradně za účelem poskytnutí finančního poradenství a komunikace s klienty.
              Právním základem je splnění smlouvy nebo provedení opatření před uzavřením smlouvy (čl. 6 odst. 1 písm. b GDPR)
              a oprávněný zájem (čl. 6 odst. 1 písm. f GDPR).
            </p>
          </section>

          {/* Kategorie údajů */}
          <section>
            <h2 className="font-bold text-xl mb-4">3. Kategorie zpracovávaných údajů</h2>
            <ul className="space-y-2 text-gray-600">
              {[
                'Jméno a příjmení',
                'E-mailová adresa',
                'Telefonní číslo',
                'Obsah vzájemné komunikace',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#27744E', display: 'block' }} />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Příjemci */}
          <section>
            <h2 className="font-bold text-xl mb-4">4. Příjemci osobních údajů</h2>
            <p className="text-gray-600 leading-relaxed">
              Vaše osobní údaje jsou předávány pouze nezbytným příjemcům — bankám a pojišťovnám v rámci sjednávání
              finančních produktů, a to pouze s vaším vědomím a souhlasem.
            </p>
          </section>

          {/* Doba uchování */}
          <section>
            <h2 className="font-bold text-xl mb-4">5. Doba uchování údajů</h2>
            <p className="text-gray-600 leading-relaxed">
              Osobní údaje uchovávám po dobu trvání smluvního vztahu a dále po dobu stanovenou právními předpisy,
              nejdéle však 10 let od ukončení smluvního vztahu.
            </p>
          </section>

          {/* Práva subjektů */}
          <section>
            <h2 className="font-bold text-xl mb-4">6. Vaše práva</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Máte právo na:</p>
            <ul className="space-y-2 text-gray-600">
              {[
                'přístup k vašim osobním údajům',
                'opravu nepřesných nebo neúplných údajů',
                'výmaz osobních údajů ("právo být zapomenut")',
                'omezení zpracování',
                'přenositelnost údajů',
                'námitku proti zpracování',
                'odvolání souhlasu kdykoli bez dopadu na zákonnost předchozího zpracování',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#27744E', display: 'block' }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Svá práva můžete uplatnit na e-mailu{' '}
              <a href="mailto:vladimir.fort@bidli.cz" className="font-semibold hover:underline" style={{ color: '#27744E' }}>
                vladimir.fort@bidli.cz
              </a>.
              Máte rovněž právo podat stížnost u Úřadu pro ochranu osobních údajů (
              <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#27744E' }}>
                uoou.cz
              </a>).
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="font-bold text-xl mb-4">7. Soubory cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              Tento web využívá cookies pro zajištění správné funkce stránky a (s vaším souhlasem) pro analytické
              a marketingové účely. Své předvolby cookies můžete kdykoli změnit v patičce webu.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
