import "./tasks.css"
import { useState, useContext } from "react"
import { TaskContext } from "../../src/context/taskcontext"
import StatsFloatingModal from "../StatsFloatingModal"
import useTaskStats from "../../src/hooks/usetaskstate"

function Tasks() {

  const { state, dispatch } = useContext(TaskContext)

  const tasks = state?.tasks || []
  const stats = useTaskStats(tasks)

  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedTask, setSelectedTask] = useState(null)
  const [dragTask, setDragTask] = useState(null)
  const [search, setSearch] = useState("")

  const inboxTasks = tasks
    .filter((task) => task.status === "new")
    .filter((task) => {
      const searchMatch = task.title.toLowerCase().includes(search.toLowerCase())
      const priorityMatch =
        priorityFilter === "all" || task.priority.toLowerCase() === priorityFilter.toLowerCase()

      return searchMatch && priorityMatch
    })

  const todoTasks = tasks.filter((task) => task.status === "todo")
  const progressTasks = tasks.filter((task) => task.status === "in-progress")
  const completedTasks = tasks.filter((task) => task.status === "completed")

  function moveTask(id, status) {
    if (!dispatch) return
    dispatch({
      type: "CHANGE_STATUS",
      payload: { id, status },
    })
    setSelectedTask(null)
  }

  function handleUndo() {
    dispatch({ type: "UNDO" })
  }

  function Card(task) {
    return (
      <div
        key={task.id}
        draggable
        onDragStart={() => setDragTask(task)}
        className={`task-card ${task.priority.toLowerCase()}`}
      >
        <h3>{task.title}</h3>
        <p>{task.priority}</p>
        <p>{task.date || "No Due Date"}</p>
      </div>
    )
  }

  function DropColumn(status, children) {
    return (
      <div
        className="column-items"
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => {
          if (dragTask) {
            moveTask(dragTask.id, status)
            setDragTask(null) 
          }
        }}
      >
        {children}
      </div>
    )
  }

  return (
    <div className="tasks">
      <div className="board-actions" style={{ marginBottom: "15px" }}>
        <button
          onClick={handleUndo}
          disabled={!state.lastAction}
          className="undo-btn"
          style={{
            padding: "8px 16px",
            cursor: state.lastAction ? "pointer" : "not-allowed",
            opacity: state.lastAction ? 1 : 0.5,
          }}
        >
          ↩️
        </button>
      </div>

      <div className="columns">
        <div className="todos">
          <h1>Todo</h1>
          {DropColumn("todo", todoTasks.map(Card))}
        </div>

        <div className="inprogress">
          <h1>In Progress</h1>
          {DropColumn("in-progress", progressTasks.map(Card))}
        </div>

        <div className="completed">
          <h1>Completed</h1>
          {DropColumn("completed", completedTasks.map(Card))}
        </div>
      </div>

      <div className="all-tasks">
        <div className="inbox-header">
          <h1>Inbox</h1>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search Inbox..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />

            <select className="fltr" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>
        </div>

        <div
          className="column-items"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (dragTask) {
              moveTask(dragTask.id, "new")
              setDragTask(null)
            }
          }}
        >
          {inboxTasks.length === 0 ? (
            <p style={{ padding: "10px", color: "#666" }}>No inbox tasks match search.</p>
          ) : (
            inboxTasks.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={() => setDragTask(task)}
                className={`task-card ${task.priority.toLowerCase()}`}
                onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
              >
                <h3>{task.title}</h3>
                <p>{task.priority}</p>
                <p>{task.date || "No Due Date"}</p>

                {selectedTask === task.id && (
                  <div className="status-menu" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => moveTask(task.id, "todo")}>Todo</button>
                    <button onClick={() => moveTask(task.id, "in-progress")}>In Progress</button>
                    <button onClick={() => moveTask(task.id, "completed")}>Completed</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <StatsFloatingModal stats={stats} />
    </div>
  )
}

export default Tasks