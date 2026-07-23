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

const MAX_VISIBLE_BUSINESSES = 10;

const LeadScoreChart = ({
  data = [],
  leadScoreChart = [],
  loading,
}) => {
  const sourceData =
    leadScoreChart.length > 0
      ? leadScoreChart
      : data;

  const chartData = sourceData
    .map((item) => ({
      ...item,
      name:
        item.name ||
        item.business_name ||
        item.businessName ||
        "Unknown Business",
      leadScore: Number(
        item.leadScore ??
        item.lead_score ??
        item.score ??
        0
      ),
    }))
    .filter((item) => Number.isFinite(item.leadScore))
    .sort((a, b) => b.leadScore - a.leadScore)
    .slice(0, MAX_VISIBLE_BUSINESSES);

  return (
    <ChartCard
      title="Lead Score by Business"
      loading={loading}
    >
      <ResponsiveContainer
        width="100%"
        height={360}
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
            domain={[0, 100]}
            tickLine={false}
            allowDecimals={false}
          />

          <YAxis
            type="category"
            dataKey="name"
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
              Number(value).toFixed(1),
              "Lead Score",
            ]}
            labelFormatter={(label) => label}
          />

          <Bar
            dataKey="leadScore"
            name="Lead Score"
            fill="#1976d2"
            radius={[0, 5, 5, 0]}
            maxBarSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default LeadScoreChart;