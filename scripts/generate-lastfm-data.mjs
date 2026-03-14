import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as cheerio from 'cheerio'

const username = 'fakelbst'
const limit = 10
const baseUrl = `https://www.last.fm/user/${username}/library`
const outputPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../public/data/lastfm.json',
)

const headers = {
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  accept: 'text/html,application/xhtml+xml',
}

const cleanText = (value = '') => value.replace(/\s+/g, ' ').trim()

const parseCount = (value = '') =>
  Number.parseInt(value.replace(/,/g, '').trim(), 10) || 0

const toAbsoluteUrl = (value = '') => {
  if (!value) return ''
  if (value.startsWith('http')) return value
  return `https://www.last.fm${value}`
}

async function fetchHtml(section) {
  const attempts = 4

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/${section}`, { headers })

      if (!response.ok) {
        throw new Error(`Failed to fetch ${section}: ${response.status}`)
      }

      return response.text()
    } catch (error) {
      if (attempt === attempts) {
        throw error
      }

      await new Promise((resolve) => {
        setTimeout(resolve, 600 * attempt)
      })
    }
  }
}

function parseArtists(html) {
  const $ = cheerio.load(html)

  return $('.chartlist-row')
    .slice(0, limit)
    .map((_, row) => {
      const element = $(row)

      return {
        rank: Number.parseInt(cleanText(element.find('.chartlist-index').text()), 10),
        name: cleanText(element.find('.chartlist-name a').first().text()),
        url: toAbsoluteUrl(element.find('.chartlist-name a').attr('href')),
        image:
          element.find('.chartlist-image img').attr('src') ||
          element.find('.chartlist-image img').attr('data-src') ||
          '',
        scrobbles: parseCount(element.find('.chartlist-count-bar-value').text()),
      }
    })
    .get()
}

function parseAlbums(html) {
  const $ = cheerio.load(html)

  return $('.chartlist-row')
    .slice(0, limit)
    .map((_, row) => {
      const element = $(row)

      return {
        rank: Number.parseInt(cleanText(element.find('.chartlist-index').text()), 10),
        name: cleanText(element.find('.chartlist-name a').first().text()),
        artist: cleanText(element.find('.chartlist-artist a').first().text()),
        url: toAbsoluteUrl(element.find('.chartlist-name a').attr('href')),
        artistUrl: toAbsoluteUrl(element.find('.chartlist-artist a').attr('href')),
        image:
          element.find('.chartlist-image img').attr('src') ||
          element.find('.chartlist-image img').attr('data-src') ||
          '',
        scrobbles: parseCount(element.find('.chartlist-count-bar-value').text()),
      }
    })
    .get()
}

function parseTracks(html) {
  const $ = cheerio.load(html)

  return $('.chartlist-row')
    .slice(0, limit)
    .map((_, row) => {
      const element = $(row)

      return {
        rank: Number.parseInt(cleanText(element.find('.chartlist-index').text()), 10),
        name: cleanText(element.find('.chartlist-name a').first().text()),
        artist: cleanText(element.find('.chartlist-artist a').first().text()),
        url: toAbsoluteUrl(element.find('.chartlist-name a').attr('href')),
        artistUrl: toAbsoluteUrl(element.find('.chartlist-artist a').attr('href')),
        image:
          element.find('.chartlist-image img').attr('src') ||
          element.find('.chartlist-image img').attr('data-src') ||
          '',
        loved:
          cleanText(element.find('.chartlist-loved .toggle-button').text()).length > 0,
        scrobbles: parseCount(element.find('.chartlist-count-bar-value').text()),
      }
    })
    .get()
}

async function main() {
  try {
    const [artistsHtml, albumsHtml, tracksHtml] = await Promise.all([
      fetchHtml('artists'),
      fetchHtml('albums'),
      fetchHtml('tracks'),
    ])

    const payload = {
      username,
      source: 'https://www.last.fm/',
      period: 'overall',
      fetchedAt: new Date().toISOString(),
      artists: parseArtists(artistsHtml),
      albums: parseAlbums(albumsHtml),
      tracks: parseTracks(tracksHtml),
    }

    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, JSON.stringify(payload, null, 2))
  } catch (error) {
    try {
      await readFile(outputPath, 'utf8')
      console.warn(
        `Last.fm refresh failed, keeping cached snapshot at ${outputPath}.`,
        error.message,
      )
    } catch {
      throw error
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
