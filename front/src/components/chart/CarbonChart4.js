
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "자동차 이용하지 않기",
    CO2: 2.04,
    amt: 2100
  },
  {
    name: "장거리 여행 안하기",
    CO2: 1.68,
    amt: 2100
  },
  {
    name: "대중교통 이용하기",
    CO2: 0.98,
    amt: 2100
  },
  
];

export default function CarbonChart4() {
  return (
    <BarChart
      width={500}
      height={330}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
      barSize={20}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 20, right: 20 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="CO2" fill="#89a5ea" background={{ fill: "#eee" }} />
    </BarChart>
  );
}
