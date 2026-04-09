import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface ProjectsSectionProps {
  onBack: () => void;
}

export function ProjectsSection({ onBack }: ProjectsSectionProps) {
  const projects = [
    {
      title: "Chorus",
      description: "A music based dating app that allows users to express their music taste to potential matches. From showing your favourite artists, genres, making personal playlists, sending songs or nearby concerts to the people you matched with, Chorus tries to make the dating landscape upbeat (haha)!",
      tech: ["React", "Expo", "Typescript", "Python", "Flask", "Firebase"],
      link: "https://www.tiktok.com/@chorusdating/video/7548118287540866312"
    },
    {
      title: "VinylVault",
      description: "Digital cataloging system for vinyl collectors with barcode scanning and Discogs integration.",
      tech: ["React Native", "Firebase", "Python"],
      link: "#"
    },
    {
      title: "BeatBox",
      description: "Browser-based drum machine with sample library and pattern sequencer.",
      tech: ["TypeScript", "Web Audio API", "Canvas"],
      link: "#"
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
        <h1 className="text-7xl mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>Projects</h1>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-black/10 pb-12"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>{project.title}</h2>
                <a
                  href={project.link}
                  className="text-black/70 hover:text-black transition-colors"
                >
                  <ExternalLink className="w-6 h-6" />
                </a>
              </div>
              <p className="text-xl text-black/70 mb-4">{project.description}</p>
              <div className="flex gap-3">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-1 bg-black/5 text-black/70 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
