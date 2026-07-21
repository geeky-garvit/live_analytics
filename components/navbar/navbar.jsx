import "./navbar.css"

function Navbar({ setshow, working, dispatch }) {
  return (
    <nav className="navbar">
      <div className="Logo">&</div>

      <div className="menue">
        <div className="buttons">
          <button onClick={() => setshow(true)}>Add</button>
          <button>Tasks</button>
          <button>Progress</button>
        </div>

        <div className="work-toggle">
          

          <label className="switch">
            <input
              type="checkbox"
              checked={working}
              onChange={(e) =>
                dispatch({
                  type: e.target.checked
                    ? "START_WORK"
                    : "STOP_WORK",
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