import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { TaskContext } from "../context/taskcontext"
import HomeGraph from "../../components/progress/Homegraph"
import useWorkingTimer from "../hooks/workingtime"
import { PageSkeleton } from "../../components/skeleton/Skeleton"

import "./home.css"


const MOOD_OPTIONS = [
  { emoji: "😊", label: "Happy" },
  { emoji: "🔥", label: "On Fire" },
  { emoji: "🎯", label: "Focused" },
  { emoji: "☕", label: "Relaxed" },
  { emoji: "🚀", label: "Productive" },
]

function Home() {
  const { state } = useContext(TaskContext)
  const { tasks, working, startTime, totalWorkingTime, loading } = state

  // Load saved mood from localStorage or default to "😊"
  const [selectedMood, setSelectedMood] = useState(() => {
    return localStorage.getItem("user_mood") || "😊"
  })

  // Persist mood choice
  const handleMoodSelect = (emoji) => {
    setSelectedMood(emoji)
    localStorage.setItem("user_mood", emoji)
  }

  const elapsed = useWorkingTimer(working, startTime, totalWorkingTime)

  if (loading) {
    return <PageSkeleton />
  }

  const safeTasks = Array.isArray(tasks) ? tasks : []
  const completed = safeTasks.filter((task) => task.status === "completed").length
  const total = safeTasks.length
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  const recentTasks = safeTasks.slice(-5).reverse()

  const hours = String(Math.floor(elapsed / 3600000)).padStart(2, "0")
  const minutes = String(Math.floor((elapsed % 3600000) / 60000)).padStart(2, "0")
  const seconds = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, "0")

  return (
    <div className="home">
      <section className="hero">
        <div className="welcome-container">
          <div className="welcome-title">
            <h1>
              Welcome Back <span className="active-mood">{selectedMood}</span>
            </h1>
            <p>Stay organized and finish your work efficiently.</p>
          </div>

          {/* MOOD PICKER OPTIONS */}
          <div className="mood-picker">
            <span className="mood-label">Set Mood:</span>
            <div className="mood-options">
              {MOOD_OPTIONS.map((item) => (
                <button
                  key={item.emoji}
                  title={item.label}
                  className={`mood-btn ${selectedMood === item.emoji ? "active" : ""}`}
                  onClick={() => handleMoodSelect(item.emoji)}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="graphSection">
        <div className="graphHeader">
          <h2>Productivity Overview</h2>
          <p>Live Task Activity</p>
        </div>
        <HomeGraph history={state.history || []} />
      </section>

      <section className="middle">
        <div className="circleCard">
          <div
            className="circle"
            style={{
              background: `conic-gradient(#22c55e ${percentage * 3.6}deg, #ececec 0deg)`,
            }}
          >
            <div className="circleInner">
              <h1>{percentage}%</h1>
              <p>Completed</p>
            </div>
          </div>
        </div>

        <div className="timerCard">
          <h2>Working Time</h2>
          <h1>
            {hours}:{minutes}:{seconds}
          </h1>
          <p>{working ? "🟢 Working" : "🔴 Offline"}</p>
        </div>
      </section>

      <section className="recent">
        <div className="recentHeader">
          <h2>Recent Tasks</h2>
          <Link to="/tasks">View All →</Link>
        </div>

        {recentTasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks found. Create one to get started!</p>
          </div>
        ) : (
          recentTasks.map((task) => (
            <div key={task.id} className="recentTask">
              <div>
                <h3>{task.title}</h3>
                <p>{task.priority}</p>
              </div>
              <span>{task.status}</span>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default Home
