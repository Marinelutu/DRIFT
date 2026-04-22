import HeroPortal from "@/components/sections/HeroPortal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <HeroPortal />
      </div>
      <Footer />
    </div>
  );
}
