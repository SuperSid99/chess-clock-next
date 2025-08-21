"use client";

function formatTime(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

export default function ClockDisplay({
  id, seconds, active = false
}: { id: string; seconds: number; active?: boolean }) {
  return (
    <h1 className={`row centre counter touchBox ${active ? "active" : ""}`} id={id}>
      {formatTime(seconds)}
    </h1>
  );
}
