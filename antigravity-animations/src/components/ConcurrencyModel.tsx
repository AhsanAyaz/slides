import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
  interpolate,
} from "remotion";

export const ConcurrencyModel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelEntrance = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const leftDevScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  const rightOrchScale = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  // Subagents spawn on BOTH sides
  const leftSub1 = spring({ frame: frame - 50, fps, config: { damping: 10, stiffness: 100 } });
  const leftSub2 = spring({ frame: frame - 55, fps, config: { damping: 10, stiffness: 100 } });
  const leftSub3 = spring({ frame: frame - 60, fps, config: { damping: 10, stiffness: 100 } });

  const rightSub1 = spring({ frame: frame - 55, fps, config: { damping: 10, stiffness: 100 } });
  const rightSub2 = spring({ frame: frame - 60, fps, config: { damping: 10, stiffness: 100 } });
  const rightSub3 = spring({ frame: frame - 65, fps, config: { damping: 10, stiffness: 100 } });

  // Lock overlay on left appears after subagents spawn — terminal blocks
  const lockOverlayOpacity = interpolate(
    frame,
    [65, 80],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Lock badge pulse
  const lockPulse = interpolate(Math.sin(frame * 0.2), [-1, 1], [0.6, 1]);

  // Right side: typing cursor blink on orchestrator (main thread live)
  const cursorBlink = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;

  // Pulsing connections
  const pulseOpacity = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.2, 0.7]);

  // Right side: floating prompt bubble showing user keeps typing
  const promptBubbleEntrance = spring({
    frame: frame - 90,
    fps,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill className="bg-slate-950 text-white font-sans flex flex-col justify-between p-12">
      {/* Title */}
      <div
        className="text-center"
        style={{
          opacity: panelEntrance,
          transform: `translateY(${interpolate(panelEntrance, [0, 1], [-20, 0])}px)`,
        }}
      >
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Same Subagents. Different Thread.
        </h1>
        <p className="text-slate-400 mt-2 text-lg">Synchronous lock vs. async main thread</p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-2 gap-12 flex-1 my-8">

        {/* LEFT: gemini-cli — subagents exist, but terminal locks */}
        <div
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"
          style={{
            opacity: panelEntrance,
            transform: `scale(${interpolate(panelEntrance, [0, 1], [0.95, 1])})`,
          }}
        >
          <div className="flex justify-between items-center mb-6 z-30">
            <span className="text-rose-500 font-bold px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-sm">
              gemini-cli
            </span>
            <span className="text-slate-500 text-xs">Synchronous • Terminal Locks</span>
          </div>

          {/* Canvas */}
          <div className="flex-1 flex justify-center items-center relative">

            {/* YOU node */}
            {leftDevScale > 0 && (
              <div
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex flex-col justify-center items-center shadow-lg shadow-rose-950/50 z-10 relative"
                style={{ transform: `scale(${leftDevScale})` }}
              >
                <span className="font-black text-2xl">YOU</span>
                <span className="text-[10px] opacity-75 uppercase tracking-wider">Waiting</span>
                {/* Lock badge */}
                {lockOverlayOpacity > 0 && (
                  <div
                    className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-slate-950 border-2 border-rose-400 flex items-center justify-center text-lg"
                    style={{ opacity: lockOverlayOpacity, transform: `scale(${lockPulse})` }}
                  >
                    🔒
                  </div>
                )}
              </div>
            )}

            {/* Subagents — same shape as right, but rose */}
            {leftSub1 > 0 && (
              <div
                className="absolute -translate-y-24 -translate-x-28 w-24 h-16 rounded-xl bg-slate-900 border border-rose-500/40 flex flex-col justify-center items-center text-center shadow-md"
                style={{ transform: `scale(${leftSub1})` }}
              >
                <span className="text-xs font-semibold text-rose-400">Write Code</span>
                <span className="text-[9px] text-slate-500">Subagent A</span>
              </div>
            )}
            {leftSub2 > 0 && (
              <div
                className="absolute -translate-y-24 translate-x-28 w-24 h-16 rounded-xl bg-slate-900 border border-rose-500/40 flex flex-col justify-center items-center text-center shadow-md"
                style={{ transform: `scale(${leftSub2})` }}
              >
                <span className="text-xs font-semibold text-rose-400">Run Tests</span>
                <span className="text-[9px] text-slate-500">Subagent B</span>
              </div>
            )}
            {leftSub3 > 0 && (
              <div
                className="absolute translate-y-24 w-28 h-16 rounded-xl bg-slate-900 border border-rose-500/40 flex flex-col justify-center items-center text-center shadow-md"
                style={{ transform: `scale(${leftSub3})` }}
              >
                <span className="text-xs font-semibold text-rose-400">Fetch Docs</span>
                <span className="text-[9px] text-slate-500">Subagent C</span>
              </div>
            )}

            {/* Connection lines */}
            {frame > 65 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <line x1="50%" y1="50%" x2="25%" y2="28%" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5,5" style={{ opacity: pulseOpacity }} />
                <line x1="50%" y1="50%" x2="75%" y2="28%" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5,5" style={{ opacity: pulseOpacity }} />
                <line x1="50%" y1="50%" x2="50%" y2="72%" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5,5" style={{ opacity: pulseOpacity }} />
              </svg>
            )}

            {/* TERMINAL LOCKED banner */}
            {lockOverlayOpacity > 0 && (
              <div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-md bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-mono tracking-wider z-20 whitespace-nowrap"
                style={{ opacity: lockOverlayOpacity }}
              >
                ▮ TERMINAL LOCKED — wait for return
              </div>
            )}
          </div>

          <div className="text-center text-slate-500 text-sm mt-4">
            Subagents work — but your prompt freezes until they return.
          </div>
        </div>

        {/* RIGHT: agy — same subagents, main thread stays live */}
        <div
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"
          style={{
            opacity: panelEntrance,
            transform: `scale(${interpolate(panelEntrance, [0, 1], [0.95, 1])})`,
          }}
        >
          <div className="flex justify-between items-center mb-6 z-30">
            <span className="text-emerald-500 font-bold px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm">
              antigravity (agy)
            </span>
            <span className="text-slate-500 text-xs">Async • Main thread live</span>
          </div>

          <div className="flex-1 flex justify-center items-center relative">

            {/* Orchestrator — active prompt */}
            {rightOrchScale > 0 && (
              <div
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex flex-col justify-center items-center shadow-lg shadow-emerald-950/50 z-20 relative"
                style={{ transform: `scale(${rightOrchScale})` }}
              >
                <span className="font-black text-2xl">YOU</span>
                <span className="text-[10px] opacity-75 uppercase tracking-wider">Typing</span>
                <span
                  className="absolute -bottom-2 right-3 text-emerald-200 font-mono text-base"
                  style={{ opacity: cursorBlink }}
                >▌</span>
              </div>
            )}

            {/* Subagents */}
            {rightSub1 > 0 && (
              <div
                className="absolute -translate-y-24 -translate-x-28 w-24 h-16 rounded-xl bg-slate-900 border border-emerald-500/40 flex flex-col justify-center items-center text-center shadow-md"
                style={{ transform: `scale(${rightSub1})` }}
              >
                <span className="text-xs font-semibold text-emerald-400">Write Code</span>
                <span className="text-[9px] text-slate-500">Subagent A</span>
              </div>
            )}
            {rightSub2 > 0 && (
              <div
                className="absolute -translate-y-24 translate-x-28 w-24 h-16 rounded-xl bg-slate-900 border border-emerald-500/40 flex flex-col justify-center items-center text-center shadow-md"
                style={{ transform: `scale(${rightSub2})` }}
              >
                <span className="text-xs font-semibold text-emerald-400">Run Tests</span>
                <span className="text-[9px] text-slate-500">Subagent B</span>
              </div>
            )}
            {rightSub3 > 0 && (
              <div
                className="absolute translate-y-24 w-28 h-16 rounded-xl bg-slate-900 border border-emerald-500/40 flex flex-col justify-center items-center text-center shadow-md"
                style={{ transform: `scale(${rightSub3})` }}
              >
                <span className="text-xs font-semibold text-emerald-400">Fetch Docs</span>
                <span className="text-[9px] text-slate-500">Subagent C</span>
              </div>
            )}

            {frame > 70 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <line x1="50%" y1="50%" x2="25%" y2="28%" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" style={{ opacity: pulseOpacity }} />
                <line x1="50%" y1="50%" x2="75%" y2="28%" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" style={{ opacity: pulseOpacity }} />
                <line x1="50%" y1="50%" x2="50%" y2="72%" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" style={{ opacity: pulseOpacity }} />
              </svg>
            )}

            {/* Floating "next prompt" bubble — user keeps typing while subagents work */}
            {promptBubbleEntrance > 0 && (
              <div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-md bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono tracking-wider z-20 whitespace-nowrap"
                style={{
                  opacity: promptBubbleEntrance,
                  transform: `translateX(-50%) translateY(${interpolate(promptBubbleEntrance, [0, 1], [10, 0])}px)`,
                }}
              >
                &gt; next prompt running...
              </div>
            )}
          </div>

          <div className="text-center text-slate-500 text-sm mt-4">
            Same subagents. Your prompt stays live while they work.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex justify-between items-center text-slate-600 text-xs border-t border-slate-900 pt-4"
        style={{ opacity: panelEntrance }}
      >
        <span>Remotion composition: ConcurrencyModel</span>
        <span>Ahsan Ayaz • codewithahsan</span>
      </div>
    </AbsoluteFill>
  );
};
