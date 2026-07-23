import "./navbar.css"
import { useContext, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { TaskContext } from "../../src/context/taskcontext"

function Navbar() {
  const { state, dispatch } = useContext(TaskContext)

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
          <button
            className="error-dismiss"
            onClick={() => dispatch({ type: "CLEAR_ERROR" })}
          >
            ✕
          </button>
        </div>
      )}

      <div className="menue">
        <div className="buttons">
          <button
            className="button"
            onClick={() => dispatch({ type: "OPEN_ADD_MODAL" })}
          >
            Add
          </button>

          <NavLink className="button" to="/tasks">
            Tasks
          </NavLink>

          <NavLink className="button" to="/progress">
            Progress
          </NavLink>
        </div>

        <div className="work-toggle">
          <span>{state.working ? "💚" : "❤️"}</span>
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