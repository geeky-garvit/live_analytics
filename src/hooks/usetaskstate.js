import { useMemo } from "react"

function computeVelocity(tasks) {
  let total = 0

  for (let i = 0; i < tasks.length; i++) {
    for (let j = 0; j < 5000; j++) {
      total += Math.sqrt(tasks[i].id * j + 1)
    }
  }

  return Math.round(total % 1000)
}

export default function useTaskStats(tasks) {
  const velocity = useMemo(() => {
    return computeVelocity(tasks)
  }, [tasks])

  const total = tasks.length

  const todo = tasks.filter((t) => t.status === "todo").length

  const progress = tasks.filter((t) => t.status === "in-progress").length

  const completed = tasks.filter((t) => t.status === "completed").length

  return {
    total,

    todo,

    progress,

    completed,

    percentage: total === 0 ? 0 : Math.round((completed / total) * 100),

    velocity,
  }
}
