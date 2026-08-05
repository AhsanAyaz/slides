import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * Demonstrates the bug that motivates linkedSignal():
 * the user is on page 4, types a new search term, the result set collapses to
 * a single page, and the page index is never reset. So they sit on page 4 of 1
 * staring at an empty list.
 *
 * Timeline (30fps):
 *   0-25    panel enters, 24 results, page 4 of 5, rows visible
 *   45-75   the user types "da", so the term becomes "ada"
 *   78-95   results collapse to 1, pagination collapses to a single page
 *   95-120  the page index stays on 4 and turns red, the list empties
 *   120-165 the callout lands
 */

const FONT =
  'Nunito, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif';
const MONO = '"SF Mono", ui-monospace, Menlo, monospace';

const INK = "#f4f4f6";
const MUTED = "#9aa0ad";
const PANEL = "#0d1117";
const EDGE = "#20232b";
const PINK = "#F5147A";
const PURPLE = "#9B40FF";

const PEOPLE = [
  "Grace Hopper",
  "Guido van Rossum",
  "Hedy Lamarr",
  "James Gosling",
  "Ken Thompson",
];

const TYPED = "ada";

const ROW_H = 54;
const ROWS_BOX_H = ROW_H * PEOPLE.length;

export const PaginationBug: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panel = spring({ frame, fps, config: { damping: 16 } });

  // The term starts as "a" and the user types "da" onto it between 45 and 75.
  const typedChars = Math.round(
    interpolate(frame, [45, 75], [1, TYPED.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const term = TYPED.slice(0, typedChars);

  // Caret blinks only while the field is the focus of the story.
  const caretOn = frame > 30 && frame < 100 && Math.floor(frame / 8) % 2 === 0;

  // 24 results collapse to 1 once the new term lands.
  const resultCount = Math.round(
    interpolate(frame, [78, 92], [24, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }),
  );
  const totalPages = frame < 88 ? 5 : 1;

  // Rows fade out as the result set collapses.
  const rowsOpacity = interpolate(frame, [80, 95], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const emptyOpacity = interpolate(frame, [100, 118], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // The page index never moves. After the collapse it turns red.
  const alarm = interpolate(frame, [98, 116], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pageColor = alarm > 0 ? `rgb(${244}, ${Math.round(244 - 176 * alarm)}, ${Math.round(246 - 168 * alarm)})` : INK;

  // A small nudge on the page indicator when it goes wrong.
  const shake =
    alarm > 0 && frame < 130 ? Math.sin((frame - 98) / 1.6) * 3 * (1 - alarm) : 0;

  const callout = spring({
    frame: frame - 124,
    fps,
    config: { damping: 14 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#08080c",
        fontFamily: FONT,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* brand glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 78% 18%, rgba(245,20,122,0.16), transparent 55%),
                       radial-gradient(circle at 18% 88%, rgba(155,64,255,0.16), transparent 55%)`,
        }}
      />

      <div
        style={{
          width: 940,
          backgroundColor: PANEL,
          border: `1px solid ${EDGE}`,
          borderRadius: 20,
          padding: "34px 40px 30px",
          opacity: panel,
          transform: `translateY(${(1 - panel) * 26}px)`,
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        }}
      >
        {/* search field */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            backgroundColor: "#11151c",
            border: `1px solid ${EDGE}`,
            borderRadius: 12,
            padding: "16px 20px",
          }}
        >
          <div style={{ fontSize: 26, color: MUTED }}>⌕</div>
          <div style={{ fontSize: 30, color: INK, fontFamily: MONO }}>
            {term}
            <span style={{ opacity: caretOn ? 1 : 0, color: PINK }}>|</span>
          </div>
        </div>

        {/* result count */}
        <div
          style={{
            marginTop: 18,
            fontSize: 22,
            color: MUTED,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            {resultCount} {resultCount === 1 ? "result" : "results"}
          </span>
          <span style={{ fontFamily: MONO, fontSize: 20 }}>
            5 per page
          </span>
        </div>

        {/* rows / empty state */}
        <div
          style={{
            marginTop: 14,
            height: ROWS_BOX_H,
            position: "relative",
          }}
        >
          <div style={{ opacity: rowsOpacity }}>
            {PEOPLE.map((name) => (
              <div
                key={name}
                style={{
                  fontSize: 24,
                  color: INK,
                  // Explicit height so 5 rows are exactly ROW_H * 5 tall.
                  // Relying on padding plus font metrics overflowed the
                  // container and collided with the pagination.
                  height: ROW_H,
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 4px",
                  borderBottom: `1px solid ${EDGE}`,
                }}
              >
                {name}
              </div>
            ))}
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: emptyOpacity,
              fontSize: 26,
              color: MUTED,
              border: `1px dashed ${EDGE}`,
              borderRadius: 14,
            }}
          >
            Nothing on this page
          </div>
        </div>

        {/* pagination */}
        <div
          style={{
            marginTop: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {[1, 2, 3, 4, 5].map((p) => {
              const visible = p <= totalPages;
              const isCurrent = p === 4;
              return (
                <div
                  key={p}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontFamily: MONO,
                    opacity: visible ? 1 : 0,
                    color: isCurrent ? "#08080c" : MUTED,
                    backgroundColor: isCurrent ? PINK : "#11151c",
                    border: `1px solid ${isCurrent ? PINK : EDGE}`,
                  }}
                >
                  {p}
                </div>
              );
            })}
          </div>

          <div
            style={{
              fontSize: 24,
              fontFamily: MONO,
              color: pageColor,
              transform: `translateX(${shake}px)`,
            }}
          >
            Page 4 of {totalPages}
          </div>
        </div>
      </div>

      {/* callout */}
      <div
        style={{
          marginTop: 26,
          fontSize: 28,
          color: INK,
          opacity: callout,
          transform: `translateY(${(1 - callout) * 14}px)`,
          borderLeft: `4px solid ${PURPLE}`,
          paddingLeft: 16,
        }}
      >
        The term changed. Nobody reset the page.
      </div>
    </AbsoluteFill>
  );
};
