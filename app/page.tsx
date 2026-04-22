import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* Placeholder content for Phase 1 */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-8">
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-[family-name:var(--font-display)] italic text-[#1A1A18] leading-tight">
            Wear the Moment.
          </h1>
          <p className="mt-6 text-[14px] font-[family-name:var(--font-body)] text-[#9A9189] uppercase tracking-[0.2em]">
            SS 2025 Collection — Coming Soon
          </p>
        </section>

        {/* Spacer to demonstrate smooth scroll */}
        <div className="h-screen" />
      </div>
      <Footer />
    </div>
  );
}
