import {
  Outlet,
  Link,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { HomePage } from './routes/HomePage'
import { MusicPage } from './routes/MusicPage'

const navLinkClass =
  'rounded-full px-4 py-2.5 text-[0.82rem] uppercase tracking-[0.16em] text-mute transition duration-200 hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,rgba(120,240,255,0.18),rgba(255,79,163,0.18))] hover:text-cloud data-[active=true]:-translate-y-0.5 data-[active=true]:bg-[linear-gradient(135deg,rgba(120,240,255,0.18),rgba(255,79,163,0.18))] data-[active=true]:text-cloud'

function RootLayout() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const [transitionSeed, setTransitionSeed] = useState(0)

  useEffect(() => {
    setTransitionSeed((seed) => seed + 1)
  }, [pathname])

  return (
    <div className="relative h-screen overflow-hidden text-cloud">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-stretch gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5">
        <div className="pointer-events-auto flex flex-col gap-1">
          <span className="font-display text-[1.15rem] font-bold uppercase tracking-[0.22em]">
            fakelbst
          </span>
          <span className="text-[0.72rem] uppercase tracking-[0.18em] text-mute">
            signal diary / private cosmos
          </span>
        </div>
        <nav
          className="pointer-events-auto inline-flex w-full items-center justify-between gap-3 rounded-full border border-white/8 bg-[rgba(6,9,26,0.45)] p-1 shadow-aurora backdrop-blur-[18px] md:w-auto md:justify-normal"
          aria-label="Primary"
        >
          <Link to="/" className={navLinkClass} activeProps={{ 'data-active': 'true' }}>
            Home
          </Link>
          <Link to="/music" className={navLinkClass} activeProps={{ 'data-active': 'true' }}>
            Music
          </Link>
        </nav>
      </header>

      <div className="relative h-full">
        <RouteVeil key={transitionSeed} />
        <Outlet />
      </div>
    </div>
  )
}

function RouteVeil() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden="true">
      <span className="absolute inset-y-[-10%] left-[-30%] w-[22%] -skew-x-[18deg] animate-route-sweep bg-[linear-gradient(180deg,transparent,rgba(120,240,255,0.26),rgba(120,240,255,0.06),transparent)] motion-reduce:animate-none" />
      <span className="absolute inset-y-[-10%] left-[-30%] w-[12%] -skew-x-[18deg] animate-route-sweep bg-[linear-gradient(180deg,transparent,rgba(255,79,163,0.28),transparent)] blur-xl [animation-delay:65ms] motion-reduce:animate-none" />
    </div>
  )
}

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const musicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/music',
  component: MusicPage,
})

const routeTree = rootRoute.addChildren([indexRoute, musicRoute])

export const router = createRouter({
  routeTree,
  history: createHashHistory(),
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})
