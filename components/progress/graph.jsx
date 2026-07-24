import "./graph.css"

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
} from "recharts"

function Graph({ tasks = [] }) {
  const data = [
    {
      name: "Inbox",
      value: tasks.filter((t) => t.status === "new").length,
    },
    {
      name: "Todo",
      value: tasks.filter((t) => t.status === "todo").length,
    },
    {
      name: "Progress",
      value: tasks.filter((t) => t.status === "in-progress").length,
    },
    {
      name: "Completed",
      value: tasks.filter((t) => t.status === "completed").length,
    },
  ]

  const total = tasks.length
  const completed = data[3].value
  const average = data.reduce((sum, d) => sum + d.value, 0) / data.length

  const colors = ["#3B82F6", "#F59E0B", "#8B5CF6", "#22C55E"]

  if (total === 0) {
    return (
      <div
        style={{
          minHeight: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 18,
          color: "#888",
        }}
      >
        No Tasks Available
      </div>
    )
  }

  return (
    <div className="graph">
      <div className="graph-header">
        <div>
          <h2>Productivity Analytics</h2>
          <p>Live statistics of your workflow</p>
        </div>

        <div className="graph-info">
          <h3>Total: {total}</h3>
          <h3>Finished: {completed}</h3>
        </div>
      </div>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 30,
              right: 15,
              left: -15,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="4 4" vertical={false} />

            <XAxis dataKey="name" tickLine={false} />

            <YAxis allowDecimals={false} axisLine={false} tickLine={false} />

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 10px 20px rgba(0,0,0,.15)",
              }}
            />

            <ReferenceLine
              y={average}
              stroke="#999"
              strokeDasharray="5 5"
              label={{ value: "Avg", position: "insideTopRight", fill: "#888" }}
            />

            <Bar dataKey="value" radius={[10, 10, 0, 0]} animationDuration={1200}>
              <LabelList dataKey="value" position="top" offset={8} />

              {data.map((entry, index) => (
                <Cell key={index} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Graph