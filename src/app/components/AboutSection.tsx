import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";
import imgAboutMe from "../../imports/Group7/img-about-me.png";

interface AboutSectionProps {
  onBack: () => void;
}

const experience = [
  {
    company: "BMO Capital Markets",
    role: "Software Engineer Intern",
    period: "Sep. 2026 – Dec. 2026",
    location: "Toronto, ON",
    bullets: [
      "Incoming Software Engineer Intern on the Capital Markets team.",
    ],
  },
  {
    company: "MyRide Technologies",
    role: "Software Engineer Co-op",
    period: "Jun. 2026 - Aug. 2026",
    location: "Markham, ON",
    bullets: [
      "Built the full corporate website at myridetech.com using React, Sanity headless CMS, and Cloudflare Pages.",
      "Integrated a Sanity CMS with custom newsArticle and jobPosting schemas, enabling the team to manage content independently.",
      "Led design direction and implemented all pages end-to-end from Figma through to production deployment.",
    ],
  },
  {
    company: "BMO Financial Group",
    role: "Software Engineer Intern",
    period: "Jan. 2025 – Aug. 2025",
    location: "Toronto, ON",
    bullets: [
      "Designed and scaled event-driven backend services using Java, Spring Boot, Apache Kafka, and MongoDB to deliver personalized welcome offers — driving an 80% increase in website traction.",
      "Resolved MongoDB document collisions impacting 150+ users by refactoring controller logic and optimizing index strategies in Java.",
      "Contributed to AWS cloud migration of enterprise workflows, reducing operational complexity and costs by 30%.",
    ],
  },
  {
    company: "Dell Technologies",
    role: "Software Engineer Intern",
    period: "Jan. 2024 – Apr. 2024",
    location: "Toronto, ON",
    bullets: [
      "Built and automated scalable backend workflows for 5G card deployment using gRPC, Go, Robot Framework, Kubernetes, Docker, and Python — accelerating satellite navigation infrastructure delivery by 40%.",
      "Developed gRPC microservices to validate holdover status of 5G cards, streamlining deployment processes by 80%.",
    ],
  },
];

export function AboutSection({ onBack }: AboutSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#f5f4f0] p-6 sm:p-10 lg:p-16 overflow-x-hidden"
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

        {/* Top section: bio + photo, then skills below */}
        <div className="flex flex-col gap-8 mb-16">

        {/* Row 1: bio text (left, wider) + photo (right) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch">

          {/* About text — takes most of the width */}
          <div className="flex flex-col gap-4 lg:flex-1">
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
              Hi, my name is Anthony! I'm an incoming SWE intern on BMO's Capital Markets team and currently working at a startup called MyRide Technologies. I love solving challenging problems, seeing how things work and building fun/useful software!
            </p>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
              In my free time, you'll find me training Muay Thai or working on my project Chorus (checkout the tote bag in the pic :D)!
            </p>
          </div>

          {/* Photo — fixed width on desktop */}
          <div className="w-full lg:w-[260px] xl:w-[300px] shrink-0 overflow-hidden shadow-2xl">
            <img
              src={imgAboutMe}
              alt="Anthony portrait"
              className="w-full h-[260px] sm:h-[340px] lg:h-[380px] object-cover"
            />
          </div>
        </div>

        {/* Row 2: skills sits below, full width, left-aligned */}
        <div>
          <h2 className="text-xl sm:text-2xl mb-4">Skills</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-base sm:text-lg text-black/70">
            <span>React & TypeScript</span>
            <span>Node.js & Express</span>
            <span>Python & Flask</span>
            <span>Java & Spring</span>
            <span>Firebase, SQL & MongoDB</span>
            <span>AWS & Docker</span>
            <span>Go</span>
          </div>
        </div>

        </div>

        {/* Experience accordion */}
        <div>
          <h2
            className="text-3xl sm:text-4xl mb-6"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Experience
          </h2>

          <div className="space-y-3">
            {experience.map((job, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={job.company + job.period}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className="border border-black/10 rounded-2xl overflow-hidden bg-white/40"
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="text-lg sm:text-xl font-medium"
                        style={{ fontFamily: "'Raleway', sans-serif" }}
                      >
                        {job.company}
                      </span>
                      <span className="text-sm text-black/50">
                        {job.role} · {job.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <span className="hidden sm:block text-xs text-black/40 whitespace-nowrap">
                        {job.period}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-black/40" />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-black/10 pt-4">
                          <span className="block sm:hidden text-xs text-black/40 mb-3">
                            {job.period}
                          </span>
                          <ul className="space-y-2">
                            {job.bullets.map((b, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-black/70 leading-relaxed">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black/25 shrink-0" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}