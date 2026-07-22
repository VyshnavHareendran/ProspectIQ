import CallRoundedIcon from "@mui/icons-material/CallRounded";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const EmptyState = () => (
  <Box
    sx={(theme) => ({
      display: "grid",
      minHeight: 260,
      placeItems: "center",
      border: `1px dashed ${theme.palette.divider}`,
      borderRadius: 2,
      backgroundColor: alpha(theme.palette.primary.main, 0.03),
      textAlign: "center",
    })}
  >
    <Stack alignItems="center" spacing={1}>
      <CallRoundedIcon color="action" />

      <Typography fontWeight={700}>
        No call data available
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
      >
        Weekly calling statistics will appear here.
      </Typography>
    </Stack>
  </Box>
);

const WeeklyCallsChart = ({
  data = [],
  loading = false,
  error = "",
}) => {
  const theme = useTheme();

  const chartData =
    data.length > 0
      ? data
      : [
          { day: "Mon", calls: 12 },
          { day: "Tue", calls: 18 },
          { day: "Wed", calls: 10 },
          { day: "Thu", calls: 20 },
          { day: "Fri", calls: 15 },
        ];

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack spacing={0.5} sx={{ mb: 2.5 }}>
          <Typography variant="h3">
            Weekly Calls
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Calls completed this week.
          </Typography>
        </Stack>

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {loading ? (
          <Skeleton
            height={300}
            variant="rounded"
          />
        ) : !error && chartData.length === 0 ? (
          <EmptyState />
        ) : (
          <Box sx={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="calls"
                  radius={[8, 8, 0, 0]}
                  fill={theme.palette.primary.main}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(WeeklyCallsChart);