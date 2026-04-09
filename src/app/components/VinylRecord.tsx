import { motion } from "motion/react";
import { useState } from "react";

interface VinylRecordProps {
  title: string;
  albumCover: string;
  rotation: number;
  position: { top: string; left: string };
  onClick: () => void;
}

export function VinylRecord({ title, albumCover, rotation, position, onClick }: VinylRecordProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute cursor-pointer"
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
      <div className="relative w-[340px] h-[300px]">
        {/* Title above vinyl */}
        <div className="absolute -top-12 left-0 w-full text-center">
          <p className="text-xl text-black/80" style={{ fontFamily: "'Raleway', sans-serif" }}>{title}</p>
        </div>

        {/* Vinyl Record - positioned to peek out from the left */}
        <motion.div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-black shadow-2xl z-0"
          animate={{
            x: isHovered ? -50 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Grooves */}
          <div className="absolute inset-0 rounded-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-gray-800"
                style={{
                  top: `${5 + i * 4}%`,
                  left: `${5 + i * 4}%`,
                  right: `${5 + i * 4}%`,
                  bottom: `${5 + i * 4}%`,
                }}
              />
            ))}
          </div>

          {/* Center Label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gray-800" />
          </div>
        </motion.div>

        {/* Album Cover - larger and covering the vinyl */}
        <div className="absolute top-1/2 left-[80px] -translate-y-1/2 w-[300px] h-[300px] shadow-2xl overflow-hidden border-4 border-white z-10">
          <img
            src={albumCover}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}
