import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { barColors, chartData } from "../../types";

const WorkerChart = () => {
  const borderRadius = 8;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={100}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={30}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        {/* <YAxis /> */}
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="pv" background={{ fill: "#eee" }} radius={borderRadius}>
          {chartData.map((_, index) => (
            <Cell key={index} fill={barColors[index]} radius={borderRadius} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
export default WorkerChart;
