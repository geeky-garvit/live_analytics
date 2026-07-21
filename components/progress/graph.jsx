import "graph.css"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

function Graph({ tasks }) {
  const data = [
    {
      name: "Inbox",
      value: tasks.filter(task => task.status === "new").length,
    },
    {
      name: "Todo",
      value: tasks.filter(task => task.status === "todo").length,
    },
    {
      name: "Progress",
      value: tasks.filter(task => task.status === "in-progress").length,
    },
    {
      name: "Completed",
      value: tasks.filter(task => task.status === "completed").length,
    },
  ]

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            radius={[10, 10, 0, 0]}
            fill="#4F46E5"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Graph