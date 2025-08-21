"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ActionButtons from "@/components/ActionButtons";
import Popup from "@/components/Popup";
import ClockDisplay from "@/components/ClockDisplay";
import { useChessClock } from "@/hooks/useChessClock";

export default function Page() {
  const [swapped, setSwapped] = useState(false);

  const {
    leftTime, rightTime, currentTimer, isRunning,
    setStartAndIncrement,
    togglePause, pauseCountdown, stopCountdown, refreshCountdown,
    onFacePress, setStartSide
  } = useChessClock(600, 5, swapped ? "right" : "left");

  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const toggleColors = () => {
    setSwapped((s) => {
      const next = !s;
      setStartSide(next ? "right" : "left");   // who starts after swap
      return next;
    });
  };

  const showPopup = () => setIsPopupOpen(true);

  const handleSubmitTime = (startSeconds: number, incrementSeconds: number) => {
    setStartAndIncrement(startSeconds, incrementSeconds);
    setIsPopupOpen(false);
  };

  return (
    <main>
      <Header />
      <section>
        <div className="bigcontainer">
          <div className="row centre">
            <ul>
              <li className="ignore-touch">
                <button
                  className={`toggle-button ignore-touch ${swapped ? "active" : ""}`}
                  onClick={toggleColors}
                >
                  <span className="circle"></span>
                </button>
              </li>
            </ul>
          </div>

          <div className={`container ${swapped ? "swapped" : ""}`} style={{ display: "flex" }}>
            <div className="box left-box touchBox" onClick={onFacePress} onTouchStart={onFacePress}>
              <ClockDisplay id="left-timer" seconds={leftTime} active={currentTimer === "left" && isRunning} />
            </div>

            <ActionButtons
              isRunning={isRunning}
              onRefresh={refreshCountdown}
              onTogglePlayPause={togglePause}      
              onShuffle={() => { stopCountdown(); showPopup(); }}
            />


            <div className="box right-box touchBox" onClick={onFacePress} onTouchStart={onFacePress}>
              <ClockDisplay id="right-timer" seconds={rightTime} active={currentTimer === "right" && isRunning} />
            </div>
          </div>

          <Popup
            open={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSubmit={handleSubmitTime}
          />
        </div>
      </section>
    </main>
  );
}
