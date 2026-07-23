import { useContext } from "react"
import "./progress.css"
import Graph from "./graph"
import { TaskContext } from "../../src/context/taskcontext"
import useWorkingTimer from "../../src/hooks/workingtime"

function Progress() {
  const { state } = useContext(TaskContext)
  const { tasks, working, startTime, totalWorkingTime } = state

  const elapsed = useWorkingTimer(working, startTime, totalWorkingTime)

  const total = tasks.length
  const inbox = tasks.filter((t) => t.status === "new").length
  const todo = tasks.filter((t) => t.status === "todo").length
  const progress = tasks.filter((t) => t.status === "in-progress").length
  const completed = tasks.filter((t) => t.status === "completed").length

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)
  const productivity = total === 0 ? 0 : Math.round(((completed + progress * 0.5) / total) * 100)

  const hours = String(Math.floor(elapsed / 3600000)).padStart(2, "0")
  const minutes = String(Math.floor((elapsed % 3600000) / 60000)).padStart(2, "0")
  const seconds = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, "0")

  return (
    <div className="progress">
      <div className="rows">
        <div className="progress-container">
          <div
            className="circle"
            style={{
              background: `conic-gradient(#22c55e ${percentage * 3.6}deg, #e5e7eb 0deg)`,
            }}
          >
            <div className="circle-inner">
              <h1>{percentage}%</h1>
              <p>Completed</p>
            </div>
          </div>

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
              <p>Working</p>
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
          <p>{working ? "🟢 Working" : "🔴 Offline"}</p>
        </div>
      </div>

      <div className="graph-container">
        <Graph tasks={tasks} />
      </div>
    </div>
  )
}

export default Progress
