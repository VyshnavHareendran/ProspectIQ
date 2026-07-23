import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartCard from "./ChartCard";

const CallsChart = ({
  data = [],
  callsPerEmployeeChart = [],
  loading,
}) => {

  const chartData =
    callsPerEmployeeChart.length > 0
      ? callsPerEmployeeChart
      : data;

  return (
    <ChartCard
      title="Calls per Employee"
      loading={loading}
    >
      <ResponsiveContainer
        width="100%"
        height={280}
      >
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ left: 25 }}
        >
          <CartesianGrid
            horizontal={false}
            strokeDasharray="3 3"
          />

          <XAxis type="number" />

          <YAxis
            type="category"
            dataKey="employee"
            width={90}
            tick={{ fontSize: 12 }}
          />

          <Tooltip />

          <Bar
            dataKey="callsMade"
            name="Calls"
            fill="#0288d1"
            radius={[0, 5, 5, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default CallsChart;