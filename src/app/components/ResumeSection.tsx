import { motion } from "motion/react";
import { ArrowLeft, Download } from "lucide-react";

interface ResumeSectionProps {
  onBack: () => void;
}

export function ResumeSection({ onBack }: ResumeSectionProps) {
  const experience = [
    {
      title: "Senior Full Stack Developer",
      company: "Harmony Tech",
      period: "2023 - Present",
      description: "Led development of music streaming platform serving 100K+ users. Architected microservices infrastructure and mentored junior developers."
    },
    {
      title: "Full Stack Developer",
      company: "Creative Code Co",
      period: "2021 - 2023",
      description: "Built responsive web applications for creative agencies. Specialized in React, Node.js, and cloud deployment."
    },
    {
      title: "Frontend Developer",
      company: "Digital Studios",
      period: "2019 - 2021",
      description: "Developed pixel-perfect interfaces from design mockups. Collaborated closely with designers and product teams."
    }
  ];

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

      <div className="max-w-5xl">
        <div className="flex items-start justify-between mb-16">
          <h1 className="text-7xl" style={{ fontFamily: "'Playfair Display', serif" }}>Resume</h1>
          <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-black/80 transition-colors">
            <Download className="w-5 h-5" />
            <span>Download PDF</span>
          </button>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl mb-8">Experience</h2>
          <div className="space-y-10">
            {experience.map((job, index) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl">{job.title}</h3>
                  <span className="text-black/50">{job.period}</span>
                </div>
                <p className="text-xl text-black/70 mb-2">{job.company}</p>
                <p className="text-black/60">{job.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl mb-8">Education</h2>
          <div>
            <h3 className="text-2xl mb-2">Bachelor of Computer Science</h3>
            <p className="text-xl text-black/70 mb-2">University Name</p>
            <span className="text-black/50">2015 - 2019</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
