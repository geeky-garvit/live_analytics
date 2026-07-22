import { useState, useEffect } from "react"

function useWorkingTimer(working, startTime, totalWorkingTime) {
  const [elapsed, setElapsed] = useState(totalWorkingTime)

  useEffect(() => {
    if (!working || !startTime) {
      setElapsed(totalWorkingTime)

      return
    }

    const interval = setInterval(() => {
      setElapsed(totalWorkingTime + (Date.now() - startTime))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [working, startTime, totalWorkingTime])

  return elapsed
}

export default useWorkingTimer
