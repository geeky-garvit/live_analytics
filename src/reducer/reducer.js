export const initialState = {
  tasks: [],
  lastAction: null,
  working: false,
  startTime: null,
  totalWorkingTime: 0,
  showAddModal: false,
  history: [],
  loading: true,
  error: null,
}

export function Reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }

    case "SET_ERROR":
      return { ...state, error: action.payload }

    case "CLEAR_ERROR":
      return { ...state, error: null }

    case "START_WORK": {
      if (state.working) return state
      const updatedState = { ...state, working: true, startTime: Date.now() }
      return {
        ...updatedState,
        history: [...state.history, createHistory(updatedState, updatedState.tasks)],
      }
    }

    case "CHANGE_STATUS": {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              status: action.payload.status,
            }
          : task,
      )

      return {
        ...state,

        lastAction: {
          type: "CHANGE_STATUS",
          previousTasks: state.tasks,
        },
        tasks: updatedTasks,
        history: [...state.history, createHistory(state, updatedTasks)],
      }
    }

    case "UNDO": {
      if (!state.lastAction) return state

      const restoredTasks = state.lastAction.previousTasks

      return {
        ...state,
        tasks: restoredTasks,
        lastAction: null,
        history: [...state.history, createHistory(state, restoredTasks)],
      }
    }

    case "STOP_WORK": {
      if (!state.working || !state.startTime) return state
      const updatedState = {
        ...state,
        working: false,
        totalWorkingTime: state.totalWorkingTime + (Date.now() - state.startTime),
        startTime: null,
      }
      return {
        ...updatedState,
        history: [...state.history, createHistory(updatedState, updatedState.tasks)],
      }
    }

    case "LOAD_TASKS": {
      const mergedTasks = [
        ...state.tasks,
        ...action.payload.filter((apiTask) => !state.tasks.some((task) => task.id === apiTask.id)),
      ]

      return {
        ...state,
        tasks: mergedTasks,
        loading: false,
        history: [createHistory({ ...state, tasks: mergedTasks }, mergedTasks)],
      }
    }

    case "ADD_TASK": {
      const updatedTask = {
        ...action.payload,
        status: action.payload.status || "todo",
      }
      const updatedTasks = [...state.tasks, updatedTask]

      return {
        ...state,
        tasks: updatedTasks,
        showAddModal: false,
        error: null,
        history: [...state.history, createHistory(state, updatedTasks)],
      }
    }

    case "CHANGE_STATUS": {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, status: action.payload.status } : task,
      )

      return {
        ...state,
        tasks: updatedTasks,
        history: [...state.history, createHistory(state, updatedTasks)],
      }
    }

    case "SAVE_GRAPH_POINT": {
      if (!state.working) return state
      return {
        ...state,
        history: [...state.history, createHistory(state, state.tasks)],
      }
    }

    case "OPEN_ADD_MODAL":
      return { ...state, showAddModal: true }

    case "CLOSE_ADD_MODAL":
      return { ...state, showAddModal: false }

    default:
      return state
  }
}

function createHistory(state, tasks) {
  const elapsed = state.totalWorkingTime + (state.working && state.startTime ? Date.now() - state.startTime : 0)

  return {
    minute: Math.floor(elapsed / 60000),
    todo: (tasks || []).filter((t) => t.status === "todo").length,
    progress: (tasks || []).filter((t) => t.status === "in-progress").length,
    completed: (tasks || []).filter((t) => t.status === "completed").length,
  }
}
