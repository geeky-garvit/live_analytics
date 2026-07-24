import "./tasks.css"
import { useState, useContext } from "react"
import { TaskContext } from "../../src/context/taskcontext"
import StatsFloatingModal from "../StatsFloatingModal"
import useTaskStats from "../../src/hooks/usetaskstate"

function TaskCard({ task, onDragStart, onDragEnd, isSelected, onSelect, onMoveTask }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", task.id)
    e.dataTransfer.effectAllowed = "move"
    e.currentTarget.classList.add("dragging")
    onDragStart(task)
  }

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("dragging")
    onDragEnd()
  }

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`task-card ${task.priority ? task.priority.toLowerCase() : ""}`}
      onClick={() => onSelect && onSelect(task.id)}
    >
      <h3>{task.title}</h3>
      <p>{task.priority}</p>
      <p>{task.date || "No Due Date"}</p>

      {isSelected && (
        <div className="status-menu" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => onMoveTask(task.id, "todo")}>Todo</button>
          <button onClick={() => onMoveTask(task.id, "in-progress")}>In Progress</button>
          <button onClick={() => onMoveTask(task.id, "completed")}>Completed</button>
        </div>
      )}
    </div>
  )
}

function DropColumn({ status, children, onDropTask }) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    if (!isDragOver) setIsDragOver(true)
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const taskIdFromData = e.dataTransfer.getData("text/plain")
    onDropTask(status, taskIdFromData)
  }

  return (
    <div
      className={`column-items ${isDragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

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
      const priorityMatch = priorityFilter === "all" || task.priority?.toLowerCase() === priorityFilter.toLowerCase()

      return searchMatch && priorityMatch
    })

  const todoTasks = tasks.filter((task) => task.status === "todo")
  const progressTasks = tasks.filter((task) => task.status === "in-progress")
  const completedTasks = tasks.filter((task) => task.status === "completed")

  function moveTask(id, status) {
    if (!dispatch || !id) return
    dispatch({
      type: "CHANGE_STATUS",
      payload: { id, status },
    })
    setSelectedTask(null)
  }

  function handleDropTask(targetStatus, fallbackId) {
    const targetId = dragTask?.id || fallbackId
    if (targetId) {
      moveTask(targetId, targetStatus)
    }
    setDragTask(null)
  }

  function handleUndo() {
    if (dispatch) dispatch({ type: "UNDO" })
  }

  return (
    <div className="tasks">
      <div className="board-actions" style={{ marginBottom: "15px" }}>
        <button
          onClick={handleUndo}
          disabled={!state?.lastAction}
          className="undo-btn"
          style={{
            padding: "8px 16px",
            cursor: state?.lastAction ? "pointer" : "not-allowed",
            opacity: state?.lastAction ? 1 : 0.5,
          }}
        >
          ↩️
        </button>
      </div>

      <div className="columns">
        <div className="todos">
          <h1>Todo</h1>
          <DropColumn status="todo" onDropTask={handleDropTask}>
            {todoTasks.map((task) => (
              <TaskCard key={task.id} task={task} onDragStart={setDragTask} onDragEnd={() => setDragTask(null)} />
            ))}
          </DropColumn>
        </div>

        <div className="inprogress">
          <h1>In Progress</h1>
          <DropColumn status="in-progress" onDropTask={handleDropTask}>
            {progressTasks.map((task) => (
              <TaskCard key={task.id} task={task} onDragStart={setDragTask} onDragEnd={() => setDragTask(null)} />
            ))}
          </DropColumn>
        </div>

        <div className="completed">
          <h1>Completed</h1>
          <DropColumn status="completed" onDropTask={handleDropTask}>
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} onDragStart={setDragTask} onDragEnd={() => setDragTask(null)} />
            ))}
          </DropColumn>
        </div>
      </div>

      <div className="all-tasks">
        <div className="inbox-header">
          <h1>Inbox</h1>

          <div className="inbox-controls">
            <input
              className="inbox-search"
              type="text"
              placeholder="Search Inbox..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select className="fltr" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>
        </div>

        <DropColumn status="new" onDropTask={handleDropTask}>
          {inboxTasks.length === 0 ? (
            <p className="no-tasks">No inbox tasks match search.</p>
          ) : (
            inboxTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDragStart={setDragTask}
                onDragEnd={() => setDragTask(null)}
                isSelected={selectedTask === task.id}
                onSelect={(id) => setSelectedTask(selectedTask === id ? null : id)}
                onMoveTask={moveTask}
              />
            ))
          )}
        </DropColumn>
      </div>

      <StatsFloatingModal stats={stats} />
    </div>
  )
}

export default Tasks
