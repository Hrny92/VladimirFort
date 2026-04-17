#!/usr/bin/env node
/**
 * Stáhne recenze Vladimíra Fořta z bidli.cz a uloží je do data/reviews.json
 * Spuštění: node scripts/fetch-reviews.js
 */

const https  = require('https')
const fs     = require('fs')
const path   = require('path')

const URL    = 'https://www.bidli.cz/pruvodce/vladimir-fort/609'
const OUTPUT = path.join(__dirname, '..', 'data', 'reviews.json')

// ── Stažení stránky jako raw buffer ──────────────────────────────────────────
function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'cs-CZ,cs;q=0.9',
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log(`→ Přesměrování: ${res.headers.location}`)
        return fetchBuffer(res.headers.location).then(resolve).catch(reject)
      }
      const chunks = []
      res.on('data', chunk => chunks.push(chunk))
      res.on('end', () => resolve({ buffer: Buffer.concat(chunks), status: res.statusCode }))
    })
    req.on('error', reject)
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')) })
  })
}

// ── Dekódování iso-8859-2 → UTF-8 ────────────────────────────────────────────
function decodeISO88592(buffer) {
  // TextDecoder je dostupný v Node.js 16+
  try {
    const decoder = new TextDecoder('iso-8859-2')
    return decoder.decode(buffer)
  } catch (e) {
    // Fallback: manuální mapa iso-8859-2 → unicode
    const map = {
      0xa0:'\u00a0',0xa1:'\u0104',0xa2:'\u02d8',0xa3:'\u0141',0xa4:'\u00a4',
      0xa5:'\u013d',0xa6:'\u015a',0xa7:'\u00a7',0xa8:'\u00a8',0xa9:'\u0160',
      0xaa:'\u015e',0xab:'\u0164',0xac:'\u0179',0xad:'\u00ad',0xae:'\u017d',
      0xaf:'\u017b',0xb0:'\u00b0',0xb1:'\u0105',0xb2:'\u02db',0xb3:'\u0142',
      0xb4:'\u00b4',0xb5:'\u013e',0xb6:'\u015b',0xb7:'\u02c7',0xb8:'\u00b8',
      0xb9:'\u0161',0xba:'\u015f',0xbb:'\u0165',0xbc:'\u017a',0xbd:'\u02dd',
      0xbe:'\u017e',0xbf:'\u017c',0xc0:'\u0154',0xc1:'\u00c1',0xc2:'\u00c2',
      0xc3:'\u0102',0xc4:'\u00c4',0xc5:'\u0139',0xc6:'\u0106',0xc7:'\u00c7',
      0xc8:'\u010c',0xc9:'\u00c9',0xca:'\u0118',0xcb:'\u00cb',0xcc:'\u011a',
      0xcd:'\u00cd',0xce:'\u00ce',0xcf:'\u010e',0xd0:'\u0110',0xd1:'\u0143',
      0xd2:'\u0147',0xd3:'\u00d3',0xd4:'\u00d4',0xd5:'\u0150',0xd6:'\u00d6',
      0xd7:'\u00d7',0xd8:'\u0158',0xd9:'\u016e',0xda:'\u00da',0xdb:'\u0170',
      0xdc:'\u00dc',0xdd:'\u00dd',0xde:'\u0162',0xdf:'\u00df',0xe0:'\u0155',
      0xe1:'\u00e1',0xe2:'\u00e2',0xe3:'\u0103',0xe4:'\u00e4',0xe5:'\u013a',
      0xe6:'\u0107',0xe7:'\u00e7',0xe8:'\u010d',0xe9:'\u00e9',0xea:'\u0119',
      0xeb:'\u00eb',0xec:'\u011b',0xed:'\u00ed',0xee:'\u00ee',0xef:'\u010f',
      0xf0:'\u0111',0xf1:'\u0144',0xf2:'\u0148',0xf3:'\u00f3',0xf4:'\u00f4',
      0xf5:'\u0151',0xf6:'\u00f6',0xf7:'\u00f7',0xf8:'\u0159',0xf9:'\u016f',
      0xfa:'\u00fa',0xfb:'\u0171',0xfc:'\u00fc',0xfd:'\u00fd',0xfe:'\u0163',0xff:'\u02d9',
    }
    let result = ''
    for (let i = 0; i < buffer.length; i++) {
      const b = buffer[i]
      result += b < 0x80 ? String.fromCharCode(b) : (map[b] || '?')
    }
    return result
  }
}

// ── Extrakce recenzí ──────────────────────────────────────────────────────────
function extractReviews(html) {
  const cheerio = require('cheerio')
  const $       = cheerio.load(html)
  const reviews = []

  $('.reference-item').each((_, el) => {
    const $el   = $(el)
    const name  = $el.find('.name').text().trim()
    const text  = $el.find('.reference-item--desc').text().trim()
    const date  = $el.find('.reference-item--photo').text().trim()

    if (name && text) {
      reviews.push({ name, rating: 5, text, date })
    }
  })

  return reviews
}

// ── Hlavní ────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🔍 Stahuji: ${URL}`)

  const { buffer, status } = await fetchBuffer(URL)
  console.log(`📡 Status: ${status} | ${(buffer.length / 1024).toFixed(1)} kB`)

  const html    = decodeISO88592(buffer)
  const reviews = extractReviews(html)

  if (reviews.length === 0) {
    console.log('❌ Žádné recenze nenalezeny.')
    process.exit(1)
  }

  const output = {
    updatedAt: new Date().toISOString(),
    source: URL,
    reviews,
  }

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true })
  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2), 'utf-8')

  console.log(`\n✅ Uloženo ${reviews.length} recenzí do data/reviews.json\n`)
  reviews.forEach((r, i) => {
    console.log(`  [${i + 1}] ${r.name} (${r.date})`)
    console.log(`       ${r.text.slice(0, 80).replace(/\n/g, ' ')}…\n`)
  })
}

main().catch(err => { console.error('❌', err.message); process.exit(1) })
