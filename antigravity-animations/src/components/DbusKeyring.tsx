import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
  interpolate,
} from "remotion";

export const DbusKeyring: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrances
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const sshTerminalScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12 },
  });

  const padlockScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12 },
  });

  // Action states
  const showCrash = frame >= 40 && frame < 75;
  const showFix = frame >= 75;

  const fixTerminalScale = spring({
    frame: frame - 80,
    fps,
    config: { damping: 12 },
  });

  const padlockUnlock = spring({
    frame: frame - 105,
    fps,
    config: { damping: 10 },
  });

  // Deterministic connection line pulsing opacity
  const pulseOpacity = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.3, 0.8]
  );

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
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-red-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
          The Headless SSH Keyring Pitfall
        </h1>
        <p className="text-slate-400 mt-2 text-lg">Resolving credential keyring crashes on remote servers</p>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex justify-center items-center my-6 relative">
        
        {/* Phase 1: The Crash */}
        {!showFix && (
          <div className="flex flex-row items-center gap-16">
            {/* Terminal Window (Left) */}
            <div 
              className="w-120 h-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden"
              style={{
                transform: `scale(${sshTerminalScale})`,
                opacity: sshTerminalScale
              }}
            >
              <div className="bg-slate-950 px-4 py-2 border-b border-slate-800/80 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-slate-500 ml-4">ssh user@linux-server</span>
              </div>
              <div className="p-4 font-mono text-sm space-y-2 text-slate-300">
                <p><span className="text-emerald-500">$</span> agy</p>
                {frame > 25 && (
                  <p className="text-slate-500">Connecting to secure OS keyring...</p>
                )}
                {showCrash && (
                  <>
                    <p className="text-red-500 font-bold">Error: dbus session connection failed</p>
                    <p className="text-red-500 font-bold">Fatal: keyring is locked/unavailable (exit 1)</p>
                  </>
                )}
              </div>
            </div>

            {/* Connection Status indicator */}
            <div className="flex flex-col items-center">
              {frame > 28 && (
                <div className="w-16 h-2 bg-slate-800 rounded relative overflow-hidden">
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundColor: showCrash ? "rgb(239, 68, 68)" : "rgb(59, 130, 246)",
                      opacity: showCrash ? 1 : pulseOpacity
                    }}
                  ></div>
                </div>
              )}
              {showCrash && (
                <span className="text-red-500 font-mono text-xs font-bold mt-2">FAILED (X)</span>
              )}
            </div>

            {/* Keyring Vault (Right) */}
            <div 
              className="flex flex-col items-center"
              style={{
                transform: `scale(${padlockScale})`,
                opacity: padlockScale
              }}
            >
              <div 
                className="w-32 h-32 rounded-2xl border flex flex-col justify-center items-center relative"
                style={{
                  backgroundColor: showCrash ? "rgba(239, 68, 68, 0.08)" : "rgba(30, 41, 59, 0.5)",
                  borderColor: showCrash ? "rgb(239, 68, 68)" : "rgb(51, 65, 85)",
                  color: showCrash ? "rgb(239, 68, 68)" : "rgb(148, 163, 184)"
                }}
              >
                <span className="text-4xl">🔒</span>
                <span className="text-xs font-bold mt-2 tracking-wider">KEYRING</span>
              </div>
              <span className="text-slate-500 text-xs mt-2 uppercase tracking-wide">Locked Vault</span>
            </div>
          </div>
        )}

        {/* Phase 2: The Fix */}
        {showFix && (
          <div className="flex flex-row items-center gap-16">
            {/* Terminal Window (Left) */}
            <div 
              className="w-120 h-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden"
              style={{
                transform: `scale(${fixTerminalScale})`,
                opacity: fixTerminalScale
              }}
            >
              <div className="bg-slate-950 px-4 py-2 border-b border-slate-800/80 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-slate-500 ml-4">ssh user@linux-server</span>
              </div>
              <div className="p-4 font-mono text-sm space-y-2 text-slate-300">
                <p><span className="text-emerald-500">$</span> dbus-run-session agy</p>
                {frame > 88 && (
                  <p className="text-slate-400">Initializing virtual dbus conduit...</p>
                )}
                {frame > 100 && (
                  <p className="text-emerald-500">Connection to keyring established.</p>
                )}
                {frame > 115 && (
                  <p className="text-green-400 font-bold bg-green-950/20 border border-green-500/20 p-2 rounded">
                    ✔ Authentication successful! Session loaded.
                  </p>
                )}
              </div>
            </div>

            {/* Connection Status indicator */}
            <div className="flex flex-col items-center">
              {frame > 90 && (
                <div className="w-16 h-2 bg-slate-800 rounded relative overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-emerald-500"
                    style={{
                      width: `${interpolate(frame - 90, [0, 15], [0, 100], { extrapolateRight: "clamp" })}%`
                    }}
                  ></div>
                </div>
              )}
              {frame > 105 && (
                <span className="text-emerald-500 font-mono text-xs font-bold mt-2" style={{ opacity: pulseOpacity }}>ACTIVE</span>
              )}
            </div>

            {/* Keyring Vault (Right) */}
            <div className="flex flex-col items-center">
              <div 
                className="w-32 h-32 rounded-2xl border flex flex-col justify-center items-center relative"
                style={{
                  backgroundColor: frame > 105 ? "rgba(16, 185, 129, 0.08)" : "rgba(30, 41, 59, 0.5)",
                  borderColor: frame > 105 ? "rgb(16, 185, 129)" : "rgb(51, 65, 85)",
                  color: frame > 105 ? "rgb(16, 185, 129)" : "rgb(148, 163, 184)",
                  boxShadow: frame > 105 ? "0 10px 15px -3px rgba(16, 185, 129, 0.2)" : "none"
                }}
              >
                <span 
                  className="text-4xl" 
                  style={{
                    display: "inline-block",
                    transform: `rotate(${interpolate(padlockUnlock, [0, 1], [0, -15])}deg)`
                  }}
                >
                  {frame > 105 ? "🔓" : "🔒"}
                </span>
                <span className="text-xs font-bold mt-2 tracking-wider">KEYRING</span>
              </div>
              <span className="text-slate-500 text-xs mt-2 uppercase tracking-wide">Unlocked Vault</span>
            </div>
          </div>
        )}

      </div>

      {/* Footer Info */}
      <div 
        className="flex justify-between items-center text-slate-600 text-xs border-t border-slate-900 pt-4"
        style={{ opacity: entrance }}
      >
        <span>Remotion composition: DbusKeyring</span>
        <span>Ahsan Ayaz • codewithahsan</span>
      </div>
    </AbsoluteFill>
  );
};
