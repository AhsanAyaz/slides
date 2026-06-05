import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
  interpolate,
} from "remotion";

export const McpMigration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrances
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const jsonScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12 },
  });

  const serversScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12 },
  });

  // Action states
  const showFix = frame >= 65;
  const isConnected = frame >= 100;

  const fixSpring = spring({
    frame: frame - 65,
    fps,
    config: { damping: 10 },
  });

  const connectionSpring = spring({
    frame: frame - 100,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  // Pulse animation opacity
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
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
          MCP Schema Migration
        </h1>
        <p className="text-slate-400 mt-2 text-lg">Fixing silent connection failures in mcp_config.json</p>
      </div>

      {/* Main Canvas */}
      <div className="grid grid-cols-2 gap-12 flex-1 my-6">
        
        {/* Left Panel: JSON Editor */}
        <div 
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl relative"
          style={{
            transform: `scale(${jsonScale})`,
            opacity: jsonScale
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400 text-sm font-semibold">mcp_config.json</span>
            <span className="text-xs text-slate-500">Schema Editor</span>
          </div>

          {/* JSON content */}
          <div className="flex-1 font-mono text-sm leading-relaxed p-4 bg-slate-950 rounded-xl border border-slate-800/80 text-slate-300 relative">
            <p className="text-slate-500">{"{"}</p>
            <p className="pl-4 text-purple-400">"mcpServers"<span className="text-slate-400">:</span> {"{"}</p>
            
            {/* Linear block */}
            <p className="pl-8 text-blue-400">"linear"<span className="text-slate-400">:</span> {"{"}</p>
            <p className="pl-12">
              {!showFix ? (
                <span 
                  className="bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded text-red-400 font-bold"
                  style={{ opacity: pulseOpacity }}
                >
                  "url"
                </span>
              ) : (
                <span className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 font-bold">
                  "serverUrl"
                </span>
              )}
              <span className="text-slate-400">:</span> <span className="text-amber-300">"https://mcp.linear.app/sse"</span>
            </p>
            <p className="pl-8 text-slate-400">{"},"}</p>

            {/* GitHub block */}
            <p className="pl-8 text-blue-400">"github"<span className="text-slate-400">:</span> {"{"}</p>
            <p className="pl-12">
              {!showFix ? (
                <span 
                  className="bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded text-red-400 font-bold"
                  style={{ opacity: pulseOpacity }}
                >
                  "httpUrl"
                </span>
              ) : (
                <span className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 font-bold">
                  "serverUrl"
                </span>
              )}
              <span className="text-slate-400">:</span> <span className="text-amber-300">"https://mcp.github.com/sse"</span>
            </p>
            <p className="pl-8 text-slate-400">{"}"}</p>
            
            <p className="pl-4 text-slate-400">{"}"}</p>
            <p className="text-slate-500">{"}"}</p>

            {/* Warning overlay for legacy keys */}
            {!showFix && frame >= 30 && (
              <div className="absolute right-4 top-16 bg-red-950 border border-red-500/30 px-3 py-2 rounded-lg text-[10px] text-red-400 font-bold shadow-lg space-y-0.5">
                <p>⚠️ Legacy Keys Detected</p>
                <p className="text-[9px] text-slate-400 font-normal">url/httpUrl are silently ignored</p>
              </div>
            )}

            {/* Success overlay for fix */}
            {showFix && frame >= 85 && (
              <div 
                className="absolute right-4 top-16 bg-emerald-950 border border-emerald-500/30 px-3 py-2 rounded-lg text-[10px] text-emerald-400 font-bold shadow-lg space-y-0.5"
                style={{
                  transform: `scale(${fixSpring})`,
                  opacity: fixSpring
                }}
              >
                <p>✔ Keys Migrated</p>
                <p className="text-[9px] text-slate-400 font-normal">Parsed by agy engine</p>
              </div>
            )}
          </div>

          <div className="text-[10px] text-slate-500 mt-3">
            {!showFix ? "Status: Scanning legacy file format" : "Status: Config successfully updated"}
          </div>
        </div>

        {/* Right Panel: MCP Status Nodes */}
        <div 
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-2xl"
          style={{
            transform: `scale(${serversScale})`,
            opacity: serversScale
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400 text-sm font-semibold">Active MCP Servers</span>
            <span className="text-xs text-slate-500">Live Status</span>
          </div>

          {/* Servers list */}
          <div className="flex-1 flex flex-col justify-center gap-8 relative px-4">
            
            {/* Linear Node */}
            <div 
              className="p-4 rounded-xl border flex items-center justify-between"
              style={{
                backgroundColor: isConnected ? "rgba(16, 185, 129, 0.08)" : "rgba(15, 23, 42, 0.9)",
                borderColor: isConnected ? "rgb(16, 185, 129)" : "rgb(51, 65, 85)",
                color: isConnected ? "rgb(52, 211, 153)" : "rgb(148, 163, 184)",
                boxShadow: isConnected ? "0 4px 6px -1px rgba(16, 185, 129, 0.2)" : "none"
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="font-bold text-sm">Linear MCP Server</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">SSE Client</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: isConnected ? "rgb(16, 185, 129)" : "rgb(239, 68, 68)",
                    opacity: isConnected ? pulseOpacity : 1
                  }}
                ></div>
                <span className="text-[10px] uppercase font-bold tracking-wider">
                  {isConnected ? "Connected" : "Offline"}
                </span>
              </div>
            </div>

            {/* GitHub Node */}
            <div 
              className="p-4 rounded-xl border flex items-center justify-between"
              style={{
                backgroundColor: isConnected ? "rgba(16, 185, 129, 0.08)" : "rgba(15, 23, 42, 0.9)",
                borderColor: isConnected ? "rgb(16, 185, 129)" : "rgb(51, 65, 85)",
                color: isConnected ? "rgb(52, 211, 153)" : "rgb(148, 163, 184)",
                boxShadow: isConnected ? "0 4px 6px -1px rgba(16, 185, 129, 0.2)" : "none"
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🐙</span>
                <div>
                  <p className="font-bold text-sm">GitHub MCP Server</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">SSE Client</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: isConnected ? "rgb(16, 185, 129)" : "rgb(239, 68, 68)",
                    opacity: isConnected ? pulseOpacity : 1
                  }}
                ></div>
                <span className="text-[10px] uppercase font-bold tracking-wider">
                  {isConnected ? "Connected" : "Offline"}
                </span>
              </div>
            </div>

            {/* Data flowing line */}
            {isConnected && connectionSpring > 0 && (
              <div 
                className="absolute inset-x-0 top-1/2 h-0.5 bg-emerald-500/40 pointer-events-none -z-10 animate-pulse"
                style={{
                  transform: `scaleY(${connectionSpring})`,
                  opacity: pulseOpacity
                }}
              ></div>
            )}
          </div>

          <div className="text-[10px] text-slate-500 mt-3">
            {!isConnected ? "Waiting for valid connection endpoint..." : "Socks connection established."}
          </div>
        </div>

      </div>

      {/* Footer Info */}
      <div 
        className="flex justify-between items-center text-slate-600 text-xs border-t border-slate-900 pt-4"
        style={{ opacity: entrance }}
      >
        <span>Remotion composition: McpMigration</span>
        <span>Ahsan Ayaz • codewithahsan</span>
      </div>
    </AbsoluteFill>
  );
};
