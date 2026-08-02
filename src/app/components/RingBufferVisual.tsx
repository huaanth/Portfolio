import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const CAPACITY = 8;

interface Metric {
  id: number;
  value: string;
}

export function RingBufferVisual() {
  const [slots, setSlots] = useState<(Metric | null)[]>(Array(CAPACITY).fill(null));
  const [head, setHead] = useState(0);
  const [count, setCount] = useState(0);
  const [dropped, setDropped] = useState(0);
  const [ticker, setTicker] = useState(0);

  const metricNames = ["cpu", "mem", "disk", "net", "lat", "req", "err", "p99"];

  const pushMetric = () => {
    const value = `${metricNames[ticker % metricNames.length]}=${Math.floor(Math.random() * 100)}`;
    const newSlots = [...slots];

    if (count < CAPACITY) {
      const writePos = (head + count) % CAPACITY;
      newSlots[writePos] = { id: ticker, value };
      setCount((c) => c + 1);
    } else {
      // Buffer full — overwrite at head, advance head
      newSlots[head] = { id: ticker, value };
      setHead((h) => (h + 1) % CAPACITY);
      setDropped((d) => d + 1);
    }

    setSlots(newSlots);
    setTicker((t) => t + 1);
  };

  const drain = () => {
    if (count === 0) return;
    setSlots(Array(CAPACITY).fill(null));
    setHead(0);
    setCount(0);
  };

  const reset = () => {
    setSlots(Array(CAPACITY).fill(null));
    setHead(0);
    setCount(0);
    setDropped(0);
    setTicker(0);
  };

  // Arrange slots in a circle
  const radius = 110;
  const cx = 160;
  const cy = 160;

  return (
    <div className="rounded-xl border border-black/10 bg-black/[0.02] p-5 sm:p-6">
      <p
        className="text-sm font-medium text-black/60 mb-4"
        style={{ fontFamily: "'Raleway', sans-serif" }}
      >
        Ring Buffer — Interactive Demo
      </p>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={pushMetric}
          className="px-4 py-1.5 rounded-full border border-black/15 text-sm text-black/70 hover:bg-black/5 transition-colors"
        >
          Push metric ↗
        </button>
        <button
            onClick={drain}
            disabled={count === 0}
            className="px-4 py-1.5 rounded-full border border-black/15 text-sm text-black/70 hover:bg-black/5 transition-colors disabled:opacity-30"
            >
            Drain all (flush)
        </button>
        <button
          onClick={reset}
          className="px-4 py-1.5 rounded-full border border-black/15 text-sm text-black/70 hover:bg-black/5 transition-colors"
        >
          Reset
        </button>
        <span className="text-xs text-black/40 ml-1">
          Capacity: <strong className="text-black/70">{CAPACITY}</strong>
          {" | "}Count: <strong className="text-black/70">{count}</strong>
          {" | "}Dropped: <strong className={dropped > 0 ? "text-red-400" : "text-black/70"}>{dropped}</strong>
        </span>
      </div>

      {/* Ring visual */}
      <div className="flex justify-center">
        <svg width="320" height="320" viewBox="0 0 320 320" className="overflow-visible">
          {slots.map((metric, i) => {
            const angle = (2 * Math.PI * i) / CAPACITY - Math.PI / 2;
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            const isHead = i === head;
            const isFilled = metric !== null;
            const isFull = count === CAPACITY;

            return (
              <g key={i}>
                {/* Connector line to center */}
                <line
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke="rgba(0,0,0,0.06)"
                  strokeWidth="1"
                />

                {/* Slot box */}
                <foreignObject
                  x={x - 36}
                  y={y - 22}
                  width="72"
                  height="44"
                >
                  <div
                    className={`w-full h-full rounded-lg border flex flex-col items-center justify-center transition-all duration-300 ${
                      isHead
                        ? isFull
                          ? "border-red-300 bg-red-50"
                          : "border-black/40 bg-white"
                        : isFilled
                        ? "border-black/20 bg-white"
                        : "border-black/10 bg-transparent"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {metric ? (
                        <motion.span
                          key={metric.id}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{ duration: 0.15 }}
                          className="text-[10px] font-mono text-black/70 text-center leading-tight px-1"
                        >
                          {metric.value}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="empty"
                          className="text-black/20 text-xs"
                        >
                          —
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </foreignObject>

                {/* HEAD label */}
                {isHead && (
                  <text
                    x={x}
                    y={y - 30}
                    textAnchor="middle"
                    className="text-[10px]"
                    fill={isFull ? "rgb(248,113,113)" : "rgba(0,0,0,0.5)"}
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    HEAD
                  </text>
                )}
              </g>
            );
          })}

          {/* Center label */}
          <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            fill="rgba(0,0,0,0.25)"
            fontSize="10"
            fontFamily="monospace"
          >
            ring
          </text>
          <text
            x={cx}
            y={cy + 8}
            textAnchor="middle"
            fill="rgba(0,0,0,0.25)"
            fontSize="10"
            fontFamily="monospace"
          >
            buffer
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-2 text-[11px] text-black/40">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border border-black/40 bg-white inline-block" />
          HEAD (next read/overwrite)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border border-red-300 bg-red-50 inline-block" />
          HEAD when full (drops oldest)
        </span>
      </div>
      <p className="text-[11px] text-black/35 mt-3 leading-relaxed">
  Collectors push every 5s — aggregator drains all at once every 15s to compute avg/p99/rate across the full window.
</p>
    </div>
  );
}