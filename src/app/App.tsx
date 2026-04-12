import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { VinylRecord } from "./components/VinylRecord";
import { ContactBar } from "./components/ContactBar";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { DrumKit } from "./components/DrumKit";
import imgAnthony from "../imports/Group7/f93e7825f2780720cdd98d5b30cb674cf353e960.png";
import imgAboutCover from "../imports/Group7/4a7896e17bf3c58d9e56b2190996bbc2c026b44e.png";
import imgProjectsCover from "../imports/Group7/7914ecdeb204281078ab4574e32f698144167a51.png";
import imgResumeCover from "../imports/Group7/621af008d7f06d30a880dac852fe346d00fd6e47.png";

type Section = "home" | "about" | "projects" | "resume";

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>("home");
  const RESUME_URL =
    "https://drive.google.com/file/d/1q7tVkPGJaF3isIAtyKb_DkKywyWQLJOP/view?usp=sharing";

  const renderSection = () => {
    switch (currentSection) {
      case "about":
        return <AboutSection onBack={() => setCurrentSection("home")} />;
      case "projects":
        return <ProjectsSection onBack={() => setCurrentSection("home")} />;
        default:
          return (
            <div
              className="relative w-full min-h-screen bg-[#f5f4f0] overflow-x-hidden"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            >
              {/* ── MOBILE / TABLET layout (< lg) ── */}
              <div className="lg:hidden flex flex-col items-center pb-28 pt-10 px-6 gap-10">
                <div className="flex flex-col items-center text-center gap-6 w-full">
                  <h1
                    className="text-5xl sm:text-6xl leading-tight"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    Hi, I'm
                    <br />
                    Anthony
                  </h1>
                  <div className="w-[200px] sm:w-[240px] h-[280px] sm:h-[340px] overflow-hidden shadow-2xl">
                    <img src={imgAnthony} alt="Anthony" className="w-full h-full object-cover" />
                  </div>
                </div>
        
                <div className="flex flex-col items-center gap-6 w-full">
                  <VinylRecord title="About Me" albumCover={imgAboutCover} rotation={-10} position={{}} onClick={() => setCurrentSection("about")} />
                  <VinylRecord title="Projects" albumCover={imgProjectsCover} rotation={5} position={{}} onClick={() => setCurrentSection("projects")} />
                  <VinylRecord title="Resume" albumCover={imgResumeCover} rotation={-5} position={{}} onClick={() => window.open(RESUME_URL, "_blank", "noopener,noreferrer")} />
                </div>
        
                <DrumKit layout="inline" />
              </div>
        
              {/* ── DESKTOP layout (≥ lg) ── */}
              <div className="hidden lg:block w-full min-h-screen">
                <div className="relative mx-auto min-h-screen" style={{ maxWidth: "1280px" }}>
                  <div className="absolute top-16 left-16 z-10">
                    <h1
                      className="text-8xl mb-8 leading-tight"
                      style={{ fontFamily: "'Raleway', sans-serif" }}
                    >
                      Hi, I'm
                      <br />
                      Anthony
                    </h1>
                    <div className="w-[280px] h-[400px] overflow-hidden shadow-2xl">
                      <img src={imgAnthony} alt="Anthony" className="w-full h-full object-cover" />
                    </div>
                  </div>
        
                  <VinylRecord title="About Me" albumCover={imgAboutCover} rotation={-10} position={{ top: "15%", left: "45%" }} onClick={() => setCurrentSection("about")} />
                  <VinylRecord title="Projects" albumCover={imgProjectsCover} rotation={5} position={{ top: "52%", left: "65%" }} onClick={() => setCurrentSection("projects")} />
                  <VinylRecord title="Resume" albumCover={imgResumeCover} rotation={-5} position={{ top: "60%", left: "32%" }} onClick={() => window.open(RESUME_URL, "_blank", "noopener,noreferrer")} />
        
                  <DrumKit layout="corner" />
                </div>
              </div>
        
              <ContactBar />
            </div>
          );
            }
  };

  return (
    <div className="size-full">
      <AnimatePresence mode="wait">{renderSection()}</AnimatePresence>
    </div>
  );
}