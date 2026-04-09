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
      className="min-h-screen bg-[#f5f4f0] p-16"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-12 text-black/70 hover:text-black transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </button>

      <div className="max-w-4xl">
        <h1 className="text-7xl mb-8" style={{ fontFamily: "'Raleway', sans-serif" }}>About Me</h1>

        <div className="grid grid-cols-3 gap-16 items-start">
            {/* LEFT: About text */}
            <div className="flex flex-col justify-between">
              <p className="text-xl leading-relaxed mb-6">
                Hi, my name is Anthony! I've worked on Dell's 5G team and BMO's Needs Navigator as a SWE Intern. I love solving challenging problems and building fun/useful software!
              </p>
              <p className="text-xl leading-relaxed">
                In my free time, you'll find me training Muay Thai or working on my project Chorus (checkout the tote bag in the pic :D)!
              </p>
            </div>

            {/* MIDDLE: Skills */}
            <div>
              <h2 className="text-2xl mb-4">Skills</h2>
              <ul className="space-y-2 text-lg text-black/70">
                <li>React & TypeScript</li>
                <li>Node.js & Express</li>
                <li>Python & Flask</li>
                <li>Java & Spring</li>
                <li>Firebase, SQL & MongoDB</li>
                <li>AWS & Docker</li>
                <li>UI/UX Design</li>
              </ul>
            </div>

            {/* RIGHT: Image */}
            <div className="w-full overflow-hidden shadow-2xl">
              <img
                src={imgAboutMe}
                alt="Anthony portrait"
                className="w-full h-[420px] object-cover"
              />
            </div>
          </div>
      </div>
    </motion.div>
  );
}
