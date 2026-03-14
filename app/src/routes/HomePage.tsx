export function HomePage() {
  return (
    <main className="relative grid h-screen place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.05),transparent_22%),linear-gradient(180deg,rgba(3,5,16,0.24),rgba(1,2,8,0.72))] px-4 pb-4 pt-36 md:px-8 md:pb-8 md:pt-25">
      <div
        className="pointer-events-none absolute inset-0 opacity-16 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:140px_140px] [mask-image:radial-gradient(circle_at_center,black_44%,transparent_100%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 grid h-full w-full max-w-[1440px] grid-cols-1 items-center gap-4 lg:grid-cols-[minmax(280px,520px)_minmax(360px,1fr)] lg:gap-8">
        <div className="relative order-first h-[40vh] min-h-[280px] lg:order-none lg:h-[min(86vh,900px)] lg:min-h-[440px]">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[min(72vh,40rem)] w-[min(72vh,40rem)] -translate-x-1/2 -translate-y-1/2 border border-white/8 opacity-80 [clip-path:polygon(50%_0%,0%_100%,100%_100%)] animate-orbit-spin motion-reduce:animate-none"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[min(86vh,49rem)] w-[min(86vh,49rem)] -translate-x-1/2 -translate-y-1/2 border border-dashed border-pink-flare/18 [clip-path:polygon(50%_0%,0%_100%,100%_100%)] animate-orbit-reverse motion-reduce:animate-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </main>
  )
}
