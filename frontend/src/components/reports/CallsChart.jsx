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

const MAX_VISIBLE_EMPLOYEES = 10;

const CallsChart = ({
  data = [],
  callsPerEmployeeChart = [],
  loading,
}) => {
  const sourceData =
    callsPerEmployeeChart.length > 0
      ? callsPerEmployeeChart
      : data;

  const chartData = sourceData
    .map((item) => ({
      ...item,
      employee:
        item.employee ||
        item.employee_name ||
        item.employeeName ||
        "Unknown Employee",
      callsMade: Number(
        item.callsMade ??
        item.calls_made ??
        item.total_calls ??
        item.calls ??
        0
      ),
    }))
    .filter((item) => Number.isFinite(item.callsMade))
    .sort((a, b) => b.callsMade - a.callsMade)
    .slice(0, MAX_VISIBLE_EMPLOYEES);

  const chartHeight = Math.max(
    280,
    chartData.length * 38
  );

  return (
    <ChartCard
      title="Calls per Employee"
      loading={loading}
    >
      <ResponsiveContainer
        width="100%"
        height={chartHeight}
      >
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 8,
            right: 24,
            bottom: 8,
            left: 20,
          }}
        >
          <CartesianGrid
            horizontal={false}
            strokeDasharray="3 3"
          />

          <XAxis
            type="number"
            allowDecimals={false}
            tickLine={false}
          />

          <YAxis
            type="category"
            dataKey="employee"
            width={130}
            tickLine={false}
            interval={0}
            tick={{
              fontSize: 12,
            }}
            tickFormatter={(value) =>
              value.length > 18
                ? `${value.slice(0, 18)}...`
                : value
            }
          />

          <Tooltip
            formatter={(value) => [
              value,
              "Calls",
            ]}
            labelFormatter={(label) => label}
          />

          <Bar
            dataKey="callsMade"
            name="Calls"
            fill="#0288d1"
            radius={[0, 5, 5, 0]}
            maxBarSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default CallsChart;