import { motion } from "motion/react";
import { useState } from "react";

interface VinylRecordProps {
  title: string;
  albumCover: string;
  rotation: number;
  position: { top?: string; left?: string };
  onClick: () => void;
}

export function VinylRecord({ title, albumCover, rotation, position, onClick }: VinylRecordProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isPositioned = position.top !== undefined && position.left !== undefined;

  return (
    <motion.div
      className={`cursor-pointer ${isPositioned ? "absolute" : "relative"}`}
      style={{
        top: position.top,
        left: position.left,
        rotate: `${rotation}deg`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/*
        Container scales in two steps:
          mobile  : w-[220px] h-[195px]  (≈ 65% of desktop)
          sm      : w-[280px] h-[248px]  (≈ 82%)
          lg      : w-[340px] h-[300px]  (original)
      */}
      <div className="relative w-[220px] h-[195px] sm:w-[280px] sm:h-[248px] lg:w-[340px] lg:h-[300px]">

        {/* Title above vinyl */}
        <div className="absolute -top-8 sm:-top-10 lg:-top-12 left-0 w-full text-center">
          <p
            className="text-base sm:text-lg lg:text-xl text-black/80"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            {title}
          </p>
        </div>

        {/* Vinyl disc — scales with container */}
        <motion.div
          className="absolute top-1/2 left-0 -translate-y-1/2
                     w-[195px] h-[195px]
                     sm:w-[248px] sm:h-[248px]
                     lg:w-[300px] lg:h-[300px]
                     rounded-full bg-black shadow-2xl z-0"
          animate={{ x: isHovered ? -40 : 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Grooves */}
          <div className="absolute inset-0 rounded-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-gray-800"
                style={{
                  top:    `${5 + i * 4}%`,
                  left:   `${5 + i * 4}%`,
                  right:  `${5 + i * 4}%`,
                  bottom: `${5 + i * 4}%`,
                }}
              />
            ))}
          </div>

          {/* Center label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24
                          rounded-full bg-gray-900 border-2 border-gray-700
                          flex items-center justify-center">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-gray-800" />
          </div>
        </motion.div>

        {/* Album cover — offset matches ~26% of container width at each breakpoint */}
        <div
          className="absolute top-1/2 -translate-y-1/2
                     left-[52px] w-[195px] h-[195px]
                     sm:left-[66px] sm:w-[248px] sm:h-[248px]
                     lg:left-[80px] lg:w-[300px] lg:h-[300px]
                     shadow-2xl overflow-hidden border-4 border-white z-10"
        >
          <img src={albumCover} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>
    </motion.div>
  );
}