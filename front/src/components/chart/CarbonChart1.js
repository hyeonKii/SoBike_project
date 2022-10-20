import React from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "2010",
    가뭄피해건수: 9,
    탄소농도: 394.870504,
    amt: 2400
  },
  {
    name: "2011",
    가뭄피해건수: 45,
    탄소농도: 396.748428,
    amt: 2210
  },
  {
    name: "2012",
    가뭄피해건수: 59,
    탄소농도: 400.388235,
    amt: 2290
  },
  {
    name: "2013",
    가뭄피해건수: 22,
    탄소농도: 402.106061,
    amt: 2000
  },
  {
    name: "2014",
    가뭄피해건수: 105,
    탄소농도:  406.603175,
    amt: 2181
  },
  {
    name: "2015",
    가뭄피해건수: 216,
    탄소농도: 407.560000,
    amt: 2500
  },
  {
    name: "2016",
    가뭄피해건수: 147,
    탄소농도: 411.411765,
    amt: 2100
  },
  {
    name: "2017",
    가뭄피해건수: 372,
    탄소농도: 411.411765,
    amt: 2100
  },
  {
    name: "2018",
    가뭄피해건수: 232,
    탄소농도: 412.083333,
    amt: 2100
  },
  {
    name: "2019",
    가뭄피해건수: 236,
    탄소농도: 414.566667,
    amt: 2100
  },
  {
    name: "2020",
    가뭄피해건수: 120,
    탄소농도: 417.600000,
    amt: 2100
  }
];

export default function CarbonChart1() {
  return (
    <ComposedChart
      width={500}
      height={320}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" domain={[390, 420]}/>
      <YAxis yAxisId="right" orientation="right" domain={[0, 400]}/>      
      <Tooltip />
      <Legend />
      <Line yAxisId="left"
        type="monotone"
        dataKey="탄소농도"
        stroke="#ff8e7f"
        activeDot={{ r: 8 }}
      />
      <Line yAxisId="right" type="bill" dataKey="가뭄피해건수" stroke="#89a5ea" />
    </ComposedChart>
  );
}
