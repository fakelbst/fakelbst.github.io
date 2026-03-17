import { ReactivePrismBackground } from '../components/home/ReactivePrismBackground'

export function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.05),transparent_22%),linear-gradient(180deg,rgba(3,5,16,0.24),rgba(1,2,8,0.82))]">
      <div
        className="pointer-events-none absolute inset-0 opacity-16 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:140px_140px] [mask-image:radial-gradient(circle_at_center,black_44%,transparent_100%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span className="absolute left-[-8rem] top-[12%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,79,163,0.14),transparent_62%)] blur-[110px]" />
        <span className="absolute bottom-[-10rem] right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(120,240,255,0.14),transparent_64%)] blur-[120px]" />
      </div>

      <ReactivePrismBackground />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1200px] items-center justify-center px-4 pb-8 pt-28 md:px-8 md:pt-32">
        <div className="w-full max-w-4xl">
          {/* Add future headline, intro copy, CTA buttons, or profile modules here. */}
        </div>
      </section>
    </main>
  )
}
