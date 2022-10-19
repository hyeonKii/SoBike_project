import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const data = [
  {
    name: "2010",
    기온: 12.7,
    탄소농도: 394.870504,
    amt: 2400
  },
  {
    name: "2011",
    기온: 12.4,
    탄소농도: 396.748428,
    amt: 2210
  },
  {
    name: "2012",
    기온: 12.3,
    탄소농도: 400.388235,
    amt: 2290
  },
  {
    name: "2013",
    기온:  12.9,
    탄소농도: 402.106061,
    amt: 2000
  },
  {
    name: "2014",
    기온: 13.1,
    탄소농도:  406.603175,
    amt: 2181
  },
  {
    name: "2015",
    기온: 13.4,
    탄소농도: 407.560000,
    amt: 2500
  },
  {
    name: "2016",
    기온: 13.6,
    탄소농도: 411.411765,
    amt: 2100
  },
  {
    name: "2017",
    기온: 13.1,
    탄소농도: 411.411765,
    amt: 2100
  },
  {
    name: "2018",
    기온: 13.0,
    탄소농도: 412.083333,
    amt: 2100
  },
  {
    name: "2019",
    기온: 13.3,
    탄소농도: 414.566667,
    amt: 2100
  },
  {
    name: "2020",
    기온: 13.0,
    탄소농도: 417.600000,
    amt: 2100
  }
];

export default function CarbonChart() {
    return (
      
        <BarChart
          width={550}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" domain={[390, 420]}/>
          <YAxis yAxisId="right" orientation="right" domain={[12.25, 13.65]}/>
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="탄소농도" fill="#ff8e7f" />
          <Bar yAxisId="right" dataKey= "기온" fill="#89a5ea" />
        </BarChart>
    );
}