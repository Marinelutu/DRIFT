import { collections } from '@/lib/collections'
import ProductCard from '@/components/ui/ProductCard'

export default function ProductGrid() {
  // Define layout classes for the 7 items
  const layouts = [
    "col-span-12 md:col-span-12", // Main
    "col-span-6 md:col-span-6",   // Supporting
    "col-span-6 md:col-span-6",   // Supporting
    "col-span-6 md:col-span-3",   // Detail
    "col-span-6 md:col-span-3",   // Detail
    "col-span-6 md:col-span-3",   // Detail
    "col-span-6 md:col-span-3",   // Detail
  ]

  return (
    <section className="py-32 px-8">
      <div className="mx-auto max-w-[1400px] flex flex-col md:flex-row gap-12 relative">
        
        {/* Sticky Narrative */}
        <div className="w-full md:w-[300px] shrink-0">
          <div className="sticky top-32">
            <h2 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] text-[#1A1A18] leading-[1.1]">
              The Season Edit
            </h2>
            <div className="mt-4 h-[2px] w-[40px] bg-[#C4622D]"></div>
            <p className="mt-6 font-body text-[14px] text-[#9A9189] max-w-[240px]">
              A curated selection of our most essential pieces. Designed for longevity, crafted for comfort.
            </p>
          </div>
        </div>

        {/* 7-Batch Grid */}
        <div className="flex-1 grid grid-cols-12 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
          {collections.map((item, index) => (
            <ProductCard
              key={item.id}
              index={index}
              name={item.name}
              category={item.category}
              price={item.price}
              image={item.image}
              className={layouts[index] || "col-span-12"}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
