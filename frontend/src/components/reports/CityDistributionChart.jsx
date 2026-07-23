import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import ChartCard from "./ChartCard";

const MAX_VISIBLE_CITIES = 7;

const colors = [
  "#5c6bc0",
  "#26a69a",
  "#ffa726",
  "#ec407a",
  "#42a5f5",
  "#66bb6a",
  "#ab47bc",
  "#78909c",
];

const cities = (items) =>
  Object.values(
    items.reduce((result, item) => {
      const city =
        item.city || "Unknown";

      result[city] = {
        name: city,
        value: (result[city]?.value || 0) + 1,
      };

      return result;
    }, {})
  );

const prepareChartData = (items) => {
  const sorted = items
    .map((item) => ({
      name: item.name || "Unknown",
      value: Number(item.value ?? 0),
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);

  if (sorted.length <= MAX_VISIBLE_CITIES) {
    return sorted;
  }

  const visibleCities = sorted.slice(
    0,
    MAX_VISIBLE_CITIES
  );

  const remainingCount = sorted
    .slice(MAX_VISIBLE_CITIES)
    .reduce(
      (total, item) => total + item.value,
      0
    );

  return [
    ...visibleCities,
    {
      name: "Others",
      value: remainingCount,
    },
  ];
};

const CityDistributionChart = ({
  businesses = [],
  cityDistribution = [],
  loading,
}) => {
  const sourceData =
    cityDistribution.length > 0
      ? cityDistribution.map((item) => ({
          name:
            item.city ||
            item.name ||
            "Unknown",
          value: Number(
            item.count ??
            item.value ??
            0
          ),
        }))
      : cities(businesses);

  const data = prepareChartData(sourceData);

  const totalBusinesses = data.reduce(
    (total, item) => total + item.value,
    0
  );

  return (
    <ChartCard
      title="Businesses by City"
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

export default CityDistributionChart;