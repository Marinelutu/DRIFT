import Image from 'next/image'
import { NewsletterCard } from '../ui/NewsletterCard'

const ugcImages = [
  { src: '/images/ugc/01.webp', handle: '@lea.moves', product: 'The Easy Layer' },
  { src: '/images/ugc/02.webp', handle: '@thijs.w', product: 'Urban Utility' },
  { src: '/images/ugc/03.webp', handle: '@caro_and_sol', product: 'Sunday Morning' },
  { src: '/images/ugc/04.webp', handle: '@mats.daily', product: 'Terrain' },
  { src: '/images/ugc/05.webp', handle: '@drift.wear', product: 'The Base Edit' },
  { src: '/images/ugc/06.webp', handle: '@nina.thread', product: 'Sunday Morning' },
  { src: '/images/ugc/07.webp', handle: '@oluwaseun_', product: 'Slow Sundays' },
  { src: '/images/ugc/08.webp', handle: '@drift.wear', product: 'After Dark' },
  { src: '/images/ugc/09.webp', handle: '@amara.style', product: 'The Easy Layer' },
]

export function UGCWall() {
  return (
    <section className="bg-[#F5F0EB] py-24">
      <div className="px-8 mb-12">
        <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-[#1A1A18] leading-tight">
          Worn by Real People.
        </h2>
        <p className="font-body text-[1rem] text-[#9A9189] mt-3">
          Tag @drift.wear to be featured.
        </p>
      </div>

      <div className="px-8 flex flex-col lg:flex-row gap-10">
        {/* LEFT — UGC photo grid */}
        <div className="flex-1 lg:flex-[0_0_60%]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {ugcImages.map((img, index) => {
              const isSpan2 = index % 2 === 0
              return (
                <div
                  key={index}
                  className={`relative overflow-hidden cursor-pointer group ${isSpan2 ? 'row-span-2 h-[320px] md:h-[652px]' : 'h-[240px] md:h-[320px]'}`}
                >
                  <Image
                    src={img.src}
                    alt={`UGC by ${img.handle}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-[rgba(26,26,24,0.55)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="font-body text-[12px] text-white">
                      {img.handle}
                    </div>
                    <div className="font-display italic text-[14px] text-white mt-1">
                      {img.product}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT — sticky card */}
        <div className="lg:w-[38%]">
          <NewsletterCard />
        </div>
      </div>
    </section>
  )
}
