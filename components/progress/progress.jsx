import { useState, useEffect } from "react"
import "./progress.css"
import Graph from "./Graph"

function Progress({
  tasks = [],
  working,
  startTime,
  totalWorkingTime,
}) {
  const [elapsed, setElapsed] = useState(totalWorkingTime || 0)

  useEffect(() => {
  if (!working || !startTime) {
    setElapsed(totalWorkingTime || 0)
    return
  }

  const interval = setInterval(() => {
    setElapsed((totalWorkingTime || 0) + (Date.now() - startTime))
  }, 1000)

  return () => clearInterval(interval)
}, [working, startTime, totalWorkingTime])

  const total = tasks.length

  const inbox = tasks.filter(
    (task) => task.status === "new"
  ).length

  const todo = tasks.filter(
    (task) => task.status === "todo"
  ).length

  const progress = tasks.filter(
    (task) => task.status === "in-progress"
  ).length

  const completed = tasks.filter(
    (task) => task.status === "completed"
  ).length

  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100)

  // Convert milliseconds to HH:MM:SS
  const hours = String(
    Math.floor(elapsed / 3600000)
  ).padStart(2, "0")

  const minutes = String(
    Math.floor((elapsed % 3600000) / 60000)
  ).padStart(2, "0")

  const seconds = String(
    Math.floor((elapsed % 60000) / 1000)
  ).padStart(2, "0")

  return (
    <div className="progress">

      <div className="rows">

        

        <div className="progress-container">

          <div
            className="circle"
            style={{
              background: `conic-gradient(
                #22c55e ${percentage * 3.6}deg,
                #e5e7eb 0deg
              )`,
            }}
          >
            <div className="circle-inner">
              <h1>{percentage}%</h1>
              <p>Completed</p>
            </div>
          </div>

          {/* Statistics */}

          <div className="stats">

            <div className="card inbox">
              <h3>{inbox}</h3>
              <p>Inbox</p>
            </div>

            <div className="card todo">
              <h3>{todo}</h3>
              <p>Todo</p>
            </div>

            <div className="card progress-card">
              <h3>{progress}</h3>
              <p>In Progress</p>
            </div>

            <div className="card completed">
              <h3>{completed}</h3>
              <p>Completed</p>
            </div>

            

          </div>

        </div>

        

        <div className="time">

          <h2>Working Time</h2>

          <h1>
            {hours}:{minutes}:{seconds}
          </h1>

          <p>
            {working
              ? "  Working"
              : " Offline"}
          </p>

        </div>

      </div>

      {/* Graph */}

      <div className="graph-container">

        <h2>Task Analytics</h2>

        <Graph tasks={tasks} />

      </div>

    </div>
  )
}

export default Progress