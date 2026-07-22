import { useEffect, useReducer } from "react"
import { loadState, saveState } from "../storage/localstorage"
import { TaskContext } from "./taskcontext"
import { Reducer, initialState } from "../reducer/reducer"

import { getTasks } from "../../services/api"
import { transformTasks } from "../utills/transformer"

function TaskProvider({ children }) {
  
  const getSafelyLoadedState = () => {
    try {
      const saved = loadState()
      return saved || initialState
    } catch (e) {
      console.error("Corrupted local storage detected, resetting to initial state.", e)
      return initialState
    }
  }

  const [state, dispatch] = useReducer(Reducer, null, getSafelyLoadedState)

  useEffect(() => {
    async function loadTasks() {
      dispatch({ type: "SET_LOADING", payload: true })
      try {
        const data = await getTasks()
        const transformed = transformTasks(data)

        dispatch({
          type: "LOAD_TASKS",
          payload: transformed,
        })
      } catch (err) {
        console.error("API Fetch Error:", err)
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to sync remote tasks. Working in offline mode.",
        })
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }

    loadTasks()
  }, [])

  useEffect(() => {
    try {
      saveState(state)
    } catch (e) {
      dispatch({
        type: "SET_ERROR",
        payload: "Storage limit reached. Failed to save local state.",
      })
    }
  }, [state])

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider