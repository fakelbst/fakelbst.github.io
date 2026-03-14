import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

type PanelKey = 'albums' | 'artists' | 'tracks'

type PanelConfig = {
  key: PanelKey
  label: string
  title: string
  eyebrow: string
  accentClass: string
  badgeClass: string
  itemClass: string
  thumbClass: string
}

type BaseItem = {
  rank: number
  name: string
  url: string
  image: string
  scrobbles: number
}

type ArtistItem = BaseItem

type AlbumItem = BaseItem & {
  artist: string
  artistUrl: string
}

type TrackItem = BaseItem & {
  artist: string
  artistUrl: string
  loved: boolean
}

type LastfmPayload = {
  username: string
  source: string
  period: string
  fetchedAt: string
  artists: ArtistItem[]
  albums: AlbumItem[]
  tracks: TrackItem[]
}

type PanelMap = {
  albums: AlbumItem[]
  artists: ArtistItem[]
  tracks: TrackItem[]
}

type PanelItem = ArtistItem | AlbumItem | TrackItem

type DataPanelProps = {
  title: string
  items: PanelItem[]
  type: PanelKey
}

const panels: PanelConfig[] = [
  {
    key: 'albums',
    label: 'Albums',
    title: 'Top Albums',
    eyebrow: 'records in rotation',
    accentClass:
      'from-[rgba(120,240,255,0.28)] via-[rgba(255,255,255,0.08)] to-transparent',
    badgeClass:
      'border-[rgba(120,240,255,0.22)] bg-[rgba(120,240,255,0.08)] text-[rgba(120,240,255,0.92)]',
    itemClass:
      'border-[rgba(120,240,255,0.12)] bg-[linear-gradient(135deg,rgba(120,240,255,0.08),rgba(255,255,255,0.03))] hover:border-[rgba(120,240,255,0.22)]',
    thumbClass:
      'bg-[linear-gradient(135deg,rgba(120,240,255,0.2),rgba(255,255,255,0.08))]',
  },
  {
    key: 'artists',
    label: 'Artists',
    title: 'Top Artists',
    eyebrow: 'voices and silhouettes',
    accentClass:
      'from-[rgba(255,210,110,0.24)] via-[rgba(255,255,255,0.08)] to-transparent',
    badgeClass:
      'border-[rgba(255,210,110,0.22)] bg-[rgba(255,210,110,0.08)] text-[rgba(255,210,110,0.92)]',
    itemClass:
      'border-[rgba(255,210,110,0.12)] bg-[linear-gradient(135deg,rgba(255,210,110,0.08),rgba(255,255,255,0.03))] hover:border-[rgba(255,210,110,0.22)]',
    thumbClass:
      'bg-[linear-gradient(135deg,rgba(255,210,110,0.18),rgba(255,255,255,0.08))]',
  },
  {
    key: 'tracks',
    label: 'Tracks',
    title: 'Top Tracks',
    eyebrow: 'repeat-index highlights',
    accentClass:
      'from-[rgba(255,79,163,0.28)] via-[rgba(255,255,255,0.08)] to-transparent',
    badgeClass:
      'border-[rgba(255,79,163,0.2)] bg-[rgba(255,79,163,0.08)] text-[rgba(255,155,206,0.95)]',
    itemClass:
      'border-[rgba(255,79,163,0.12)] bg-[linear-gradient(135deg,rgba(255,79,163,0.08),rgba(255,255,255,0.03))] hover:border-[rgba(255,79,163,0.22)]',
    thumbClass:
      'bg-[linear-gradient(135deg,rgba(255,79,163,0.2),rgba(255,255,255,0.08))]',
  },
]

async function fetchLastfmData(): Promise<LastfmPayload> {
  const response = await fetch(`${import.meta.env.BASE_URL}data/lastfm.json`)

  if (!response.ok) {
    throw new Error('Unable to load Last.fm data')
  }

  return response.json() as Promise<LastfmPayload>
}

function DataPanel({ title, items, type }: DataPanelProps) {
  const panel = panels.find((entry) => entry.key === type) ?? panels[0]

  return (
    <section className="grid min-h-0 overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-[1px] shadow-aurora">
      <div className="grid min-h-0 grid-rows-[auto_auto_1fr] gap-4 rounded-[calc(1.7rem-1px)] bg-[linear-gradient(180deg,rgba(10,16,42,0.9),rgba(4,7,19,0.86))] p-4 backdrop-blur-[18px] max-md:gap-3.5 max-md:p-3.5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-[0.66rem] font-medium uppercase tracking-[0.18em] ${panel.badgeClass}`}
            >
              {panel.eyebrow}
            </span>
            <div className="space-y-1">
              <h2 className="font-display text-[1rem] uppercase tracking-[0.12em] text-cloud">
                {title}
              </h2>
            </div>
          </div>
          <span className="rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-mute">
            top 10
          </span>
        </div>

        <div
          className={`h-px w-full bg-gradient-to-r ${panel.accentClass}`}
          aria-hidden="true"
        />

        <ol className="grid min-h-0 gap-2 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const artistName = 'artist' in item ? item.artist : ''

            return (
              <li
                key={`${type}-${item.rank}-${item.name}`}
                className={`grid grid-cols-[1.65rem_3rem_minmax(0,1fr)_auto] items-center gap-3 rounded-[1.2rem] border px-3 py-2.5 transition duration-200 hover:-translate-y-0.5 max-md:grid-cols-[1.45rem_2.45rem_minmax(0,1fr)_auto] max-md:gap-2.5 max-md:px-2.5 ${panel.itemClass}`}
              >
                <span className="text-[0.74rem] tracking-[0.14em] text-white/44 max-md:text-[0.7rem]">
                  {String(item.rank).padStart(2, '0')}
                </span>
                <div
                  className={`h-12 w-12 overflow-hidden rounded-[0.95rem] border border-white/10 max-md:h-10 max-md:w-10 max-md:rounded-[0.8rem] ${panel.thumbClass}`}
                >
                  {item.image ? <img src={item.image} alt="" loading="lazy" /> : <span />}
                </div>
                <div className="min-w-0">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block truncate text-sm font-semibold text-cloud transition hover:text-white max-md:text-[0.9rem]"
                  >
                    {item.name}
                  </a>
                  <span className="mt-0.5 block truncate text-[0.82rem] text-mute max-md:text-[0.74rem]">
                    {artistName}
                  </span>
                </div>
                <span className="whitespace-nowrap rounded-full border border-white/8 bg-black/18 px-2.5 py-1 text-[0.74rem] text-gold-flare max-md:text-[0.68rem]">
                  {item.scrobbles}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export function MusicPage() {
  const [activePanel, setActivePanel] = useState<PanelKey>('albums')
  const lastfmQuery = useQuery({
    queryKey: ['lastfm', 'overall'],
    queryFn: fetchLastfmData,
  })

  const panelMap = useMemo<PanelMap | null>(
    () =>
      lastfmQuery.data
        ? {
            albums: lastfmQuery.data.albums,
            artists: lastfmQuery.data.artists,
            tracks: lastfmQuery.data.tracks,
          }
        : null,
    [lastfmQuery.data],
  )

  return (
    <main className="relative h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.06),transparent_20%),linear-gradient(180deg,rgba(2,3,11,0.3),rgba(2,3,11,0.75))] px-4 pb-4 pt-34 md:px-7 md:pb-7 md:pt-26">
      <div
        className="pointer-events-none absolute inset-0 opacity-16 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:140px_140px] [mask-image:radial-gradient(circle_at_center,black_44%,transparent_100%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span className="absolute right-[-6rem] top-[10%] h-[27rem] w-[24rem] border border-white/10 bg-[linear-gradient(180deg,rgba(120,240,255,0.16),rgba(255,255,255,0.03))] opacity-80 shadow-[inset_0_0_0_12px_rgba(120,240,255,0.03),0_0_40px_rgba(120,240,255,0.08)] [clip-path:polygon(50%_0%,0%_100%,100%_100%)] animate-float-slow motion-reduce:animate-none" />
        <span className="absolute bottom-[-3rem] left-[-4rem] h-[20rem] w-[18rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,79,163,0.14),rgba(255,255,255,0.03))] opacity-80 shadow-[inset_0_0_0_12px_rgba(255,79,163,0.03),0_0_40px_rgba(255,79,163,0.08)] [clip-path:polygon(50%_0%,0%_100%,100%_100%)] animate-float-slow-reverse motion-reduce:animate-none" />
        <span className="absolute left-[8%] top-[22%] h-0.5 w-[34%] origin-left bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.32),rgba(255,255,255,0.95))] opacity-70 animate-pulse-line motion-reduce:animate-none" />
        <span className="absolute right-[4%] top-[22%] h-0.5 w-[26%] origin-left rotate-[-4deg] bg-[linear-gradient(90deg,rgba(255,79,163,0.9),rgba(255,142,82,0.88),rgba(255,210,110,0.92),rgba(137,255,152,0.88),rgba(120,240,255,0.94),rgba(96,131,255,0.86),transparent)] opacity-75 animate-pulse-line-reverse motion-reduce:animate-none" />
        <span className="absolute inset-x-0 bottom-[18%] h-0.5 origin-center bg-[linear-gradient(90deg,transparent,rgba(120,240,255,0.3),rgba(255,255,255,0.1),transparent)] opacity-60 animate-pulse-line-reverse motion-reduce:animate-none" />
        <span className="absolute left-[51%] top-[17%] h-32 w-24 -translate-x-1/2 border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] shadow-[0_0_32px_rgba(255,255,255,0.06)] [clip-path:polygon(50%_6%,8%_100%,92%_100%)]" />
      </div>

      <div className="relative z-10 grid h-full min-h-0 grid-rows-[auto_auto_1fr] gap-4">
        <div
          className="flex gap-2 overflow-x-auto pb-1 md:hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Music categories"
        >
          {panels.map((panel) => (
            <button
              key={panel.key}
              type="button"
              className="shrink-0 rounded-full border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-4 py-3 text-mute transition data-[active=true]:border-[rgba(255,210,110,0.34)] data-[active=true]:bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(120,240,255,0.12),rgba(255,79,163,0.08))] data-[active=true]:text-cloud"
              data-active={activePanel === panel.key}
              onClick={() => setActivePanel(panel.key)}
            >
              {panel.label}
            </button>
          ))}
        </div>

        {lastfmQuery.isLoading ? (
          <div className="grid min-h-[260px] place-items-center rounded-[1.6rem] border border-line bg-panel p-4 text-mute shadow-aurora backdrop-blur-[18px]">
            <span>Loading the archive...</span>
          </div>
        ) : null}

        {lastfmQuery.isError ? (
          <div className="grid min-h-[260px] place-items-center rounded-[1.6rem] border border-line bg-panel p-4 text-pink-flare shadow-aurora backdrop-blur-[18px]">
            <span>Last.fm data could not be loaded right now.</span>
          </div>
        ) : null}

        {panelMap ? (
          <div className="min-h-0">
            <div className="hidden h-full min-h-0 gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
              {panels.map((panel) => (
                <DataPanel
                  key={panel.key}
                  title={panel.title}
                  items={panelMap[panel.key]}
                  type={panel.key}
                />
              ))}
            </div>

            <div className="h-full md:hidden">
              <DataPanel
                title={panels.find((panel) => panel.key === activePanel)?.title ?? 'Top Albums'}
                items={panelMap[activePanel]}
                type={activePanel}
              />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  )
}
