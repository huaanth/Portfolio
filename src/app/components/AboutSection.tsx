import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import imgAboutMe from "../../imports/Group7/img-about-me.png";

interface AboutSectionProps {
  onBack: () => void;
}

export function AboutSection({ onBack }: AboutSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#f5f4f0] p-6 sm:p-10 lg:p-16"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-8 sm:mb-12 text-black/70 hover:text-black transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </button>

      <div className="max-w-4xl">
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl mb-8"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          About Me
        </h1>

        {/* Mobile: stacked, Desktop: 3-col grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-16 items-start">

          {/* Image — shown first on mobile, last on desktop via order */}
          <div className="w-full overflow-hidden shadow-2xl order-first lg:order-last">
            <img
              src={imgAboutMe}
              alt="Anthony portrait"
              className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover"
            />
          </div>

          {/* About text */}
          <div className="flex flex-col gap-4 lg:order-first">
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
              Hi, my name is Anthony! I've worked on Dell's 5G team and BMO's Needs Navigator as a SWE Intern. I love solving challenging problems and building fun/useful software!
            </p>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
              In my free time, you'll find me training Muay Thai or working on my project Chorus (checkout the tote bag in the pic :D)!
            </p>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xl sm:text-2xl mb-4">Skills</h2>
            <ul className="space-y-2 text-base sm:text-lg text-black/70">
              <li>React & TypeScript</li>
              <li>Node.js & Express</li>
              <li>Python & Flask</li>
              <li>Java & Spring</li>
              <li>Firebase, SQL & MongoDB</li>
              <li>AWS & Docker</li>
              <li>UI/UX Design</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}