"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Side = "left" | "right";

export function useChessClock(
  initialStartTimeSec = 600,    // 10:00 default
  initialIncrementSec = 5,      // +5s default
  startSide: Side = "left"      // who starts initially
) {
  const [leftTime, setLeftTime] = useState(initialStartTimeSec);
  const [rightTime, setRightTime] = useState(initialStartTimeSec);
  const [startTime, setStartTime] = useState(initialStartTimeSec);
  const [increment, setIncrement] = useState(initialIncrementSec);
  const [currentTimer, setCurrentTimer] = useState<Side>(startSide);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<number | null>(null);

  const clearTick = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startCountdown = useCallback(() => {
    clearTick();
    intervalRef.current = window.setInterval(() => {
      if (currentTimer === "left") {
        setLeftTime((t) => {
          if (t <= 0) {
            clearTick();
            setIsRunning(false);
            return 0;
          }
          return t - 1;
        });
      } else {
        setRightTime((t) => {
          if (t <= 0) {
            clearTick();
            setIsRunning(false);
            return 0;
          }
          return t - 1;
        });
      }
    }, 1000);
  }, [currentTimer]);

  // React to isRunning changes
  useEffect(() => {
    if (isRunning) startCountdown();
    else clearTick();
    return clearTick;
  }, [isRunning, startCountdown]);

  // Spacebar: start/switch
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!isRunning) {
          setIsRunning(true);
        } else {
          switchTimer();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, currentTimer, leftTime, rightTime, increment]);

  const switchTimer = useCallback(() => {
    // add increment to the side that just moved
    if (currentTimer === "left") {
      setLeftTime((t) => t + increment);
      setCurrentTimer("right");
    } else {
      setRightTime((t) => t + increment);
      setCurrentTimer("left");
    }
    // if running, continue ticking automatically
  }, [currentTimer, increment]);

  const togglePause = useCallback(() => {
    setIsRunning((r) => !r);
  }, []);

  const pauseCountdown = useCallback(() => {
    setIsRunning(false);
  }, []);

  const stopCountdown = useCallback(() => {
    setIsRunning(false);
  }, []);

  const refreshCountdown = useCallback(() => {
    setIsRunning(false);
    setLeftTime(startTime);
    setRightTime(startTime);
    // do not change currentTimer; stays whichever side should start
  }, [startTime]);

  const setStartAndIncrement = useCallback((startSec: number, incSec: number) => {
    const s = Math.max(0, startSec | 0);
    const inc = Math.max(0, incSec | 0);
    setStartTime(s);
    setLeftTime(s);
    setRightTime(s);
    setIncrement(inc);
    setIsRunning(false);
  }, []);

  // Click/touch on a box acts like your touch handler
  const onFacePress = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      switchTimer();
    }
  }, [isRunning, switchTimer]);

  const setStartSide = useCallback((side: Side) => {
    setCurrentTimer(side);
  }, []);

  return {
    // state
    leftTime, rightTime, startTime, increment, currentTimer, isRunning,
    // actions
    setStartAndIncrement,
    switchTimer, togglePause, pauseCountdown, stopCountdown, refreshCountdown,
    onFacePress, setStartSide
  };
}
