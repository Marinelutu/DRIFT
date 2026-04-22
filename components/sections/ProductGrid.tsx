import { collections } from '@/lib/collections'
import ProductCard from '@/components/ui/ProductCard'

export default function ProductGrid() {
  return (
    <section className="bg-[#F5F0EB] py-24 px-8">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="mb-12 font-display text-[clamp(2.5rem,5vw,4rem)] text-[#1A1A18]">
          The Edit
          <div className="mt-3 h-[2px] w-[40px] bg-[#C4622D]"></div>
        </h2>
        
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3">
          {collections.map((item, index) => (
            <ProductCard
              key={item.id}
              index={index}
              name={item.name}
              category={item.category}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
