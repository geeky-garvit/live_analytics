export async function getTasks() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos")

  if (!res.ok) {
    throw new Error("Failed to fetch tasks")
  }

  return await res.json()
}