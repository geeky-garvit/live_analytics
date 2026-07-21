export const initialState = {
  tasks: [],
  lastAction: null,

  working: false,
  startTime: null,
  totalWorkingTime: 0,
};

export function Reducer(state, action) {
  switch (action.type) {
    case "START_WORK":
      if (state.working) return state;

      return {
        ...state,
        working: true,
        startTime: Date.now(),
      };

    case "STOP_WORK":
      if (!state.working || !state.startTime) return state;

      return {
        ...state,
        working: false,
        totalWorkingTime:
          state.totalWorkingTime +
          (Date.now() - state.startTime),
        startTime: null,
      };

    case "CHANGE_STATUS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                status: action.payload.status,
              }
            : task
        ),
      };

    case "LOAD_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };

    case "ADD_TASK":
      console.log("Reducer received:", action.payload);

      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    default:
      return state;
  }
}