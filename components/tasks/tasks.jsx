import "./tasks.css"
import { useState } from "react"

function Tasks({ tasks, dispatch }) {
  const [selectedTask, setSelectedTask] = useState(null)

  const todoTasks = tasks.filter((task) => task.status === "todo")
  const progressTasks = tasks.filter((task) => task.status === "in-progress")
  const completedTasks = tasks.filter((task) => task.status === "completed")
  const newTasks = tasks.filter((task) => task.status === "new")

  function moveTask(id, status) {
    dispatch({
      type: "CHANGE_STATUS",
      payload: {
        id,
        status,
      },
    })

    setSelectedTask(null)
  }

  return (
    <div className="tasks">
      <div className="columns">
        {/* Todo */}
        <div className="todos">
          <h1>Todo</h1>

          <div className="column-items">
            {todoTasks.map((task) => (
              <div
                key={task.id}
                className={`task-card ${task.priority.toLowerCase()}`}
              >
                <h3>{task.title}</h3>

                <p>{task.priority}</p>

                <p>{task.dueDate || "No Due Date"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress */}

        <div className="inprogress">
          <h1>In Progress</h1>

          <div className="column-items">
            {progressTasks.map((task) => (
              <div
                key={task.id}
                className={`task-card ${task.priority.toLowerCase()}`}
              >
                <h3>{task.title}</h3>

                <p>{task.priority}</p>

                <p>{task.dueDate || "No Due Date"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Completed */}

        <div className="completed">
          <h1>Completed</h1>

          <div className="column-items">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className={`task-card ${task.priority.toLowerCase()}`}
              >
                <h3>{task.title}</h3>

                <p>{task.priority}</p>

                <p>{task.dueDate || "No Due Date"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inbox */}

      <div className="all-tasks">
        <h1>Inbox</h1>

        <div className="column-items">
          {newTasks.map((task) => (
            <div
              key={task.id}
              className={`task-card ${task.priority.toLowerCase()}`}
              onClick={() =>
                setSelectedTask(
                  selectedTask === task.id ? null : task.id,
                )
              }
            >
              <h3>{task.title}</h3>

              <p>{task.priority}</p>

              <p>{task.dueDate || "No Due Date"}</p>

              {selectedTask === task.id && (
                <div
                  className="status-menu"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() =>
                      moveTask(task.id, "todo")
                    }
                  >
                    Todo
                  </button>

                  <button
                    onClick={() =>
                      moveTask(task.id, "in-progress")
                    }
                  >
                    In Progress
                  </button>

                  <button
                    onClick={() =>
                      moveTask(task.id, "completed")
                    }
                  >
                    Completed
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks