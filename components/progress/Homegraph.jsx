import "./Homegraph.css"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

function HomeGraph({ history = [] }) {
  if (!history || history.length === 0) {
    return (
      <div className="homeGraph empty-graph">
        <p>No activity history available yet.</p>
      </div>
    )
  }

  return (
    <div className="homeGraph">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={history}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ececec" />

          <XAxis dataKey="minute" tickLine={false} />

          <YAxis allowDecimals={false} axisLine={false} tickLine={false} />

          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: 10,
              border: "none",
              boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            }}
          />

          <Legend verticalAlign="top" height={36} />

          <Line
            type="monotone"
            dataKey="todo"
            name="Todo"
            stroke="#F59E0B"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="progress"
            name="In Progress"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="completed"
            name="Completed"
            stroke="#22C55E"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HomeGraph