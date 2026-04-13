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
      tech: ["React", "Expo", "TypeScript", "Python", "Flask", "Firebase"],
      link: "https://www.tiktok.com/@chorusdating/video/7548118287540866312"
    },
    {
      title: "Easmail",
      description: "An email automation app that takes the user's voice prompt to generate professional emails",
      tech: ["Next.js", "SQLite", "Python", "FastAPI", "TypeScript"],
      link: "https://github.com/huaanth/easmail"
    },
    {
      title: "Genre Classifier",
      description: "An ML project that compares different ML algorithms and a neural network to see how well they do in classifying music genres",
      tech: ["Python", "Neural Network", "KNN", "SVC"],
      link: "https://github.com/huaanth/GenreClassification"
    }
  ];

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

      <div className="max-w-5xl">
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl mb-10 lg:mb-16"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Projects
        </h1>

        <div className="space-y-8 sm:space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-black/10 pb-8 sm:pb-12"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4 gap-4">
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {project.title}
                </h2>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/70 hover:text-black transition-colors shrink-0 mt-1"
                >
                  <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>

              <p className="text-base sm:text-lg lg:text-xl text-black/70 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 sm:px-4 py-1 bg-black/5 text-black/70 rounded-full text-xs sm:text-sm"
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