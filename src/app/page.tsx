import { GlobalAtmosphere } from "@/components/ui/GlobalAtmosphere";
import VideoBackground from "@/components/ui/VideoBackground";
import FirstActVideoStage from "@/components/ui/FirstActVideoStage";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Capabilities from "@/components/sections/Capabilities";
import OperatingIndex from "@/components/sections/OperatingIndex";
import VisualWorks from "@/components/sections/VisualWorks";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      {/* Fixed full-page video background — single video for entire page */}
      <VideoBackground />

      {/* Fixed ambient atmosphere glows */}
      <GlobalAtmosphere />

      {/* Page content — above background layers */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        {/* First act: Hero + Systems + Index share sticky overlay */}
        <FirstActVideoStage>
          <Hero />
          <Capabilities />
          <OperatingIndex />
        </FirstActVideoStage>

        {/* Visual Archive — semi-transparent, video shows through */}
        <VisualWorks />

        {/* Cinematic ending — semi-transparent, fades to dark */}
        <Contact />
      </div>
    </main>
  );
}
