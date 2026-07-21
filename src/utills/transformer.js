

function getRandomPriority() {
  const priority = ["Low", "Medium", "High"]

  return priority[Math.floor(Math.random() * priority.length)]
}

export function transformTasks(tasks) {
  console.log("transformTasks received:", tasks)

  return tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: "",
    completed: task.completed,
    status: "new",
    priority: getRandomPriority(),
    dueDate: "",
    createdAt: new Date().toISOString(),
  }))
}