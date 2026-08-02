import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ExternalLink, ChevronDown } from "lucide-react";
import { useState } from "react";

import imgChorus1 from "../../imports/Group7/chorus-1.png";
import imgChorus2 from "../../imports/Group7/chorus-2.png";
import imgChorus3 from "../../imports/Group7/chorus-3.png";
import imgChorus4 from "../../imports/Group7/chorus-4.png";
import imgChorus5 from "../../imports/Group7/chorus-5.png";
import imgChorus6 from "../../imports/Group7/chorus-6.png";
import imgObsAgent from "../../imports/Group7/obs-agent-diagram.png";
import { RingBufferVisual } from "./RingBufferVisual";

interface ProjectsSectionProps {
  onBack: () => void;
}

interface Feature {
  title: string;
  description: string;
}

interface Project {
  title: string;
  tagline: string;
  description: string;
  features: Feature[];
  tech: string[];
  images: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: "Chorus",
    tagline: "A music-first social & dating app",
    description:
      "Chorus lets users express their music taste to potential matches. Share your favourite artists, build personal playlists, send songs, and discover nearby concerts together — making the dating landscape a little more upbeat.",
    features: [
      { title: "Music Matching", description: "Match with people based on shared artists, genres, and listening habits pulled from your music profile." },
      { title: "Collaborative Playlists", description: "Build playlists together with your matches in real time using a dual-write Firebase architecture." },
      { title: "Concert Discovery", description: "Browse nearby concerts via Ticketmaster integration and send event invites directly inside the chat." },
      { title: "Beat Builder", description: "An in-chat drum sequencer so you can share little musical moments with your matches." },
    ],
    tech: ["React Native", "Expo", "TypeScript", "Python", "Flask", "Firebase"],
    images: [imgChorus1, imgChorus2, imgChorus3, imgChorus4, imgChorus5, imgChorus6],
    link: "https://www.tiktok.com/@chorusdating/video/7548118287540866312",
  },
  {
    title: "Mini Observability Agent",
    tagline: "A lightweight Go-based system monitoring agent",
    description:
      "A pluggable observability agent written in Go that collects system metrics, aggregates them via a ring buffer, and exposes them over an HTTP server. Built to explore how production monitoring tools work under the hood.",
    features: [
      { title: "Pluggable Collectors", description: "Modular collector architecture using gopsutil/v3 — swap or add CPU, memory, and disk collectors independently." },
      { title: "Ring Buffer", description: "Shared ring buffer for efficient in-memory metric storage without unbounded memory growth." },
      { title: "HTTP Metrics Server", description: "Lightweight HTTP server on :9090 that exposes aggregated metrics for scraping or live inspection." },
      { title: "Shared Type System", description: "Clean shared types across collectors and aggregator so the pipeline stays strongly typed end to end." },
    ],
    tech: ["Go", "gopsutil/v3", "HTTP"],
    images: [imgObsAgent],
    link: "https://github.com/huaanth/Mini-Observability-Agent-",
  },
  {
    title: "Genre Classifier",
    tagline: "Comparing ML algorithms for music genre classification",
    description:
      "An ML project that benchmarks different classification algorithms — KNN, SVC, and a custom neural network — against each other to see how well each one identifies music genres from audio features.",
    features: [
      { title: "Algorithm Comparison", description: "Side-by-side benchmarking of KNN, SVC, and a neural network on the same dataset and feature set." },
      { title: "Neural Network", description: "Custom-built neural network trained from scratch to classify genres without relying on pretrained models." },
      { title: "Feature Analysis", description: "Extracts and analyses audio features like MFCCs, tempo, and spectral data to feed into each classifier." },
    ],
    tech: ["Python", "Neural Network", "KNN", "SVC"],
    images: [],
    link: "https://github.com/huaanth/GenreClassification",
  },
];

export function ProjectsSection({ onBack }: ProjectsSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const renderImages = (project: Project) => {
    if (project.images.length === 0) return null;

    if (project.images.length >= 4) {
      return (
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
          {project.images.map((src, i) => (
            <div
              key={i}
              className="shrink-0 w-[240px] sm:w-[280px] overflow-hidden rounded-xl border border-black/10 cursor-zoom-in"
              onClick={() => setLightboxSrc(src)}
            >
              <img
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
                className="w-full h-[200px] sm:h-[240px] object-cover"
              />
            </div>
          ))}
        </div>
      );
    }

    const gridClass =
      project.images.length === 1
        ? "grid-cols-1"
        : project.images.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-3";

    return (
      <div className={`grid gap-4 ${gridClass}`}>
        {project.images.map((src, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-black/10 cursor-zoom-in"
            onClick={() => setLightboxSrc(src)}
          >
            <img
              src={src}
              alt={`${project.title} screenshot ${i + 1}`}
              className="w-full h-[200px] sm:h-[240px] object-cover"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#f5f4f0] p-6 sm:p-10 lg:p-16 overflow-x-hidden"
    >
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8"
            onClick={() => setLightboxSrc(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightboxSrc}
              alt="Full size view"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none"
              onClick={() => setLightboxSrc(null)}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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

        <div className="space-y-4 sm:space-y-6">
          {projects.map((project, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-black/10 rounded-2xl overflow-hidden bg-white/40"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left"
                >
                  <div className="flex flex-col gap-1">
                    <h2
                      className="text-2xl sm:text-3xl lg:text-4xl"
                      style={{ fontFamily: "'Raleway', sans-serif" }}
                    >
                      {project.title}
                    </h2>
                    <p className="text-sm sm:text-base text-black/50">{project.tagline}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <div className="hidden sm:flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="px-3 py-1 bg-black/5 text-black/60 rounded-full text-xs">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-3 py-1 bg-black/5 text-black/40 rounded-full text-xs">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-black/50" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-8 sm:pb-10 border-t border-black/10 pt-6 space-y-8">
                        {renderImages(project)}
                        {project.title === "Mini Observability Agent" && (
                          <RingBufferVisual />

                        )}

                        <p className="text-base sm:text-lg text-black/70 leading-relaxed">
                          {project.description}
                        </p>

                        <div>
                          <h3
                            className="text-lg sm:text-xl mb-4 text-black/80"
                            style={{ fontFamily: "'Raleway', sans-serif" }}
                          >
                            Features
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {project.features.map((f) => (
                              <div
                                key={f.title}
                                className="p-4 rounded-xl bg-black/[0.03] border border-black/5"
                              >
                                <p className="font-medium text-sm sm:text-base mb-1">{f.title}</p>
                                <p className="text-xs sm:text-sm text-black/60 leading-relaxed">
                                  {f.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className="px-3 py-1 bg-black/5 text-black/60 rounded-full text-xs sm:text-sm"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/15 text-sm text-black/60 hover:text-black hover:border-black/30 transition-colors"
                        >
                          <span>View project</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                         
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}