import { useMemo } from "react"

export default function useTaskStats(tasks = []) {
  // Deliberately expensive function to calculate team velocity
  function computeVelocity(tasksList) {
    let total = 0
    for (let i = 0; i < tasksList.length; i++) {
      for (let j = 0; j < 5000; j++) {
        // Ensure ID is treated as a number for the math formula
        const taskId =
          typeof tasksList[i].id === "number"
            ? tasksList[i].id
            : Number(tasksList[i].id) || i + 1
        total += Math.sqrt(taskId * j + 1)
      }
    }
    return Math.round(total % 1000)
  }

  // Memoize the expensive velocity calculation so it ONLY runs when tasks change
  const velocity = useMemo(() => {
    return computeVelocity(tasks)
  }, [tasks])

  // Count metrics with fallback string matching to prevent mismatch bugs
  const total = tasks.length
  const todo = tasks.filter((t) => t.status === "todo").length
  const inProgress = tasks.filter(
    (t) => t.status === "in-progress" || t.status === "inProgress"
  ).length
  const done = tasks.filter(
    (t) => t.status === "completed" || t.status === "done"
  ).length

  const percentage = total > 0 ? Math.round((done / total) * 100) : 0

  return {
    total,
    todo,
    inProgress,
    done,
    percentage,
    velocity,
  }
}