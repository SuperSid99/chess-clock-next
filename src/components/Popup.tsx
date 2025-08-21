"use client";

import { useMemo, useState } from "react";
import {
  IoCloseOutline,
  IoFlashOutline,
  IoSpeedometerOutline,
  IoTimerOutline,
  IoHourglassOutline,
  IoConstructOutline,
} from "react-icons/io5";

type ModeKey = "bullet" | "blitz" | "rapid" | "classical" | "custom";

const MODES: { key: ModeKey; title: string; Icon: any }[] = [
  { key: "bullet", title: "Bullet", Icon: IoFlashOutline },
  { key: "blitz", title: "Blitz", Icon: IoSpeedometerOutline },
  { key: "rapid", title: "Rapid", Icon: IoTimerOutline },
  { key: "classical", title: "Classical", Icon: IoHourglassOutline },
  { key: "custom", title: "Custom", Icon: IoConstructOutline },
];

const PRESETS: Record<Exclude<ModeKey, "custom">, { label: string; minutes: number; inc: number }[]> = {
  bullet: [
    { label: "1|0", minutes: 1, inc: 0 },
    { label: "1|1", minutes: 1, inc: 1 },
    { label: "2|1", minutes: 2, inc: 1 },
  ],
  blitz: [
    { label: "3|0", minutes: 3, inc: 0 },
    { label: "3|2", minutes: 3, inc: 2 },
    { label: "5|0", minutes: 5, inc: 0 },
    { label: "5|3", minutes: 5, inc: 3 },
  ],
  rapid: [
    { label: "10|0", minutes: 10, inc: 0 },
    { label: "10|5", minutes: 10, inc: 5 },
    { label: "15|10", minutes: 15, inc: 10 },
    { label: "25|10", minutes: 25, inc: 10 },
  ],
  classical: [
    { label: "30|0", minutes: 30, inc: 0 },
    { label: "45|45", minutes: 45, inc: 45 },
    { label: "60|0", minutes: 60, inc: 0 },
    { label: "90|30", minutes: 90, inc: 30 },
  ],
};

export default function Popup({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (startSeconds: number, incrementSeconds: number) => void;
}) {
  const [mode, setMode] = useState<ModeKey>("custom");
  const [startSeconds, setStartSeconds] = useState<number>(600);
  const [incrementSeconds, setIncrementSeconds] = useState<number>(5);

  const isCustom = mode === "custom";
  const visiblePresets = useMemo(
    () => (isCustom ? [] : PRESETS[mode as Exclude<ModeKey, "custom">] ?? []),
    [mode, isCustom]
  );

  const oddLastPreset = visiblePresets.length % 2 === 1;

  const handlePresetClick = (m: number, inc: number) => {
    setStartSeconds(m * 60);
    setIncrementSeconds(inc);
  };

  if (!open) return null;

  return (
    <div id="popup" className="popup showflex">
      <div className="popup-content">
        <div className="popup-heading">
          <h2 className="w300">Enter Start Time</h2>
        </div>

        <div className="popup-cross">
          <button className="popup-button cross" onClick={onClose}>
            <IoCloseOutline />
          </button>
        </div>

        <div className="popup-modes pair-grid" id="modeGrid">
          {MODES.map(({ key, title, Icon }, idx) => {
            const oddLast = MODES.length % 2 === 1 && idx === MODES.length - 1;
            return (
              <button
                key={key}
                className={`mode-btn ${mode === key ? "active" : ""} ${oddLast ? "center-span" : ""}`}
                onClick={() => setMode(key)}
                aria-pressed={mode === key}
                title={title}
              >
                <Icon />
                <div style={{ fontSize: 10, lineHeight: 1, marginTop: 2 }}>{title}</div>
              </button>
            );
          })}
        </div>

        {!isCustom && (
          <div className="popup-presets pair-grid" id="presetGrid">
            {visiblePresets.map((p, idx) => {
              const center = oddLastPreset && idx === visiblePresets.length - 1;
              return (
                <button
                  key={p.label}
                  className={`preset-btn ${center ? "center-span" : ""}`}
                  onClick={() => handlePresetClick(p.minutes, p.inc)}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        )}


        {isCustom && (
          <div id="customPanel" className="popup-custom">
            <div className="popup-time">
              <input
                type="number"
                id="startTime"
                placeholder="Start Time in Seconds"
                value={startSeconds}
                onChange={(e) => setStartSeconds(Number(e.target.value || 0))}
              />
            </div>
            <div className="popup-increment">
              <input
                type="number"
                id="increment"
                placeholder="Increment in Seconds"
                value={incrementSeconds}
                onChange={(e) => setIncrementSeconds(Number(e.target.value || 0))}
              />
            </div>
          </div>
        )}

        <div className="popup-start">
          <button
            className="popup-button start"
            onClick={() => onSubmit(Math.max(0, startSeconds | 0), Math.max(0, incrementSeconds | 0))}
          >
            Start
          </button>
        </div>

        <div className="item_2" />
      </div>
    </div>
  );
}
