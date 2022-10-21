import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";

const data = [
  { name: "Car", value: 47.0 },
  { name: "Other", value: 4.1,  },
  { name: "Specials", value: 4.6 },
  { name: "Truck", value: 32.2 },
  { name: "Vans", value: 12.0 }

];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={`#ff8e7f`} fontSize={`40px`} fontWeight={`bold`}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={`#ff8e7f`}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={`#ff8e7f`}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={`#ff8e7f`}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={`#ff8e7f`} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        fontSize={"30px"}
      >{`Rate ${value}%`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        fontSize={"15px"}
        fontWeight={'bold'}
      >
        {`(Carbon emissions)`}
      </text>
    </g>
  );
};

export default function CarbonChart3() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }

  return (
    <PieChart width={800} height={500}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={330}
        cy={210}
        innerRadius={90}
        outerRadius={130}
        fill="#89a5ea"
        dataKey="value"
        onMouseEnter={onPieEnter}
        // label={renderCustomizedLabel}
        labelLine={false}
        // label={({payload}) => { if(payload.name == "Car") {return ""} else return `${payload.name} ${payload.value}${"%"}`}}
        
      />
    </PieChart>
  );
}
