import "./App.css"
import { useContext } from "react"
import { Routes, Route } from "react-router-dom"

import Navbar from "../components/navbar/navbar"
import AddTask from "../components/addtask/addtask"
import { TaskContext } from "./context/taskcontext"

import Home from "./pages/home"
import TasksPage from "./pages/taskpage"
import ProgressPage from "./pages/progress"
import StatsFloatingModal from "../components/StatsFloatingModal"
import useTaskStats from "../src/hooks/usetaskstate"

function App() {
  
  const { state } = useContext(TaskContext)
  
    
    const tasks = state?.tasks || []
  
    
    const stats = useTaskStats(tasks)
  return (
    <>
      <h1 className="first-name">Geeky Dash</h1>
      <StatsFloatingModal stats={stats} />
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
