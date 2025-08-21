"use client";
import { IoReloadOutline, IoPlayOutline, IoPauseOutline, IoShuffleOutline } from "react-icons/io5";

export default function ActionButtons({
  isRunning,
  onRefresh,
  onTogglePlayPause,
  onShuffle,
}: {
  isRunning: boolean;
  onRefresh: () => void;
  onTogglePlayPause: () => void; // <- single toggle only
  onShuffle: () => void;
}) {
  return (
    <div className="action_btns ignore-touch">
      <button className="action-button" onClick={onRefresh}>
        <IoReloadOutline />
      </button>

      <button className="action-button" onClick={onTogglePlayPause} aria-label={isRunning ? "Pause" : "Play"}>
        {isRunning ? <IoPauseOutline /> : <IoPlayOutline className="play-state" />}
      </button>

      <button className="action-button" onClick={onShuffle}>
        <IoShuffleOutline />
      </button>
    </div>
  );
}
