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
            {/* In VinylRecord.tsx, update the container and all sized elements: */ }

      {/* // Container */}
      <div className="relative w-[220px] h-[195px] sm:w-[280px] sm:h-[248px] lg:w-[300px] lg:h-[265px] xl:w-[370px] xl:h-[328px] 2xl:w-[440px] 2xl:h-[390px]">

        {/* Title */}
        <div className="absolute -top-8 sm:-top-10 lg:-top-11 xl:-top-13 2xl:-top-14 left-0 w-full text-center">
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-black/80"
            style={{ fontFamily: "'Raleway', sans-serif" }}>
            {title}
          </p>
        </div>

        {/* Vinyl disc */}
        <motion.div
          className="absolute top-1/2 left-0 -translate-y-1/2
                    w-[195px] h-[195px]
                    sm:w-[248px] sm:h-[248px]
                    lg:w-[265px] lg:h-[265px]
                    xl:w-[328px] xl:h-[328px]
                    2xl:w-[390px] 2xl:h-[390px]
                    rounded-full bg-black shadow-2xl z-0"
          animate={{ x: isHovered ? -40 : 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Grooves — unchanged */}
          <div className="absolute inset-0 rounded-full">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute rounded-full border border-gray-800"
                style={{ top: `${5 + i * 4}%`, left: `${5 + i * 4}%`, right: `${5 + i * 4}%`, bottom: `${5 + i * 4}%` }} />
            ))}
          </div>

          {/* Center label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32
                          rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 xl:w-3.5 xl:h-3.5 2xl:w-4 2xl:h-4 rounded-full bg-gray-800" />
          </div>
        </motion.div>

        {/* Album cover */}
        <div className="absolute top-1/2 -translate-y-1/2
                        left-[52px] w-[195px] h-[195px]
                        sm:left-[66px] sm:w-[248px] sm:h-[248px]
                        lg:left-[70px] lg:w-[265px] lg:h-[265px]
                        xl:left-[88px] xl:w-[328px] xl:h-[328px]
                        2xl:left-[104px] 2xl:w-[390px] 2xl:h-[390px]
                        shadow-2xl overflow-hidden border-4 border-white z-10">
          <img src={albumCover} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>
    </motion.div>
  );
}