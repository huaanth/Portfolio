import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

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
        <h1 className="text-7xl mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>About Me</h1>

        <div className="grid grid-cols-2 gap-16">
          <div>
            <p className="text-xl leading-relaxed mb-6">
              Hi, my name is Anthony! I've worked on Dell's 5G team and BMO's Needs Navigator as a SWE Intern. I love solving challenging problems and building fun/useful software!
            </p>
            <p className="text-xl leading-relaxed mb-6">
              When I'm not coding, you'll find me training Muay Thai or coming up with skits for my project Chorus (check prjects section :D)
            </p>
          </div>

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
        </div>
      </div>
    </motion.div>
  );
}
