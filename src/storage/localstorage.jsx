const STORAGE_KEY = "task-manager"

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    return null
  }

  return JSON.parse(saved)
}
