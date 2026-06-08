import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
  interpolate,
} from "remotion";

export const SandboxSafety: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrances
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const treeScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12 },
  });

  // Phases
  const showSecondPhase = frame >= 95;

  // Impact and Shield animations
  const shieldScale = spring({
    frame: frame - 105,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  const impactSpring = spring({
    frame: frame - 128,
    fps,
    config: { damping: 8, stiffness: 200 },
  });

  // Position interpolation for the rogue packet
  // Phase 1 packet path: from slides (inside workspace) up to home directory
  const packetY1 = interpolate(
    frame,
    [45, 65],
    [100, -120], // travels upward
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Phase 2 packet path: hits shield at Y = 30
  const packetY2 = interpolate(
    frame,
    [120, 128, 138],
    [100, 30, 80], // travels upward, hits, bounces back
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Home Directory health
  const homeDestroyed = frame >= 65 && frame < 95;

  // Deterministic Ping style helper
  const getPingStyle = (startFrame: number) => {
    const relativeFrame = (frame - startFrame) % 15;
    const scale = interpolate(relativeFrame, [0, 15], [1, 2.5]);
    const opacity = interpolate(relativeFrame, [0, 15], [0.8, 0]);
    return {
      transform: `scale(${scale})`,
      opacity: opacity
    };
  };

  // Deterministic Impact pulse
  const getImpactPingStyle = () => {
    const scale = interpolate(impactSpring, [0, 1], [0.5, 2]);
    const opacity = interpolate(impactSpring, [0, 1], [1, 0]);
    return {
      transform: `scale(${scale})`,
      opacity: opacity
    };
  };

  return (
    <AbsoluteFill className="bg-slate-950 text-white font-sans flex flex-col justify-between p-12">
      {/* Header */}
      <div 
        className="text-center"
        style={{
          opacity: entrance,
          transform: `translateY(${interpolate(entrance, [0, 1], [-20, 0])}px)`
        }}
      >
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
          OS-Native Sandboxing Safety
        </h1>
        <p className="text-slate-400 mt-2 text-lg">Preventing file system destruction in action</p>
      </div>

      {/* Main Container */}
      <div className="flex-1 my-6 flex flex-row items-center gap-12">
        
        {/* Left Side: Directory Tree */}
        <div 
          className="flex-1 bg-slate-900/40 border border-slate-800 rounded-2xl p-8 h-100 flex flex-col justify-between relative"
          style={{
            transform: `scale(${treeScale})`,
            opacity: treeScale
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400 text-sm font-semibold">Local File System</span>
            <span className="text-slate-500 text-xs">Paths View</span>
          </div>

          <div className="flex-1 font-mono text-sm space-y-4 pl-4 relative">
            {/* Home Node */}
            <div 
              className="flex items-center gap-2"
              style={{
                color: homeDestroyed ? "rgb(239, 68, 68)" : "rgb(255, 255, 255)",
                textDecoration: homeDestroyed ? "line-through" : "none",
                opacity: homeDestroyed ? 0.4 : 1
              }}
            >
              <span className="text-lg">📁</span>
              <span className="font-bold">~ (Home Directory)</span>
              {homeDestroyed && (
                <span className="text-xs bg-red-950 border border-red-500/30 px-2 py-0.5 rounded text-red-400 ml-4">
                  DELETED
                </span>
              )}
            </div>

            {/* Subfolders */}
            <div className="pl-6 space-y-3 border-l-2 border-slate-800 ml-3">
              <div 
                className="flex items-center gap-2"
                style={{
                  color: homeDestroyed ? "rgb(239, 68, 68)" : "rgb(148, 163, 184)",
                  textDecoration: homeDestroyed ? "line-through" : "none",
                  opacity: homeDestroyed ? 0.4 : 1
                }}
              >
                <span>📄</span>
                <span>.bashrc</span>
              </div>
              <div 
                className="flex items-center gap-2"
                style={{
                  color: homeDestroyed ? "rgb(239, 68, 68)" : "rgb(148, 163, 184)",
                  textDecoration: homeDestroyed ? "line-through" : "none",
                  opacity: homeDestroyed ? 0.4 : 1
                }}
              >
                <span>📁</span>
                <span>Documents/</span>
              </div>
              
              {/* Project workspace */}
              <div className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-950/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit relative">
                <span>📁</span>
                <span>personal/slides/</span>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300 uppercase tracking-wide">Workspace</span>
                
                {/* Containment Shield (Only in Phase 2) */}
                {showSecondPhase && shieldScale > 0 && (
                  <div 
                    className="absolute -inset-2 rounded-xl border-2 border-sky-400 bg-sky-500/5 shadow-[0_0_20px_rgba(56,189,248,0.2)] pointer-events-none"
                    style={{
                      transform: `scale(${shieldScale})`,
                      opacity: shieldScale,
                      borderColor: frame >= 128 && frame < 140 
                        ? `rgba(56, 189, 248, ${interpolate(impactSpring, [0, 1], [1, 0.4])})`
                        : "rgba(56, 189, 248, 0.4)"
                    }}
                  >
                    <span className="absolute -top-3 left-4 text-[8px] bg-sky-500 text-slate-950 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      Sandbox (nsjail/sandbox-exec)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Rogue Command Node */}
            {(!showSecondPhase && frame >= 45 && frame < 70) && (
              <div 
                className="absolute left-40 w-32 bg-red-500/20 border border-red-500 text-red-400 p-2 rounded-lg text-xs font-bold shadow-lg flex items-center justify-between pointer-events-none"
                style={{
                  top: `${packetY1}px`
                }}
              >
                <span>🔥 rm -rf ~</span>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-400" style={getPingStyle(45)}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </div>
            )}

            {(showSecondPhase && frame >= 120 && frame < 150) && (
              <div 
                className="absolute left-40 w-32 bg-red-500/20 border border-red-500 text-red-400 p-2 rounded-lg text-xs font-bold shadow-lg flex items-center justify-between pointer-events-none"
                style={{
                  top: `${packetY2}px`
                }}
              >
                <span>🔥 rm -rf ~</span>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-400" style={getPingStyle(120)}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </div>
            )}

            {/* Impact indicator */}
            {showSecondPhase && frame >= 128 && frame < 145 && (
              <div 
                className="absolute left-44 top-10 pointer-events-none"
                style={getImpactPingStyle()}
              >
                <div className="w-8 h-8 rounded-full border border-sky-400 bg-sky-400/20"></div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Status Control Panel */}
        <div 
          className="w-80 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between h-100"
          style={{
            opacity: entrance,
            transform: `scale(${entrance})`
          }}
        >
          <div>
            <h3 className="font-bold text-lg mb-2">Sandbox Status</h3>
            <div 
              className="p-4 rounded-xl border flex items-center gap-3"
              style={{
                backgroundColor: showSecondPhase ? "rgba(14, 116, 144, 0.08)" : "rgba(220, 38, 38, 0.08)",
                borderColor: showSecondPhase ? "rgba(14, 116, 144, 0.3)" : "rgba(220, 38, 38, 0.3)",
                color: showSecondPhase ? "rgb(56, 189, 248)" : "rgb(248, 113, 113)"
              }}
            >
              <span className="text-2xl">{showSecondPhase ? "🛡️" : "⚠️"}</span>
              <div>
                <p className="font-bold text-sm uppercase tracking-wide">
                  {showSecondPhase ? "Sandbox: ACTIVE" : "Sandbox: DISABLED"}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {showSecondPhase ? "Isolating workspace process" : "Executing commands raw"}
                </p>
              </div>
            </div>

            {/* Description card */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 mt-4 text-xs text-slate-400 space-y-2">
              <p className="font-bold text-slate-300">What is happening:</p>
              {!showSecondPhase ? (
                <p>Without sandboxing, running a hallucinating shell tool (like a recursive delete command) can leak outside slides/ folder and trash your home directory.</p>
              ) : (
                <p>With sandbox active, OS-native boundaries (nsjail/sandbox-exec) block all read/write file queries outside of slides/, keeping your home directory safe.</p>
              )}
            </div>
          </div>

          <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-3">
            {!showSecondPhase ? "Phase 1: Danger Demo" : "Phase 2: Enforced Sandbox"}
          </div>
        </div>

      </div>

      {/* Footer Info */}
      <div 
        className="flex justify-between items-center text-slate-600 text-xs border-t border-slate-900 pt-4"
        style={{ opacity: entrance }}
      >
        <span>Remotion composition: SandboxSafety</span>
        <span>Ahsan Ayaz • codewithahsan</span>
      </div>
    </AbsoluteFill>
  );
};
