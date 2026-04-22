import HeroPortal from "@/components/sections/HeroPortal";
import Marquee from "@/components/ui/Marquee";
import KineticText from "@/components/sections/KineticText";
import CollectionStream from "@/components/sections/CollectionStream";
import ParallaxStory from "@/components/sections/ParallaxStory";
import ProductGrid from "@/components/sections/ProductGrid";
import Footer from "@/components/Footer";
import { SizeGrid } from "@/components/ui/SizeGrid";
import { UGCWall } from "@/components/sections/UGCWall";
import BackgroundWrapper from "@/components/ui/BackgroundWrapper";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundWrapper>
        <main className="flex-1">
          <HeroPortal />
          <Marquee variant="dark" />
          <div className="transition-start" data-bgcolor="#F5F0EB">
            <KineticText 
              headline="Made for the ones who move." 
              subtext="Casual pieces that work as hard as you do — or as little." 
              bg="light" 
              align="center" 
            />
          </div>
          <div data-bgcolor="#1A1A18">
            <KineticText 
              headline="Where everyday meets intentional." 
              subtext="Every fabric chosen. Every cut considered. Nothing wasted." 
              bg="dark" 
              align="left" 
            />
          </div>
          <div data-bgcolor="#ECE6E0">
            <CollectionStream />
          </div>
          <div data-bgcolor="#F5F0EB">
            <KineticText 
              headline="The season, before it arrives." 
              subtext="Drop access for people who know." 
              bg="light" 
              align="center" 
            />
          </div>
          <div data-bgcolor="#1A1A18">
            <ParallaxStory />
          </div>
          <div data-bgcolor="#F5F0EB">
            <Marquee variant="light" />
            <ProductGrid />
            <SizeGrid />
            <UGCWall />
          </div>
        </main>
      </BackgroundWrapper>
      <Footer />
    </div>
  );
}
