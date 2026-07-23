import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import ChartCard from "./ChartCard";

const MAX_VISIBLE_CATEGORIES = 7;

const colors = [
  "#1976d2",
  "#42a5f5",
  "#7e57c2",
  "#26a69a",
  "#ffb300",
  "#ef5350",
  "#66bb6a",
  "#78909c",
];

const categories = (items) =>
  Object.values(
    items.reduce((result, item) => {
      const category =
        item.category || "Uncategorized";

      result[category] = {
        name: category,
        value: (result[category]?.value || 0) + 1,
      };

      return result;
    }, {})
  );

const prepareChartData = (items) => {
  const sorted = items
    .map((item) => ({
      name: item.name || "Uncategorized",
      value: Number(item.value ?? 0),
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);

  if (sorted.length <= MAX_VISIBLE_CATEGORIES) {
    return sorted;
  }

  const visibleCategories = sorted.slice(
    0,
    MAX_VISIBLE_CATEGORIES
  );

  const remainingCount = sorted
    .slice(MAX_VISIBLE_CATEGORIES)
    .reduce(
      (total, item) => total + item.value,
      0
    );

  return [
    ...visibleCategories,
    {
      name: "Others",
      value: remainingCount,
    },
  ];
};

const BusinessCategoryChart = ({
  businesses = [],
  categoryDistribution = [],
  loading,
}) => {
  const sourceData =
    categoryDistribution.length > 0
      ? categoryDistribution.map((item) => ({
          name:
            item.category ||
            item.name ||
            "Uncategorized",
          value: Number(
            item.count ??
            item.value ??
            0
          ),
        }))
      : categories(businesses);

  const data = prepareChartData(sourceData);

  const totalBusinesses = data.reduce(
    (total, item) => total + item.value,
    0
  );

  return (
    <ChartCard
      title="Businesses by Category"
      loading={loading}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          minHeight: 320,
          gap: 16,
        }}
      >
        <div
          style={{
            width: "55%",
            height: 280,
            minWidth: 0,
          }}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="48%"
                outerRadius="76%"
                paddingAngle={2}
              >
                {data.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={
                      colors[
                        index % colors.length
                      ]
                    }
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => {
                  const percentage =
                    totalBusinesses > 0
                      ? (
                          (Number(value) /
                            totalBusinesses) *
                          100
                        ).toFixed(1)
                      : 0;

                  return [
                    `${value} (${percentage}%)`,
                    name,
                  ];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            width: "45%",
            minWidth: 0,
          }}
        >
          {data.map((item, index) => {
            const percentage =
              totalBusinesses > 0
                ? (
                    (item.value /
                      totalBusinesses) *
                    100
                  ).toFixed(1)
                : 0;

            return (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 10,
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    flexShrink: 0,
                    backgroundColor:
                      colors[
                        index % colors.length
                      ],
                  }}
                />

                <span
                  title={item.name}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: 13,
                  }}
                >
                  {item.name}
                </span>

                <span
                  style={{
                    flexShrink: 0,
                    fontSize: 12,
                    opacity: 0.7,
                  }}
                >
                  {item.value} ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </ChartCard>
  );
};

export default BusinessCategoryChart;