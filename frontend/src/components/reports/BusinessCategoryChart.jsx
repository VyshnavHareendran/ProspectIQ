import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import ChartCard from "./ChartCard";

const colors = [
  "#1976d2",
  "#42a5f5",
  "#7e57c2",
  "#26a69a",
  "#ffb300",
  "#ef5350",
];

const categories = (items) =>
  Object.values(
    items.reduce(
      (result, item) => ({
        ...result,
        [item.category]: {
          name: item.category,
          value: (result[item.category]?.value || 0) + 1,
        },
      }),
      {}
    )
  );

const BusinessCategoryChart = ({
  businesses = [],
  categoryDistribution = [],
  loading,
}) => {

  const data =
    categoryDistribution.length > 0
      ? categoryDistribution.map((item) => ({
          name: item.category,
          value: item.count,
        }))
      : categories(businesses);

  return (
    <ChartCard
      title="Businesses by Category"
      loading={loading}
    >
      <ResponsiveContainer
        width="100%"
        height={280}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            outerRadius={85}
            label
          >
            {data.map((item, index) => (
              <Cell
                key={item.name}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default BusinessCategoryChart;