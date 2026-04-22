import HeroPortal from "@/components/sections/HeroPortal";
import Marquee from "@/components/ui/Marquee";
import KineticText from "@/components/sections/KineticText";
import CollectionRail from "@/components/sections/CollectionRail";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroPortal />
        <Marquee variant="dark" />
        <KineticText 
          headline="Made for the ones who move." 
          subtext="Casual pieces that work as hard as you do — or as little." 
          bg="light" 
          align="center" 
        />
        <KineticText 
          headline="Where everyday meets intentional." 
          subtext="Every fabric chosen. Every cut considered. Nothing wasted." 
          bg="dark" 
          align="left" 
        />
        <CollectionRail />
        <KineticText 
          headline="The season, before it arrives." 
          subtext="Drop access for people who know." 
          bg="light" 
          align="center" 
        />
      </main>
      <Footer />
    </div>
  );
}
