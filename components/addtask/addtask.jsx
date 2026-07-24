import "./addtask.css"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { taskSchema } from "../../src/schema/taskSchema"
import { TaskContext } from "../../src/context/taskcontext"

function Addtask() {
  const { dispatch } = useContext(TaskContext)
  const navigate = useNavigate() 

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
      console.log("Validation Failed:", result.error)
      const fieldErrors = {}

      const issues = result.error.issues || result.error.errors || []
      issues.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0]] = err.message
        }
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

    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    })

    dispatch({
      type: "CLOSE_ADD_MODAL",
    })

    navigate("/tasks") // 3. Fixed navigation error

    setTitle("")
    setDescription("")
    setPriority("Medium")
    setDate("")
  }

  return (
    <div
      className="modalOverlay"
      onClick={() => dispatch({ type: "CLOSE_ADD_MODAL" })}
    >
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()}>
        <div className="form">
          <div className="header">
            <center>ADD NEW TASK</center>
            <button
              type="button"
              className="close"
              onClick={() => dispatch({ type: "CLOSE_ADD_MODAL" })}
            >
              ✕
            </button>
          </div>

          <div className="form-inputs">
            <div className="input-items">
              <h3>Task</h3>
              <input
                type="text"
                value={title}
                placeholder="Enter task title..."
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <small style={{ color: "red" }}>{errors.title}</small>}
            </div>

            <div className="input-items">
              <h3>Priority</h3>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">🟢 Low</option>
                <option value="Medium">🟡 Medium</option>
                <option value="High">🔴 High</option>
              </select>
              {errors.priority && <small style={{ color: "red" }}>{errors.priority}</small>}
            </div>

            <div className="input-items">
              <h3>Due Date</h3>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {errors.date && <small style={{ color: "red" }}>{errors.date}</small>}
            </div>

            <div className="input-items">
              <h3>Description</h3>
              <textarea
                value={description}
                placeholder="Task description..."
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && <small style={{ color: "red" }}>{errors.description}</small>}
            </div>

            <button className="submit" type="submit">
              Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Addtask