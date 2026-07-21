import Navbar from '../components/navbar/navbar'
import './App.css'
import Addtask from "../components/addtask/addtask"
import Progress from "../components/progress/progress"
import tasks from "../storage/data"
import Tasks from '../components/tasks/tasks'
import { useEffect, useReducer, useState } from "react"
import { Reducer, initialState } from "./reducer/reducer"
import { getTasks } from "../services/api"
import { transformTasks } from "./utills/transformer"


function App() {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [show, setshow] = useState(false)
 useEffect(() => {
  async function loadTasks() {
  try {
    const data = await getTasks()

    console.log("API Response:", data)
    console.log("Is Array?", Array.isArray(data))

    const transformed = transformTasks(data)

    dispatch({
      type: "LOAD_TASKS",
      payload: transformed,
    })
  } catch (err) {
    console.error(err)
  }
}

  loadTasks()
}, [])
  console.log(state.tasks.length)
  return (
    <>
   <Navbar
  setshow={setshow}
  working={state.working}
  dispatch={dispatch}
/>
   {show && (
  <Addtask
    setshow={setshow}
    dispatch={dispatch}
  />
)}
    {/*} <Tasks
  tasks={state.tasks}
  dispatch={dispatch}
/>*/}
<Progress
  tasks={state.tasks}
  working={state.working}
  startTime={state.startTime}
  totalWorkingTime={state.totalWorkingTime}/>

    </>
    
  )
}

export default App
