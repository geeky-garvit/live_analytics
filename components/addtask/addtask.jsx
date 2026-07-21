import "./addtask.css"
import { useState } from "react"
import {taskSchema} from "../../src/schema/taskSchema"

function Addtask({dispatch ,setshow}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [date, setDate] = useState("")

  const [errors, setErrors] = useState({})

 function submit(e) {
    e.preventDefault()

    const result = taskSchema.safeParse({
      title,
      description,
      priority,
      date,
    })

    if (!result.success) {
      const fieldErrors = {}

      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message
      })

      setErrors(fieldErrors)

      return
    }

    setErrors({})

    const newTask = {
      id: Date.now(),
      ...result.data,
      status: "todo",
    }

    console.log(newTask)
    dispatch({
  type: "ADD_TASK",
  payload: newTask,
})
setshow(false)
    setTitle("")
    setDescription("")
    setPriority("Medium")
    setDate("")
    
  }


  return (
    <form onSubmit={submit}>
      <div className="form">
        <div className="header">
          <center>ADD NEW TASKS</center>
          <button className="close" onClick={()=>setshow(false)}>+</button>
        </div>

        <div className="form-inputs">
          <div className="input-items">
            <h3>Task</h3>

            <input
              type="text"
              className="task-input"
              placeholder="Enter task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="input-items">
            <h3>Priority</h3>

            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🔴 High</option>
            </select>
          </div>

          <div className="input-items">
            <h3>Validity</h3>

            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div className="input-items">
            <h3>Description</h3>

            <input
              type="text"
              placeholder="Task description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button className="submit" >
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export default Addtask
