import "./navbar.css"
import { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { TaskContext } from "../../src/context/taskcontext"

function Navbar() {
  const { state, dispatch } = useContext(TaskContext)

  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 981 : false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 981)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!state.error) return
    const timer = setTimeout(() => {
      dispatch({ type: "CLEAR_ERROR" })
    }, 5000)
    return () => clearTimeout(timer)
  }, [state.error, dispatch])

  return (
    <nav className="navbar">
      <NavLink to="/" className="Logo">
        &
      </NavLink>

      {state.error && (
        <div className="navbar-error-banner">
          <span className="error-icon">⚠️</span>
          <span className="error-text">{state.error}</span>
          <button className="error-dismiss" onClick={() => dispatch({ type: "CLEAR_ERROR" })}>
            ✕
          </button>
        </div>
      )}

      <div className="menue">
        <div className="buttons">
          <button className="button" title="Add Task" onClick={() => dispatch({ type: "OPEN_ADD_MODAL" })}>
            {isMobile ? "➕" : "Add"}
          </button>

          <NavLink className="button" title="Tasks" to="/tasks">
            {isMobile ? "📋" : "Tasks"}
          </NavLink>

          <NavLink className="button" title="Progress" to="/progress">
            {isMobile ? "📈" : "Progress"}
          </NavLink>
        </div>

        <div className="work-toggle">
          
          <label className="switch">
            <input
              type="checkbox"
              checked={state.working}
              onChange={(e) =>
                dispatch({
                  type: e.target.checked ? "START_WORK" : "STOP_WORK",
                })
              }
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
