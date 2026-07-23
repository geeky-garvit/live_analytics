import "./Homegraph.css"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

function HomeGraph({ history }) {
  return (
    <div className="homeGraph">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="minute" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Legend />

          <Line type="monotone" dataKey="todo" stroke="#F59E0B" strokeWidth={3} dot={false} />

          <Line type="monotone" dataKey="progress" stroke="#3B82F6" strokeWidth={3} dot={false} />

          <Line type="monotone" dataKey="completed" stroke="#22C55E" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HomeGraph
