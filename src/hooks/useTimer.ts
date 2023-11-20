import { useCallback, useEffect, useState } from "react";

interface TimerHook {
  seconds: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  change: (seconds: number) => void;
}

export default function useTimer(initialTime: number, autostart: boolean = false): TimerHook {
  const [ticking, setTicking] = useState<boolean>(autostart);
  const [seconds, setSeconds] = useState<number>(initialTime);

  const start = useCallback(() => setTicking(true), [setTicking]);

  const stop = useCallback(() => setTicking(false), [setTicking]);

  const reset = useCallback(() => {
    setTicking(false);
    setSeconds(initialTime);
  }, [initialTime, setTicking, setSeconds]);

  const change = useCallback(
    (seconds: number) => {
      if (seconds > 0) {
        setSeconds(seconds);
      }
    },
    [setSeconds],
  );

  useEffect(() => {
    let timerId: NodeJS.Timer;

    if (ticking) {
      timerId = setInterval(() => {
        setSeconds((s) => {
          if (s - 1 <= 0) {
            stop();
          }
          return s - 1;
        });
      }, 1000);
    }

    return () => timerId && clearInterval(timerId);
  }, [stop, ticking]);

  return {
    seconds,
    start,
    stop,
    reset,
    change,
  };
}
