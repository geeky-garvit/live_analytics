import { useState, useEffect } from "react";

function useWorkingTimer(working, startTime, totalWorkingTime) {
  const [elapsed, setElapsed] = useState(totalWorkingTime);

  // Reset timer when internet connection is restored
  useEffect(() => {
    const handleOnline = () => {
      setElapsed(0);
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  useEffect(() => {
    if (!working || !startTime) {
      setElapsed(totalWorkingTime);
      return;
    }

    const updateTimer = () => {
      setElapsed(Date.now() - startTime);
    };

    // Update immediately
    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [working, startTime, totalWorkingTime]);

  return elapsed;
}

export default useWorkingTimer;