import React from "react";
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

const data = [
  {
    name: "Sun",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Mon",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Tues",
    uv: 3000,
    pv: 2398,
    amt: 2210,
  },
  {
    name: "Wed",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Thurs",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Fri",
    uv: 2890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Sat",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
];

const WorkerChart = () => {
  const barColors = [
    "#FFB448",
    "#6CEAE6",
    "#FF6663",
    "#FFB448",
    "#6CEAE6",
    "#FF6663",
    "#FFB448",
  ];
  const borderRadius = 8;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={100}
        height={300}
        data={data}
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
          {data.map((_, index) => (
            <Cell key={index} fill={barColors[index]} radius={borderRadius} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
export default WorkerChart;
