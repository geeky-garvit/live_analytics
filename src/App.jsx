import "./App.css"
import { useContext } from "react"
import { Routes, Route } from "react-router-dom"

import Navbar from "../components/navbar/navbar"
import AddTask from "../components/addtask/addtask"
import { TaskContext } from "./context/taskcontext"

import Home from "./pages/home"
import TasksPage from "./pages/taskpage"
import ProgressPage from "./pages/progress"

function App() {
  const { state } = useContext(TaskContext)

  return (
    <>
      <h1 className="first-name">Geeky Dash</h1>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>

      {state.showAddModal && <AddTask />}
    </>
  )
}

export default App
