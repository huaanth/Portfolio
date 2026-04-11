// components/DrumKit.tsx
import { useState, useCallback, useEffect, useRef } from "react";

type DrumPad = {
  id: string;
  label: string;
  key: string;
  color: string;
  activeColor: string;
  shape: "circle" | "ellipse";
  sound: "kick" | "snare" | "hihat" | "tom" | "crash";
};

const PADS: DrumPad[] = [
  { id: "crash",  label: "Crash", key: "q", color: "#c8b89a", activeColor: "#e8d8ba", shape: "circle",  sound: "crash"  },
  { id: "hihat",  label: "Hi-Hat", key: "w", color: "#c8b89a", activeColor: "#e8d8ba", shape: "circle",  sound: "hihat"  },
  { id: "tom1",   label: "Tom 1", key: "e", color: "#8b5e52", activeColor: "#b07a6a", shape: "circle",  sound: "tom"    },
  { id: "tom2",   label: "Tom 2", key: "r", color: "#8b5e52", activeColor: "#b07a6a", shape: "circle",  sound: "tom"    },
  { id: "snare",  label: "Snare", key: "s", color: "#6b7f6b", activeColor: "#8fa08f", shape: "circle",  sound: "snare"  },
  { id: "kick",   label: "Kick",  key: "k", color: "#4a3f6b", activeColor: "#6a5f8b", shape: "ellipse", sound: "kick"   },
];

function createAudioContext(): AudioContext {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
}

function playKick(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  gain.gain.setValueAtTime(1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  osc.start(); osc.stop(ctx.currentTime + 0.4);
}

function playSnare(ctx: AudioContext) {
  const bufferSize = ctx.sampleRate * 0.2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  source.buffer = buffer;
  filter.type = "highpass"; filter.frequency.value = 1000;
  source.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.8, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  source.start(); source.stop(ctx.currentTime + 0.2);
}

function playHihat(ctx: AudioContext) {
  const bufferSize = ctx.sampleRate * 0.08;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  source.buffer = buffer;
  filter.type = "highpass"; filter.frequency.value = 7000;
  source.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  source.start(); source.stop(ctx.currentTime + 0.08);
}

function playTom(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.setValueAtTime(90, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.8, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  osc.start(); osc.stop(ctx.currentTime + 0.3);
}

function playCrash(ctx: AudioContext) {
  const bufferSize = ctx.sampleRate * 0.6;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  source.buffer = buffer;
  filter.type = "bandpass"; filter.frequency.value = 5000; filter.Q.value = 0.5;
  source.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
  source.start(); source.stop(ctx.currentTime + 0.6);
}

function triggerSound(ctx: AudioContext, sound: DrumPad["sound"]) {
  switch (sound) {
    case "kick":   playKick(ctx);   break;
    case "snare":  playSnare(ctx);  break;
    case "hihat":  playHihat(ctx);  break;
    case "tom":    playTom(ctx);    break;
    case "crash":  playCrash(ctx);  break;
  }
}

interface DrumKitProps {
  /** "corner" = top-right desktop overlay, "inline" = stacked below vinyls on mobile */
  layout?: "corner" | "inline";
}

export function DrumKit({ layout = "corner" }: DrumKitProps) {
  const [active, setActive] = useState<Set<string>>(new Set());
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = createAudioContext();
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const hit = useCallback((pad: DrumPad) => {
    triggerSound(getCtx(), pad.sound);
    setActive((prev) => new Set(prev).add(pad.id));
    setTimeout(() => setActive((prev) => { const n = new Set(prev); n.delete(pad.id); return n; }), 120);
  }, [getCtx]);

  useEffect(() => {
    const keyMap: Record<string, DrumPad> = {};
    PADS.forEach((p) => { keyMap[p.key] = p; });
    const handler = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const pad = keyMap[e.key.toLowerCase()];
      if (pad) hit(pad);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [hit]);

  const isCorner = layout === "corner";

  return (
    <div
      className={
        isCorner
          ? "absolute top-8 right-8 z-20 select-none"
          : "flex flex-col items-center mt-8 mb-24 select-none"
      }
    >
      {/* Kit label */}
      <p
        className="text-xs text-black/40 text-center mb-3 tracking-widest uppercase"
        style={{ fontFamily: "'Raleway', sans-serif", fontSize: "10px" }}
      >
        Tap or press keys
      </p>

      {/* Drum kit SVG layout */}
      <div
        className={isCorner ? "w-[220px]" : "w-[280px] sm:w-[320px]"}
        style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}
      >
        {/* Row 1: Crash / Hi-Hat / Tom1 / Tom2 */}
        <div className="flex items-end justify-center gap-2 mb-2">
          {PADS.slice(0, 4).map((pad) => (
            <DrumPiece
              key={pad.id}
              pad={pad}
              active={active.has(pad.id)}
              onHit={() => hit(pad)}
              size={isCorner ? 44 : 54}
            />
          ))}
        </div>

        {/* Row 2: Snare + Kick (wider) */}
        <div className="flex items-center justify-center gap-3">
          <DrumPiece
            pad={PADS[4]}
            active={active.has("snare")}
            onHit={() => hit(PADS[4])}
            size={isCorner ? 52 : 64}
          />
          <DrumPiece
            pad={PADS[5]}
            active={active.has("kick")}
            onHit={() => hit(PADS[5])}
            size={isCorner ? 70 : 86}
            wide
          />
        </div>
      </div>

      {/* Key hints */}
      <div className="flex gap-1 mt-3 flex-wrap justify-center">
        {PADS.map((p) => (
          <span
            key={p.id}
            className="text-[9px] px-1.5 py-0.5 rounded border border-black/10 text-black/30 uppercase"
            style={{ fontFamily: "monospace" }}
          >
            {p.key}
          </span>
        ))}
      </div>
    </div>
  );
}

function DrumPiece({
  pad, active, onHit, size, wide = false,
}: {
  pad: DrumPad; active: boolean; onHit: () => void; size: number; wide?: boolean;
}) {
  return (
    <button
      onPointerDown={(e) => { e.preventDefault(); onHit(); }}
      aria-label={`${pad.label} drum (key: ${pad.key})`}
      title={`${pad.label} [${pad.key.toUpperCase()}]`}
      style={{
        width: wide ? size * 1.5 : size,
        height: size * (pad.shape === "ellipse" ? 0.6 : 1),
        borderRadius: pad.shape === "ellipse" ? "50%" : "50%",
        backgroundColor: active ? pad.activeColor : pad.color,
        border: `2px solid ${active ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.15)"}`,
        transform: active ? "scale(0.93)" : "scale(1)",
        transition: "all 0.08s ease",
        cursor: "pointer",
        outline: "none",
        position: "relative",
        boxShadow: active
          ? `inset 0 2px 6px rgba(0,0,0,0.3)`
          : `0 3px 0 rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.2)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {/* Drum skin texture ring */}
      <span
        style={{
          display: "block",
          width: "60%",
          height: "60%",
          borderRadius: "50%",
          border: `1px solid rgba(255,255,255,0.18)`,
          pointerEvents: "none",
        }}
      />
    </button>
  );
}