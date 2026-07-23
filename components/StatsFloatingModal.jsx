import React, { useState } from "react"
import "./StatsFloatingModal.css"

export default function StatsFloatingModal({ stats }) {
  const [isOpen, setIsOpen] = useState(false)

  const { total = 0, todo = 0, inProgress = 0, done = 0, percentage = 0, velocity = 0 } = stats || {}

  return (
    <>
      <div
        className="floating-stats-trigger"
        onClick={() => setIsOpen(true)}
        title="Click to view Live Stats & Project Details"
      >
        <span className="pulse-ring"></span>

        <span className="solid-dot">📊</span>
      </div>

      {isOpen && (
        <div className="stats-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="stats-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Analytics</h2>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <h4>Total Tasks</h4>
                <p className="stat-value">{total}</p>
              </div>

              <div className="stat-card">
                <h4>Completion Rate</h4>
                <p className="stat-value highlight">{percentage}%</p>
              </div>

              <div className="stat-card full-width">
                <h4>Tasks Breakdown</h4>
                <div className="status-pills">
                  <span className="pill todo">Todo: {todo}</span>
                  <span className="pill progress">In Progress: {inProgress}</span>
                  <span className="pill done">Done: {done}</span>
                </div>
              </div>

              <div className="stat-card velocity-card full-width">
                <h4>Velocity Score</h4>
                <p className="stat-value velocity">{velocity}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
