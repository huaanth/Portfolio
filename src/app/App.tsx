import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { VinylRecord } from "./components/VinylRecord";
import { ContactBar } from "./components/ContactBar";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ResumeSection } from "./components/ResumeSection";
import imgAnthony from "../imports/Group7/f93e7825f2780720cdd98d5b30cb674cf353e960.png";
import imgAboutCover from "../imports/Group7/4a7896e17bf3c58d9e56b2190996bbc2c026b44e.png";
import imgProjectsCover from "../imports/Group7/7914ecdeb204281078ab4574e32f698144167a51.png";
import imgResumeCover from "../imports/Group7/621af008d7f06d30a880dac852fe346d00fd6e47.png";

type Section = "home" | "about" | "projects" | "resume";

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>("home");

  const renderSection = () => {
    switch (currentSection) {
      case "about":
        return <AboutSection onBack={() => setCurrentSection("home")} />;
      case "projects":
        return <ProjectsSection onBack={() => setCurrentSection("home")} />;
      case "resume":
        return <ResumeSection onBack={() => setCurrentSection("home")} />;
      default:
        return (
          <div
            className="relative w-full min-h-screen bg-[#f5f4f0] overflow-hidden"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          >
            {/* Header - Anthony's Identity */}
            <div className="absolute top-16 left-16 z-10">
              <h1 className="text-8xl mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Hi, I'm<br />Anthony
              </h1>
              <div className="w-[280px] h-[400px] overflow-hidden shadow-2xl">
                <img
                  src={imgAnthony}
                  alt="Anthony"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Vinyl Records Navigation */}
            <VinylRecord
              title="About Me"
              albumCover={imgAboutCover}
              rotation={-10}
              position={{ top: "18%", left: "45%" }}
              onClick={() => setCurrentSection("about")}
            />

            <VinylRecord
              title="Projects"
              albumCover={imgProjectsCover}
              rotation={5}
              position={{ top: "52%", left: "62%" }}
              onClick={() => setCurrentSection("projects")}
            />

            <VinylRecord
              title="Resume"
              albumCover={imgResumeCover}
              rotation={-5}
              position={{ top: "60%", left: "32%" }}
              onClick={() => setCurrentSection("resume")}
            />

            {/* Contact Bar */}
            <ContactBar />
          </div>
        );
    }
  };

  return (
    <div className="size-full">
      <AnimatePresence mode="wait">
        {renderSection()}
      </AnimatePresence>
    </div>
  );
}